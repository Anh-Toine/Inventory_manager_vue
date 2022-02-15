<template>
  <div class="container-fluid h-100">
    <div class="row h-100 flex-nowrap">
        <div class="col-auto col-sm-2 px-sm-2 px-0 bg-dark">
          <div class="p-1">
            <span class="text-white text-decoration-none h5 nav-link user-select-none">{{ $t('storeName') }}</span>
          </div>
          <div class="locale-changer">
            <span class="text-white text-decoration-none">{{ $t('language') }}</span>
            <select v-model="$i18n.locale">
              <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
                {{ lang }}
              </option>
            </select>
          </div>
          <br>
          <ul class="nav flex-sm-column justify-content-start min-vh-100 ">
              <div class="highlightOnHover">
                <router-link to="/products" class="text-white text-decoration-none nav-link">{{ $t('products') }}</router-link>
              </div>
              <div class="highlightOnHover">
                <router-link to="/suppliers" class="text-white text-decoration-none nav-link">{{ $t('suppliers') }}</router-link>
              </div>
              <div class="highlightOnHover">
                <router-link to="/orders" class="text-white text-decoration-none nav-link">{{ $t('orders') }}</router-link>
              </div>
              <div class="highlightOnHover">
                <router-link to="/categories" class="text-white text-decoration-none nav-link">{{ $t('categories') }}</router-link>
              </div>
              <div class="highlightOnHOver">
                <router-link to="/reports" class="text-white text-decoration-none nav-link">{{ $t('reports') }}</router-link>
              </div>
              <div class="highlightOnHover" id="logoutButton">
                <router-link to="/login" class="text-white text-decoration-none nav-link">{{ $t('logout') }}</router-link>
              </div>
          </ul>
        </div>
        <div class="col py-3">
            <router-view/>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data () {
    return { langs: ['en', 'fr'] }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.router-link-active {
  background: rgba(245, 227, 227, 0.1)
}

.highlightOnHover:hover {
  background: rgba(245, 227, 227, 0.3)
}
</style>
