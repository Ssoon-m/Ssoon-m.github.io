---
date: '2022-05-22'
title: 'safari transition 버그'
categories: ['CSS', 'cross browsing', 'safari']
summary: safari transition bug...
thumbnail: './safaritransitionbug.jpg'
---

## ❗️문제점...

배너에 `splide` 모듈을 사용 했는데 `transition`이 일어날때 마다 `safari`에서 깜빡이면서 넘어가는 현상이 있었다.

## 💡해결책

처음엔 어떠한 이유(모듈 자체의 이슈?) 때문에 버그가 발생했는지 명확히 몰라서 헤맸는데 `safari transition bug` 라는 키워드로 검색을 해보니

```css
-webkit-transform: translate3d(0, 0, 0);
```

위 속성을 적용 하라는 글들이 많았다.
깜빡거리는 요소에 추가를 해주니 정상 동작을 확인 할 수 있었다.

## 속성 설명

`transition3d`로 하드웨어 가속을 사용하게 변경을 해줘서 깜빡이는 현상을 없애 준다.

`transition3d` 대신 `will-change: -webkit-transform`을 추가해줘도 정상 동작을 한다.
하지만, 배너를 하나하나 추가 할 때마다 모든 엘리먼트에 `will-change`가 붙게 될 것이다.
너무 많은 엘리먼트에 `will-change`를 사용하게 된다면 자원을 대량으로 사용할 수 있으므로 사용하지 않았다.
