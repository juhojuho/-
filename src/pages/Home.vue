<template>
  <div class="container">
    <navigation></navigation>
    <modal></modal>
    <p style="margin-bottom: 20px; font-size: 20px;">계신 곳에서 <b>{{ nearest }} 급식소</b>가 가장 가깝습니다.</p>
    <div style="border: solid 1px #6a6a6a; width: 90%; margin: auto; padding-top: 10px; padding-bottom: 10px;" >
    <h1>급식소 이슈들</h1>
    <issue v-for="(issue, index) in issues" :issue="issue" :key="index"></issue>
    </div>
    <a class="button is-primary is-large w-90 mb" style="margin-top: 20px;" href="/feeding">먹이주기 예약하기</a>
    <a class="button is-primary is-large w-90 mb" href="/cleaning">집청소 예약하기</a>
    <a class="button is-primary is-large w-90 mb" href="/buying">고양이 용품 구입하기</a>
    <a class="button is-primary is-large w-90 mb" href="/spot">둘러보기</a>
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
      latitude: '',
      longitude: '',
      center: '',
      nearest: '',
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
    /* ADDED for retrieving location lat, lng. */
    /* Modify success() method in order to add DB instruction */
    this.getLocation();
  },
  methods: {
    getLocation() {
      const geo = navigator.geolocation;
      if (geo === undefined) {
        console.log('No geolocation support');
      }
      geo.getCurrentPosition(this.success, this.error, { enableHighAccuracy: true });
    },
    success(position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.center = { lat: position.coords.latitude, lng: position.coords.longitude };
      this.setNearest();
      console.log(this.center);
      console.log(this.nearest);
    },
    error(ex) {
      console.log(ex.message);
    },
    setNearest() {
      const N1Dist = (this.latitude - 36.371399) ** 2 + (this.longitude - 127.358637)**2; // eslint-disable-line
      const W1Dist = (this.latitude - 36.367876) ** 2 + (this.longitude - 127.361914)**2; // eslint-disable-line
      const E1Dist = (this.latitude - 36.371455) ** 2 + (this.longitude - 127.364421)**2; // eslint-disable-line
      const E2Dist = (this.latitude - 36.369044) ** 2 + (this.longitude - 127.366264)**2; // eslint-disable-line
      const MinDist = Math.min(N1Dist, W1Dist, E1Dist, E2Dist);
      console.log(N1Dist);
      if (MinDist === N1Dist) {
        this.nearest = 'N1';
        this.$store.commit('setNearest', 2);
      } else if (MinDist === W1Dist) {
        this.nearest = 'W1';
        this.$store.commit('setNearest', 1);
      } else if (MinDist === E1Dist) {
        this.nearest = 'E1';
        this.$store.commit('setNearest', 4);
      } else if (MinDist === E2Dist) {
        this.nearest = 'E2';
        this.$store.commit('setNearest', 3);
      }
    },
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

h1 {
  font-size: 1.4em;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
