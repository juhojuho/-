<template>
  <div class="container">
    <navigation></navigation>
    <kmap></kmap>
    <div v-if="sid" style="padding: 20px;">
      <div style="margin-bottom: 50px;">
        <vue-event-calendar :events="cleaningEvents[Number(sid) - 1]"></vue-event-calendar>
      </div>
      <div>
        <div class="select is-primary" style="width: 30%">
          <select v-model="cleaningMonth" style="width: 100%">
            <option>달</option>
            <option v-for="month in 12" :key="month">
              {{ month }}
            </option>
          </select>
        </div>
        <div class="select is-primary" style="width: 30%">
          <select v-model="cleaningDay" style="width: 100%">
            <option>날</option>
            <option v-for="day in 31" :key="day">
              {{ day }}
            </option>
          </select>
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <a class="button is-primary" @click="send">
            예약하기
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import Kmap from '@/components/Kmap';

export default {
  created() {
    this.$db.ref('/cleaning').on('value', (snapshot) => {
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
      cleaningMonth: '달',
      cleaningDay: '날',
      cleaningEvents: [[], [], [], []],
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
    },
  },
  components: {
    Navigation,
    Kmap,
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
