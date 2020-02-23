<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="success" dark flat>
        <v-toolbar-title>list {{ items.length }}</v-toolbar-title>
        <v-spacer />
        <v-sheet width="90" color="transparent">
          <v-select v-model="sortName" :items="['date','title']" hide-details solo-inverted flat />
        </v-sheet>
      </v-toolbar>
      <v-card-text>
        <template v-for="(item, index) in items">
          <v-list-item :key="item.key" three-line>
            <v-list-item-content>
              <v-list-item-title>{{ '#' + index + ' - ' + item.title }}</v-list-item-title>
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
      <v-card-actions v-intersect="onIntersect">
        <v-btn :loading="loading" @click="nextListItems">
          next
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
// import delay from 'delay'

export default {
  data () {
    return {
      items: [],
      lastPage: null,
      sortName: 'date',
      loading: false
    }
  },
  watch: {
    sortName () {
      this.listItems()
    }
  },
  mounted () {
  },
  methods: {
    async nextListItems (entries, observer, isIntersecting) {
      // eslint-disable-next-line no-unused-vars
      let snapShot
      const ref = this.$fireStore.collection('docs')
        .orderBy(this.sortName, 'desc')
        .limit(6)
      this.loading = true
      try {
        if (!this.items.length) {
          snapShot = await ref.get()
        } else { 
          if (!this.lastPage) { return }
          snapShot = await ref.startAfter(this.lastPage).get()     
        }
        snapShot.docs.forEach((v) => {
          const item = v.data()
          item.key = v.id
          item.category = v.id.split('-')[0]
          item.name = v.id.split('-')[1]
          // eslint-disable-next-line no-undef
          this.items.push(item)
        })
        this.lastPage = snapShot.docs[snapShot.docs.length - 1]
      } catch (err) {
        console.log("error", err);
      } finally {
        this.loading = false
      }
      
    },
    async pre () {
      await location.reload()
    },
    onIntersect (entries, observer, isIntersecting) {
      if (isIntersecting) {
        this.nextListItems()
      }
    }
  }
}
</script>

<style>
</style>
