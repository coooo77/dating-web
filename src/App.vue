<template>
  <div id="app">
    <Navbar :themeMap="themeMap" />
    <main>
      <router-view @passUserToModal="passUserToModal" />
    </main>

    <BackToTopBtn />
    <Modal :modalUser="modalUser" />
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../src/components/Navbar";
import Modal from "..//src/components/Modal.vue";
import BackToTopBtn from "../src/components/BackToTopBtn";

export default {
  components: {
    Navbar,
    Modal,
    BackToTopBtn,
  },
  created() {
    // 用sessionStorage當作資料庫紀錄喜歡的使用者id
    const liked = JSON.parse(sessionStorage.getItem("like"));
    if (!liked) sessionStorage.setItem("like", "[]");

    // 記錄使用者用什麼mode瀏覽網站
    const themeMap = this.themeMap;
    const theme =
      sessionStorage.getItem("theme") ||
      (sessionStorage.setItem("theme", Object.keys(themeMap)[0]),
      Object.keys(themeMap)[0]);
    const bodyClass = document.body.classList;
    bodyClass.add(theme);
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
      themeMap: {
        dark: "light",
        light: "dark",
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
  --text-tertiary: #85806c;
  --bg-primary: #23232e;
  --bg-secondary: #141418;
  --bg-tertiary: #272731;
  --transition-speed: 600ms;
}
/* 
  background-color: rgb(46, 39, 45);
  color: rgb(145, 143, 124);
 */
body {
  background-image: var(--bg-img);
  background-attachment: fixed;
  background-size: cover;
  height: auto;
  transition: var(--transition-speed);
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
  --text-tertiary: #85806c;
  --bg-primary: #23232e;
  --bg-secondary: #141418;
  --bg-tertiary: #272731;
  --bg-img: url("../src/assets/dark.png");
}

.light {
  --text-primary: #576e75;
  --text-secondary: #35535c;
  --text-tertiary: #66677e;
  --bg-primary: #fdf6e3;
  --bg-secondary: #f5e5b8;
  --bg-tertiary: #e9e7d4;
  --bg-img: url("../src/assets/light.png");
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