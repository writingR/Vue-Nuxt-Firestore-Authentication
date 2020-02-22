<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        {{ meta.title }}
        <v-spacer />
        <v-btn icon @click="$router.push('/list')"> 
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-card-title>
      <v-subheader>{{ meta.description }} / {{ meta.date }}</v-subheader>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <v-card-text v-html="$md.render(doc.text)" />
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      meta: {
        title: '',
        description: ''
      },
      doc: {
        text: ''
      }
    }
  },
  async mounted () {
    await this.metaRead()
    await this.docRead()
  },
  methods: {
    async metaRead () {
      const itemId = this.$route.params.category + '-' + this.$route.params.name
      const snapShot = await this.$fireStore.collection('docs').doc(itemId).get()
      this.meta = snapShot.data()
    },
    // eslint-disable-next-line require-await
    async docRead () {
      const metaId = this.$route.params.category + '-' + this.$route.params.name
      const docId = metaId + "/content/last"
      const snapShot = await this.$fireStore.collection('docs').doc(docId).get()
      this.doc = snapShot.data()
    }
  }
}
</script>

<style>

</style>
