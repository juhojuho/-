<template>
  <div>
    <div class="map-container">
      <img class="map" src="../assets/images/map.png">
      <div class="spot1" :class="{'active': spotNum === 1}" @click="spotNum = 1; $store.commit('setSid', 1)"></div>
    </div>
    <div v-if="spotNum" style="margin-bottom: 50px">
      <vue-event-calendar :events="events[Number(spotNum) - 1]"></vue-event-calendar>
    </div>
    <div class="file">
      <label class="file-label">
        <input class="file-input" type="file" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length">
        <span class="file-cta">
          <span class="file-icon">
            <i class="fa fa-upload"></i>
          </span>
          <span class="file-label">
            고양이 사진을 업로드하세요
          </span>
        </span>
      </label>
    </div>
    <comments></comments>
  </div>
</template>

<script>
import Comments from '@/components/Comments';

export default {
  data() {
    return {
      spotNum: 0,
      uploadFiles: [],

      events: [],
    };
  },
  created() {
    this.$db.ref('/feeding').once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const event = childSnapshot.val();
        if (this.events[event.sid - 1]) {
          this.events[event.sid - 1].push(event);
        } else {
          this.events[event.sid - 1] = [];
          this.events[event.sid - 1].push(event);
        }
      });
    });
    this.$db.ref('/cleaning').once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const event = childSnapshot.val();
        if (this.events[event.sid - 1]) {
          this.events[event.sid - 1].push(event);
        } else {
          this.events[event.sid - 1] = [];
          this.events[event.sid - 1].push(event);
        }
      });
    });
  },
  components: {
    Comments,
  },
};
</script>

<style scoped>
.map-container {
  position: relative;
  margin: auto;
  width: 300px;
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
  width: 100%;
}
</style>