<template>
  <v-container fluid>
    <v-card>
      <v-btn :loading="loading" @click="signIn">
        signIn
      </v-btn>
      <v-btn :loading="loading" @click="signOut">
        signOut
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
// import delay from 'delay'

export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async signIn () {
      this.loading = true
      try {
        const provider = new this.$fireAuthObj.GoogleAuthProvider()
        const user = await this.$fireAuth.signInWithPopup(provider)
        console.log(user)
      } catch (err) {
        console.log('error', err);
      } finally {
        this.loading = false
      }
    },
    async signOut () {
      this.loading = true
      try {
        // eslint-disable-next-line no-unused-vars
        const provider = new this.$fireAuthObj.GoogleAuthProvider()
        // eslint-disable-next-line no-unused-vars
        const user = await this.$fireAuth.signOut()
        console.log(user);
      } catch (err) {
        console.log('error', err);
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
</style>
