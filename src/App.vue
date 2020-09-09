<template>
  <div id="app">
    <Navbar />
    <main>
      <router-view @passUserToModal="passUserToModal" />
    </main>
    <Modal :modalUser="modalUser" />
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../src/components/Navbar";
import Modal from "..//src/components/Modal.vue";

export default {
  components: {
    Navbar,
    Modal,
  },
  created() {
    // 用sessionStorage當作資料庫紀錄喜歡的使用者id
    const liked = JSON.parse(sessionStorage.getItem("like"));
    if (!liked) sessionStorage.setItem("like", "[]");
  },
  data() {
    return {
      modalUser: {
        isLiked: false,
        id: -1,
        gender: "",
        name: {
          title: "",
          first: "",
          last: "",
        },
        location: {
          street: {
            number: -1,
            name: "",
          },
          city: "",
          state: "",
          country: "",
          postcode: -1,
          coordinates: {
            latitude: "",
            longitude: "",
          },
          timezone: {
            offset: "",
            description: "",
          },
        },
        email: "",
        picture: {
          large: "",
          medium: "",
          thumbnail: "",
        },
        dob: {
          date: "",
          age: -1,
        },
      },
    };
  },
  methods: {
    passUserToModal(user) {
      this.modalUser = user;
    },
  },
};
</script>

<style>
:root {
  font-size: 16px;
  font-family: "Open Sans";
  --text-primary: #b6b6b6;
  --text-secondary: #ececec;
  --bg-primary: #23232e;
  --bg-secondary: #141418;
  --transition-speed: 600ms;
}

/* customize scroll bar */
body::-webkit-scrollbar {
  width: 0.25rem;
}

body::-webkit-scrollbar-track {
  background: #1e1e24;
}

body::-webkit-scrollbar-thumb {
  background: #6649b8;
}

.dark {
  --text-primary: #b6b6b6;
  --text-secondary: #ececec;
  --bg-primary: #23232e;
  --bg-secondary: #141418;
}

.light {
  --text-primary: #576e75;
  --text-secondary: #35535c;
  --bg-primary: #fdf6e3;
  --bg-secondary: #f5e5b8;
}

@media only screen and (max-width: 600px) {
  main {
    margin: auto;
    margin-bottom: 5rem;
  }
}

@media only screen and (min-width: 600px) {
  main {
    margin: auto;
    margin-left: 5rem;
  }
}
</style>