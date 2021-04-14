<template>
  <div>

    <header-bar
    :isLogin="isLogin"
    :currentView="currentView"
    :username="username"
    @logout-btn-click="logout"
    @title-logo-click="toVideoView"
    @plus-icon-click="addListLine"
    />

    <transition>
      <login-container
      @signup-click="signup"
      @login-click="login"
      :listContainerHeight="listContainerHeight"
      :loading="loading"
      :inputUsername="inputUsername"
      v-if="currentView.login"
      />
    </transition>
    
    <div class="main-content">
      <transition>
        <video-container
        v-if="currentView.video"
        ref="useVideoContainerMethods"
        @notloggedin-createbtn-click="loginAskAleart"
        @fetch-result-data="textToData"
        :isLogin="isLogin"
        :baseURL="baseURL"
        :uid="uid"
        :apiCounter="apiCounter"
        :videoHeight="videoHeight"
        :createBtnHeight="createBtnHeight"
        v-touch:swipe.left="toListViewSwipe"
        />
        <list-container
        v-if="currentView.list"
        ref="useListContainerMethods"
        @save-return-list="fetchAllListData"
        :baseURL="baseURL"
        :listContainerHeight="listContainerHeight"
        :uid="uid"
        :todoText="todoText"
        v-touch:swipe.left="isLogin? toloadView: notLogined"
        v-touch:swipe.right="toVideoView"
        />
        <load-container
        v-if="currentView.load"
        @db-listdata-click="fetchOneListData"
        @save-return-list="fetchAllListData"
        :baseURL="baseURL"
        :uid="uid"
        :listsData="listsData"
        :listContainerHeight="listContainerHeight"
        v-touch:swipe.right="toListView"
        />
      </transition>
    </div>
    
    <footer-bar
    @menu-icon-click="changeMainContent"
    :currentView="currentView"
    />

  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
firebase.initializeApp({
  apiKey: process.env.VUE_APP_APIKEY
});

import HeaderBar from './components/HeaderBar.vue'
import FooterBar from './components/FooterBar.vue'
import VideoContainer from './components/VideoContainer.vue'
import ListContainer from './components/ListContainer.vue'
import LoadContainer from './components/LoadContainer'
import LoginContainer from './components/LoginContainer'

export default {
  name: 'App',
  components: {
    HeaderBar,
    FooterBar,
    // CreateBtn,
    VideoContainer,
    ListContainer,
    LoadContainer,
    LoginContainer
  },
  data: () => {
    return {
      videoHeight: '',
      createBtnHeight: '',
      listContainerHeight: '',
      baseURL: '',
      signUpRedirectURL: '',
      video: '',
      todoText: '',
      listsData: [],
      isLogin: false,
      currentView: {
        login: false,
        video: true,
        list: false,
        load: false,
      },
      uid: '',
      username: '',
      apiCounter: 0,
      loading: false,
      inputUsername: ''
      // clickInLoadList: false
    }
  },
  methods: {
    signup(user) {
      if (!user.name) {
        alert('User Nameを入力してください')
        // this.loading = false
        return
      }
      this.loading = true
      firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(registed => {
        console.log(registed.user.uid, user.name);

        // mailリンク送信
          const userF = firebase.auth().currentUser;
          if (userF !== null) {
            userF.sendEmailVerification({url: this.signUpRedirectURL})
            .then(() => {
              alert('メールのリンクからログインを完了してください')
              this.registedUserToDB(registed.user.uid, user.name)
            })
            .catch(() => {
              alert('メールが送信できませんでした')
              user.delete()
              .then(() => {
                console.log('user削除');
              })
            })
          }
       
        })
        .catch(error => {
          console.log(error.message);
          alert('登録できませんでした...')
          this.loading = false
        })
    },
    login(user) {
      this.loading = true
      firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(
        registUser => {
          console.log(registUser);
          if (registUser !== null) {
            if (registUser.user.emailVerified) {
              this.getUserToDB(registUser.user.uid)
            } else {
              alert('メールのリンクからログインを完了してください')
            }
          } else {
            alert('登録が見つかりませんでした...')
          }
          this.loading = false 
        },
        err => {
          console.log(err.message);
          alert('登録が見つかりませんでした...')
          this.loading = false
        }
      )
    },
    logout() {
      if (this.currentView.login) {
        return
      }
      if (this.isLogin) {
         if (confirm('ログアウトしますか?')) {
           firebase.auth().signOut().then(() => {
             this.isLogin = false
             this.uid = ''
             this.username = ''
             this.inputUsername = ''
             alert('ログアウトしました')
           })
         } else {
           return
         }
      } else {
        this.loginAskAleart()
      }
    },
    loginAskAleart() {
      if (this.currentView.video) {
        this.$refs.useVideoContainerMethods.stop()
      }
      this.toLoginView()
    },
    registedUserToDB(uid, name) {
      const json = JSON.stringify({uid,name})
      const data = {
        method: "POST",
        body: json
      }

      fetch(this.baseURL + "regist/user", data)
        .then(res => res.json())
        .then(data => {
          this.loading = false
          console.log(data);
        })
        .catch(err => {
          console.log(err);
          alert(`データベースへの登録が失敗しました
            再度サインアップをしてください`, user);
          const user = firebase.auth().currentUser;
          user.delete().then(() => {
            console.log('ユーザー削除');
          }).catch((error) => {
            console.log(error);
            // An error happened.
          });
        })
    },
    getUserToDB(uid, name="") {
      const json = JSON.stringify({uid})
      const data = {
        method: "POST",
        body: json
      }
      fetch(this.baseURL + "load/user", data)
        .then(res => res.json())
        .then(data => {
          // if (name !== "" && data.data.username !== name) {
          console.log(name);
          // }
          console.log(data.data);
          this.isLogin = true
          this.loading = false
          this.uid = uid
          this.username = data.data.username
          this.apiCounter = data.data.apicount
          console.log(this.uid, this.username, this.apiCounter);
          this.updateLoadContainer(data.data)
          this.toVideoView()
        })
        .catch(() => {
          console.log('データ取得に失敗しました');
        })
    },
    changeMainContent(iconName) {
      if (iconName !== 'camera' && iconName !== 'save' && this.currentView.video) {
        this.$refs.useVideoContainerMethods.stop()
      }
      switch (iconName) {
        case 'camera':
          if (this.currentView.video) {
            return
          } else {
            this.toVideoView()
          }
          break;
        case 'list':
          if (this.currentView.list) {
            return
          } else {
            this.toListView()
          }
          break; 
        case 'save':
          if (this.currentView.login) {
            return
          }
          if (!this.isLogin) {
            alert('saveを使うにはログインをしてください')
            this.loginAskAleart()
            return
          }
          if (this.currentView.list) {
            this.$refs.useListContainerMethods.saveListToDB(this.uid, this.apiCounter)
          }
          break; 
        case 'load':
          if (this.currentView.login) {
            return
          }
          if (!this.isLogin) {
            alert('loadを使うにはログインをしてください')
            this.loginAskAleart()
            return
          }
          if (this.currentView.load) {
            return
          } else {
            this.toloadView()
          }
          break; 
      }
    },
    toLoginView() {
      this.currentView.login = true
      this.currentView.video = false
      this.currentView.list = false
      this.currentView.load = false
    },
    toVideoView() {
      this.currentView.login = false
      this.currentView.video = true
      this.currentView.list = false
      this.currentView.load = false
    },
    toListView() {
      this.currentView.login = false
      this.currentView.video = false
      this.currentView.list = true
      this.currentView.load = false
    },
    toloadView() {
      this.currentView.login = false
      this.currentView.video = false
      this.currentView.list = false
      this.currentView.load = true
    },
    toListViewSwipe() {
      this.currentView.login = false
      this.currentView.video = false
      this.currentView.list = true
      this.currentView.load = false
      this.$refs.useVideoContainerMethods.stop()
    },
    addListLine() {
      if (this.currentView.list) {
        this.$refs.useListContainerMethods.addListLine()
      }
    },
    textToData(data) {
      this.todoText = data.result
      this.apiCounter = data.apicount
      this.$refs.useVideoContainerMethods.stop()
      this.toListView()
    },
    updateLoadContainer(data) {
      delete data.apicount
      delete data.username
      if (data) {
        this.listsData = data
      } else {
        this.listsData = {}
      }
    },
    fetchOneListData(dataKey) {
      this.clickInLoadList = false
      fetch(this.baseURL + `load/list?id=${dataKey}&uid=${this.uid}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data.data);
        const listTitle = data.data.title
        const listData = data.data.lists
        localStorage.setItem('Lister', listData)
        localStorage.setItem('ListTitle', listTitle)
        // this.clickInLoadList = true
        this.toListView()
      })
    },
    fetchAllListData() {
      fetch(this.baseURL + `load/lists?uid=${this.uid}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data.data);
        this.updateLoadContainer(data.data)
      })
    },
    notLogined() {
      alert('loadを使うにはログインをしてください')
    }
  },
  created() {
    // ログイン状態をチェック
    // userがあってかつメール認証が済んでいればログイン
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        console.log(user.emailVerified);
        if (user.emailVerified) {
          console.log('ログイン中です', user);
          this.getUserToDB(user.uid)
          // User is signed in. 
        } else {
          console.log('リンクを踏んでいない');
        }
      } else {
        console.log('ログインしていません');
        this.isLogin = false        
        // No user is signed in.
      }
    })

    if (location.hostname === 'localhost') {
      this.baseURL = `http://localhost:5000/lister-424b3/us-central1/app/`;
      this.signUpRedirectURL = 'http://localhost:8080/'
    } else {
      this.baseURL = 'https://us-central1-lister-424b3.cloudfunctions.net/app/'
      this.signUpRedirectURL = 'https://lister-424b3.web.app/' 
    }
    console.log(this.baseURL);
    console.log(this.isLogin);
    
  },
  mounted() {
    const h_f_px = 112 //52px + 60px
    const mt_px = 20 //maincontent margintop 20px
    const main_H = innerHeight - (h_f_px + mt_px)
    const videoH = innerHeight * 0.6
    const c_btnH = main_H - videoH
    this.videoHeight = String(videoH)
    this.createBtnHeight = String(c_btnH)
    this.listContainerHeight = String(main_H - 88)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rhodium+Libre&display=swap');

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-active {
  transition: .5s;
}


.main-content {
  margin-top: 20px;
}

.active {
  color: red;
  font-size: 24px;
}
</style>