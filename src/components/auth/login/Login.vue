<template>
<form @submit.prevent="onsubmit">
  <va-input
    v-model="username"
    type="text"
    :label="$t('username')"
  />

  <va-input
    v-model="password"
    type="password"
    :label="$t('auth.password')"
    :error="!!passwordErrors.length"
    :error-messages="passwordErrors"
  />

  <div class="d-flex justify--center mt-3">
    <va-button type="submit" class="my-0">{{ $t('auth.login') }}</va-button>
  </div>
</form>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      keepLoggedIn: false,
      emailErrors: [],
      passwordErrors: [],
    }
  },
  computed: {
    formReady () {
      return !this.emailErrors.length && !this.passwordErrors.length
    },
  },
  methods: {
    onsubmit () {
      this.passwordErrors = this.password ? [] : ['Password is required']
      if (!this.formReady) {
        return
      }

      this.$http.post('http://localhost:8000/en/api/login', { username: this.username, password: this.password })
        .then(res => {
          if (res.data.token) {
            this.loginSuccessful(res)
          }
        }).catch(() => {
          this.loginFailed()
        })
    },
    loginSuccessful (req) {
      if (!req.data.token) {
        this.loginFailed()
        return
      }
      localStorage.setItem('token', req.data.token)
      this.error = false
      this.$router.replace(this.$route.query.redirect || '/')
    },
    loginFailed () {
      this.error = 'Login failed!'
      localStorage.removeItem('token')
    },
  },
}
</script>

<style lang="scss">
</style>
