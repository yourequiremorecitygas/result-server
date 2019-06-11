import DropDown from "./components/Dropdown.vue";
import VueMqtt from "vue-mqtt";

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component("drop-down", DropDown);
    Vue.use(VueMqtt, "ws://52.194.252.52:9001");
  }
};

export default GlobalComponents;
