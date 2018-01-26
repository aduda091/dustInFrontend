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
  import axios from "axios";
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
        if(this.username.trim() != "" && this.password.trim()!= "") {
          axios.post("/users/login", {mail:this.username, password:this.password}).then(response => {
            console.log(response);
            if(response.data.user.role === "admin") {
              let user = response.data.user;
              localStorage.setItem("name", user.firstName + " " + user.lastName);
              localStorage.setItem("token", response.data.token);
              this.$router.push("/admin");
            }
            else alert("Pristup dopušten samo administratorima");
          })
            .catch(err => {
              let code = err.response.status;
              if(code == 403) alert("Pogrešna lozinka");
              if(code == 404) alert("Neuspješna prijava");
              console.log(err.response);
            })
        }

      }
    },
    created() {
      if(localStorage.getItem("token")) {
        this.$router.push("/admin");
      }
    }
  }
</script>


<style scoped>
</style>
