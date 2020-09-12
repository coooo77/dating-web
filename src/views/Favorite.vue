<template>
  <div class="container mt-5">
    <h1>Favorite Page</h1>
    <hr class="my-4" />
    <div class="users row mt-5">
      <UserCard
        v-for="user in users"
        :key="user.id"
        :user="user"
        @afterChangeLiked="afterChangeLiked"
        @afterClickUser="afterClickUser"
      />
    </div>

    <Alert v-if="isNoFavoritedUser" :wrong="wrong" />

    <Spinner v-if="isLoading" />
  </div>
</template>

<script>
import Alert from "../components/Alert";
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
      wrong: {
        strong: "沒有任何喜愛的使用者!",
        text: "請在首頁點選愛心圖案將使用者加入到最愛中。",
      },
    };
  },
  components: {
    UserCard,
    Spinner,
    Alert,
  },
  methods: {
    async fetchAllUsers() {
      try {
        this.isLoading = true;
        const { data, status, statusText } = await usersAPI.get120Users();

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