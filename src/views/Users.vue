<template>
  <h1>Users Page</h1>
</template>

<script>
const dummyUser = {
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
};
export default {
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.users.push(dummyUser);
    },
  },
  name: "View-Users",
};
</script>