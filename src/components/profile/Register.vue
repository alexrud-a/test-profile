<template>
  <div class="register">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1 class="text-center">
            Регистрация
          </h1>
          <form class="form" @submit.prevent="submit">
            <div class="form-group">
              <label for="user-name">
                Имя
              </label>
              <input class="form-control form-control-lg" v-model="user.name.first" id="user-name">
              <div class="message">{{ validation.firstError('user.name.first') }}</div>
            </div>
            <div class="form-group">
              <label for="user-lastname">
                Фамилия
              </label>
              <input class="form-control form-control-lg" v-model="user.name.last" id="user-lastname">
              <div class="message">{{ validation.firstError('user.name.last') }}</div>
            </div>
            <div class="form-group">
              <label for="user-age">
                Возраст
              </label>
              <input class="form-control form-control-lg" v-model="user.age" id="user-age">
              <div class="message">{{ validation.firstError('user.age') }}</div>
            </div>
            <div class="form-group">
              <label for="user-age">
                Место работы
              </label>
              <input class="form-control form-control-lg" v-model="user.company" id="user-company">
            </div>
            <div class="form-group">
              <label for="user-email">
                Email
              </label>
              <input class="form-control form-control-lg" v-model="user.email" id="user-email">
              <div class="message">{{ validation.firstError('user.email') }}</div>
            </div>
            <div class="form-group">
              <label for="user-phone">
                Телефон
              </label>
              <input class="form-control form-control-lg" v-model="user.phone" id="user-phone" v-mask="'+7 (###) ###-##-##'">
              <div class="message">{{ validation.firstError('user.phone') }}</div>
            </div>
            <div class="form-group">
              <label for="user-address">
                Адрес
              </label>
              <input class="form-control form-control-lg" v-model="user.address" id="user-address">
            </div>
            <div class="form-group">
              <label for="user-password">
                Пароль
              </label>
              <input type="password" class="form-control form-control-lg" v-model="user.password" id="user-password">
              <div class="message">{{ validation.firstError('user.password') }}</div>
            </div>
            <div class="form-group">
              <button class="btn btn-dark btn-lg">
                Зарегистрироваться
              </button>
            </div>
            <div class="form-group">
              {{msg}}
            </div>
            <router-link class="btn-link"
                         :to="{name: 'Login'}">
              Авторизация
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
import axios from "axios";
import { v1 as uuidv1 } from 'uuid';

const Validator = SimpleVueValidator.Validator;

export default {
  mixins: [SimpleVueValidator.mixin],
  name: "Register",
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
      msg: ''
    }
  },
  validators: {
    'user.name.first': function(value) {
      return Validator.value(value).required('Поле обязательно для заполнения');
    },
    'user.name.last': function(value) {
      return Validator.value(value).required('Поле обязательно для заполнения');
    },
    'user.age': function(value) {
      return Validator.value(value).integer('Некорректный возраст').between(18, 90, 'Вам должно быть не меньше 18 и не больше 90');
    },
    'user.phone': function(value) {
      return Validator.value(value).required('Поле обязательно для заполнения').length(18, 'Поле телефон должно содержать 10 цифр');
    },
    'user.email': function(value) {
      return Validator.value(value).required('Поле обязательно для заполнения').email('Некорректный Email');
    },
    'user.password': function(value) {
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
              self.user.id = uuidv1();
              self.user.picture = "https://placeimg.com/400/400/people",
              console.log(self.user);
              axios('http://localhost:3000/users/', {
                method: "POST",
                data: self.user,
              })
                  .then((resp) => {
                    console.log(resp.data);
                    self.AUTH(self.user.id);
                    self.$router.push({ name: 'Profile', params: { id: self.user.id } });
                  })
                  .catch((error) => {
                    console.log(error);
                    return error;
                  })
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
.register {
  .form {
    max-width: 400px;
    margin: 40px auto;

    .btn {
      width: 100%;
    }
  }
}
</style>