<template>
  <div class="container border border-danger">
    <h1>Users Page</h1>

    <div class="users row">
 
      <UserCard 
      v-for="user in users" 
      :key="user.id" 
      :user="user"
      />

    </div>
  </div>
</template>

<script>
import UserCard from '../components/UserCard.vue'
let dummyUser = {
  id:1,
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
  components:{
    UserCard
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      const data = [dummyUser];
      const users = data.map((user) => ({
        ...user,
        name: Object.values(user.name).join(" "),
      }));      
      this.users.push(...users);
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