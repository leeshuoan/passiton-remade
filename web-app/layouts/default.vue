<template>
  <div>
    <header v-bind:class="{ 'scrolled-nav': scrolledNav }">
      <nav>
        <div class="branding" @click="$router.push('/')">
          <img src="~/assets/passiton.png" />
        </div>

        <!-- Nav -->
        <div class="navigation" v-show="!mobile">
          <NuxtLink to="/" class="link"><span>Home</span></NuxtLink>
          <NuxtLink to="/wishlist" class="link"><span>WishList</span></NuxtLink>
          <NuxtLink to="/make-donation" class="link"
            ><span>Donate</span></NuxtLink
          >

          <!-- About Dropdown -->
          <div class="dropdown">
            <NuxtLink to="/aboutUs" class="link main-link">
              <span>
                About
                <font-awesome-icon
                  :icon="['fas', 'angle-down']"
                  style="float: right; position: relative; top: 0.15em"
                  class="angle-icon"
                />
              </span>
            </NuxtLink>
            <div class="dropdown-content">
              <NuxtLink to="/aboutUs" class="link"
                ><span>About Us</span></NuxtLink
              >

              <NuxtLink to="/VWOlist" class="link"
                ><span>VWOlist</span></NuxtLink
              >
              <NuxtLink to="/FAQ" class="link"><span>FAQ</span></NuxtLink>
            </div>
          </div>

          <!-- Profile Dropdown -->
          <div v-if="loggedIn">
            <div class="dropdown">
              <NuxtLink to="/saved-items" class="link main-link">
                <span>
                  My Profile
                  <font-awesome-icon
                    :icon="['fas', 'angle-down']"
                    style="float: right; position: relative; top: 0.15em"
                    class="angle-icon"
                  />
                </span>
              </NuxtLink>
              <div class="dropdown-content">
                <NuxtLink to="/saved-items" class="link"
                  ><span>saved items</span></NuxtLink
                >
                <NuxtLink to="/myDonations" class="link"
                  ><span>my donation</span></NuxtLink
                >
                <div @click="logout" class="link">
                  <span>Logout</span>
                </div>
              </div>
            </div>
          </div>

          <NuxtLink to="/login" class="link" v-else>
            <span>Login</span>
          </NuxtLink>
        </div>

        <!-- Mobile Nav -->
        <div class="icon" ref="icon">
          <font-awesome-icon
            @click="toggleMobileNav"
            v-show="mobile"
            :icon="['fas', 'bars']"
            :class="{ 'icon-active': mobileNav }"
          />
        </div>
        <transition name="mobile-nav">
          <div class="dropdown-nav" v-show="mobileNav" ref="mobileNav">
            <NuxtLink to="/" class="link"><span>Home</span></NuxtLink>
            <NuxtLink to="/wishlist" class="link"
              ><span>WishList</span></NuxtLink
            >
            <NuxtLink to="/make-donation" class="link"
              ><span>Donate</span></NuxtLink
            >

            <!-- Mobile About Dropdown -->
            <div class="mobile-dropdown">
              <NuxtLink to="/aboutUs" class="link main-link"
                ><span
                  >About
                  <font-awesome-icon
                    :icon="['fas', 'angle-down']"
                    style="float: right; margin-top: 3px; margin-right: 20px"
                    class="angle-icon" /></span
              ></NuxtLink>
              <div class="mobile-dropdown-content">
                <NuxtLink to="/aboutUs" class="link"
                  ><span>About Us</span></NuxtLink
                >
                <NuxtLink to="/VWOlist" class="link"
                  ><span>VWOlist</span></NuxtLink
                >
                <NuxtLink to="/FAQ" class="link"><span>FAQ</span></NuxtLink>
              </div>
            </div>

            <div class="mobile-dropdown" v-if="loggedIn">
              <NuxtLink to="/saved-items" class="link main-link">
                <span>
                  My Profile
                  <font-awesome-icon
                    :icon="['fas', 'angle-down']"
                    style="float: right; margin-top: 3px; margin-right: 20px"
                    class="angle-icon" /></span
              ></NuxtLink>
              <div class="mobile-dropdown-content">
                <NuxtLink to="/saved-items" class="link"
                  ><span>saved items</span></NuxtLink
                >
                <NuxtLink to="/myDonations" class="link"
                  ><span>my donation</span></NuxtLink
                >
                <div @click="logout" class="link">
                  <span>Logout</span>
                </div>
              </div>
            </div>

            <NuxtLink to="/login" class="link" v-else>
              <span>Login</span></NuxtLink
            >
          </div>
        </transition>
      </nav>
    </header>

    <Nuxt class="nuxt" />
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import Cookies from 'js-cookie'

export default {
  mounted() {
    window.addEventListener('scroll', this.updateScroll, { passive: true })
    window.addEventListener('resize', this.checkScreen, { passive: true })
    window.addEventListener('click', this.checkClickOut, { passive: true })
    this.setupFirebase()
    this.checkScreen()
  },
  data() {
    return {
      loggedIn: false,
      scrolledNav: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    }
  },
  methods: {
    logout() {
      var logout = confirm('Are you sure to logout?')
      if (logout) {
        var auth = getAuth()
        signOut(auth).then(() => {
          this.$router.push('/')
        })
      }
    },
    setupFirebase() {
      var auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.loggedIn = true
          auth.currentUser.getIdToken(true).then((token) => {
            Cookies.set('access_token', token)
          })
        } else {
          this.loggedIn = false
          Cookies.remove('access_token')
        }
      })
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav
    },
    checkScreen() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth <= 870) {
        this.mobile = true
        return
      }
      this.mobile = false
      this.mobileNav = false
      return
    },
    updateScroll() {
      const scrollPosition = window.scrollY
      if (scrollPosition > 50) {
        this.scrolledNav = true
        return
      }
      this.scrolledNav = false
    },
    checkClickOut(event) {
      if (
        this.$refs.mobileNav.contains(event.target) ||
        this.$refs.icon.contains(event.target)
      ) {
      } else {
        this.mobileNav = false
      }
    },
  },
}
</script>


<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
}

.nuxt {
  margin-top: 90px;
}

header {
  background-color: white;
  top: 0px;
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: 0.5s ease all;
  color: black;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

nav {
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 12px 0;
  transition: 0.5s ease all;
  width: 90%;
  margin: 0 auto;
  @media (min-width: 1140px;) {
    max-width: 1140px;
  }
}

.navigation,
.link {
  font-weight: 500;
  color: black;
}

.link {
  text-transform: uppercase;
  padding: 13px;
  padding-left: 29px;
  color: black;
}

.link span {
  transition: 0.5s ease all;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
}

.link:hover {
  color: #5cb85c;
  cursor: pointer;
  text-decoration: none;
}

.nuxt-link-exact-active {
  color: #5cb85c;
}

.branding {
  display: flex;
  align-items: center;
}

.branding:hover {
  cursor: pointer;
}

.branding img {
  width: 100px;
  transition: 0.5s ease all;
}

.icon {
  display: flex;
  position: absolute;
  top: 0;
  align-items: center;
  right: 24px;
  height: 100%;
}

.icon svg {
  cursor: pointer;
  font-size: 24px;
  transition: 0.8s ease all;
}

.icon-active {
  transform: rotate(180deg);
}

.navigation {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
}

body {
  margin: 0;
  padding: 0;
}

.dropdown-nav {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  max-width: 250px;
  height: 100%;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  top: 0;
  left: 0;
}

.dropdown-nav link {
  margin-left: 0;
  color: white;
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: 1s ease all;
}

.mobile-nav-enter,
.mobile-nav-leave-to {
  transform: translateX(-250px);
}

.mobile-nav-enter-to {
  transform: translateX(0);
}

.scrolled-nav {
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.scrolled-nav nav {
  padding: 4px 0;
}

.scrolled-nav nav .branding src {
  width: 40px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Dropdown Nav */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 160px;
  margin-top: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .main-link {
  color: #5cb85c;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .angle-icon {
  transform: rotate(180deg);
}

.dropdown .angle-icon {
  transition: 0.5s;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}

/* Mobile */
.mobile-dropdown {
  display: inline-block;
  padding: 13px 0px;
}

.mobile-dropdown-content {
  display: none;
  background-color: white;
  min-width: 160px;
  margin-top: 10px;
  border-radius: 5px;
  z-index: 1;
}

.mobile-dropdown-content a, .mobile-dropdown-content div {
  color: black;
  text-decoration: none;
  display: block;
  background-color: #eee;
}

.mobile-dropdown-content a:hover, .mobile-dropdown-content div:hover {
  background-color: #ddd;
}

.mobile-dropdown:hover .mobile-dropdown-content {
  display: block;
}

.mobile-dropdown:hover .mobile-dropbtn {
  background-color: #3e8e41;
}

.mobile-dropdown:hover .main-link {
  color: #5cb85c;
}

.mobile-dropdown:hover .angle-icon {
  transform: rotate(180deg);
}

.mobile-dropdown .angle-icon {
  transition: 0.5s;
}
</style>
