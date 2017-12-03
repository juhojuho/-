<template>
    <div class="container">
      <img style="width:80%;" src = "../assets/images/noname.jpg" v-on:click="open">
      <sweet-modal ref="modal" style="z-index:2">
        <sweet-modal-tab title="고양이 사진 찍기" id="tab1"> <cam></cam> </sweet-modal-tab>
        <sweet-modal-tab title="고양이 갤러리" id="tab2"> <gallery></gallery> </sweet-modal-tab>
        <sweet-modal-tab title="길고양이 급식소" id="tab3"> <geolocation></geolocation> </sweet-modal-tab>
      </sweet-modal>
    </div>
</template>

<script>
import { SweetModal, SweetModalTab } from 'sweet-modal-vue';
import Cam from '@/components/Cam';
import Geolocation from '@/components/Geolocation';
import Gallery from '@/components/Gallery';
import 'vue-awesome/icons/compass';
import 'vue-awesome/icons/map-marker';

export default {
  components: {
    Cam,
    Gallery,
    Geolocation,
    SweetModal,
    SweetModalTab,
  },
  methods: {
    open() {
      this.$refs.modal.open();
    },
  },
};
</script>

<style scoped>
    .cat-button {
        margin-right: 10px;
    }
</style>
