import { defineStore } from 'pinia'


export const useAuthState = defineStore('auth', {

  state: () => ({
    uid: "",
    username: "",
    email: "",
    flags: []
  }),

  getters: {
    user(state) {
      return {
        uid: state.uid,
        username: state.username,
        email: state.email,
        flags: state.flags
      }
    }
  },

  actions: {
    setUser(userCredential) {
      this.uid = userCredential.uid
      this.username = userCredential.username
      this.email = userCredential.email
    },
    setFlags(flags) {
      this.flags = []
      flags.forEach(flag => {
        this.flags.push(flag)
      })
    },
  }

})
