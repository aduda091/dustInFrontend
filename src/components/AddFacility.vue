<template>

  <div class="row">
    <form class="col s12 center" @submit.prevent="addFacility">
      <h3>
        <router-link to="/admin"><i class="material-icons small">arrow_back</i></router-link>
        Nova ustanova:
      </h3>
      <div class="input-field col s12">
        <i class="material-icons prefix">business</i>
        <input placeholder="Naziv" id="name" type="text" v-model="name" required>
      </div>
      <div class="input-field col s12">
        <i class="material-icons prefix">map</i>
        <input placeholder="Adresa" id="address" type="text" v-model="address" required>
      </div>
      <div class="input-field col s12">
        <i class="material-icons prefix">mail</i>
        <input placeholder="Mail" id="mail" type="email" v-model="mail" required>
      </div>
      <div class="input-field col s12">
        <i class="material-icons prefix">phone</i>
        <input placeholder="Telefon" id="phone" type="tel" v-model="telephone" required>
      </div>

      <div class="row">
        <div class="input-field col s12 center">
          <input type="submit" value="Dodaj ustanovu" class="waves-effect waves-light btn-large"/>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "AddFacility",
    props: ["token"],
    data() {
      return {
        name: null,
        address: null,
        mail: null,
        telephone: null
      }
    },
    created() {
      //send authorization token when sending post request
      axios.defaults.headers.post["Authorization"] = this.token;
    },
    methods: {
      addFacility() {
        let newFacility = {
          name: this.name,
          address: this.address,
          mail: this.mail,
          telephone: this.telephone
        };
        console.log(newFacility);
        axios.post("/facilities", newFacility).then(response => {
          this.$router.back();
        }).catch(err => {
          alert("Neuspješno dodavanje ustanove!");
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>

</style>
