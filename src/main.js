import Vue from 'vue'
import App from './App.vue'

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import VeeValidate from 'vee-validate'

Vue.use(VueFire)
Vue.use(Buefy)
Vue.use(VeeValidate)
Vue.config.productionTip = false

// Initialize Firebase
firebase.initializeApp({
  projectId: 'vue-who-dares-wins',
  databaseURL: 'https://vue-who-dares-wins.firebaseio.com'
})

export const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

new Vue({
  render: h => h(App)
}).$mount('#app')
