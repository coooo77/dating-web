<template>
  <div class="search">
    <Searchbar @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import Searchbar from "../components/Searchbar";

export default {
  components: {
    Searchbar,
  },
  methods: {
    handleAfterSubmit(formData) {
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
    },
  },
};
</script>