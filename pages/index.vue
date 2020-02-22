<template>
  <v-container fluid>
    <v-card>
      <v-textarea v-model="str" />
    </v-card>
    <v-card>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <v-card-text v-html="$md.render(str)" />
    </v-card>
  </v-container>
</template>

<script>
import readMe from './README.md'

export default {
  data () {
    return {
      items: [],
      str: ''
    }
  },
  computed: {
    hello () {
      return readMe
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
