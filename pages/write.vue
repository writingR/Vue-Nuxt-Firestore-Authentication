<template>
  <v-container fluid>
    <v-card>
      <v-toolbar dense color="success" dark flat>
        <v-toolbar-title>write</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="save">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form>
        <v-card-text>
          <v-text-field v-model="docId.category" label="category" />
          <v-text-field v-model="docId.name" label="name" />
          <v-divider />
          <v-text-field v-model="doc.title" label="title" />
          <v-text-field v-model="doc.date" label="date" />
          <v-text-field v-model="doc.description" label="description" />
          <v-divider />
          <v-textarea v-model="content.text" label="text" />
        </v-card-text>
      </v-form>
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
      }
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
      } catch (err) {
        console.log('faile to database register', err);
        alert('등록에 실패하였습니다.')
      }
    }
  }
}
</script>

<style>

</style>
