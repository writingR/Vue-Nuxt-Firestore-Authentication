<template>
  <v-container fluid>
    <v-card>
      {{ items }}
    </v-card>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      items: []
    }
  },
  async mounted () {
    const sn = await this.$fireStore.collection('test').get()
    sn.docs.forEach((v) => {
      // eslint-disable-next-line no-console
      console.log(v.data())
      this.items.push(v.data())
    })
    // console.log(sn)
  }
}
</script>
