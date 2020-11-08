<template>
  <div class="profile">
    <div v-if="isAuth.length" class="container">
      <div class="row">
        <div class="col-sm-12 col-md-4">
          <img :src="user.picture" class="img-fluid">
        </div>
        <div class="col-sm-12 col-md-8">
          <h1>
            {{user.name.first}} {{user.name.last}}
          </h1>
          <p v-if="user.age">
            {{user.age}} лет
          </p>
          <p v-if="user.company">
            Место работы: {{user.company}}
          </p>
          <p v-if="user.email">
            Email: {{user.email}}
          </p>
          <p v-if="user.phone">
            Телефон: {{user.phone}}
          </p>
          <p v-if="user.address">
            Адрес: {{user.address}}
          </p>
          <router-link :to="{name: 'EditProfile', params: { id: this.user.id }}"
                       class="btn btn-dark btn-lg mb-3"
          >
            Редактировать данные
          </router-link>
          <div>
            <a href="#" @click.prevent="logOut">
              Выйти
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
  name: "Profile",
  data() {
    return {
      isAuth: '',
      users: [],
      user: {
        address: '',
        age: '',
        company: '',
        email: '',
        id: '',
        name: {
          first: '',
          last: '',
        },
        password: '',
        phone: '',
        picture: ''
      },
    }
  },
  methods: {
    ...mapActions([
      'GET_USERS',
      'AUTH'
    ]),
    logOut() {
      this.AUTH('');
      this.$router.push({ name: 'Login' });
    }
  },
  computed: {
    ...mapGetters([
      'USERS',
      'AUTH_VAL'
    ]),

  },
  created() {
    let self = this;
    self.GET_USERS()
        .then((response) => {
          if (response.data) {
            self.users = [...self.USERS].filter(function (item) {
              return item.id === self.$route.params.id
            });
            self.user = self.users[0];
          }
        });
    this.isAuth = this.AUTH_VAL;
    if (this.isAuth === '') {
      self.$router.push({ name: 'Login' });
    }
  },
}
</script>

<style scoped>

</style>