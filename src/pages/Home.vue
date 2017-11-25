<template>
  <div class="container">
    <navigation></navigation>
    <img style="width:100%;" src = "../assets/images/noname.jpg">
    <a class="button is-primary is-large" href="/feeding">먹이주기 예약하기</a>
    <a class="button is-primary is-large" href="/cleaning">집청소 예약하기</a>
    <a class="button is-primary is-large" href="/spot">둘러보기</a>
    <a class="button is-primary is-large" href="/modal">모달테스트</a>
    <geolocation></geolocation>
  </div>
</template>

<script >
import Navigation from '@/components/Navigation';
import Geolocation from '@/components/Geolocation';

export default {
  name: 'Home',
  components: {
    Navigation,
    Geolocation,
  },
};
</script>

<style scoped>
.cat-button {
  margin-right: 10px;
}
</style>
