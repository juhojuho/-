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
        'https://static.pexels.com/photos/20787/pexels-photo.jpg',
        'https://i.pinimg.com/736x/c3/0e/9b/c30e9bbaef3532e9b5b8964024f25a71--princess-cat-princess-aurora.jpg',
        'http://www.catster.com/wp-content/uploads/2017/06/small-kitten-meowing.jpg',
        'http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg',
      ],
      index: null,
    };
  },

  components: {
    VueGallery,
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
