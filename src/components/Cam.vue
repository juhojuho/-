<template>
  <div class="component">
    <webcam ref="webcam"></webcam>
    <!--img :src="this.img" style="width:500px;height:500px;" /-->
    <button class="button is-primary is-large" @click="photo">
      <icon name="paw" scale="2.5" @click="photo"></icon>
    </button>
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
  computed: {
    nearest() {
      return this.$store.state.nearest;
    },
    user() {
      return this.$store.state.user;
    },
  },
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
      if (this.nearest) {
        /* !!!! send this.img to firebase - picture taken from the usr !!!! */
        this.$db.ref(`/photos/${this.nearest}`).push({
          uid: this.user.uid,
          photoUrl: 'gs://lanbutler-d72e6.appspot.com/loading.jpg',
        }).then((data) => {
          const filePath = `${this.nearest}/${data.key}`;
          return this.$storage.ref(filePath).putString(this.img, 'data_url').then((snapshot) => {
            const fullPath = snapshot.metadata.fullPath;
            return data.update({ photoUrl: this.$storage.ref(fullPath).toString() });
          });
        });
      }
    },
    dialog() {
      const message = `<img src="${this.img}" style="width:200px;height:200px;"></img> <br> 귀여워 ? </br>`;

      const options = {
        html: true,
        okText: '카와이!',
        cancelText: '아니',
      };

      this.$dialog.confirm(message, options)
        .then(function() { // eslint-disable-line
          console.log('confirm');
        })
        .catch(function() { // eslint-disable-line
          console.log('error');
        });
    },
  },
  components: {
    Webcam,
    VuejsDialog,
  },
};
</script>
