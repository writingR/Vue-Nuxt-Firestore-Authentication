<template>
  <v-container fluid>
    <v-card v-if="user">
      <v-toolbar dense color="success" dark flat>
        <v-toolbar-title>{{ user.displayName }} write</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="save">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn icon @click="signOut">
          <v-icon>mdi-account-box</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="docId.category" label="category" outlined />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="docId.name" label="name" outlined />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="doc.date" label="date" outlined />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="doc.description" label="description" />
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="content.text" label="text" rows="15" outlined />
            </v-col>     
          </v-row>
        </v-card-text>
      </v-form>
    </v-card>
    <v-card v-else>
      <v-card-text class="text-center">
        <v-btn @click="signIn">
          signIn
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      docId: {
        category: '',
        name: ''
      },
      doc: {
        createAt: new Date(),
        date: '',
        description: '',
        tags: [],
        title: ''
      },
      content: {
        createAt: new Date(),
        modifiedAt: new Date(),
        text: ''
      },
      user: null
    }
  },
  methods: {
    async save () { 
      try {
        const id = this.docId.category + '-' + this.docId.name
        this.doc.createAt = new Date()
        await this.$fireStore.collection('docs').doc(id).set(this.doc)
        // eslint-disable-next-line no-unused-vars
        const cid = id + '/content/last'
        this.content.createAt = new Date()
        this.content.modifiedAt = new Date()
        await this.$fireStore.collection('docs').doc(cid).set(this.content)
        await alert('데이터를 정상적으로 등록하였습니다.')
        // location.reload()
      } catch (err) {
        console.log('faile to database register', err);
        alert('등록에 실패하였습니다.')
      }
    },
    async signIn () {
      this.loading = true
      try {
        const provider = new this.$fireAuthObj.GoogleAuthProvider()
        const auth = await this.$fireAuth.signInWithPopup(provider)
        this.user = auth.user
        console.log(this.user)
      } catch (err) {
        console.log('error', err);
      } finally {
        alert(`${this.user.displayName}님 환영합니다.`)
        this.loading = false
      }
    },
    async signOut () {
      this.loading = true
      try {
        // eslint-disable-next-line no-unused-vars
        const provider = new this.$fireAuthObj.GoogleAuthProvider()
        // eslint-disable-next-line no-unused-vars
        await this.$fireAuth.signOut()
        this.user = null
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
