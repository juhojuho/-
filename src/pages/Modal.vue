<template>
    <div class="container">
        <navigation></navigation>
        <button class="button" v-on:click="open">Open modal</button>
        <sweet-modal ref="modal">
            MODAL
        </sweet-modal>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import { SweetModal, SweetModalTab } from 'sweet-modal-vue';

export default {
  components: {
    Navigation,
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
