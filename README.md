# lanbutler

> A Vue.js project

## Page Info
- 홈 화면 / 고양이 리스트 출력 -> 파일: pages/Home.vue, url: /
- 고양이 세부 화면 / 고양이 이름, 서식 장소, 사진 등 -> 파일: pages/Cat.vue, url: cat/:cat_id ( ex. cat/123 )
- 서식 장소 세부 화면 / 지도, 서식 고양이, 청소, 피딩 일정 등 -> 파일: pages/Spot.vue, url: spot/:spot_id ( ex. spot/123 )
- 피딩 일정 세부 화면 / 피딩 일정, 일정 등록, 취소 등 -> 파일: pages/Feeding.vue, url: spot/:spot_id/feeding ( ex. spot/123/feeding )
- 청소 일정 세부 화면 / 청소 일정, 일정 등록, 취소 등 -> 파일: pages/Cleaning.vue, url: spot/:spot_id/cleaning ( ex. spot/123/cleaning )

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
