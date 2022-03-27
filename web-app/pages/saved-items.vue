<template>
  <div class="body">
    <div class="container-fluid">
      <div>
        <div class="row mt-5 px-5 mx-0">
          <div
            tag="div"
            name="left"
            class="jumbotron bg-white pr-0 mb-0"
            v-vpleft
          >
            <h2>Saved Items</h2>
            <p class="mt-3" style="font-size:18px">
              This is a list of the items you have saved for future reference. If you would like to donate any of the items, please click on the "Donate" button.
            </p>
          </div>
        </div>
      </div>

      <div>
        <div class="row mx-3 my-4" >
          <div class="col-lg-9 col-sm-12" style ="margin-left:40px">
            <div class="row">
              <div
                class="col-xs-12 col-sm-12 col-lg-6 mb-2 card-group"
                
                v-for="itemInfo in savedItems"
                :key="itemInfo.id"
              >
                <div class="card mx-2 my-2">
                  <div class="card-body">
                    <h5 class="card-title text-left">{{ itemInfo.itemName }}</h5>
                    <small class="card-text category text-left">{{ itemInfo.cat }}</small>
                    <p class="card-text text-left">{{ itemInfo.address }}</p>
                    <p class="card-text text-left" v-if="itemInfo.address == ''">
                      {{ itemInfo.organisation }}
                    </p>
                    <p class="card-text location text-left">{{ itemInfo.area }}</p>
                    <small class="card-text text-left">{{
                      itemInfo.date.toDate().toISOString().substring(0, 10)
                    }}</small>
                    <br />
                    <b-button
                      type="button"
                      class="btn btn-outline-success btn-light"
                      href="make-donation"
                    >
                      Donate
                    </b-button>
                    <b-button
                      type="button"
                      class="btn saved_button"
                      @click="unsaveItem(itemInfo)"
                    >
                      ♥ Saved
                    </b-button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
  </div>
  </div>
</template>

<script>
import {
  getFirestore, collection, getDocs, query, where, onSnapshot, updateDoc, doc 
} from 'firebase/firestore'
const db = getFirestore()

import { getUserFromCookie } from '@/helpers'
import { getAuth } from 'firebase/auth'

export default {
  data() {
    return {
      displayname: '',
      savedItems: [],
      itemsSavedBefore: [],
      updated_saved_ids: [],
    }
  },
  asyncData({ req, redirect }) {
    if (process.server) {
      const user = getUserFromCookie(req)
      if (user) {
        const displayname = user.name
        return { displayname }
      }
      if (!user) {
        redirect('/login')
      }
    } else {
      const auth = getAuth()
      var firebaseuser = auth.currentUser
      console.log(firebaseuser)
      if (firebaseuser) {
        const displayname = firebaseuser.displayName
        return { displayname }
      }
      if (!firebaseuser) {
        redirect('/login')
      }
    }
  },

  created() {
    this.getData()
  },

  computed: {
    groupedSavedItems() {
      return _.chunk(this.savedItems, 3)
      // returns a nested array:
      // [[article, article, article], [article, article, article], ...]
    },
  },

  methods: {
    async getData() {
      const wishlists = query(
        collection(db, 'Wishlists'),
        where('Item Saved?', '==', true)
      )

      // const querySnapshot = await getDocs(wishlists)
      
      const unsubscribe = onSnapshot(wishlists, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log('new update')
          console.log(doc.id, ' => ', doc.data());

          if (!(this.savedItems.some(e => e.doc_id === doc.id))) {
            let obj = {}
            obj['doc_id'] = doc.id
            obj['id'] = doc.data()['ID']
            obj['itemName'] = doc.data()['Item Name']
            obj['itemCat'] = doc.data()['Item Category']
            obj['desc'] = doc.data()['Case Description']
            obj['organisation'] = doc.data()['Organisation']
            obj['address'] = doc.data()['Address']
            obj['area'] = doc.data()['Area']
            obj['picName'] = doc.data()['PIC Name']
            obj['picEmail'] = doc.data()['PIC Email']
            obj['picNum'] = doc.data()['PIC Number']
            obj['date'] = doc.data()['Date Posted']
            obj['deliveryCost'] = doc.data()['Delivery Cost By']
            obj['isSaved'] = doc.data()['Item Saved?']

            this.savedItems.push(obj)
            // this.itemsSavedBefore.push(doc.id)
            // console.log(obj)

          }
          
          this.updated_saved_ids.push(doc.id)

        });

        if (this.updated_saved_ids.length > 0 && (new Set(this.updated_saved_ids)).size !== this.updated_saved_ids.length) {
            console.log('in func loop')
            // this.updateUnsavedItemFromWishlist()
        }

      });

      // console.log(this.savedItems)
    },

    async unsaveItem(item) {
      // console.log(item.isSaved)
      item.isSaved = false

      const isSavedRef = doc(db, "Wishlists", item.doc_id)
      // console.log(isSavedRef)

      await updateDoc(isSavedRef, {
          'Item Saved?': false
      });

      this.$toast.open({
        message: 'Item removed from Saved Items',
        type: 'success',
        duration: 5000,
        dismissible: true,
        position: 'top',
      })
      // console.log(item.isSaved)

      const index = this.savedItems.indexOf(item);
      // console.log("index", index)
      // console.log(this.savedItems)
      this.savedItems.splice(index, 1);
      // console.log(this.savedItems)
    },

    updateUnsavedItemFromWishlist() {
      console.log("=== START updateUnsavedItemFromWishlist === ")
      console.log(this.updated_saved_ids.length)
      // console.log(this.prev_saved_ids.length)
      console.log(this.updated_saved_ids)
      console.log('test: ', this.updated_saved_ids.filter(i => this.updated_saved_ids.filter(j => i === j).length === 1))

      let itemToUnsave = this.updated_saved_ids.filter(i => this.updated_saved_ids.filter(j => i === j).length === 1)
      
      console.log('item to remove: ', itemToUnsave)

      let item_index = this.savedItems.findIndex(x => x.doc_id === itemToUnsave[0])
      console.log(item_index)
      console.log('saved status: ', this.savedItems[item_index].isSaved)
      if (item_index > -1) {
        this.savedItems.splice(item_index, 1);
      } 

      this.updated_saved_ids = []

      console.log("=== END updateUnsavedItemFromWishlist === ")
    },

  },
}
</script>

<style scoped>
.buttons {
  background-color: green;
}

.left-enter {
  opacity: 0;
  transform: translateX(-60px);
}

.left-enter-active {
  transition: transform 1s ease;
}

.right-enter {
  opacity: 0;
  transform: translateX(60px);
}

.right-enter-active {
  transition: transform 1s ease;
}

.before-enter {
  opacity: 0;
}

.enter {
  transition: opacity 2s ease;
}

.card-title {
  font-weight: bold;
}

.card-text {
  color: grey;
  margin-bottom: 0;
}

.category {
  font-weight: bold;
}

.saved_button {
  border-color: palevioletred;
  background-color: pink;
  color: maroon;
  font-weight: bold;
  float: right;
}

.body{
  width: 100%;
  min-height: 100%
}

.save_button {
  border-color: grey;
  color: grey;
  font-weight: bold;
  content: '\2661';
  float: right;
}
</style>