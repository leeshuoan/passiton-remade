<template>
  <div>
    <div class="container-fluid">
      <VueSlickCarousel v-bind="banner_settings">
        <div>
          <img
            src="~/assets/banner-1.jpg"
            alt=""
            class="mt-3 img-fluid mx-auto"
          />
        </div>
        <div>
          <img
            src="~/assets/banner-2.jpg"
            alt=""
            class="mt-3 img-fluid mx-auto"
          />
        </div>
        <div>
          <img
            src="~/assets/banner-3.jpg"
            alt=""
            class="mt-3 img-fluid mx-auto"
          />
        </div>
        <div>
          <img
            src="~/assets/banner-4.jpg"
            alt=""
            class="mt-3 img-fluid mx-auto"
          />
        </div>
        <div>
          <img
            src="~/assets/banner-5.jpg"
            alt=""
            class="mt-3 img-fluid mx-auto"
          />
        </div>
      </VueSlickCarousel>
    </div>

    <b-container class="mt-5 py-4">
      <b-row class="justify-content-md-center text-center">
        <b-col md="auto" class="h2">Latest Wishlist</b-col>
        <b-col md="auto"
          ><b-button variant="light" href="all-wishlist"
            >See all</b-button
          ></b-col
        >
      </b-row>
    </b-container>

    <div class="container-fluid content mb-5">
      <VueSlickCarousel v-bind="item_settings" v-if="latestFive.length > 0">
        <div
          v-for="itemInfo in latestFive"
          :key="itemInfo.id"
          style="height: 100%"
        >
          <!-- <b-card-group deck v-for="itemInfo in latestFive" :key="itemInfo.id"
      class="d-flex justify-content-center"> -->
          <!-- <div v-for="itemInfo in latestFive" :key="itemInfo.id" class="h-100" > -->
          <!-- <div> -->
          <!-- <div> -->

          <b-card
            class="mx-3"
            :title="itemInfo.itemName"
            :sub-title="itemInfo.date.toDate().toISOString().substring(0, 10)"
          >
            <b-card-text>
              {{ itemInfo.organisation }}
            </b-card-text>
            <!-- <b-card-text v-if="itemInfo.desc.length < 200"> {{ itemInfo.desc }} </b-card-text> -->
            <!-- <b-card-text v-else> {{ itemInfo.desc.substring(0,200)+"..." }} </b-card-text> -->
            <b-button
              @click="donate(itemInfo)"
              variant="outline-success"
              class="mr-2 mb-2"
              >Donate</b-button
            >
            <b-button
              href="#"
              variant="danger"
              @click="saveItem(itemInfo)"
              v-if="itemInfo.isSaved && isLoggedIn"
              class="mb-2 float-right"
            >
              ♥ Saved
            </b-button>
            <b-button
              type="button"
              variant="outline-danger"
              style="float: right;"
              @click="saveItem(itemInfo)"
              v-else-if="itemInfo.isSaved === false && isLoggedIn"
              class="mb-2 float-right"
            >
              ♡ Save
            </b-button>
          </b-card>

          <!-- </div> -->
          <!-- </div> -->
        </div>
      </VueSlickCarousel>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  updateDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore'
const db = getFirestore()

import { getUserFromCookie } from '@/helpers'
import { getAuth } from 'firebase/auth'

export default {
  name: 'MyComponent',
  components: { VueSlickCarousel },

  data() {
    return {
      banner_settings: {
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
      },

      item_settings: {
        arrows: true,
        dots: true,
        dotsClass: 'slick-dots custom-dot-class',
        pauseOnFocus: true,

        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },

      latestFive: [],

      isLoggedIn: false,
    }
  },

  asyncData({ req, redirect }) {
    if (process.server) {
      const user = getUserFromCookie(req)
      if (user) {
        const isLoggedIn = true
        return { isLoggedIn }
      }
    } else {
      const auth = getAuth()
      var firebaseuser = auth.currentUser
      console.log(firebaseuser)
      if (firebaseuser) {
        const isLoggedIn = true
        return { isLoggedIn }
      }
    }
  },

  computed: {
  },

  created() {
    this.getData()
  },

  methods: {
    async getData() {
      const wishlists = query(
        collection(db, 'Wishlists'),
        orderBy('ID', 'desc'),
        limit(5)
      )

      // const querySnapshot = await getDocs(wishlists);

      const unsubscribe = onSnapshot(wishlists, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, ' => ', doc.data());

          if (
            (this.latestFive.some(e => e.doc_id === doc.id)) && (this.latestFive.some(e => e.isSaved !== doc.data()['Item Saved?'])) ) {
              // means that item is already shown on page but item's saved status has been changed but not updated
              // console.log('inside changed saved item status')
              // console.log(doc.data()['Item Name'])
              // console.log('index: ', this.latestFive.findIndex(x => x.id === doc.data()['ID'])) // index of item with changed save status
              let item_index = this.latestFive.findIndex(x => x.id === doc.data()['ID'])
              this.latestFive[item_index].isSaved = doc.data()['Item Saved?']
          }

          else if (!this.latestFive.some(e => e.doc_id === doc.id)) {
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

            this.latestFive.push(obj)
            //     // console.log(obj)
          }

          
        })
      })

      // console.log(this.latestFive)
    },

    donate(itemInfo){
      this.$router.push({path: '/make-donation', query: {item: itemInfo }})
    },

    async saveItem(item) {
      // console.log(item.isSaved)
      // console.log(item)
      // console.log(this)
      const isSavedRef = doc(db, 'Wishlists', item.doc_id)
      // console.log(isSavedRef)

      if (item.isSaved) {
        item.isSaved = false

        await updateDoc(isSavedRef, {
          'Item Saved?': false,
        })

        this.$toast.open({
          message: 'Item removed from Saved Items',
          type: 'success',
          duration: 5000,
          dismissible: true,
          position: 'top',
        })
      } else {
        item.isSaved = true

        await updateDoc(isSavedRef, {
          'Item Saved?': true,
        })

        this.$toast.open({
          message: 'Item saved successfully',
          type: 'success',
          duration: 5000,
          dismissible: true,
          position: 'top',
        })
      }
      // console.log(item.isSaved)
    },
  },
}

/*
1. ID
2. Item Name
3. Item Category
4. Case Description
5. Organisation
6. Address
7. Area
8. PIC Name
9. PIC Email
10. PIC Number
11. Date Posted
12. Delivery Cost By
13. Item Saved?

*/
</script> 


<style>
.slick-track {
  display: flex !important;
}

.slick-slide {
  height: inherit !important;
}

.buttons {
  background-color: green;
}

/* nice nice visual effects */
.input-button {
  float: right;
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

.save_button {
  border-color: grey;
  color: grey;
  font-weight: bold;
  content: '\2661';
  float: right;
}

</style>




