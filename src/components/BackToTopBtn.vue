<template>
  <a @click.prevent="scrollToTop" class="back-top">
    <i class="far fa-arrow-alt-circle-up"></i>
  </a>
</template>

<script>
import $ from "jquery";

export default {
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    $(window).scroll(() => {
      if ($(window).scrollTop() >= 500) {
        $(".back-top").fadeIn();
      } else {
        $(".back-top").fadeOut();
      }
    });
  },
};
</script>

<style scoped>
.back-top {
  display: none;
  background: #5d807a;
  color: #fff;
  padding: 0.5rem 0.8rem;
  border-radius: 5px;
  position: fixed;
  bottom: 5%;
  right: 5%;
}
</style>