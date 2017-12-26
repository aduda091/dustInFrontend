<template>
  <div class="row">
      <div class="hide-on-small-only"><h1 class="center">Upravljanje redovima čekanja</h1></div>
      <div class="col m3 s12">
        <ul class="collection with-header">
          <li class="collection-header">Odabir ustanove:</li>
          <li class="collection-item" v-for="facility in facilities" :key="facility._id">
            <a href="#">{{facility.name}}</a>
          </li>
        </ul>
      </div>
      <div class="col m9 s12">
        <div class="row">
          <div class="input-field col s12">
            <select name="queues" id="queues" class="browser-default">
              <option value="" disabled selected>Odaberite red:</option>
              <option v-for="queue in queues" :key="queue._id"
              :value="queue._id">{{queue.name}}</option>

            </select>
          </div>
        </div>

        <div class="row">
          <div class="card col m3 s12 current-line valign-wrapper black red-text">
              <div id="current-number">123</div>
          </div>

          <div class="card col m3 s12 offset-m1 current-line valign-wrapper left">
            <div class="card-content">
              <span class="card-title">Info o klijentu: </span>
                <p><span class="title">Ime:</span> Alen Duda</p>
                <p><span class="title">Mail:</span> alenduda@gmail.com</p>
                <p><span class="title">Vrijeme:</span> 27.12.2017. 13:37</p>
            </div>
          </div>

          <div class="card-panel green white-text col m3 s12 offset-m1 current-line valign-wrapper">
            <div id="next-button" title="Sljedeći korisnik">
              <i class="material-icons">fast_forward</i>
            </div>
          </div>
        </div>

        <div class="row">
          <AdminUsersTable :users="users"></AdminUsersTable>
        </div>
      </div>


  </div>
</template>

<script>
import AdminUsersTable from './AdminUsersTable.vue'
export default {
  name: 'Admin',
  components: {
    'AdminUsersTable':AdminUsersTable
  },
  data () {
    return {
      facilities: [
        {
          _id: "1234",
          name: "FET"
        },
        {
          _id: "4324",
          name: "FINA"
        },
        {
          _id: "543435",
          name: "HZZO"
        }
      ],
      queues: [
        {
          _id: "143234",
          name: "Referada",
          current: 1
        },
        {
          _id: "143235",
          name: "ISVU",
          current: 4
        },
        {
          _id: "143236",
          name: "Bla",
          current: 2
        }
      ],
      users: [
        {
          firstName:"Alen",
          lastName:"Duda",
          mail:"ad@gmail.com",
          time:"26.12.2017 13:37",
          number:1
        },
        {
          firstName:"Marko",
          lastName:"Brkljača",
          mail:"mbrka@gmail.com",
          time:"26.12.2017 13:40",
          number:2
        },
        {
          firstName:"Mate",
          lastName:"Jadreško",
          mail:"mjad@gmail.com",
          time:"26.12.2017 13:45",
          number:3
        },
      ]
    }
  },
  methods: {

  },
  computed: {
    currentUser() {
      return this.users[0];
    }
  },
  created() {

  }
}
</script>


<style scoped>
@font-face {
    font-family: Digital;
    src: url(../assets/digital.ttf);
}

/* workaround for materialize select issue */
#queues {
  position: static;
  pointer-events: all;
  opacity: 1;
  background-color: rgba(255,255,255,0.9) !important;
  width: 100% !important;
  padding: 5px !important;
  border: 1px solid #f2f2f2 !important;
  border-radius: 2px !important;
  height: 4rem !important;
  font-size: 1.4em;
}
.current-line {
  height: 10rem;
}
.current-line .title {
  font-weight: bold;
}
#current-number {
  font-family: 'Digital', sans-serif;
}
#current-number, #next-button {
  text-align: center;
  width: auto;
  margin: 0 auto;
  font-size: 5rem;
}
#next-button i {
  font-size: 7rem;
  display: block;
  cursor: pointer;
}
</style>
