<template>
  <div class="container">
    <button v-for="(cat, index) in catList" :key="index" class="btn btn-primary cat-button" @click="$router.push(`/cat/${cat}`)">
      {{ cat }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      catList: ['냐옹이', '나비', '니체', '스피노자', '그네'],
    };
  },
};
</script>

<style scoped>
.cat-button {
  margin-right: 10px;
}
</style>
