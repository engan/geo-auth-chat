<template>
  <div class="login container">
    <form class="card-panel" @submit.prevent="login">
      <h2 class="center deep-purple-text">Login</h2>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password">
      </div>
      <!-- Show only if feedback is not null -->
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'Login',
  data(){
    return{
      email: 'demo@neoweb.no',
      password: '1234test',
      feedback: null
    }
  },
  methods: {
    login(){
      if(this.email && this.password){
        this.feedback = null
        // New Firebase version: Use cred, and not user
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(cred => {     // new Firebase, before: user
          //console.log(user)
          this.$router.push({ name: 'GMap' })
        }).catch(err => {
          this.feedback = err.message
        })
      } else {
        this.feedback = 'Please fill in both fields'
      }
    }
  }
}
</script>

<style>
.login{
  max-width: 400px;
  margin-top: 60px;
}
.login h2{
  font-size: 2.4em;
}
.login .field{
  margin-bottom: 16px;
}
</style>
