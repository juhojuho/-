<template>
  <div>
    <vue-gallery :images="images" :index="index" @close="index = null"></vue-gallery>
    <div
      class="image"
      v-for="(image, imageIndex) in images"
      :key="imageIndex"
      @click="index = imageIndex"
      :style="{ backgroundImage: 'url(' + image + ')', width: '150px', height: '100px' }"
    ></div>
  </div>
</template>

<script>
import VueGallery from 'vue-gallery';

export default {
  data() {
    return {
      images: [
        /* !!!! Need to access firebase DB !!!! */
      ],
      index: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    nearest() {
      return this.$store.state.nearest;
    },
  },
  components: {
    VueGallery,
  },
  watch: {
    nearest(val) {
      this.$db.ref(`/photos/${val}`).on('value', (snapshot) => {
        this.images = [];
        snapshot.forEach((childSnapshot) => {
          const photoUrl = childSnapshot.val().photoUrl;
          console.log(photoUrl);
          this.$storage.refFromURL(photoUrl).getMetadata().then((metadata) => {
            this.images.push(metadata.downloadURLs[0]);
          });
        });
      });
    },
  },
};
</script>

<style>
  .image {
    float: left;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: 1px solid #ebebeb;
    margin: 5px;
  }
  .image:hover {
    box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
  }
</style>
