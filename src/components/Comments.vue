<template>
  <div class="comments-container">
    <div class="field">
      <div class="control">
        <input class="input is-primary" type="text" v-model="newComment" placeholder="댓글을 입력해 주세요.">
      </div>
    </div>
    <div class="button" @click="addComment">
      댓글달기
    </div>
    <div v-for="(comment, index) in comments" :key="index" class="comment">
      <img class="round-profile" :src="comment.profileUrl">
      <div style="display: inline-block; vertical-align: middle;">
        <div class="nickname">
          {{ comment.nickname }}
        </div>
        <div class="date">
          {{ comment.date }}
        </div>
        <span v-if="comment.uid === user.uid" class="icon is-medium" @click="deleteComment(comment.cid)">
          <i class="mdi mdi-24px mdi-delete"></i>
        </span>
        <div class="content">
          {{ comment.content }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { computeTimestamp } from '@/assets/js/time';

export default {
  data() {
    return {
      newComment: '',
      comments: [],
    };
  },
  computed: {
    sid() {
      return this.$store.state.sid;
    },
    user() {
      return this.$store.state.user;
    },
  },
  watch: {
    sid(val) {
      this.comments = [];
      this.$db.ref(`/comments/${val}`).orderByChild('timestamp').on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const comment = childSnapshot.val();
          if (comment) {
            comment.date = computeTimestamp(comment.timestamp);
            comment.cid = childSnapshot.key;
            this.comments.unshift(comment);
          }
        });
      });
    },
  },
  methods: {
    addComment() {
      if (this.user) {
        this.$db.ref(`comments/${this.sid}`).push({
          nickname: this.user.displayName,
          profileUrl: this.user.photoURL,
          content: this.newComment,
          uid: this.user.uid,
          timestamp: this.$firebase.database.ServerValue.TIMESTAMP,
        });
      } else {
        this.$router.push('/login');
      }
    },
    deleteComment(cid) {
      this.$db.ref(`comments/${this.sid}/${cid}`).set(null);
    },
  },
};
</script>

<style scoped>
.round-profile {
  width: 55px;
  height: 55px;
  object-fit: cover;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 24px;
}

.nickname {
  display: inline-block;
  font-size: 1.2rem;
  color: #393939;
  font-weight: 500;
}

.date {
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 400;
  color: #6a6a6a;
  margin-left: 6px;
  margin-right: 20px;
}

.content {
  font-size: 1.3rem;
  font-weight: 400;
}
</style>
