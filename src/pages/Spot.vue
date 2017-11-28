<template>
  <div>
    <navigation></navigation>
    <kmap></kmap>
    <div v-if="sid" style="margin-bottom: 50px">
      <vue-event-calendar :events="events[Number(sid) - 1]"></vue-event-calendar>
    </div>
    <img v-for="url in photoUrls" :src="url" class="photo">
    <div class="field">
      <div class="control">
        <input class="input is-primary" v-model="query" type="text" placeholder="쇼핑하세여">
      </div>
    </div>
    <a class="button is-primary" @click="shopping">검색하기</a>
    <div v-for="result in results">
      <a :src="result.link">
        <img :src="result.image" style="width: 100px;"> {{ result.title }}
      </a>
    </div>
    <div class="file">
      <label class="file-label">
        <input class="file-input" type="file" @change="filesChange($event);">
        <span class="file-cta">
          <span class="file-icon">
            <i class="mdi mdi-upload"></i>
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
import Navigation from '@/components/Navigation';
import Comments from '@/components/Comments';
import Kmap from '@/components/Kmap';

export default {
  data() {
    return {
      events: [[], [], [], []],
      photoUrls: [],
      query: '',
      results: [],
    };
  },
  methods: {
    filesChange(event) {
      if (this.sid) {
        const file = event.target.files[0];
        this.$db.ref(`/photos/${this.sid}`).push({
          uid: this.user.uid,
          photoUrl: 'loading',
        }).then((data) => {
          const filePath = `${this.sid}/${data.key}`;
          return this.$storage.ref(filePath).put(file).then((snapshot) => {
            const fullPath = snapshot.metadata.fullPath;
            return data.update({ photoUrl: this.$storage.ref(fullPath).toString() });
          });
        });
      }
    },
    shopping() {
      console.log(this.query);
      this.$axios.get(`https://us-central1-lanbutler-d72e6.cloudfunctions.net/searchNaver?q=${this.query}`).then((res) => {
        this.results = res.data.items;
      });
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    sid() {
      return this.$store.state.sid;
    },
  },
  created() {
    this.$db.ref('/feeding').on('value', (snapshot) => {
      this.events = [[], [], [], []];
      snapshot.forEach((childSnapshot) => {
        const event = childSnapshot.val();
        if (event) {
          this.events[event.sid - 1].push(event);
        }
      });
    });
    this.$db.ref('/cleaning').on('value', (snapshot) => {
      this.events = [[], [], [], []];
      snapshot.forEach((childSnapshot) => {
        const event = childSnapshot.val();
        if (event) {
          this.events[event.sid - 1].push(event);
        }
      });
    });
  },
  watch: {
    sid(val) {
      this.$db.ref(`/photos/${val}`).on('value', (snapshot) => {
        this.photoUrls = [];
        snapshot.forEach((childSnapshot) => {
          const photoUrl = childSnapshot.val().photoUrl;
          this.$storage.refFromURL(photoUrl).getMetadata().then((metadata) => {
            this.photoUrls.push(metadata.downloadURLs[0]);
          });
        });
      });
    },
  },
  components: {
    Navigation,
    Comments,
    Kmap,
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

.photo {
  width: 100px;
}
</style>
