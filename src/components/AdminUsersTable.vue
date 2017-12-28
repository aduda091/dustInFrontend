<template>
  <table class="bordered striped">
    <thead>
    <tr>
      <th>Ime</th>
      <!--<th>Mail</th>-->
      <!--<th>Vrijeme rezervacije</th>-->
      <th>Broj</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="reservation in reservations" :key="reservation._id">
      <td>{{reservation.user.firstName}} {{reservation.user.lastName}}</td>
      <!--<td>{{user.mail}}</td>-->
      <!--<td>{{user.time}}</td>-->
      <td>{{reservation.number}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'AdminUsersTable',
    props: ['reservations'],
    data() {
      return {}
    },
    methods: {},
    created() {

    }
  }
</script>


<style scoped>
</style>
