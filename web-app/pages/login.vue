<template>
  <div>
    <div class="container d-block pt-4">
      <transition name="popup">
        <div v-if="showP" class="popup">
          Your email has not yet been verified!
        </div>
      </transition>
      <div class="row">
        <form class="px-5 mx-auto mt-5 col-lg-6" @submit.prevent="onSubmit">
          <h4 class="text-success mb-3 text-center">Log In</h4>
          <p class="mb-2 text-center">Please enter your email and password</p>
          <div class="form-group font-weight-light mb-4">
            <input
              type="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="E-mail"
              v-model="email"
            />
          </div>
          <div class="form-group font-weight-light mb-0">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              aria-describedby="forgotpw"
              v-model="password"
            />
          </div>
          <small
            id="forgotpw"
            class="form-text text-right text-muted mb-3 font-italic"
            ><a href="/forgetpw" class="font-light text-muted"
              >Forgot Password?</a
            ></small
          >
          <br />
          <div class="error text-center" v-if="error">{{ error }}<br /></div>
          <br />
          <button
            type="submit"
            class="
              btn btn-white
              text-success
              font-weight-bold
              border border-success
              mb-3
              w-100
            "
            style="border-radius: 10px"
          >
            Log In
          </button>
          <p class="text-center">
            <small
              >Not registered yet?
              <a class="text-success font-weight-bold w-100" href="/signup"
                >Sign Up</a
              ></small
            >
          </p>
        </form>
      </div>
      <div class="text-center">
        <img src="~/assets/community.png" alt="" width="260px" />
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      showP: false,
    }
  },
  methods: {
    onError(error) {
      console.log('Error happened:', error)
    },

    async onSubmit() {
      this.error = ''
      const auth = getAuth()
      console.log(this.email)
      console.log(this.password)
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          const user = auth.currentUser
          const emailVerified = user.emailVerified
          if (!emailVerified) {
            this.setupPopup()
            signOut(auth).then(() => {})
          } else {
            this.$router.push('/')
          }
        })
        .catch((error) => {
          console.log(error)
          if (error.code == 'auth/invalid-email') {
            this.error = 'The email you entered is invalid'
          } else if (error.code == 'auth/user-not-found') {
            this.error = 'User not found with the given email address'
          } else if (error.code == 'auth/wrong-password') {
            this.error = 'Wrong Password'
          } else if (error.code == 'auth/too-many-requests') {
            this.error =
              'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later'
          } else {
            this.error = error.message
          }
        })
    },
    setupPopup() {
      this.showP = true
      setTimeout(() => (this.showP = false), 3000)
    },

    onSuccess(token) {
      console.log('Succeeded:', token)
    },

    onExpired() {
      console.log('Expired')
    },
  },
}
</script>

<style scoped>
input#email {
  background-image: url(~@/assets/email.png);
  background-size: 25px;
  background-repeat: no-repeat;
  background-position: 3px center;
  text-indent: 30px;
  padding: 5px 3px;
  transition: 0.3s;
}
input#email:focus {
  background-image: none;
  text-indent: 0px;
}

input#password {
  background-image: url(~@/assets/password.png);
  background-size: 25px;
  background-repeat: no-repeat;
  background-position: 3px center;
  text-indent: 30px;
  padding: 5px 3px;
  transition: 0.3s;
}
input#password:focus {
  background-image: none;
  text-indent: 0px;
}

.error {
  color: red;
}

.popup {
  color: white;
  background-color: #f93154;
  padding: 10px;
  text-align: center;
  position: fixed;
  width: 30%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  left: 35%;
  z-index: 1;
}

.popup-enter,
.popup-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}

.popup-enter-active,
.popup-leave-active {
  transition: 0.3s ease all;
}
</style>