<template>
  <va-card :title="$t('tables.serverSidePagination')">
    <va-data-table
      :fields="fields"
      :data="users"
      :loading="loading"
      @page-selected="readItems"
      api-mode
    >
      <template slot="avatar" slot-scope="props">
        <img :src="props.rowData.avatar" class="data-table-server-pagination---avatar">
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      perPage: 3,
      totalPages: 0,
      users: [],
      loading: false,
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
      }]
    },
  },
  created () {
    this.readItems()
  },
  methods: {
    readItems () {
      this.loading = true

      axios.get('http://192.168.0.4:8000/en/api/users')
        .then(response => {
          this.users = response.data
          this.loading = false
        })
    },
  },
}
</script>

<style lang="scss">
  .data-table-server-pagination---avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
</style>
