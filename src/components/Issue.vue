<template>
  <div class="issue">
    <img :src="issue.profileUrl" class="round-profile">
    <div style="display: inline-block; vertical-align: middle; text-align: left; width: 75%;">
      <div class="nickname">
        <b>[
          <template v-if="issue.sid === 1">
            W1
          </template>
          <template v-else-if="issue.sid === 2">
            N1
          </template>
          <template v-else-if="issue.sid === 3">
            E2
          </template>
          <template v-else-if="issue.sid === 4">
            E1
          </template>
        ]급식소에서</b>
      </div>
      <div class="date">
        {{ issue.nickname }}님이 요청합니다.
      </div>
      <div class="content">
        {{ issue.desc }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['issue'],
};
</script>

<style scoped>
.round-profile {
  width: 55px;
  height: 55px;
  object-fit: cover;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
}

.issue {
  margin-bottom: 15px;
}

.nickname {
  display: inline-block;
  font-size: .9rem;
  color: #393939;
  font-weight: 500;
}

.date {
  display: inline-block;
  font-size: .9rem;
  font-weight: 400;
  margin-left: 0px;
}

.content {
  font-size: 1rem;
  font-weight: 400;
}

h1 {
  font-size: 1.4em;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
