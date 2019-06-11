// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import App from "./App";

// vuex setup
import stores from './store/stores'

// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

// configure vuex
const store = new Vuex.Store(stores)

debugger;

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

Vue.prototype.$Chartist = Chartist;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  store,
  router,
  data: {
    Chartist: Chartist
  }
});
