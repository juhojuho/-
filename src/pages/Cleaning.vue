<template>
  <div>
    <navigation></navigation>
    <kmap></kmap>
    <div v-if="sid" style="margin-bottom: 50px">
      <vue-event-calendar :events="cleaningEvents[Number(spotNum) - 1]"></vue-event-calendar>
    </div>
    <div v-if="sid">
      <div class="select is-primary">
        <select v-model="cleaningMonth">
          <option>달을 선택하세요</option>
          <option v-for="month in 12" :key="month">
            {{ month }}
          </option>
        </select>
      </div>
      <div class="select is-primary">
        <select v-model="cleaningDay">
          <option>날을 선택하세요</option>
          <option v-for="day in 31" :key="day">
            {{ day }}
          </option>
        </select>
      </div>
      <a class="button is-primary" @click="send">
        예약하기
      </a>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import Kmap from '@/components/Kmap';

export default {
  created() {
    this.$db.ref('/cleaning').once('value').then((snapshot) => {
      this.cleaningEvents = [[], [], [], []];
      snapshot.forEach((childSnapshot) => {
        const event = childSnapshot.val();
        if (event) {
          this.cleaningEvents[event.sid - 1].push(event);
        }
      });
    });
  },
  data() {
    return {
      cleaningMonth: '달을 선택하세요',
      cleaningDay: '날을 선택하세요',
      spotNum: 0,
      cleaningEvents: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    sid() {
      return this.$store.state.sid;
    },
  },
  methods: {
    send() {
      this.$db.ref('/cleaning').push({
        date: `2017/${this.cleaningMonth}/${this.cleaningDay}`,
        title: `[청소] ${this.user.displayName}`,
        sid: this.sid,
        uid: this.user.uid,
      });
      location.reload();
    },
  },
  components: {
    Navigation,
    Kmap,
  },
};
</script>

<style scoped>
.container {}

.map-container {
  position: relative;
  margin: auto;
  width: 500px;
}

.spot1 {
  position: absolute;
  bottom: 105px;
  left: 188px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #001b44;
}

.active {
  background-color: red;
}

.map {
  width: 500px;
}
</style>
