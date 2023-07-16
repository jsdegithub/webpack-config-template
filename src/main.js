import "./css/commen.css";
import "./css/style.css";
import { calcSum } from "./js/utils";

import Vue from "vue";
import App from "./App.vue";

const sum = calcSum(1, 2);
console.log(sum);

// new Vue({
//   render: (h) =>
//     h(
//       "div",
//       {
//         attrs: {
//           id: "app",
//         },
//       },
//       [h("h1", "Hello, Vue.js!")]
//     ),
// }).$mount("#app");

new Vue({
  render: (h) => h(App),
}).$mount("#app");
