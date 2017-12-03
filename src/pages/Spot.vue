<template>
  <div>
    <navigation></navigation>
    <kmap></kmap>
    <div v-show="sid" style="padding: 20px;">
      <div>
        <h1>냥이사진</h1>
        <div class="file" style="margin-bottom: 10px; display: inline-block;">
          <label class="file-label">
            <input class="file-input" type="file" @change="filesChange($event);">
            <span class="file-cta">
              <span class="file-icon">
                <i class="mdi mdi-upload"></i>
              </span>
              <span class="file-label">
                업로드
              </span>
            </span>
          </label>
        </div>
      </div>
      <img v-for="(url, index) in photoUrls" :src="url" :key="index" class="photo">
      <issues></issues>
      <comments></comments>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import Comments from '@/components/Comments';
import Kmap from '@/components/Kmap';
import Issues from '@/components/Issues';

export default {
  data() {
    return {
      events: [[], [], [], []],
      photoUrls: [],
    };
  },
  methods: {
    filesChange(event) {
      if (this.sid) {
        const file = event.target.files[0];
        this.$db.ref(`/photos/${this.sid}`).push({
          uid: this.user.uid,
          photoUrl: 'gs://lanbutler-d72e6.appspot.com/loading.jpg',
        }).then((data) => {
          const filePath = `${this.sid}/${data.key}`;
          return this.$storage.ref(filePath).put(file).then((snapshot) => {
            const fullPath = snapshot.metadata.fullPath;
            return data.update({ photoUrl: this.$storage.ref(fullPath).toString() });
          });
        });
      }
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
  watch: {
    sid(val) {
      this.$db.ref(`/photos/${val}`).on('value', (snapshot) => {
        this.photoUrls = [];
        snapshot.forEach((childSnapshot) => {
          const photoUrl = childSnapshot.val().photoUrl;
          console.log(photoUrl);
          this.$storage.refFromURL(photoUrl).getMetadata().then((metadata) => {
            this.photoUrls.push(metadata.downloadURLs[0]);
          });
        });
      });
      /*
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
        snapshot.forEach((childSnapshot) => {
          const event = childSnapshot.val();
          if (event) {
            this.events[event.sid - 1].push(event);
          }
        });
      });
      */
    },

  },
  components: {
    Navigation,
    Comments,
    Kmap,
    Issues,
  },
  mounted() {
    if (this.$route.query.sid) {
      this.$store.commit('setSid', this.$route.query.sid);
    }
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
  height: 100px;
  object-fit: contain;
}

h1 {
  display: inline-block;
  margin-right: 15px;
  font-size: 1.4em;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
