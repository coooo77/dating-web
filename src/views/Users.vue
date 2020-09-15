<template>
  <div class="home">
    <Jumbotron />
    <div class="container mt-5">
      <div class="users row mt-5">
        <UserCard
          v-for="user in users"
          :key="user.id"
          :user="user"
          @afterChangeLiked="afterChangeLiked"
          @afterClickUser="afterClickUser"
        />
      </div>

      <Spinner v-if="isLoading" />
      <Alert v-if="isAllLoaded" :wrong="wrong" />

      <Observer @intersect="intersected" :isAllLoaded="isAllLoaded" />
    </div>
  </div>
</template>

<script>
import Jumbotron from "../components/jumbotron";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import Observer from "../components/Observer";
import UserCard from "../components/UserCard.vue";
import usersAPI from "../apis/users";
import { toggleLike, passUserToModal } from "../utils/mixins";
import { Toast } from "../utils/helper";

export default {
  created() {
    this.fetchAllUsers();
  },
  data() {
    return {
      users: [],
      initialUsers: [],
      offset: 12,
      currentPage: 0,
      isAllLoaded: false,
      isLoading: false,
      wrong: {
        strong: "已經到頁底!",
        text: "所有使用者已經顯示完畢。",
      },
    };
  },
  components: {
    UserCard,
    Observer,
    Spinner,
    Alert,
    Jumbotron,
  },
  methods: {
    async fetchAllUsers() {
      try {
        this.isLoading = true;
        const like = JSON.parse(sessionStorage.getItem("like"));
        // 因為CORS，所以要執行到有資料為止
        while (this.initialUsers.length === 0) {
          const { data, status, statusText } = await usersAPI.get120Users();

          if (status !== 200) {
            throw new Error(statusText);
          }

          this.initialUsers = data.results.map((user, index) => ({
            ...user,
            id: index + 1,
            name: Object.values(user.name).splice(1, 2).join(" "),
            isLiked: like.includes(index + 1),
          }));

          const users = this.initialUsers.splice(0, this.offset);

          this.users.push(...users);
          this.isLoading = false;
        }
      } catch (error) {
        console.error(error);
        Toast.fire({
          icon: "error",
          title: "伺服器忙碌中，請稍後再試",
        });
      }
    },
    async fetchUser() {
      try {
        // 設計120位使用者，每次只存取12個使用者
        if (this.currentPage + 1 === 10) {
          this.isAllLoaded = true;
          this.isLoading = false;
          return;
        }
        const users = this.initialUsers.splice(0, this.offset);

        this.users.push(...users);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.error;
        Toast.fire({
          icon: "error",
          title: "伺服器忙碌中，請稍後再試",
        });
      }
    },
    intersected([observer, element]) {
      console.log(`current page：${++this.currentPage}`);
      if (this.isAllLoaded) {
        // 如果所有資料都已經取出來了，就解除監視器
        observer.unobserve(element);
      } else {
        this.isLoading = true;
        setTimeout(() => {
          this.fetchUser();
        }, 500);
      }
    },
  },
  mixins: [toggleLike, passUserToModal],
  name: "View-Users",
};
</script>