---
date: '2022-03-20'
title: '[Nuxt] fetch 훅 사용시 주의점'
categories: ['nuxt', 'vue']
summary: nuxt로 개발을 할때 fetch는 매우 매력적인 훅이다. 하지만, 정확하게 알고 사용하는건 매우 중요하므로 제대로 알아보도록 하자!
thumbnail: './nuxtfetch.png'
---

> 출처 : https://nuxtjs.org/docs/concepts/nuxt-lifecycle#nuxt-lifecycle

- 주의점에 대해 설명하기에 앞서 라이프 사이클 먼저 알아보자.
- `nuxt` 를 해본 사람이라면 잘 아는 `nuxt` 라이프사이클 훅 흐름도이다.

## ✏️ SSR 동작시

---

1.nuxtServerInit
2.plugins
3.middleware
4.asyncData
5.beforeCreate
6.created
7.fetch
8.plugins
9.beforeCreate
10.created
11.beforeMount
12.mounted

## ✏️CSR 동작시

---

1.middleware
2.asyncData
3.beforeCreate
4.created
5.fetch
6.beforeMount
7.mounted

---

> ** 문제!! **

```javascript
async fetch(){
  console.log('1. fetch start');
  await this.dataFetching();
  console.log('2. fetch end');
},
mounted(){
  console.log('3. mounted');
},
methods:{
  dataFetching(){
    return new Promise((res,rej)=>{
      setTimeout(()=>{
        res();
      },2000);
    });
  }
}
```

- Nuxt에서 위 코드를 실행하면 어떤 순서대로 콘솔에 찍힐까?
- 1 -> 2 -> 3 순서대로 호출이 된다고 생각했다면, 맞기도하고 틀리기도 하다.
- 위 문제는 `SSR` 로 동작하는지`CSR`로 동작하는지에 따라 답이 다르다.

> **이유는?**

다시 한번 흐름도를 살펴보자!
![](https://images.velog.io/images/ssoon-m/post/44ff6d95-e077-4887-9a31-0519b6d36b33/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-20%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%207.40.59.png)

- `mounted`는 DOM이 렌더링되었을때 호출이 된다.

## ✏️SSR시 동작 순서

---

![](https://images.velog.io/images/ssoon-m/post/acf32140-c2fd-45f6-95fc-866880219f06/image.png)
결과 먼저 보자면, 1 -> 2-> 3 순서로 실행이 된다.
<br>

**fetch에 대한 설명**

- SSR이나 CSR로 동작시 **vue instance 가 생성이 된 이후** fetch훅이 실행이 된다. (그래서 Nuxt2.12 이후 vue instance 속성들에 접근이 가능함. )
- 페이지 렌더링은 fetch 훅까지 종료가 되고 서버에서 화면 구성을 마친 후 렌더링이 된다.(Nuxt는 **fetch promise가 종료될 때까지 대기한다!!! **)
- SSR시 `$fetchState.pending` 의 상태를 찍어 본다면 true로 나온다. CSR시엔 false가 나옴.
- **fetch는 캐싱을 지원**해서 한 번 방문했던 곳에 저장이 가능 (feat. keep-alive)
- 렌더링의 진행 상태를 제공한다. →`$fetchState`
  - fetchState 코드 예시
    ```jsx
    <template>
    	<div v-if="$fetchState.pending">Fetching 중 .... </div>
    	<div v-else>Fetching 종료</div>
    </template>
    <script>
    export default{
    	async fetch(){
    		await ~~~~~~~
    	}
    }
    </script>
    ```
    위와 같이 상태에 따른 분기처리가 가능하다.

**fetch 요약**

- SSR로 동작시엔 fetch에 대한 라이프사이클 훅이 실행을 마칠때까지 10초가 걸리건 100초가 걸리건 상관 없이 유저 화면에 페이지가 렌더링이 되지 않을 것이다.(유저는 해당 페이지를 계속 못 보고 로딩되고 있는 화면만 보고있을 것이다.)

## ✏️CSR시 동작 순서

---

![](https://images.velog.io/images/ssoon-m/post/e9d1bd20-5b93-4fd4-b0d0-531a444cf867/image.png)
마찬가지로 결과 먼저 보자면, 1 -> 3 -> 2 로 실행이 된다.

![](https://images.velog.io/images/ssoon-m/post/d68e5b08-703e-41eb-9fd4-3e4fdafa9b2f/image.png)

> 출처 : https://nuxtjs.org/docs/components-glossary/fetch/

- Nuxt 공식문서의 설명을 보면 이유를 알수있다.
- 첫 페이지 진입시엔 서버 측에서, 라우터로 이동할때는 **클라이언트 측에서 fetch가 호출**된다고 한다.
- 그렇다는건 CSR로 동작시에 fetch 훅이 비동기로 데이터를 가져오는 동안 **DOM이 렌더링되었다면 mounted 훅이 동작을 하는 것이다.**
- **위의 라이프 사이클 훅 흐름도를 다시 살펴보면 mounted() 후에 fetch complete가 되는걸 알 수 있다.**

## ⭐️ 결론

---

- **fetch**는 asyncData에 비해 기능이 많고 모든 컴포넌트에서 사용이 가능해서 **매력적인 훅이라고 생각한다.**
- fetch에 대한 글들을 읽어보면 데이터를 스토어에 넣기위해서 사용한다는 글 들이 많다.
- 나는 컴포넌트 렌더링 이전에 비동기 로직을 호출 하는게 포인트라고 생각했지만, **CSR시 컴포넌트가 렌더링이 된 후에도 데이터를 다 못 가지고 오는 경우도 있으므로** 이 점은 잘 알아두고 사용해야 할 것 같다.
- 만약 무조건 mounted이후 **완벽히 바인딩된 데이터**를 보여줘야 한다면? SSR이나 CSR상관없이 똑같은 순서를 보장받고 싶고 비동기 로직을 호출을 해야 한다면, `asyncData`를 사용하면 된다.

`asyncData`

- 페이지 컴포넌트에만 제공되는 속성.
- 마치 뷰 라우터 네비게이션 가드에서 데이터를 호출하고 받아왔을 때 페이지를 진입하는 것과 같음.
- asyncData도 마찬가지로 promise가 처리될 때까지 기다린다

> TMI : Fetch vs AsyncData?.
> ![](https://images.velog.io/images/ssoon-m/post/cdda2492-9479-4122-a8fc-8d273fa23a62/image.png)

## 🚀 마지막 퀴즈

---

```javascript
async asyncData(){
  console.log('1. async start');
  const data = await this.$axios.get('');
  console.log('2. async end');
},
async fetch(){
  console.log('3. fetch start');
  const data = await this.$axios.get('');
  console.log('4. fetch end');
},
mounted(){
  console.log('5. mounted');
}
```

- 위 코드는 SSR과 CSR동작시 어떤 순서로 실행이 될까?
  - `SSR` : 1(async start) → 2(async end) → 3 → 4 → 5
    `CSR` : 1(async start) → 2(async end) → 3 → 5 → 4

## 참고자료

🔗 [Nuxt의 비동기 데이터 호출 방법](https://joshua1988.github.io/vue-camp/nuxt/data-fetching.html#asyncdata의-에러-핸들링)
🔗 [Nuxt공식 문서 Data Fetcing 설명](https://nuxtjs.org/docs/features/data-fetching/#async-data)
🔗 [Nuxt Async Data 블로그 글](https://dev.to/aiarnob/nuxt-js-data-fetching-hook-async-data-o9p)
🔗 [Between Asyncdata and Fetch in Nuxt](https://www.telerik.com/blogs/understanding-difference-between-asyncdata-fetch-nuxt)
