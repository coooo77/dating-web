<template>
  <div class="container mt-5">
    <h1>Users Page</h1>

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
</template>

<script>
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import Observer from "../components/Observer";
import UserCard from "../components/UserCard.vue";
import usersAPI from "../apis/users";

export default {
  data() {
    return {
      users: [],
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
  },
  methods: {
    async fetchUser() {
      try {
        this.isLoading = true;
        // 設計120位使用者，每次只存取12個使用者
        if (this.currentPage + 1 === 10) {
          this.isAllLoaded = true;
          this.isLoading = false;
          return;
        }
        // [page 1] 1~12 ,[2] 13~24 ,[3] 25~36  ... 製作id
        const currentPage = Array.from(
          { length: 12 },
          (value, index) => index + 1 + this.currentPage * 12
        );
        const { data, status, statusText } = await usersAPI.get12Users({
          page: ++this.currentPage,
        });

        if (status !== 200) {
          throw new Error(statusText);
        }

        // 補上資料內沒有的id、isLiked、name
        const like = JSON.parse(sessionStorage.getItem("like"));
        const users = data.results.map((user, index) => ({
          ...user,
          id: currentPage[index],
          isLiked: like.includes(currentPage[index]),
          name: Object.values(user.name).splice(1, 2).join(" "),
        }));

        this.users.push(...users);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
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
    intersected([observer, element]) {
      console.log(`current page：${this.currentPage + 1}`);
      if (this.isAllLoaded) {
        // 如果所有資料都已經取出來了，就解除監視器
        observer.unobserve(element);
      } else {
        this.fetchUser();
      }
    },
  },
  name: "View-Users",
};
</script>