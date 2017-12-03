<template>
  <div>
    <div class="container">
      <img src="../assets/images/google-button.png" @click="signInWithGoogle" class="login-button">
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    signInWithGoogle() {
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$firebase.auth().signInWithRedirect(provider);
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.login-button {
  width: 149px;
  display: block;
  margin: 12px auto 0px auto;
}
</style>
