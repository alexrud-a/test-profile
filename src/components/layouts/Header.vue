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
              v-if="isAuth.length"
          >
            <router-link
                class="nav-link"
                :to="{name: 'Profile', params: { id: isAuth } }"
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
import {mapActions, mapGetters} from "vuex";
export default {
  name: "Header",
  data() {
    return {
      isAuth: '',
    }
  },
  methods: {
    ...mapActions([
      'AUTH'
    ]),
  },
  computed: {
    ...mapGetters([
      'AUTH_VAL'
    ]),
  },
  watch: {
    AUTH_VAL() {
      this.isAuth = this.AUTH_VAL;
    }
  },
  created() {
    this.isAuth = this.AUTH_VAL;
  }
}
</script>

<style scoped>

</style>