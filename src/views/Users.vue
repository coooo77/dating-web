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
        // 設計120位使用者，每次只存取24個使用者
        if (this.currentPage + 1 === 5) {
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