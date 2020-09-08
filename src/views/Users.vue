<template>
  <div class="container border border-danger">
    <h1>Users Page</h1>

    <div class="users row">

      <div class="col-6 col-lg-4 col-xl-3 mb-4">
        <div class="card">
          <div class="like">
            <i class="far fa-heart"></i>
          </div>
          <img
            class="card-img-top"
            src="https://picsum.photos/350/100?random=0"
            alt="Card image cap"
          />
          <div class="card-body">
            <img :src="users[0].picture.large" alt class="avatar" />
            <h5 class="card-title">
              {{users[0].name}}
              <i class="fas fa-venus"></i>
            </h5>
            <p
              class="card-text"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae enim sapien. Nam porta risus sem, sit amet pharetra justo vestibulum id. Nulla in eleifend urna, at porta tellus.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
let dummyUser = {
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
      const data = [dummyUser];
      const users = data.map((user) => ({
        ...user,
        name: Object.values(user.name).join(" "),
      }));
      console.log(users);
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