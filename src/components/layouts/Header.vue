<template>
  <header class="header">
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
                class="nav-link"
                :to="{name: 'Home'}"
            >
              Главная
            </router-link>
          </li>
          <li class="nav-item"
              v-if="isLogin"
          >
            <router-link
                class="nav-link"
                :to="{name: 'Profile'}"
            >
              Личный кабинет
            </router-link>
          </li>
          <li class="nav-item"
              v-else
          >
            <router-link
                class="nav-link"
                :to="{name: 'Login'}"
            >
              Войти
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isLogin: false
    }
  }
}
</script>

<style scoped>

</style>