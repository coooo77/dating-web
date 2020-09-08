<template>
  <div class="container border border-danger">
    <h1>Users Page</h1>

    <div class="users row">
      <UserCard
        v-for="user in users"
        :key="user.id"
        :user="user"
        @afterChangeLiked="afterChangeLiked"
      />
    </div>
  </div>
</template>

<script>
import UserCard from "../components/UserCard.vue";
let dummyUser = [
  {
    isLiked: false,
    id: 1,
    gender: "female",
    name: {
      title: "Ms",
      first: "Ege",
      last: "Aykaç",
    },
    location: {
      street: {
        number: 1666,
        name: "Fatih Sultan Mehmet Cd",
      },
      city: "İstanbul",
      state: "Denizli",
      country: "Turkey",
      postcode: 74279,
      coordinates: {
        latitude: "74.0895",
        longitude: "149.7724",
      },
      timezone: {
        offset: "-2:00",
        description: "Mid-Atlantic",
      },
    },
    email: "ege.aykac@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/women/6.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/6.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/6.jpg",
    },
  },
  {
    isLiked: false,
    id: 2,
    gender: "female",
    name: {
      title: "Miss",
      first: "Marion",
      last: "Dunn",
    },
    location: {
      street: {
        number: 5723,
        name: "Oak Lawn Ave",
      },
      city: "Thousand Oaks",
      state: "Indiana",
      country: "United States",
      postcode: 63672,
      coordinates: {
        latitude: "30.7380",
        longitude: "-137.3606",
      },
      timezone: {
        offset: "+3:30",
        description: "Tehran",
      },
    },
    email: "marion.dunn@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/women/63.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/63.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/63.jpg",
    },
  },
  {
    isLiked: false,
    id: 3,
    gender: "male",
    name: {
      title: "Mr",
      first: "Braxton",
      last: "Moore",
    },
    location: {
      street: {
        number: 3056,
        name: "Beach Road",
      },
      city: "Taupo",
      state: "Manawatu-Wanganui",
      country: "New Zealand",
      postcode: 85734,
      coordinates: {
        latitude: "39.6016",
        longitude: "171.4517",
      },
      timezone: {
        offset: "+5:45",
        description: "Kathmandu",
      },
    },
    email: "braxton.moore@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/men/7.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/7.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/7.jpg",
    },
  },
  {
    isLiked: false,
    id: 4,
    gender: "male",
    name: {
      title: "Mr",
      first: "Jairo",
      last: "Ferreira",
    },
    location: {
      street: {
        number: 4170,
        name: "Rua Rio de Janeiro ",
      },
      city: "Formosa",
      state: "São Paulo",
      country: "Brazil",
      postcode: 37212,
      coordinates: {
        latitude: "63.9631",
        longitude: "9.1061",
      },
      timezone: {
        offset: "+10:00",
        description: "Eastern Australia, Guam, Vladivostok",
      },
    },
    email: "jairo.ferreira@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/men/63.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/63.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/63.jpg",
    },
  },
];
export default {
  data() {
    return {
      users: [],
    };
  },
  components: {
    UserCard,
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      // TODO: 給予使用者id
      const data = dummyUser;
      const like = JSON.parse(sessionStorage.getItem('like'))
      const users = data.map((user) => ({
        ...user,
        isLiked: like.includes(user.id),
        name: Object.values(user.name).join(" "),
      }));
      this.users.push(...users);
    },
    afterChangeLiked(id) {
      this.users.forEach((user) => {
        if (user.id === id) user.isLiked = !user.isLiked;
      });
    },
  },
  name: "View-Users",
};
</script>

<style scoped>
.card {
  width: 15rem;
  border-radius: 1rem;
  border: 2px solid rgb(223, 223, 223);
}

.card-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-body:hover,
.like:hover {
  cursor: pointer;
}

.card-body h5 {
  margin-top: 2rem;
  line-height: 2rem;
}

img.card-img-top {
  height: 10rem;
  border-radius: 1rem 1rem 0 0;
}

.like {
  position: absolute;
  right: 0;
  margin: 1rem 1rem 0 0;
}

.like i {
  font-size: 1.5rem;
  color: rgb(223, 16, 16);
}

.avatar {
  width: 10rem;
  border-radius: 50%;
  border: solid white 7px;
  position: absolute;
  top: 3rem;
}

@media only screen and (max-width: 600px) {
  .users {
    margin: auto;
    margin-bottom: 5rem;
  }
}

@media only screen and (min-width: 600px) {
  .users {
    margin: auto;
    margin-left: 5rem;
  }
}
</style>