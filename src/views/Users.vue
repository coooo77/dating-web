<template>
  <div class="container border border-danger">
    <h1>Users Page</h1>

    <div class="users row">
      <UserCard
        v-for="user in users"
        :key="user.id"
        :user="user"
        @afterChangeLiked="afterChangeLiked"
        @afterClickUser="afterClickUser"
      />
    </div>
  </div>
</template>

<script>
import UserCard from "../components/UserCard.vue";
import usersAPI from "../apis/users";

export default {
  data() {
    return {
      users: [],
      initialUser: [],
      offset: 24,
    };
  },
  components: {
    UserCard,
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const { data, status, statusText } = await usersAPI.get200Users();

        if (status !== 200) {
          throw new Error(statusText);
        }
        // 補上資料內沒有的id、isLiked、name
        const like = JSON.parse(sessionStorage.getItem("like"));
        this.initialUser = data.results.map((user, index) => ({
          ...user,
          id: index + 1,
          isLiked: like.includes(index + 1),
          name: Object.values(user.name).splice(1, 2).join(" "),
        }));

        this.users = this.initialUser.slice(0, this.offset);
      } catch (error) {
        console.error;
      }
    },
    afterChangeLiked(id) {
      this.users.forEach((user) => {
        if (user.id === id) user.isLiked = !user.isLiked;
      });
    },
    afterClickUser(user) {
      this.$emit("passUserToModal", user);
    },
  },
  name: "View-Users",
};
</script>

<style scoped>
.card {
  width: 15rem;
  border-radius: 1rem;
  border: 2px solid rgb(223, 223, 223);
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

@media only screen and (max-width: 600px) {
  .users {
    margin: auto;
    margin-bottom: 5rem;
  }
}

@media only screen and (min-width: 600px) {
  .users {
    margin: auto;
    margin-left: 5rem;
  }
}
</style>