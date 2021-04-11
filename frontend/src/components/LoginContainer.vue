<template>
<form>
  <div class="form-group">
    <div class="input-outer">
      <label for="name">User name</label>
      <input type="text" id="name" class="name" v-model="user.name">
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
      <button @click.prevent.stop="$emit('signup-click', user)">登録</button>
      <button @click.prevent.stop="$emit('login-click', user)">ログイン</button>
    </div>
  </div>
  <div style="height: 50px;"></div>
</form>
</template>

<script>
// import firebase from "firebase/app";
// import "firebase/auth";
// firebase.initializeApp({
//   apiKey: "AIzaSyCn0K_3qeXuXFVc-PMNrjeZoE80_PLHq-o",
//   // authDomain: "https://lister-424b3.firebaseapp.com/",
// });

export default {
  name: 'LoginContainer',
  props: {
    isLogin: Boolean
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
  //   signup() {
  //     firebase.auth()
  //     .createUserWithEmailAndPassword(this.email, this.password)
  //     .then(user => {
  //         alert('登録完了！ログインしてください！')
  //         console.log(user);
  //         // console.log('Create account: ', user.email)
  //       })
  //       .catch(error => {
  //         console.log(error.message);
  //         console.log(this.email);
  //         console.log(this.password);
  //       })
  //   },
  //   login() {
  //     firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
  //       user => {
  //         console.log(user);
  //         // this.$router.push('/')
  //         this.$emit('login-judege', user)
  //       },
  //       err => {
  //         console.log(err.message);
  //       }
  //     )
  //   },
  //   logout() {
  //     firebase.auth().signOut().then(user => {
  //       console.log(user);
  //     })
  //   }
  },
  created() {
    // login中かチェック
    // firebase.auth().onAuthStateChanged(user => {
    //   this.$emit('login-judege', user)
      // if (user) {
      //   console.log('singed in', user);
      //   // User is signed in.
      // } else {
      //   console.log('not singed', user);
      //   this.$emit('login-judege', user)
      //   // No user is signed in.
      // }
    // })
  }
}
</script>

<style scoped>
form {
  /* widows: 100vw; */
  height: 90vh;
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
  margin-top: 20px;
}

.input-outer {
  color: white;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  width: 70%;
  margin-top: 20px;
}

.name, .email, .password {
  font-size: 24px;
  color: white;
  outline: none;
  height: 30px;
  background: black;
  border: none;
  border-bottom: solid 2px white;
  /* display: flex;
  flex-direction: column; */
}
</style>