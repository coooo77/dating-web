<template>
  <div class="observer"></div>
</template>

<script>
export default {
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        // 告訴父層使用者已經拉到底部
        this.$emit("intersect", [this.observer, this.$el]);
      }
    });

    this.observer.observe(this.$el);
  },
  name: "observer",
};
</script>

<style scoped>
/* 給oberver一個體積才能監測 */
.observer {
  height: 1px;
}
</style>