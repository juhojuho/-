<template>
  <div class="container">
    <navigation></navigation>
    <modal></modal>
    <a class="button is-primary is-large w-90 mb" style="margin-top: 60px;" href="/feeding">먹이주기 예약하기</a>
    <a class="button is-primary is-large w-90 mb" href="/cleaning">집청소 예약하기</a>
    <a class="button is-primary is-large w-90 mb" href="/spot">둘러보기</a>
    <issue v-for="issue in issues"></issue>
  </div>
</template>

<script >
import Navigation from '@/components/Navigation';
import Modal from '@/components/Modal';
import Issue from '@/components/Issue';

export default {
  data() {
    return {
      issues: [],
    };
  },
  name: 'Home',
  components: {
    Navigation,
    Modal,
    Issue,
  },
  created() {
    this.$db.ref('/issues').once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.val());
        this.issues.push(childSnapshot.val());
      });
    });
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
