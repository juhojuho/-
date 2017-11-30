<template>
  <div class="issues-container">
    <div class="select">
      <select v-model="issueOption">
        <option v-for="option in options">
          {{ option }}
        </option>
      </select>
    </div>
    <div class="field">
      <div class="control">
        <input class="input is-primary" type="text" placeholder="무슨 일이에요? 많이 놀랐죠?" v-model="issueDesc">
      </div>
    </div>
    <a class="button is-primary" @click="send">Primary</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: ['먹이', '청소', '모금'],
      issueOption: '먹이',
      issueDesc: '',
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    sid() {
      return this.$store.state.sid;
    },
  },
  methods: {
    send() {
      if (this.sid) {
        this.$db.ref(`/issues/${this.sid}`).push({
          option: this.issueOption,
          desc: this.issueDesc,
          uid: this.user.uid,
          nickname: this.user.displayName,
          timestamp: this.$firebase.database.ServerValue.TIMESTAMP,
          profileUrl: this.user.photoURL,
          sid: this.sid,
        });
      }
    },
  },
};
</script>
