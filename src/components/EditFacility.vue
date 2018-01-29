<template>

  <div class="row">
    <form class="col s12 m6 offset-m3 center" @submit.prevent="editFacility">
      <h3>
        <router-link to="/admin"><i class="material-icons small">arrow_back</i></router-link>
        Izmjena ustanove:
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
          <input type="submit" value="Spremi izmjene" class="waves-effect waves-light btn-large"/>
        </div>
      </div>

    </form>

    <div class="col s12 m4 offset-m4 center">
      <ul class="collection with-header">
        <li class="collection-header">
          <h5>Redovi: <span @click.prevent="addQueue()" class="secondary-content" title="Dodaj red"><a href="#"><i class="material-icons">add</i></a></span></h5>

        </li>

        <li class="collection-item" v-for="queue in queues" :key="queue._id">
          {{queue.name}}
          <span @click.prevent="editQueue(queue._id, queue.name)" title="Uredi ime reda" class="secondary-content">
            <a href="#"><i class="material-icons">edit</i></a>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "EditFacility",
    props: ["token"],
    data() {
      return {
        id: this.$route.params.id,
        name: null,
        address: null,
        mail: null,
        telephone: null,
        queues: []
      }
    },
    created() {
      //send authorization token when sending post request
      axios.defaults.headers.common["Authorization"] = this.token;
      this.populateFacility();
    },
    methods: {
      populateFacility() {
        axios.get("/facilities/" + this.id).then(response => {
          let facility = response.data;
          this.name = facility.name;
          this.address = facility.address;
          this.mail = facility.mail;
          this.telephone = facility.telephone;
          this.queues = facility.queues;
        })
      },
      editFacility() {
        let newFacility = {
          name: this.name,
          address: this.address,
          mail: this.mail,
          telephone: this.telephone
        };
        console.log(newFacility);
        axios.put("/facilities/" + this.id, newFacility).then(response => {
          //this.$router.back();
          populateFacility();
        }).catch(err => {
          //alert("Neuspješno dodavanje ustanove!");
          console.log(err);
        })
      },
      addQueue() {
        let queueName = prompt("Ime reda:");
        if(queueName.trim()) {
          // console.log(queueName);
          axios.post("/facilities/" + this.id, {name: queueName}).then(response => {
            this.populateFacility();
          })
        }
      },
      editQueue(queueId, oldName) {
        // console.log("editing queue " +queueId);
        let queueName = prompt("Ime reda:", oldName);
        if(queueName.trim()) {
          // console.log(queueName);
          axios.put("/queues/" + queueId, {name: queueName}).then(response => {
            this.populateFacility();
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
