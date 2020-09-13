<template>
  <div class="col-6 col-lg-4 col-xl-3 mb-4">
    <div class="card">
      <div class="like" @click="changeLike(user)">
        <i class="fas fa-heart" v-if="user.isLiked"></i>
        <i class="far fa-heart" v-else></i>
      </div>
      <img class="card-img-top" src="https://picsum.photos/350/100?random=0" alt="Card image cap" />
      <div class="card-body" data-toggle="modal" data-target="#modal" @click="clickUser(user)">
        <img :src="user.picture.large" alt class="avatar" />
        <h5 class="card-title">
          {{user.name}}
          <i class="fas fa-venus text-danger" v-if="user.gender === 'female'"></i>
          <i class="fas fa-mars text-primary" v-else></i>
        </h5>
        <p
          class="card-text"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae enim sapien. Nam porta risus sem, sit amet pharetra justo vestibulum id. Nulla in eleifend urna, at porta tellus.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changeLike(user) {
      const likedUsers = JSON.parse(sessionStorage.getItem("like"));

      if (likedUsers.includes(user.id)) {
        likedUsers.splice(likedUsers.indexOf(user.id), 1);
      } else {
        likedUsers.push(user.id);
      }
      sessionStorage.setItem("like", JSON.stringify(likedUsers));

      this.$emit("afterChangeLiked", user.id);
    },
    clickUser(user) {
      this.$emit("afterClickUser", user);
    },
  },
};
</script>

<style scoped>
.card {
  width: 15rem;
  border-radius: 1rem;
  border: 2px solid rgb(223, 223, 223);
  background-color: var(--bg-tertiary);
  color: var(--text-tertiary);
}

.card-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-body:hover,
.like:hover {
  cursor: pointer;
}

.card-body h5 {
  margin-top: 2rem;
  line-height: 2rem;
}

img.card-img-top {
  height: 10rem;
  border-radius: 1rem 1rem 0 0;
}

.like {
  position: absolute;
  right: 0;
  margin: 1rem 1rem 0 0;
}

.like i {
  font-size: 1.5rem;
  color: rgb(223, 16, 16);
}

.avatar {
  width: 10rem;
  border-radius: 50%;
  border: solid white 7px;
  position: absolute;
  top: 3rem;
}
</style>