const toggleLike = {
  methods: {
    afterChangeLiked(id) {
      this.users.forEach((user) => {
        if (user.id === id) user.isLiked = !user.isLiked;
      });
    },
  }
}

const passUserToModal = {
  methods: {
    afterClickUser(user) {
      this.$emit("passUserToModal", user);
    },
  }
}

export { toggleLike, passUserToModal }