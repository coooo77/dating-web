<template>
  <div class="search">
    <Searchbar @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import Searchbar from "../components/Searchbar";
import usersAPI from "../apis/users";

export default {
  created() {
    this.fetchAllUsers();
  },
  data() {
    return {
      searchResult: [],
      initialUsers: [],
      isWrongSearch: false,
      isNoResult: false,
    };
  },
  components: {
    Searchbar,
  },
  methods: {
    handleAfterSubmit(formData) {
      this.isWrongSearch = false;
      this.isNoResult = false;

      let query = {};
      for (let [name, value] of formData.entries()) {
        query[name] = value;
      }

      // 避免有使用者輸入錯誤的年齡範圍
      if (query["min-age"] > query["max-age"]) {
        this.isWrongSearch = true;
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
        this.isNoResult = true;
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