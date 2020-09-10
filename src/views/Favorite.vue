<template>
  <div class="container border border-danger">
    <h1>Favorite Page</h1>
    <div class="users row">
      <UserCard
        v-for="user in users"
        :key="user.id"
        :user="user"
        @afterChangeLiked="afterChangeLiked"
        @afterClickUser="afterClickUser"
      />
    </div>

    <div class="bg-info text-center my-5" v-if="isNoFavoritedUser">
      <strong>沒有任何喜愛的使用者！</strong>請在首頁點選愛心圖案將使用者加入到最愛中。
    </div>

    <Spinner v-if="isLoading" />
  </div>
</template>

<script>
import Spinner from "../components/Spinner";
import UserCard from "../components/UserCard.vue";
import usersAPI from "../apis/users";

export default {
  created() {
    this.fetchAllUsers();
  },
  data() {
    return {
      initialUsers: [],
      users: [],
      isLoading: false,
      isNoFavoritedUser: false,
    };
  },
  components: {
    UserCard,
    Spinner,
  },
  methods: {
    async fetchAllUsers() {
      try {
        this.isLoading = true;
        const { data, status, statusText } = await usersAPI.get240Users();

        if (status !== 200) {
          throw new Error(statusText);
        }
        const like = JSON.parse(sessionStorage.getItem("like"));
        this.initialUsers = data.results.map((user, index) => ({
          ...user,
          id: index + 1,
          isLiked: like.includes(index + 1),
          name: Object.values(user.name).splice(1, 2).join(" "),
        }));

        this.users = this.initialUsers.filter((user) => user.isLiked);

        if (this.users.length === 0) this.isNoFavoritedUser = true;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.error(error);
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
};
</script>

<style scoped>
.bg-info {
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
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