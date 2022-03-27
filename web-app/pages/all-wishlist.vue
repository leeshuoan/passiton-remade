<template>
  <div>
    <div class="container-fluid">
      <div>
        <div class="row mt-5 px-5 mx-0">
          <div
            tag="div"
            name="left"
            class="jumbotron bg-white pr-0 mb-0"
            v-vpleft
          >
            <h2>Wishlist</h2>
            <p class="mt-3">
              This is a list of items needed by the Voluntary Welfare
              Organisations. If you have an item the VWOs wished for, please
              click on the "I Can Donate!" button next to the item. Thank you.
              <br /><br />
              Note: Please do not make multiple responses to different wishlists
              if you have only one item to give away to one beneficiary.
            </p>

            <!-- if they arent signed in yet -->
            <div class="col-sm-6 input-group">
              <input
                type="text"
                class="form-control"
                id="Filter_Options"
                name="Filter_Options"
                placeholder="Search for item here"
                v-model="query"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row mx-3">
        <div class="col-lg-9 col-sm-12">
          <div class="row">
            <div
              class="col-xs-12 col-sm-12 col-lg-6 mb-2 card-group"
              v-for="itemInfo in filteredwishlists"
              :key="itemInfo.id"
            >
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{{ itemInfo.itemName }}</h5>
                  <small class="card-text category">{{ itemInfo.cat }}</small>
                  <p class="card-text">
                    {{ itemInfo.address }}<br /><a
                      style="cursor: pointer"
                      class="link-secondary"
                      @click="getDistance(itemInfo.address)"
                      >Check Distance</a
                    >
                  </p>
                  <p class="card-text" v-if="itemInfo.address == ''">
                    {{ itemInfo.organisation }}
                  </p>
                  <p class="card-text location">{{ itemInfo.area }}</p>
                  <small class="card-text">{{
                    itemInfo.date.toDate().toISOString().substring(0, 10)
                  }}</small>
                  <br />
                  <b-button
                    type="button"
                    class="btn btn-outline-success btn-light"
                    @click="donate(itemInfo)"
                  >
                    Donate
                  </b-button>
                  <b-button
                    type="button"
                    class="btn saved_button"
                    @click="saveItem(itemInfo)"
                    v-if="itemInfo.isSaved && isLoggedIn"
                  >
                    ♥ Saved
                  </b-button>
                  <b-button
                    type="button"
                    variant="outline-danger"
                    style="float: right"
                    @click="saveItem(itemInfo)"
                    v-else-if="itemInfo.isSaved === false && isLoggedIn"
                  >
                    ♡ Save
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-sm-12 order-first order-lg-last">
          <div class="accordion" role="tablist">
            <b-card no-body class="mb-1 border border-success">
              <b-card-header class="p-1 bg-white" role="tab">
                <b-button
                  block
                  v-b-toggle.accordion-1
                  variant="white"
                  class="text-success accordion-btn"
                  style="text-align: left"
                  @click="makeActive(1)"
                  >Category
                  <font-awesome-icon
                    :icon="['fas', 'angle-down']"
                    style="float: right; position: relative; top: 0.15em"
                    :class="{ 'icon-active': accordion1_active }"
                  />
                </b-button>
              </b-card-header>
              <b-collapse
                id="accordion-1"
                accordion="accordion1"
                role="tabpanel"
              >
                <b-card-body>
                  <b-card-text>
                    <div class="form-check text-dark">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        name=""
                        id="check1"
                        value="Clothes"
                        v-model="checkedCategories"
                      />
                      <label class="form-check-label" for="check1">
                        Clothes
                      </label>
                    </div>
                    <div class="form-check text-dark">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        name=""
                        id="check2"
                        value="Baby Items"
                        v-model="checkedCategories"
                      />
                      <label class="form-check-label" for="check2">
                        Baby Items
                      </label>
                    </div>
                    <div class="form-check text-dark">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        name=""
                        id="check3"
                        value="Home Appliances"
                        v-model="checkedCategories"
                      />
                      <label class="form-check-label" for="check3">
                        Home Appliances
                      </label>
                    </div>
                    <div class="form-check text-dark">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        name=""
                        id="check4"
                        value="Kitchen Utility Items"
                        v-model="checkedCategories"
                      />
                      <label class="form-check-label" for="check4">
                        Kitchen Items
                      </label>
                    </div>
                  </b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>
            <b-card no-body class="mb-1 border border-success">
              <b-card-header class="p-1 bg-white" role="tab">
                <b-button
                  block
                  v-b-toggle.accordion-2
                  variant="white"
                  class="text-success accordion-btn"
                  style="text-align: left"
                  @click="makeActive(2)"
                  >Sort By
                  <font-awesome-icon
                    :icon="['fas', 'angle-down']"
                    style="float: right; position: relative; top: 0.15em"
                    :class="{ 'icon-active': accordion2_active }"
                  />
                </b-button>
              </b-card-header>
              <b-collapse
                id="accordion-2"
                accordion="accordion2"
                role="tabpanel"
              >
                <b-card-body>
                  <b-card-text>
                    <div class="form-check">
                      <label class="form-check-label text-dark">
                        <input
                          type="radio"
                          class="form-check-input"
                          name="sortBy"
                          id=""
                          value="newestFirst"
                          v-model="sortBy"
                        />
                        Date posted: newest first
                      </label>
                    </div>
                    <div class="form-check">
                      <label class="form-check-label text-dark">
                        <input
                          type="radio"
                          class="form-check-input"
                          name="sortBy"
                          id=""
                          value="oldestFirst"
                          v-model="sortBy"
                        />
                        Date posted: oldest first
                      </label>
                    </div>
                    <!-- <div class="form-check">
                      <label class="form-check-label text-dark">
                        <input
                          type="radio"
                          class="form-check-input"
                          name="sortBy"
                          id=""
                          value="closest"
                          v-model="sortBy"
                        />
                        Distance: closest to you
                      </label>
                    </div> -->
                  </b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import {
  doc,
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
} from 'firebase/firestore'
const db = getFirestore()

import { getUserFromCookie } from '@/helpers'
import { getAuth } from 'firebase/auth'
export default {
  data() {
    return {
      isLoggedIn: false,
      accordion1_active: false,
      accordion2_active: false,
      allwishlists: [],
      checkedCategories: [],
      sortBy: [],
      query: '',
      distanceSort: [],
    }
  },
  created() {
    this.getData()
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
      if (firebaseuser) {
        const isLoggedIn = true
        return { isLoggedIn }
      }
    }
  },

  methods: {
    async getData() {
      const wishlists = query(
        collection(db, 'Wishlists'),
        orderBy('ID', 'desc')
      )

      const querySnapshot = await getDocs(wishlists)

      querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());

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

        this.allwishlists.push(obj)
      })
    },

    makeActive(num) {
      const active_accordion = `accordion${num}_active`
      this[active_accordion] = !this[active_accordion]
    },

    saveItem(item) {
      // console.log(item.isSaved)
      const isSavedRef = doc(db, 'Wishlists', item.doc_id)
      if (item.isSaved) {
        item.isSaved = false

        updateDoc(isSavedRef, {
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

        updateDoc(isSavedRef, {
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

    donate(itemInfo) {
      this.$router.push({ path: '/make-donation', query: { item: itemInfo } })
    },

    getDistance(address) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function success(position) {
          // for when getting location is a success
          console.log(
            'latitude',
            position.coords.latitude,
            'longitude',
            position.coords.longitude
          )
          console.log(position)
          address = encodeURIComponent(address)

          var config = {
            method: 'get',
            url:
              '/directions-api/distancematrix/json?origins=' +
              position.coords.latitude +
              '%2C' +
              position.coords.longitude +
              '&destinations=' +
              address +
              '&mode=driving&key=',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods':
                'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
          }
          var config2 = {
            method: 'get',
            url:
              '/directions-api/distancematrix/json?origins=' +
              position.coords.latitude +
              '%2C' +
              position.coords.longitude +
              '&destinations=' +
              address +
              '&mode=transit&key=',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods':
                'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
          }
          const axios = require('axios')
          axios(config).then(function (response) {
            console.log(response.data)
            let distance = response.data.rows[0].elements[0].distance.text
            let driving_time = response.data.rows[0].elements[0].duration.text
            axios(config2).then(function (response2) {
              let transit_time = response2.data.rows[0].elements[0].duration.text
              alert(`Distance from you: ${distance}
Travel time (Driving): ${driving_time}
Travel time (Public transport): ${transit_time}`)
            })
            // let i = 0
            // for (let place of response.data.rows[0].elements) {
            //   vwodistances[i]['distance'] = place.distance
            //   i++
            // }
            // vwodistances.sort(function (a, b) {
            //   return (
            //     parseFloat(a.distance.text.split('km')) -
            //     parseFloat(b.distance.text.split('km'))
            //   )
            // })
            // return vwodistances
          })
        })
      } else {
        prompt('Geolocation is not supported by this browser.')
      }
    },
  },

  computed: {
    filteredwishlists() {
      let res = []
      const items = this.allwishlists
      if (this.checkedCategories.length > 0) {
        for (let item of items) {
          if (this.checkedCategories.includes(item.itemCat)) {
            res.push(item)
          }
        }
      } else {
        res = items
      }
      if (this.sortBy.length > 0) {
        if (this.sortBy == 'newestFirst') {
          res.sort(function (a, b) {
            return b.date.seconds - a.date.seconds
          })
        } else if (this.sortBy == 'oldestFirst') {
          res.sort(function (a, b) {
            return a.date.seconds - b.date.seconds
          })
        } else if (this.sortBy == 'closest') {
        }
      }
      if (this.query) {
        let tmp = []
        for (let result of res) {
          let itemName = result.itemName.toUpperCase()
          let query = this.query.toUpperCase()
          if (itemName.includes(query)) {
            tmp.push(result)
          }
        }
        res = tmp
      }
      return res
    },
  },
}
</script>

<style scoped>
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

.accordion-btn:focus {
  outline: none;
  box-shadow: none;
}

.icon-active {
  transform: rotate(180deg);
}
</style>