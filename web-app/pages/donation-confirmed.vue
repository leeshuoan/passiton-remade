<template>
  <div>
    <div class="text-center">
      <img
        src="~/assets/donation_man_woman.png"
        alt=""
        style="max-width: 600px;"
        class="w-100"
      />
    </div>

    <div class="mt-3 text-center py-4">
      <h2>Thank you for your donation!</h2>
      <h4>We will send you an email if the donation request is confirmed!</h4>
   
      <a class="mt-3 mb-5 mr-5 btn btn-success btn-md" href="/myDonations" role="button"
        >YOUR DONATIONS</a
      >
      <a class="mt-3 mb-5 ml-5 btn btn-success btn-md" href="/" role="button"

        >BACK TO HOME</a
      >
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
export default {}
</script>


<style scoped>
.before-enter {
  opacity: 0;
}

.enter {
  transition: opacity 2s ease;
}
</style>




