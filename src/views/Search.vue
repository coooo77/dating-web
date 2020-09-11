<template>
  <div class="search">
    <Searchbar @after-submit="handleAfterSubmit" />
    <Alert v-if="isWrong" :wrong="wrongInformation" />
  </div>
</template>

<script>
import Searchbar from "../components/Searchbar";
import usersAPI from "../apis/users";
import Alert from "../components/Alert";

export default {
  created() {
    this.isWrong = true;
    this.wrongInformation = this.wrong.initialSearch;
    this.fetchAllUsers();
  },
  data() {
    return {
      searchResult: [],
      initialUsers: [],
      isWrong: false,
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
      },
      wrongInformation: {},
    };
  },
  components: {
    Searchbar,
    Alert,
  },
  methods: {
    handleAfterSubmit(formData) {
      this.isWrong = false;

      let query = {};
      for (let [name, value] of formData.entries()) {
        query[name] = value;
      }

      // 避免有使用者輸入錯誤的年齡範圍
      if (query["min-age"] > query["max-age"]) {
        this.isWrong = true;
        this.wrongInformation = this.wrong.wrongSearch;
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
        this.isWrong = true;
        this.wrongInformation = this.wrong.noResult;
      } else {
        this.searchResult = [...filteredUsers];
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
          }));

          this.initialUsers.forEach((user) => {
            user.isLiked = like.includes(user.id);
          });
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
  },
};
</script>