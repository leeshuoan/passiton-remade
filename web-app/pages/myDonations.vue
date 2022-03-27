<template>
  <div>
    <h2 class="px-5 pt-5 pb-2 text-center">My Donations</h2>

    <div class="row mx-5 my-2">
        <div
          class="col-12 col-md-6 col-lg-4 mb-3 mx-0 border-dark"
          v-for="donated in donated_items"
          :key="donated.id"
        >
          <div class="card h-100">
            <div class="card-body">
              <div class="row">
                <div class="col-12 col-lg-8">
                  <h5 class="card-title">{{ donated.itemName }}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">
                    {{ donated.itemCat }}
                  </h6>
                  <p class="card-text" name="destination">
                    {{ donated.organization }}
                  </p>
                </div>
                <div class="col-12 col-xl-4">
                  <img :src="donated.itemPictureURL[0]" alt="" width="100px" v-if="donated.itemPictureURL"/>
                </div>
              </div>
              Status: {{ donated.status }}
            </div>
            <div class="d-grid gap-2 d-md-block py-3 px-3" v-if="donated.status == 'Approved'">
            <button class="btn btn-primary" type="button" v-if="donated.delivery == 'send-item-directly'" v-on:click="getDirections()">Get Directions</button>
            <button class="btn btn-primary" type="button" v-else onclick=" window.open('https://koalendar.com/e/schedule-a-pick-up-with-pass-it-on','_blank')">Book item pick up timing</button>
          </div>
          </div>
          
        </div>
    </div>

    <div>
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { getUserFromCookie } from '@/helpers'
import { getAuth } from 'firebase/auth'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
const db = getFirestore()

export default {
  created() {
    this.getData()
  },
  data() {
    return {
      destination: '',
      donated_items: [],
    }
  },
  

  asyncData({ req, redirect }) {
    if (process.server) {
      const user = getUserFromCookie(req)
      if (user) {
        const userid = user.user_id
        console.log(user)
        return { userid }
      }
      if (!user) {
        redirect('/login')
      }
    } else {
      const auth = getAuth()
      var firebaseuser = auth.currentUser
      if (firebaseuser) {
        const userid = firebaseuser.uid
        return { userid }
      }
      if (!firebaseuser) {
        redirect('/login')
      }
    }
  },

  methods: {
    getDirections() {
      console.log('=====DIRECTIONS====')
      this.destination = document.getElementsByName("destination")[0].innerText
      console.log(this.destination)
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${this.destination}`,'_blank'
      )
      // var postCode = ''
      // var postCodeElem =  document.getElementById("postCode").innerText
      // console.log(postCodeElem)
      // var start =  'Singapore 350105'
      // var end = postCodeElem
      // var panelElem = document.getElementById('right-panel')// panel that shows direction
      // panelElem.innerHTML = ""
      // var url = "https://maps.googleapis.com/maps/api/directions/json?origin=Singapore+178902&destination=Singapore+309462&key="
      // var xhttp = new XMLHttpRequest()
      //   xhttp.onreadystatechange = function() {
      //     if(this.readyState == 4 && this.status == 200){
      //       try{
      //         var data = JSON.parse(this.responseText)
      //         console.log(data)
      //       }
      //       catch(err){
      //         console.log(error)
      //       }
      //     }
      //   }
      //   xhttp.open("GET", url, true);
      //   xhttp.send();

      // var axios = require('axios');
      // var config = {
      //   method: 'get',
      //   url: '/directions-api/directions/json?origin=Singapore+178902&destination=Singapore+309462&key=',
      //   headers: {
      //     'Access-Control-Allow-Origin' : '*',
      //     'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      //   }
      // };

      // axios(config)
      // .then(function (response) {
      //   console.log(response.data)
      //   console.log(JSON.stringify(response.data));
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
      
     
      

      //         let api_endpoint = 'https://maps.googleapis.com/maps/api/directions/json?destination=Toronto&origin=Montreal&key=AIzaSyCUj69uVnRv4vDfeortkRHhcFC--KvBmps'
      //         axios.get(api_endpoint)
      //         .then(response =>{
      //             console.log(response.data)
      //         })
      //         .catch(error=>{
      //             console.log(error.message)
      //             if (error.response) {
      //   // Request made and server responded
      //   console.log(error.response.data);
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
      // } else if (error.request) {
      //   // The request was made but no response was received
      //   console.log(error.request);
      // } else {
      //   // Something happened in setting up the request that triggered an Error
      //   console.log('Error', error.message);
      // }
      //         })

      //         var config = {
      //         method: 'get',
      //         url: '/captcha-api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyCUj69uVnRv4vDfeortkRHhcFC--KvBmps',
      //         headers: {'Access-Control-Allow-Origin' : '*',
      //       'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'}
      //         };
      //         axios(config)
      //         .then(function (response) {
      //         console.log(JSON.stringify(response.data));
      //         })
      //         .catch(function (error) {
      //         console.log(error);
      // });
    },
    
  // async fetchSomething() {
  //   const ip = await this.$axios.$get('https://maps.googleapis.com/maps/api/directions/json?origin=Singapore+178902&destination=Singapore+309462&key=AIzaSyAzR533KCen0AQ_hjIYlLTRf27E2EAhLJk')
  //   this.ip = ip
  //   console.log(ip)
  // },
    async getData() {
      const user = this.userid
      console.log(user)
      const wishlists = query(
        collection(db, 'Donated Items'),
        where('user_id', '==', user)
      )
      const querySnapshot = await getDocs(wishlists)

      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data())

        let obj = {}
        obj['name'] = doc.data()['name']
        obj['contact'] = doc.data()['contact']
        obj['email'] = doc.data()['email']
        obj['postalCode'] = doc.data()['postalCode']
        obj['estate'] = doc.data()['estate']
        obj['address'] = doc.data()['address']
        obj['preferredContactTime'] = doc.data()['preferredContactTime']
        obj['itemName'] = doc.data()['itemName']
        obj['itemDescription'] = doc.data()['itemDescription']
        obj['itemCat'] = doc.data()['itemCat']
        obj['itemDimension'] = doc.data()['itemDimension']
        obj['itemPictureURL'] = doc.data()['itemPictureURL']
        obj['delivery'] = doc.data()['delivery']
        obj['status'] = doc.data()['status']
        obj['organization'] = doc.data()['organization']

        this.donated_items.push(obj)
        console.log(this.donated_items)
      })

      // console.log(this.savedItems)
    },
  },
}
</script>

