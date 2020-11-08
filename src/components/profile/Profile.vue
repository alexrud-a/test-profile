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
          <p>
            {{user.age}} лет
          </p>
          <p>
            Место работы: {{user.company}}
          </p>
          <p>
            Email: {{user.email}}
          </p>
          <p>
            Телефон: {{user.phone}}
          </p>
          <p>
            Адрес: {{user.address}}
          </p>
          <router-link :to="{name: 'EditProfile', params: { id: this.user.id }}"
                       class="btn btn-dark btn-lg"
          >
            Редактировать данные
          </router-link>
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