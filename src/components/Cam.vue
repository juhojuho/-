<template>
  <div class="component">
    <webcam ref="webcam"></webcam>
    <!--img :src="this.img" style="width:500px;height:500px;" /-->
    <button class="button is-primary is-large" @click="photo"><icon name="paw" scale="2.5" @click="photo"></icon></button>
    <div id="dialog"></div>
  </div>
</template>

<script>
import Webcam from 'vue-web-cam/src/webcam';
import Vue from 'vue';
import VuejsDialog from 'vuejs-dialog';
import 'vue-awesome/icons/paw';

Vue.use(VuejsDialog);

export default {
  data() {
    return {
      img: null,
    };
  },
  methods: {
    photo() {
      this.img = this.$refs.webcam.capture();
      if (this.img !== null) {
        this.dialog();
      }
      /* !!!! send this.img to firebase - picture taken from the usr !!!! */
    },
    dialog() {
      const message = `고양이 사진 <img src="${this.img}"></img> <br> 지울까 ? </br>`;
      console.log(message);

      const options = {
        html: true,
        okText: '굿~',
        cancelText: '삭제',
      };

      this.$dialog.confirm(message, options)
        .then(function () { // eslint-disable-line
          console.log('hehe');
        })
        .catch(function () { // eslint-disable-line
          console.log('hihi');
        });
    },
  },
  components: {
    Webcam,
    VuejsDialog,
  },
};
</script>
