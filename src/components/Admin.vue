<template>
  <div class="row">
    <!--<div class="hide-on-small-only"><h1 class="center">Upravljanje redovima čekanja</h1></div>-->
    <div class="col m3 s12">
      <ul class="collection with-header">
        <li class="collection-header">Odabir ustanove:</li>
        <li class="collection-item" v-for="facility in facilities" :key="facility._id"
            @click="populateQueues(facility._id)">
          <a href="#">{{facility.name}}</a>
        </li>
      </ul>
    </div>
    <div class="col m9 s12">
      <div class="row">
        <div class="col s12 m1 center" id="queues-label">
          Red:
        </div>
        <div class="input-field col s12 m11">
          <select name="queues" id="queues" class="browser-default" title="Odabir reda" v-model="currentQueue">
            <option value="" disabled selected>Odaberite red:</option>
            <option v-for="queue in queues"
                    :key="queue._id"
                    :value="queue._id">

              {{queue.name}}
            </option>

          </select>
        </div>
      </div>

      <template v-if="reservations">
        <div class="row">
          <div class="card col m3 s12 card-line valign-wrapper black red-text" title="Trenutni broj">
            <div id="current-number">{{currentNumber}}</div>
          </div>

          <div class="card col m3 s12 offset-m1 card-line valign-wrapper left" title="Trenutni klijent">
            <div class="card-content">
              <span class="card-title">Info o klijentu: </span>
              <p><span class="title">Ime:</span>{{currentReservation.user.firstName}}
                {{currentReservation.user.lastName}}</p>
              <p><span class="title">Mail:</span> {{currentReservation.user.mail}}</p>
              <p><span class="title">Vrijeme:</span> {{currentReservation.time | toHrTime}}</p>
            </div>
          </div>

          <div class="card-panel green white-text col m3 s12 offset-m1 card-line valign-wrapper"
               title="Sljedeći klijent" @click="nextUser">
            <div id="next-button">
              <i class="material-icons">fast_forward</i>
            </div>
          </div>
        </div>

        <div class="row">
          <AdminUsersTable :reservations="reservations" class="col s12 m6"></AdminUsersTable>

          <div class="card-panel red white-text col m3 s12 offset-m2 valign-wrapper card-line"
               title="Resetiraj red" @click="resetQueue">
            <div class="reset-button">
              <i class="material-icons">refresh</i>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <h4>Trenutno nema rezervacija u ovom redu</h4>
        <div class="card-panel red white-text col m3 s12 valign-wrapper card-line"
             title="Resetiraj red" @click="resetQueue">
          <div class="reset-button">
            <i class="material-icons">refresh</i>
          </div>
        </div>
      </template>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import AdminUsersTable from './AdminUsersTable.vue'

  let autoRefresh;

  export default {
    name: 'Admin',
    props: ["token"],
    components: {
      'AdminUsersTable': AdminUsersTable
    },
    data() {
      return {
        facilities: null,
        queues: null,
        currentFacility: null,
        currentQueue: null,
        reservations: null,
        currentNumber: 0
      }
    },
    methods: {
      populateFacilities() {
        axios.get("/facilities").then(response => {
          this.facilities = response.data;
          this.populateQueues(response.data[0]._id);
        }).catch(error => console.log(error));
      },
      populateQueues(id) {
        this.currentFacility = id;
        axios.get("/facilities/" + id).then(response => {
          this.queues = response.data.queues;
          this.currentQueue = response.data.queues[0]._id;
          this.populateReservations(response.data.queues[0]._id);
        }).catch(error => console.log(error));
      },
      populateReservations(id) {
        console.log("populiram " + id);
        this.queues.forEach(q => {
          if (q._id == id) {
            this.currentNumber = q.current;
          }
        })
        axios.get("/reservations/queue/" + id).then(response => {
          this.reservations = response.data;
        }).catch(error => {
          //console.log(error);
          this.reservations = null;
        });
      },
      resetQueue() {
        let url = "/queues/" + this.currentQueue + "/reset";
        axios.delete(url).then(response => {
          console.log(response);
          populateReservations(this.currentQueue);
        }).catch(err => {
          alert("Greška!");
          console.log(err.response.data);
        })
      },
      nextUser() {
        let url = "/queues/" + this.currentQueue + "/next";
        axios.delete(url).then(response => {
          console.log(response.data);
          this.currentNumber = response.data.reservation.number;
          populateReservations(this.currentQueue);
        }).catch(err => {
         // let status = err.response.status;
          //if(status == 500) alert("Greška");
          console.log(err);
        })
      }
    },
    computed: {
      currentReservation() {
        if (this.reservations) {
          return this.reservations[0];
        }
        else return null;
      }
    },
    created() {
      //send authorization token when sending delete requests
      axios.defaults.headers.delete["Authorization"] = this.token;
      this.populateFacilities();
      autoRefresh = setInterval(() => {
        if(this.currentQueue != null) this.populateReservations(this.currentQueue);
      }, 4000);

    },
    destroyed() {
      clearTimeout(autoRefresh);
    },
    watch: {
      currentQueue(newQueue) {
        console.log("Mijenjam red: " + newQueue);
        this.populateReservations(newQueue);
      }
    },
    filters: {
      toHrTime(isoTime) {
        return new Date(isoTime).toLocaleString("hr");
      }
    }

  }
</script>


<style scoped>
  @font-face {
    font-family: Digital;
    src: url(../assets/digital.ttf);
  }

  #queues-label {
    font-size: 1.4rem;
    /*padding: 5px;*/
    height: 4rem;
    margin-top: 1rem;
    line-height: 4rem;
  }

  /* workaround for materialize select issue */
  #queues {
    position: static;
    pointer-events: all;
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.9) !important;
    width: 100% !important;
    padding: 5px !important;
    border: 1px solid #f2f2f2 !important;
    border-radius: 2px !important;
    height: 4rem !important;
    font-size: 1.4em;
  }

  .card-line {
    height: 10rem;
  }

  .card-line .title {
    font-weight: bold;
  }

  #current-number {
    font-family: 'Digital', sans-serif;
  }

  #current-number, #next-button, .reset-button {
    text-align: center;
    width: auto;
    margin: 0 auto;
    font-size: 5rem;
    display: block;
  }

  #next-button i, .reset-button i {
    font-size: 7rem;
    display: block;
    cursor: pointer;
  }
</style>
