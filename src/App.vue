<template>
  <div id="app" class="container-fluid">
    <header>
      <div class="navbar-fixed indigo">
        <nav class="indigo">
          <div class="nav-wrapper indigo">
            <a href="#" class="brand-logo center">
              <!--<img src="./assets/logo.png" width="300" class=""/>-->
              DustIn Time
            </a>
            <!--<h1 id="page-title" class="center">-->
              <!--Administracija-->
            <!--</h1>-->
          </div>

        </nav>

      </div>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer class="page-footer indigo">
      <h5 class="white-text center">&copy; 2017-2018 Alen Duda</h5>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "app"
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
