---
date: '2022-06-06'
title: '[Nuxt] ssr 훅 에서 인스턴스 생성시 문제점(WARN Cannot stringify arbitrary non-POJOs)'
categories: ['nuxt']
summary: WARN Cannot stringify arbitrary non-POJOs
thumbnail: './non-pojo.png'
---

> nuxt ssr훅에서 인스턴스 생성 후 해당 메서드에 접근을 할 때 왜 문제가 생길까??

```javascript
export default class Item {
  id
  title
  subTitle
  writer
  constructor(id, title, subTitle, writer) {
    this.id = id
    this.title = title
    this.subTitle = subTitle
    this.writer = writer
  }
  hello(): void {
    console.log('hello~~~~')
  }
}
```

위의 클래스를 `fetch`나 `asyncData`훅에서 생성을 하게 되면 ssr훅의 컨텍스트가 종료가 될때 ssr에서 생성한 인스턴스의 전체 구성 요소 상태가 문자열화된다.

## ⭐️ 생성한 인스턴스의 메서드 접근 가능 할 때

```javascript
data(){
  return{
    item : null
  }
},
fetch(){
  this.item = new Item(1,'title','subtitle','writer');
  this.item.hello();
}
```

## ❗️생성한 인스턴스의 메서드 접근이 불가능 할 때

```javascript
mounted(){
  this.item.hello();
}
```

fetch훅이 끝난 후 mounted에서 메서드에 접근을 하게 되면 메서드에 접근을 못 하게 된다.

## 참고자료

🔗 https://github.com/nuxt/nuxt.js/issues/10277
