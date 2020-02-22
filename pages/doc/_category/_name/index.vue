<template>
  <v-card>
    {{ doc }}
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      doc: ''
    }
  },
  async mounted () {
    const itemId = this.$route.params.category + '-' + this.$route.params.name
    const snapShot = await this.$fireStore.collection('docs').doc(itemId).get()
    this.doc = snapShot.data()
    console.log(itemId)
  }
}
</script>

<style>

</style>
