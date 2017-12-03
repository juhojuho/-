<template>
  <div class="container" style="text-align: center;">
    <navigation></navigation>
    <div class="field">
      <div class="control" style="text-align: center;">
        <input class="input is-primary w-90" v-model="query" type="text" placeholder="쇼핑하세여">
      </div>
    </div>
    <a class="button is-primary" @click="shopping" style="margin-bottom: 20px;">검색하기</a>
    <div v-for="(result, index) in results" :key="index">
      <div @click="move(result.link)" class="result">
        <img :src="result.image" class="photo">
        <span v-html="result.title" class="result-title"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';

export default {
  data() {
    return {
      query: '',
      results: [],
    };
  },
  methods: {
    shopping() {
      this.$axios.get(`https://us-central1-lanbutler-d72e6.cloudfunctions.net/searchNaver?q=${this.query}`).then((res) => {
        console.log(res.data);
        this.results = res.data.items;
      });
    },
    move(link) {
      location.assign(link);
    },
  },
  components: {
    Navigation,
  },
};
</script>

<style scoped>
.w-90 {
  width: 90%;
}

.result {
  width: 90%;
  margin: 0px auto 0px auto;
  text-align: left;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #6a6a6a;
}

.photo {
  width: 70px;
  height: 70px;
  object-fit: contain;
  vertical-align: middle;
}

.result-title {
  font-size: 16px;
  margin-left: 10px;
  display: inline-block;
  width: 70%;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
