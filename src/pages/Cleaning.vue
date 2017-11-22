<template>
  <div>
    <navigation></navigation>
    <div class="map-container">
      <img class="map" src="../assets/images/map.png">
      <div class="spot1" :class="{'active': spotNum === 1}" @click="spotNum = 1"></div>
    </div>
    <div v-if="spotNum" style="margin-bottom: 50px">
      <vue-event-calendar :events="cleaningEvents[Number(spotNum) - 1]"></vue-event-calendar>
    </div>
    <div v-if="spotNum">
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

export default {
  created() {
    this.$db.ref('/cleaning').once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const event = childSnapshot.val();
        if (this.cleaningEvents[event.sid - 1]) {
          this.cleaningEvents[event.sid - 1].push(event);
        } else {
          this.cleaningEvents[event.sid - 1] = [];
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
  },
  methods: {
    send() {
      this.$db.ref('/cleaning').push({
        date: `2017/${this.cleaningMonth}/${this.cleaningDay}`,
        title: `[먹이주기] ${this.user.displayName}`,
        sid: this.spotNum,
      });
      location.reload();
    },
  },
  components: {
    Navigation,
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
