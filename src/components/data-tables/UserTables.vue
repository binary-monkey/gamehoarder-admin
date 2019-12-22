<template>
  <va-card :title="$t('Users')" :key="tableKey"> <!-- TODO should be update when something is deleted -->
    <va-data-table
      :fields="fields"
      :data="users"
      :per-page="10"
    >
      <template slot="actions" slot-scope="props">

        <va-popover :message="`${$t('tables.edit')} ${props.rowData.username}`" placement="top">
          <router-link :to="{ name: 'edit-user', params: {username: props.rowData.username} }">
            <va-button flat small color="gray" icon="fa fa-pencil"/>
          </router-link>
        </va-popover>

        <va-popover :message="`${$t('tables.delete')} ${props.rowData.username}`" placement="top">
          <va-button flat small color="gray" icon="fa fa-trash" v-on:click="deleteUser(props.rowData.username)"/>
        </va-popover>
      </template>
    </va-data-table>
  </va-card>
</template>

<script>

export default {
  data () {
    return {
      users: [],
      tableKey: 1,
    }
  },
  computed: {
    fields () {
      return [{
        name: 'username',
        title: 'username',
        width: '20%',
      }, {
        name: 'email',
        title: 'email',
        width: '20%',
      }, {
        name: 'groups__name',
        title: 'groups',
      }, {
        name: '__slot:actions',
        dataClass: 'text-right',
      }]
    },
  },
  created () {
    this.readItems()
  },
  methods: {
    readItems () {
      this.$http.get('http://localhost:8000/en/api/users')
        .then(response => {
          this.users = response.data.data
        })
    },

    deleteUser: function (username) {
      this.$http.post('http://localhost:8000/en/api/users/delete', { username: username })

      alert(username + ' deleted')
      this.readItems()
      this.tableKey += 1
    },
  },
}
</script>

<style lang="scss">
</style>
