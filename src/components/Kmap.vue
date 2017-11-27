<template>
  <div class="map-container">
    <img class="map" src="../assets/images/map.png">
    <div class="spot1" :class="{'active': sid === 1}" @click="$store.commit('setSid', 1)"></div>
    <div class="spot2" :class="{'active': sid === 2}" @click="$store.commit('setSid', 2)"></div>
    <div class="spot3" :class="{'active': sid === 3}" @click="$store.commit('setSid', 3)"></div>
    <div class="spot4" :class="{'active': sid === 4}" @click="$store.commit('setSid', 4)"></div>
  </div>
</template>

<script>
export default {
  computed: {
    sid() {
      return this.$store.state.sid;
    },
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
  bottom: 30px;
  left: 100px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #001b44;
}

.spot2 {
  position: absolute;
  bottom: 120px;
  left: 60px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #001b44;
}

.spot3 {
  position: absolute;
  bottom: 40px;
  left: 250px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #001b44;
}

.spot4 {
  position: absolute;
  bottom: 100px;
  left: 220px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #001b44;
}

.map {
  width: 100%;
}

.active {
  background-color: red;
}
</style>
