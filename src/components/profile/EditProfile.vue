<template>
  <div class="profile">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-4">
          <img :src="user.picture" class="img-fluid">
        </div>
        <div class="col-sm-12 col-md-8">
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
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import SimpleVueValidator from 'simple-vue-validator';
import axios from "axios";
const Validator = SimpleVueValidator.Validator;

export default {
  mixins: [SimpleVueValidator.mixin],
  name: "EditProfile",
  data() {
    return {
      isAuth: '',
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
              axios('http://localhost:3000/users/'+self.user.id, {
                method: "PATCH",
                data: self.user,
              })
                  .then((resp) => {
                    console.log(resp.data);
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