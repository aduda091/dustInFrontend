<template>
  <div id="app" class="container-fluid">
    <header>
     <div class="navbar-fixed">
      <nav>
        <div class="nav-wrapper indigo">
          <a href="#" class="brand-logo"><img src="./assets/logo.png" width="300px" /></a>
        </div>
      </nav>
     </div>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer class="page-footer indigo">

      <div class="row">
        <div class="col s12 center">
          <h5 class="white-text">&copy; 2017-2018 JustIn Time</h5>
        </div>
      </div>


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
</style>
