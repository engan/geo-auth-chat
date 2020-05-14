<template>
  <div class="signup container">
    <form class="card-panel" @submit.prevent="signup">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <div class="field">
        <label for="name">Alias</label>
        <input id="name" type="text" v-model="alias" />
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
import firebase from "firebase/app";
import functions from 'firebase/functions'

export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null
    };
  },
  methods: {
    signup() {
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });

        // let ref = db.collection("users").doc(this.slug);
        let checkAlias = firebase.functions().httpsCallable('checkAlias')
        checkAlias({ slug: this.slug }).then(result => {
          console.log(result)
        // // })
        // // ref.get().then(doc => {
          if (!result.data.unique) {   // if (doc.exists) 
            this.feedback = "This alias already exists"
          } else {
            // Asyncron task
            firebase
              .auth()
              // New Firebase version: Use cred, and not user
              .createUserWithEmailAndPassword(this.email, this.password) 
              .then(cred => {   // new Firebase, before: user
                db.collection('users').doc(this.slug).set({    // ref.set({
                  alias: this.alias,
                  geolocation: null,
                  user_id: cred.user.uid  // new Firebase, before: user.uid
                });
              })
              .then(() => {
                this.$router.push({ name: "GMap" });
              })
              .catch(err => {
                this.feedback = err.message;
              });
            // this alias does not yet exists in the db
            this.feedback = "This alias is free to use";
          }
        })
      } else {
        this.feedback = "Please enter an alias";
      }
    }
  }
};
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px;
}
</style>
