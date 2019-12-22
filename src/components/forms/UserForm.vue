<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="$t('General Information')">
          <form>
            <div class="row">
              <div class="flex md4 sm6 xs12">
                <va-item-label> Username</va-item-label>
                <va-input
                  v-model="username"
                  disabled
                  placeholder="Text Input"

                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-item-label> Email</va-item-label>
                <va-input
                  v-model="email"
                  disabled
                  placeholder="Text Input"
                />
              </div>
            </div>
          </form>
        </va-card>
      </div>

      <div class="flex xs12">
        <va-card :title="$t('Change Group')">
          <form @submit.prevent="onsubmit">
            <div class="row">
              <div class="flex md6 xs12">
                <va-item-label> Group</va-item-label>
                <va-select
                  v-model="chosenGroup"
                  textBy="description"
                  :options="groupList"
                />
              </div>
            </div>
            <div class="row"></div>
            <div class="d-flex justify--center mt-3">
              <va-button type="submit" class="my-0">{{ $t('Submit') }}</va-button>
            </div>
          </form>
        </va-card>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'form-elements',
  components: {},
  data () {
    return {
      email: 'TEMP@TEMP.com',

      groupList: ['standard_user', 'admin'],
      chosenGroup: 'standard_user',

    }
  },
  props: ['username'],
  mounted () {
    this.getUser()
  },
  methods: {
    onsubmit () {
      this.$http.post('http://localhost:8000/en/api/users/edit', {
        username: this.username,
        group: this.chosenGroup,
      })
        .then(res => {
          this.$router.push('/admin/user-tables')
        }).catch(error => {
          console.log(error)
        })
    },
    getUser () {
      this.$http.get('http://localhost:8000/en/api/users/' + this.username)
        .then(response => {
          this.chosenGroup = response.data.group
          this.email = response.data.email
        })
    },
    created () {
      this.$nextTick(() => {
        this.$validator.validateAll()
      })
    },
  },
}
</script>

<style>
  .row.row-inside {
    max-width: none;
  }
</style>
