<template>
  <div>
    <div class="overflow-auto container pt-5">
      <h2 class="text-center mb-5">Our List Of VWOs</h2>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>

      <!-- <p class="mt-3">Current Page: {{ currentPage }}</p> -->

      <b-table
        stacked="sm"
        class="thead-light table-border table-hover mb-5"
        id="my-table"
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
        small
      ></b-table>
      <br /><br />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from 'firebase/firestore'
const db = getFirestore()

export default {
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      items: [],
    }
  },
  computed: {
    rows() {
      return this.items.length
    },
  },

  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const querySnapshot = await getDocs(collection(db, 'VWO list'))
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data())
        let obj = {}
        obj['Organisation'] = doc.data()['Organisation']
        obj['Address'] = doc.data()['Address']
        obj['Tel'] = doc.data()['Tel']
        obj['Website'] = doc.data()['Website']
        obj['Email'] = doc.data()['Email']

        this.items.push(obj)
        console.log(obj)
      })
    },
  },
}
</script>

<style scoped></style>
