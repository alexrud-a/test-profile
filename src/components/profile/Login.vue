<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1 class="text-center">
            Авторизация
          </h1>
          <form class="form" @submit.prevent="submit">
            <div class="form-group">
              <input class="form-control form-control-lg"
                     v-model="email"
                     placeholder="Email"
              >
              <div class="message">{{ validation.firstError('email') }}</div>
            </div>
            <div class="form-group">
              <input class="form-control form-control-lg"
                     v-model="password"
                     placeholder="Пароль"
              >
              <div class="message">{{ validation.firstError('password') }}</div>
            </div>
            <div class="form-group">
              <button type="submit"
                      class="btn btn-dark btn-lg"
              >
                Войти
              </button>
            </div>
            <router-link class="btn-link"
                         :to="{name: 'Register'}">
              Регистрация
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleVueValidator from 'simple-vue-validator';
import {mapActions, mapGetters} from "vuex";
const Validator = SimpleVueValidator.Validator;

export default {
  name: "Login",
  mixins: [SimpleVueValidator.mixin],
  data() {
    return {
      email: '',
      password: '',
      users: [],
    }
  },
  validators: {
    email: function(value) {
      return Validator.value(value).required('Поле обязательно для заполнения').email('Некорректный Email');
    },
    password: function(value) {
      return Validator.value(value).required('Поле обязательно для заполнения');
    },
  },
  computed: {
    ...mapGetters([
      'USERS',
    ]),

  },
  methods: {
    ...mapActions([
      'GET_USERS',
    ]),
    submit: function () {
      let self = this;
      this.$validate()
          .then(function(success) {
            if (success) {
              self.users = self.users.filter(function (item) {
                return (item.email === self.email && item.password === self.password);
              });
              self.$router.push({ name: 'Profile', params: { id: self.users[0].id } });
            }
          });
    }
  },
  created() {
    let self = this;
    self.GET_USERS()
        .then((response) => {
          if (response.data) {
            self.users = [...self.USERS]
          }
        });
  }
}
</script>

<style lang="scss">
.login {
  .form {
    max-width: 400px;
    margin: 40px auto;

    .btn {
      width: 100%;
    }
  }
}
</style>