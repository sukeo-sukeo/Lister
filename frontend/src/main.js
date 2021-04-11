'use strict'

import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import Vue2TouchEvents from "vue2-touch-events";
// firebaseと接続
// import firebase from "firebase/app";
// import "firebase/auth";
// firebase.initializeApp({
//   apiKey: "AIzaSyCn0K_3qeXuXFVc-PMNrjeZoE80_PLHq-o",
//   // authDomain: "https://lister-424b3.firebaseapp.com/",
// });
// export default { firebase };

Vue.use(Vue2TouchEvents);

Vue.config.productionTip = false
 
new Vue({
  // router,
  render: h => h(App),
}).$mount('#app')
