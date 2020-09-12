<template>
  <div class="search">
    <Searchbar @after-submit="handleAfterSubmit" />
    <Alert v-if="state.isWrong" :wrong="wrongInformation" />
    <div class="container mt-5">
      <div class="users row">
        <UserCard
          v-for="user in users"
          :key="user.id"
          :user="user"
          @afterChangeLiked="afterChangeLiked"
          @afterClickUser="afterClickUser"
        />
      </div>
      <Alert v-if="state.isAllLoaded && !state.isInitial" :wrong="wrong.allLoad" />
    </div>

    <Spinner v-if="state.isLoading" />
    <Observer @intersect="intersected" :isAllLoaded="state.isAllLoaded" />
  </div>
</template>

<script>
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import Observer from "../components/Observer";
import Searchbar from "../components/Searchbar";
import UserCard from "../components/UserCard.vue";
import usersAPI from "../apis/users";

export default {
  created() {
    this.state.isWrong = true;
    this.wrongInformation = this.wrong.initialSearch;
    this.fetchAllUsers();
  },
  data() {
    return {
      searchResult: [],
      initialUsers: [],
      users: [],
      offset: 12,
      state: {
        isWrong: false,
        isLoading: false,
        isAllLoaded: false,
        isInitial: true,
      },
      wrong: {
        initialSearch: {
          strong: "請輸入設定！",
          text: "尋找理想的好友！",
        },
        wrongSearch: {
          strong: "發生錯誤",
          text: "請重新搜尋！",
        },
        noResult: {
          strong: "沒有任何符合的資料",
          text: "請重新搜尋！",
        },
        allLoad: {
          strong: "已經到頁底!",
          text: "所有使用者已經顯示完畢。",
        },
      },
      wrongInformation: {},
    };
  },
  components: {
    Searchbar,
    Alert,
    Spinner,
    Observer,
    UserCard,
  },
  methods: {
    handleAfterSubmit(formData) {
      this.state.isWrong = false;
      this.state.isInitial = false;
      this.state.isAllLoaded = false;

      let query = {};
      for (let [name, value] of formData.entries()) {
        query[name] = value;
      }

      // 避免有使用者輸入錯誤的年齡範圍
      if (query["min-age"] > query["max-age"]) {
        this.state.isWrong = true;
        this.state.isInitial = true;
        this.wrongInformation = this.wrong.wrongSearch;
        this.users = [];
        return;
      }

      const filteredUsers = this.filterUsers(
        this.initialUsers,
        query["min-age"],
        query["max-age"],
        query.gender,
        query.location
      );

      if (filteredUsers.length === 0) {
        this.state.isWrong = true;
        this.wrongInformation = this.wrong.noResult;
      } else {
        this.searchResult = [...filteredUsers];
        this.users = this.searchResult.splice(0, this.offset);
        if (this.searchResult.length === 0) this.state.isAllLoaded = true;
      }
    },
    async fetchAllUsers() {
      try {
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
        }
      } catch (error) {
        console.error(error);
      }
    },
    filterUsers(users, min, max, gender, location) {
      let data = users.filter(
        (user) => user.dob.age <= max && user.dob.age >= min
      );

      if (gender) {
        data = data.filter((user) => user.gender === gender);
      }

      if (location.trim()) {
        data = data.filter((user) => {
          const queryLocation = new RegExp(location.trim(), "i");
          return queryLocation.test(user.location.city);
        });
      }

      return data;
    },
    fetchMoreUser() {
      this.state.isLoading = true;
      const newUsers = this.searchResult.splice(0, this.offset);
      if (newUsers.length === 0) {
        this.state.isAllLoaded = true;
      } else {
        this.users.push(...newUsers);
      }
      this.state.isLoading = false;
    },
    intersected() {
      // 因為會有重複搜尋的情況，所以不解除observer
      this.fetchMoreUser();
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