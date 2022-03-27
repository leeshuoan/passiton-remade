<template>
  <div>
    
    <div class="row px-5 mx-0 my-auto">
      <div
        tag="div"
        name="left"
        class="jumbotron bg-white px-2 col-md-6 col-lg-6 mb-0 my-auto"
        v-vpleft
      >
        <h2 mt-5>Spread the love. </h2>
        <h4 class="mt-4 text-justify">
          Grant a wish. Donate your pre-loved items. 
          <br>
          Be the reason someone smiles today.
        </h4>
        <b-button
          class="mt-3 btn btn-success btn-md"
          @click='donate'
          role="button"
          >Donate Now
        </b-button>
      </div>
      <img
        src="~/assets/Donation.jpg"
        alt=""
        class="w-100 h-100 col-lg-6 col-md-6 my-auto mx-auto"
        style="max-width: '150px'; max-height: '150px'"
        v-vpshow
      />
    </div>
    <!-- start new section -->
    <div class="mt-5 text-center py-5" style="background-color:#F0FDF3">
            <h1> Why Us? </h1>
            <div class="container mt-3" v-vpshow>
                <div class="row d-flex align-items-end"> 
                    <div class="col-lg-4 p-lg-3">
                        <img
                        class=" w-75 mx-auto my-3"
                        src="~/assets/community.png"
                        alt=""
                        />
                        <h5 style="text-align:center; margin-top: 10px; margin-bottom: 10px">Many VWO Partners</h5>
                    </div>
                    <div class="col-lg-4 col-md-12 p-lg-3 ">
                        <img
                        class=" w-75 mx-auto my-3"
                        src="~/assets/websecurity.png"
                        alt=""
                        />
                        <h5 style="text-align:center; margin-top: 10px; margin-bottom: 10px"> Secure </h5>
                        
                        
                    </div>
                    <div class="col-lg-4 p-lg-3">
                        <img
                        class=" w-75 mx-auto my-3"
                        src="~/assets/loving-community.png"
                        alt=""
                        />
                        <h5 style="text-align:center; margin-top: 10px; margin-bottom: 10px"> Growing Community </h5>
                    </div>
                </div>
            </div>
        </div>
      <!-- end new section -->
    <!-- testimonials -->
    <div class="container-fluid mt-4 mb-5 px-5">
      <h2 class="text-center mb-3"> Hear from our beneficiaries </h2>
      <VueSlickCarousel v-bind="testimonial_settings">        
        <div>          
          <b-card class="mb-2">
            <blockquote class="blockquote mb-0">
              <p class="px-3 py-3">
                It was in April this year that I sought help from As-Salaam Family Service Centre for used household items. I was then introduced to Pass It On by my family counselor. Only then did my family have basic household needs like refrigerator, washing machine, television and other simple things. The service has significantly benefited my family of 3 children and myself. I sincerely thank As-Salaam and Pass It On.
                </p>
              <footer class="blockquote-footer text-right px-3">
                Mdm D (35 years old) <br> 
              </footer>
            </blockquote>
          </b-card>
        </div>
        <div>
          <b-card class="mb-2">
            <blockquote class="blockquote mb-0">
              <p class="px-3 py-3">
                Our centre has been using Pass It On for the past few years and has found this service very beneficial to our low income clients. Our clients have received items like fridge, TV, computer etc through our posting of their wishes in this website. We also find the system very user-friendly with the various functions like posting wishlist, reserving available items and updating of reserved item status.
              </p>
              <footer class="blockquote-footer text-right px-3">
                Tan Li Ching (Ms) <br>
                <cite title="Source Title">Programme Coordinator <br> Daybreak Family Service Centre</cite>
              </footer>
            </blockquote>
          </b-card>
        </div>
        <div>
          <b-card class="mb-2">
            <blockquote class="blockquote mb-0">
              <p class="px-3 py-3">
                We have come across clients who do not have the privilege to enjoy the convenience of basic necessities. Pass It On provides a useful outlet for our officers to look out for items that our clients have personally requested for or are assessed to be in need of. This adds value to the service that we can provide for our clients, on top of providing other assistance for the needy.
              </p>
              <footer class="blockquote-footer text-right px-3">
                Ms Gin Chua <br>
                <cite title="Source Title">Manager (Social Services) <br>
                Central Singapore Community Development Council
                </cite>
              </footer>
            </blockquote>
          </b-card>
        </div>
        <div>
          <b-card class="mb-2">
            <blockquote class="blockquote mb-0">
              <p class="px-3 py-3">
                Pass it on has been a helpful avenue for me and my colleagues to reserve items for our clients. I have managed to use Pass It On to reserve a small television set for my elderly client. The act may not be significant to others, but it is by no means trivial to her. I will continue to use Pass It On for my clients.
              </p>
              <footer class="blockquote-footer text-right px-3">
                Lee Chee Chye <br>
                <cite title="Source Title">Manager (Social Services) <br>
                Central Singapore Community Development Council
                </cite>
              </footer>
            </blockquote>
          </b-card>
        </div>
        <div>
          <b-card class="mb-2">
            <blockquote class="blockquote mb-0">
              <p class="px-3 py-3">
                Our Centre works with single parent and step families, majority of whom are low income. Some of these families face crisis such as the need to search for new accommodation following a crisis like divorce and having to start from scratch in building their home and furnishing it. Pass It On comes in handy to help these families rebuild their life...
              </p>
              <footer class="blockquote-footer text-right px-3">
                Fatirah Bte Mohd Yasin <br>
                <cite title="Source Title">Admin Officer <br> 
                As-Salaam Family Support Centre</cite>
              </footer>
            </blockquote>
          </b-card>
        </div>
      </VueSlickCarousel>
    </div>
    <!-- end testimonial -->
    <Footer></Footer>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import { doc, setDoc } from 'firebase/firestore'

export default {

  name: 'MyComponent',
  components: { VueSlickCarousel },

  data() {
    return {
      testimonial_settings: {
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 10000,
      },
    }
  },
  methods: {
    donate() {
      this.$router.push('/make-donation')
    }
  }
}
</script>

<style scoped>
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
</style>
