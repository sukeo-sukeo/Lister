<template>
<form :style="{height: Number(listContainerHeight) + Number(116) + 'px' }">
  <loader-circle v-if="loading"/>
  <div class="form-group">
    <div class="input-outer">
      <label for="name">User name</label>
      <input
       :placeholder="inputUsername"
       type="text" id="name" class="name" v-model="user.name">
    </div>
    <div class="input-outer">
      <label for="email">Email address</label>
      <input type="email" id="email" class="email" v-model="user.email">
    </div>
    <div class="input-outer">
      <label for="password">Password</label>
      <input type="password" id="password" class="password" v-model="user.password">
    </div>
    <div class="btn-group">
      <button
       class="signup-btn"
       @click.prevent.stop="$emit('signup-click', user)">signUP</button>
      <button
       class="login-btn"
       @click.prevent.stop="$emit('login-click', user)">logIN</button>
    </div>
  </div>
  <div style="height: 50px;"></div>
</form>
</template>

<script>
import LoaderCircle from './components_parts/LoaderCircle.vue'
// import firebase from "firebase/app";
// import "firebase/auth";
// firebase.initializeApp({
//   apiKey: "AIzaSyCn0K_3qeXuXFVc-PMNrjeZoE80_PLHq-o",
//   // authDomain: "https://lister-424b3.firebaseapp.com/",
// });

export default {
  components: { LoaderCircle },
  name: 'LoginContainer',
  props: {
    loading: Boolean,
    isLogin: Boolean,
    inputUsername: String,
    listContainerHeight: String
  },
  data: () => {
    return {
      user : {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {

    },
  mounted() {

  },
  created() {
   
  }
}
</script>

<style scoped>
form {
  /* widows: 100vw; */
  /* height: 90vh; */
  background: black; 
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn-group {
  margin-top: 30px;
}

.input-outer {
  font-family: 'Rhodium Libre', serif;
  font-style: normal;
  font-weight: normal;
  color: white;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  width: 70%;
  margin-top: 20px;
}

.name, .email, .password {
  font-family: 'Rhodium Libre', serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: white;
  outline: none;
  height: 24px;
  background: black;
  border: none;
  border-bottom: solid 2px white;
  /* display: flex;
  flex-direction: column; */
}

input:focus {
  outline: 0;
}

button:focus {
  outline: 0;
}

.login-btn, .signup-btn {
	/* position: relative; */
  font-family: 'Rhodium Libre', serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
	width: 80px;
	padding: 0.8em;
	text-align: center;
	font-weight: bold;
	text-decoration: none;
  background: black;
	color: white;
  border: none;
	/* transition: .4s; */
}


</style>