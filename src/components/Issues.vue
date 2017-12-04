<template>
  <div class="issues-container">
    <h1>이슈 등록하기</h1>
    <div class="select" style="width: 25%; display: inline-block;">
      <select v-model="issueOption">
        <option v-for="option in options">
          {{ option }}
        </option>
      </select>
    </div>
    <div class="field" style="width: 50%; display: inline-block; margin-right: 10px;">
      <div class="control">
        <input class="input is-primary" type="text" placeholder="무슨 일이에요?" v-model="issueDesc">
      </div>
    </div>
    <a class="button is-primary" @click="send">등록</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: ['먹이', '청소', '모금', '사고', '시체처리', '기타'],
      fundingOptions: ['중성화수술', '예방접종', '부상', '축의금', '출산보조금'],
      accOptions: ['부상', '고절', '고혈압', '당뇨병', '결투', '곤지름'],
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
        this.$db.ref('/issues').push({
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

<style scoped>
h1 {
  font-size: 1.4em;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
