<template>
  <div class="container">
    <navigation></navigation>
    <modal></modal>
    <a class="button is-primary is-large" href="/feeding">먹이주기 예약하기</a>
    <a class="button is-primary is-large" href="/cleaning">집청소 예약하기</a>
    <a class="button is-primary is-large" href="/spot">둘러보기</a>
  </div>
</template>

<script >
import Navigation from '@/components/Navigation';
import Modal from '@/components/Modal';

export default {
  name: 'Home',
  components: {
    Navigation,
    Modal,
  },
};
</script>

<style scoped>
.cat-button {
  margin-right: 10px;
}
</style>
