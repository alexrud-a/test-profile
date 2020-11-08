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
                     type="password"
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
            <div class="form-group">
              {{msg}}
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
      msg: '',
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
      'AUTH_VAL'
    ]),

  },
  methods: {
    ...mapActions([
      'GET_USERS',
      'AUTH'
    ]),
    submit: function () {
      let self = this;
      this.$validate()
          .then(function(success) {
            if (success) {
              self.users = self.users.filter(function (item) {
                if (item.email === self.email && item.password === self.password) {
                  return (item.email === self.email && item.password === self.password);
                }
                else if (item.email === self.email && item.password != self.password) {
                  self.msg = 'Неверный пароль'
                }
                else {
                  self.msg = 'Пользователя с такими данными не найдено'
                }
              });
              if (self.users.length === 1) {
                self.$router.push({ name: 'Profile', params: { id: self.users[0].id } });
                self.AUTH(self.users[0].id);
              }
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