<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="success" dark flat>
        <v-toolbar-title>list</v-toolbar-title>
        <v-spacer />
        <v-sheet width="90" color="transparent">
          <v-select v-model="sortName" :items="['date','title']" hide-details solo-inverted flat />
        </v-sheet>
        <v-btn icon @click="listItems">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <template v-for="(item, index) in items">
          <v-list-item :key="item.key" three-line>
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
          <v-divider :key="index" />
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="pre">
          pre
        </v-btn>
        <v-btn @click="nextListItems">
          next
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      lastPage: null,
      sortName: 'date'
    }
  },
  watch: {
    sortName () {
      this.listItems()
    }
  },
  mounted () {
    this.listItems()
  },
  methods: {
    async listItems () {
      this.items = []
      const snapShot = await this.$fireStore.collection('docs').orderBy(this.sortName, 'desc').limit(3).get()
      snapShot.docs.forEach((v) => {
        const item = v.data()
        item.key = v.id
        item.category = v.id.split('-')[0]
        item.name = v.id.split('-')[1]
        // eslint-disable-next-line no-undef
        this.items.push(item)
      })
      this.lastPage = snapShot.docs[snapShot.docs.length - 1]
    },
    async nextListItems () {
      const snapShot = await this.$fireStore.collection('docs').orderBy(this.sortName, 'desc').startAfter(this.lastPage).limit(3).get()
      snapShot.docs.forEach((v) => {
        const item = v.data()
        item.key = v.id
        item.category = v.id.split('-')[0]
        item.name = v.id.split('-')[1]
        // eslint-disable-next-line no-undef
        this.items.push(item)
      })
      this.lastPage = snapShot.docs[snapShot.docs.length - 1]
    },
    async pre () {
      await location.reload()
    }
  }
}
</script>

<style>

</style>
