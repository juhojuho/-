<template>
  <div class="container">
    <navigation></navigation>
    <kmap></kmap>
    <div v-if="sid" style="padding: 20px;">
      <div style="margin-bottom: 50px;">
        <vue-event-calendar :events="feedingEvents[Number(sid) - 1]"></vue-event-calendar>
      </div>
      <div class="select is-primary" style="width: 30%">
        <select v-model="feedingMonth" style="width: 100%">
          <option>달</option>
          <option v-for="month in 12" :key="month">
            {{ month }}
          </option>
        </select>
      </div>
      <div class="select is-primary" style="width: 30%">
        <select v-model="feedingDay" style="width: 100%">
          <option>날</option>
          <option v-for="day in 31" :key="day">
            {{ day }}
          </option>
        </select>
      </div>
      <div class="control" style="margin-top: 20px">
        <label class="radio">
          <input type="radio" value="아침" v-model="feedingTime" checked> 아침
        </label>
        <label class="radio">
          <input type="radio" value="저녁" v-model="feedingTime"> 저녁
        </label>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a class="button is-primary" @click="send">
          예약하기
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import Kmap from '@/components/Kmap';
import Geomap from '@/components/Geomap';

export default {
  created() {
    this.$db.ref('/feeding').on('value', (snapshot) => {
      this.feedingEvents = [[], [], [], []];
      snapshot.forEach((childSnapshot) => {
        const event = childSnapshot.val();
        if (event) {
          this.feedingEvents[event.sid - 1].push(event);
        }
      });
    });
  },
  data() {
    return {
      feedingMonth: '달',
      feedingDay: '날',
      feedingTime: '아침',
      feedingEvents: [[], [], [], []],
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
      this.$db.ref('/feeding').push({
        date: `2017/${this.feedingMonth}/${this.feedingDay}`,
        title: `[먹이] ${this.user.displayName}`,
        desc: `${this.feedingTime}`,
        sid: this.sid,
        uid: this.user.uid,
      });
    },
  },
  components: {
    Navigation,
    Kmap,
    Geomap,
  },
  mounted() {
    if (this.$route.query.sid) {
      this.$store.commit('setSid', this.$route.query.sid);
    }
  },
};
</script>

<style scoped>

</style>
