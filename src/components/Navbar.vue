<template>
  <nav>
    <div class="navbar">
      <router-link to="/" class="logo">Laundry Kita</router-link>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
        <router-link to="/status">Status</router-link>
        <router-link to="/laporan">Laporan</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
nav {
  background-color: #83bf29;
  padding: 1rem;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
}

.nav-links a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>