<template>
  <v-container fluid>
    <v-card>
      <v-toolbar dense color="success" dark flat>
        <v-toolbar-title>list</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="listItems">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-list-item v-for="item in items" :key="item.key" three-line>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ item.name }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ item.date }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon :to="`/doc/${item.category}/${item.name}`">
              <v-icon>
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card-text>
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
  mounted () {
    this.listItems()
  },
  methods: {
    async listItems () {
      const snapShot = await this.$fireStore.collection('docs').get()
      snapShot.docs.forEach((v) => {
        const item = v.data()
        item.key = v.id
        item.category = v.id.split('-')[0]
        item.name = v.id.split('-')[1]
        // eslint-disable-next-line no-undef
        this.items.push(item)
      })
    }
  }
}
</script>

<style>

</style>
