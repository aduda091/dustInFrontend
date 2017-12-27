<template>
  <div class="row">
    <form action="#" class="col s12 m6 offset-m3 z-depth-4" @submit.prevent="login">
      <h1 class="center">Prijava</h1>
      <div class="row">
        <div class="input-field col s12">
          <input id="email" placeholder="Email" type="email" v-model="username" required/>
          <!-- <label for="email">E-mail</label> -->
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password" placeholder="Lozinka" type="password" v-model="password" required/>
          <!-- <label for="password">Lozinka</label> -->
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12 center">
          <input type="submit" value="Prijava" class="waves-effect waves-light btn-large"/>
        </div>
      </div>
    </form>


  </div>
</template>

<script>
  export default {
    name: 'LogIn',
    data() {
      return {
        username: "",
        password: ""
      }
    },
    methods: {
      login() {
        this.$router.push("/admin");
      }
    }
  }
</script>


<style scoped>
</style>
