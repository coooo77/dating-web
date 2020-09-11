<template>
  <div class="search-bar bg-secondary d-flex justify-content-center shadow">
    <form id="search-form" class="form-inline" @submit.prevent="handleSearch">
      <div class="d-inline">
        <span>找</span>
        <select name="gender" v-model="gender">
          <option value selected disabled>--性別--</option>
          <option
            v-for="gender in genderOption"
            :value="gender.value"
            :key="gender.id"
          >{{gender.name}}</option>
        </select>
        <span>年齡從</span>
        <input
          type="number"
          max="100"
          min="18"
          name="min-age"
          placeholder="歲"
          class="d-inline"
          v-model="minAge"
        />
        <span>到</span>
        <input
          type="number"
          max="80"
          min="18"
          name="max-age"
          placeholder="歲"
          class="d-inline"
          v-model="maxAge"
        />
      </div>
      <div class="d-inline">
        <span>地區</span>
        <input type="text" name="location" placeholder="居住區域" v-model="location" />
        <span class="search-icon ml-2">
          <button type="submit" class="search-icon-btn">
            <i class="fas fa-search"></i>
          </button>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      genderOption: [
        {
          id: 1,
          name: "男性",
          value: "male",
        },
        {
          id: 2,
          name: "女性",
          value: "female",
        },
        {
          id: 3,
          name: "無限制",
          value: "",
        },
      ],
      gender: "",
      minAge: 18,
      maxAge: 80,
      location: "",
    };
  },
  methods: {
    handleSearch(e) {
      // 資料傳給父層search搜尋、顯示結果。
      const form = e.target;
      const formData = new FormData(form);
      this.$emit("after-submit", formData);
    },
  },
};
</script>

<style scoped>
.search-bar {
  min-height: 4rem;
}

@media only screen and (max-width: 600px) {
  #search-form div {
    width: 100%;
    text-align: center;
  }
}
</style>