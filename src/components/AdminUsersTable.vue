<template>
  <table class="bordered striped centered responsive-table">
        <thead>
          <tr>
              <th>Ime</th>
              <th>Mail</th>
              <th>Vrijeme rezervacije</th>
              <th>Broj</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{user.firstName}} {{user.lastName}}</td>
            <td>{{user.mail}}</td>
            <td>{{user.time}}</td>
            <td>{{user.number}}</td>
          </tr>
        </tbody>
  </table>
</template>

<script>
export default {
  name: 'AdminUsersTable',
  props: ['users'],
  data () {
    return {
      
    }
  },
  methods: {
    
  },
  created() {
    
  }
}
</script>


<style scoped>
</style>
