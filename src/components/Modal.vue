<template>
    <div class="container">
      <img style="width:100%;" src = "../assets/images/noname.jpg" v-on:click="open">
      <sweet-modal ref="modal">
        <sweet-modal-tab title="Tab 1" id="tab1"> <geo-cam></geo-cam> </sweet-modal-tab>
        <sweet-modal-tab title="Tab 2" id="tab2"> 22222222222222222222 </sweet-modal-tab>
        <sweet-modal-tab title="Tab 3" id="tab3"> <geolocation></geolocation> </sweet-modal-tab>
      </sweet-modal>
    </div>
</template>

<script>
import { SweetModal, SweetModalTab } from 'sweet-modal-vue';
import GeoCam from '@/components/GeoCam';
import Geolocation from '@/components/Geolocation';
import 'vue-awesome/icons/compass';
import 'vue-awesome/icons/map-marker';

export default {
  components: {
    GeoCam,
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
