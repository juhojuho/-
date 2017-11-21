<template>
  <nav class="level is-mobile" style="background-color: #00d1b2; padding: 20px;">
    <div class="level-left">
      <div class="level-item" style="font-size: 20px;" @click="$router.push('/')">
        <img style="height:50%;" src = "../assets/images/lanseon.jpg">
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <a v-if="user" class="button" @click="logout">로그아웃</a>
        <a v-if="!user" class="button" href="/login">로그인</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    logout() {
      this.$firebase.auth().signOut();
      this.$store.commit('setUser', '');
    },
  },
};
</script>
