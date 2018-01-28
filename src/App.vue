<template>
  <div id="app" class="container-fluid">
    <header>
      <div class="navbar-fixed purple darken-4">
        <nav class="purple darken-4">
          <div class="nav-wrapper purple darken-4">
            <a href="#" class="brand-logo center">
              Administracija
            </a>
            <ul v-if="token" class="right">
              <li title="Odjava"><a href="#" @click="logout">Odjava</a></li>
            </ul>
          </div>

        </nav>

      </div>
    </header>
    <main>
      <router-view :token="token"></router-view>
    </main>
    <footer class="page-footer purple darken-4">
      <h5 class="white-text center">&copy; 2017-2018 Alen Duda</h5>
    </footer>
  </div>
</template>

<script>

  export default {
    name: "app",
    data() {
      return {
        get name() {
          return localStorage.getItem("name") || null;
        },
        get token() {
          return localStorage.getItem('token') || null;
        }
      }
    },
    created() {
      if(localStorage.getItem("token")) {
        this.$router.replace("/");
      }
    },
    methods: {
      logout() {
        localStorage.clear();
        this.name = null;
        this.token = null;
        this.$router.replace("/");
      }
    }

  };
</script>

<style>
  body {
    display: flex;
    min-height: 100vh !important;
    flex-direction: column;
  }

  main {
    flex: 1 0 auto !important;
  }

  .page-footer {
    padding: 10px 5px;
  }

  #page-title {
    margin: 20px 0;
    font-size: 2rem;
  }

</style>
