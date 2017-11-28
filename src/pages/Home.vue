<template>
  <div class="container">
    <navigation></navigation>
    <a class="button is-primary is-large w-90 mb" style="margin-top: 60px;" href="/feeding">먹이주기 예약하기</a>
    <a class="button is-primary is-large w-90 mb" href="/cleaning">집청소 예약하기</a>
    <a class="button is-primary is-large w-90 mb" href="/spot">둘러보기</a>
    <a class="button is-primary is-large w-90" href="/modal">모달테스트</a>
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
.container {
  text-align: center;
}

.cat-button {
  margin-right: 10px;
}

.w-90 {
  width: 90%;
}

.mb {
  margin-bottom: 20px;
}
</style>
