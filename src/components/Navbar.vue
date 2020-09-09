<template>
  <nav class="navbar">
    <ul class="navbar-nav">
      <li class="logo">
        <router-link to="/" class="nav-link">
          <span class="link-text logo-text">DATING WEBSITE</span>
          <i class="fas fa-angle-double-right"></i>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/" class="nav-link">
          <i class="fas fa-home"></i>
          <span class="link-text">首頁</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/favorite" class="nav-link">
          <i class="fas fa-search"></i>
          <span class="link-text">搜尋</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/search" class="nav-link">
          <i class="fas fa-kiss-wink-heart"></i>
          <span class="link-text">最愛</span>
        </router-link>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">
          <i class="fas fa-moon"></i>
          <span class="link-text">模式</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  background-color: var(--bg-primary);
  transition: width 100ms ease;
  padding: 0;
  z-index: 999;
}

.navbar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.nav-item {
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-item:last-child {
  margin-top: auto;
}

.nav-link {
  display: flex;
  align-items: center;
  height: 5rem;
  color: var(--text-primary);
  text-decoration: none;
  /* 讓選單變成灰色、透明度70% */
  filter: grayscale(100%) opacity(0.7);
  transition: var(--transition-speed);
}

.nav-link:hover {
  /* 讓選單變成灰色、透明度70% */
  filter: grayscale(0%) opacity(1);
  background: var(--bg-secondary);
  color: var(--text-secondary);
}

.nav-link i {
  font-size: 2rem;
  width: 2rem;
  min-width: 2rem;
  margin: 0 1.5rem;
}

.nav-link:hover {
  color: #ff7eee;
  transition: var(--transition-speed);
}

.link-text {
  display: none;
  margin-left: 1.5rem;
}

.logo {
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  font-size: 1.5rem;
  letter-spacing: 0.3ch;
  width: 100%;
  transition: var(--transition-speed);
}

/* 讓LOGO旋轉 */
.logo i {
  transform: rotate(0deg);
  transition: var(--transition-speed);
}

.navbar:hover .logo i {
  transform: rotate(-180deg);
}

@media only screen and (max-width: 600px) {
  .navbar {
    height: 5rem;
    width: 100vh;
    bottom: 0;
  }

  .logo {
    display: none;
  }

  .navbar-nav {
    flex-direction: row;
    width: 100vw;
  }

  .nav-link {
    justify-content: center;
  }
}

@media only screen and (min-width: 600px) {
  .navbar {
    width: 5rem;
    height: 100vh;
    top: 0;
  }

  .navbar:hover {
    width: 16rem;
  }

  .navbar:hover .link-text {
    display: inline;
  }
}
</style>