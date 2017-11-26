/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
<template>
  <div class="container">
    <navigation></navigation>
    <div class="map-container">
      <img class="map" src="../assets/images/map.png">
      <div class="spot1" :class="{'active': spotNum === 1}" @click="spotNum = 1; $store.commit('setSid', 1)"></div>
    </div>
    <div v-if="spotNum" style="margin-bottom: 50px">
      <vue-event-calendar :events="cleaningEvents[Number(spotNum) - 1]"></vue-event-calendar>
    </div>
    <div v-if="spotNum">
      <div class="select is-primary">
        <select v-model="feedingMonth">
          <option>달을 선택하세요</option>
          <option v-for="month in 12" :key="month">
            {{ month }}
          </option>
        </select>
      </div>
      <div class="select is-primary">
        <select v-model="feedingDay">
          <option>날을 선택하세요</option>
          <option v-for="day in 31" :key="day">
            {{ day }}
          </option>
        </select>
      </div>
      <div class="select is-primary">
        <select v-model="feedingHour">
          <option>시간을 선택하세요</option>
          <option v-for="time in 12" :key="time">
            {{ time }}
          </option>
        </select>
      </div>
      <div class="control">
        <label class="radio">
          <input type="radio" value="오전" v-model="feedingTime" checked> 오전
        </label>
        <label class="radio">
          <input type="radio" value="오후" v-model="feedingTime"> 오후
        </label>
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
    this.$db.ref('/feeding').once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const event = childSnapshot.val();
        if (this.cleaningEvents[event.sid - 1]) {
          this.cleaningEvents[event.sid - 1].push(event);
        } else {
          this.cleaningEvents[event.sid - 1] = [];
          this.cleaningEvents[event.sid - 1].push(event);
        }
      });
      console.log(this.cleaningEvents);
    });
  },
  data() {
    return {
      feedingMonth: '달을 선택하세요',
      feedingDay: '날을 선택하세요',
      feedingHour: '시간을 선택하세요',
      feedingTime: '오전',
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
      this.$db.ref('/feeding').push({
        date: `2017/${this.feedingMonth}/${this.feedingDay}`,
        title: `[청소] ${this.user.displayName}`,
        desc: `${this.feedingTime} ${this.feedingHour}`,
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