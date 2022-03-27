<template>
  <div>
    <div class="container">
      <transition name="popup">
        <div v-if="showP" class="popup">
          Verification email has been sent to your inbox.<br />
          Please verify to log in!
        </div>
      </transition>
      <div class="row pl-md-3">
        <div class="col-lg-6 mt-5">
          <form class="w-100" @submit.prevent="onSubmit">
            <h4 class="text-success mt-2 mb-4">Create your account</h4>
            <div class="form-group font-weight-light mb-4">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Your name"
                v-model="fullname"
              />
            </div>
            <div class="form-group font-weight-light mb-4">
              <label for="email">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Your e-mail address"
                v-model="email"
              />
            </div>
            <div class="form-group font-weight-light mb-4">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <div class="form-group font-weight-light mb-4">
              <label for="confirm_password">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                placeholder="Confirm Password"
                v-model="confirmpassword"
              />
            </div>
            <div class="error mb-2" v-if="error">{{ error }}</div>
            <!-- <div
              class="container w-100 bg-light border mb-4"
              style="height: 40px; border-radius: 5px"
            >
              <div class="row" style="margin-top: 7px">
                <div class="col-2">
                  <input
                    type="checkbox"
                    style="transform: scale(2)"
                    class="my-auto"
                  />
                </div>
                <div class="col-7 text-left">
                  <span>I'm not a robot</span>
                </div>
                <div class="col-3 text-right">
                  <img
                    src="~/assets/recaptcha-logo-F67B135544-seeklogo.com.png"
                    alt=""
                    style="width: 40px"
                  />
                </div>
              </div>
            </div> -->
            <recaptcha
              @error="onError"
              @success="onSuccess"
              @expired="onExpired"
            />
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
              Sign Up
            </button>
            <p class="text-center">
              <small
                >Already have an account?
                <a class="text-success font-weight-bold" href="/login"
                  >Log in</a
                ></small
              >
            </p>
          </form>
        </div>
        <div class="col-lg-6 my-auto">
          <img
            src="~/assets/people-with-box-basket.jpg"
            alt=""
            class="img-fluid"
          />
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from 'firebase/auth'

export default {
  data() {
    return {
      fullname: '',
      email: '',
      password: '',
      confirmpassword: '',
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
      if (this.fullname == '') {
        this.error = 'Please enter your name'
        return
      }
      try {
          const token = await this.$recaptcha.getResponse()
          const response = await fetch(`/captcha-api/siteverify?secret=&response=${token}`, {
            method: 'POST',       
            body: JSON.stringify({
              token,
              email: this.email,
              password: this.password,
            }),
          }).then((res) => res.json())
          

          console.log('Server Response: ', response)
          


          await this.$recaptcha.reset()
        } catch (error) {
          if (error == 'Failed to execute') {
            this.error = 'Please complete the reCAPTCHA'
            return
          }
          console.log('Login error:', error)
        }
        if (this.password == this.confirmpassword) {
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            const user = userCredential.user
            updateProfile(auth.currentUser, {
              displayName: this.fullname,
            })
            sendEmailVerification(auth.currentUser).then(() => {
              this.setupPopup()
            })
            signOut(auth).then(() => {})
          })
          .catch((error) => {
            if (error.code == 'auth/weak-password') {
              this.error = 'The password you entered is too weak'
            } else if (error.code == 'auth/email-already-in-use') {
              this.error = 'The email you entered is already in use'
            } else if (error.code == 'auth/invalid-email') {
              this.error = 'The email you entered is invalid'
            } else {
              this.error = error.code
            }
          })
      } else {
        this.error = 'Your passwords do not match!'
      }
    },
    setupPopup() {
      this.showP = true
      setTimeout(() => (this.showP = false), 3000)
    },
    onSuccess(token) {
      console.log('Succeeded:', token, email, password)
    },

    onExpired() {
      console.log('Expired')
    },
  },
}
</script>

<style scoped>
input#name {
  background-image: url(~@/assets/name.png);
  background-size: 25px;
  background-repeat: no-repeat;
  background-position: 3px center;
  text-indent: 30px;
  padding: 5px 3px;
  transition: 0.3s;
}
input#name:focus {
  background-image: none;
  text-indent: 0px;
}

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

input#password,
input#confirm-password {
  background-image: url(~@/assets/password.png);
  background-size: 25px;
  background-repeat: no-repeat;
  background-position: 3px center;
  text-indent: 30px;
  padding: 5px 3px;
  transition: 0.3s;
}
input#password:focus,
input#confirm-password:focus {
  background-image: none;
  text-indent: 0px;
}

.error {
  color: red;
}

.popup {
  color: white;
  background-color: #5cb85c;
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
