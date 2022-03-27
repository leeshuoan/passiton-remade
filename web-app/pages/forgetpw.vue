<template>
  <div class="container d-block pt-4">
    <transition name="popup">
      <div v-if="showP" class="popup">
        Password reset email has been sent! Please check your inbox
      </div>
    </transition>
    <div class="text-center">
      <img
        src="~/assets/forgot password.png"
        alt=""
        width="260px"
        class="mt-3"
      />
    </div>
    <div class="row">
      <form class="px-5 mx-auto mt-5 col-lg-6" @submit.prevent="pressed">
        <h4 class="text-success mb-3 text-center">
          Forgot your Password?
        </h4>
        <p class="mb-4 text-center text-muted">
          Enter your e-mail address and we'll send you a link to reset your
          password.
        </p>
        <div class="error text-center" v-if="error">{{ error }}</div>

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
          Send Link
        </button>
        <p class="text-center">
          <small
            >Back to
            <a class="text-success font-weight-bold pb-5" href="/login"
              >Log In</a
            >
          </small>
        </p>
      </form>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

export default {
  data() {
    return {
      email: '',
      error: '',
      showP: false,
    }
  },
  methods: {
    pressed() {
      const auth = getAuth()
      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          this.setupPopup()
        })
        .catch((error) => {
          this.error = error
        })
    },
    setupPopup() {
      this.showP = true
      setTimeout(() => (this.showP = false), 3000)
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

.popup {
  color: white;
  background-color: #5cb85c;
  padding: 10px;
  text-align: center;
  position: absolute;
  width: 30%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  left: 35%;
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
