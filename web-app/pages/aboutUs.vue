<template>
	<div>
		<div class="row px-5 mx-0">
			<img
				src="~/assets/Donate-About-Us.jpg"
				alt=""
				class="w-100 h-100 col-lg-6 col-md-6 my-auto mx-auto order-md-last pt-lg-0"
				style="max-width: '150px'; max-height: '150px'"
				v-vpshow

				/>
			<div
                tag="div"
                name="left"
                class="jumbotron bg-white px-2 col-md-6 col-lg-6 mb-0 my-auto pt-sm-0 pb-sm-2 pt-md-3"
                
                v-vpleft
            >
				
				<h2>The Story of Pass-It-On</h2>
				<p class="lead">We want to make giving easier.</p>
				<p class="mt-3 text-justify" style="font-size:18px">
					Pass-It-On is a non-profit project started by Central Singapore CDC and managed by The Helping Hand . 
					The project seeks to provide a meaningful way to distribute unwanted, albeit useful items to benefit the needy (home appliances, home furniture, medical aids, mobility aids, learning aids etc).  
					Anyone, within Singapore, can donate, as long as the items are useful and in good working condition.
					<br><br>
					With Pass-It-On, your used item can be given a new lease of life, and can also better the life of the needy!                    <br><br>
				</p>          
			</div>
		</div>

		<div class="mt-5 px-5 text-center py-5">
			<h2> Pass-It-On connects the general public to the needy via Voluntary Welfare Organizations. </h2>
			<p class="mt-5" style="font-size:18px"> 
				Voluntary Welfare Organizations, also known as VWOs, are Family Service Centres and Senior Citizen Centres etc that take care of the needy. 
				VWOs registered with Pass-It-On can request items that the beneficiary wants. These items are known as “wishes”, which can be found on the Wish List tab. 
				You can refer to the full list of VWOs <a href="VWOlist">here</a>.
            </p>

			<img
                src="~/assets/PassItOnCycle.png"
                alt=""
                class="w-75 h-75 mx-auto my-3"
                style="max-width: '150px'; max-height: '150px'"
                v-vpshow

                />
		</div>
		<hr>
		<div class="mt-5 px-5 text-center py-5 bg-white">
			<h2> Pass-It-On helps to match what donors can offer with items that the needy community require  </h2>

			<p class="mt-5" style="font-size:20px"> 
                    Common categories on our wish list include, but are not limited to:
            </p>
			<!-- categories -->
			<div class="container mt-3" v-vpshow>
                <div class="row d-flex align-items-end"> 
                    <div class="col-lg-3 p-lg-3">
                        <img
                        class=" w-75 mx-auto my-3"
                        src="~/assets/clothes.png"
                        alt=""
                        />
                        <h5 style="text-align:center; margin-top: 10px; margin-bottom: 10px">Attire / Clothing</h5>
                    </div>
                    <div class="col-lg-3 col-md-12 p-lg-3 ">
                        <img
                        class=" w-75 mx-auto my-3"
                        src="~/assets/appliance.png"
                        alt=""
                        />
                        <h5 style="text-align:center; margin-top: 10px; margin-bottom: 10px"> Electrical Appliances</h5>
                    </div>
                    <div class="col-lg-3 p-lg-3">
                        <img
                        class=" w-75 mx-auto my-3"
                        src="~/assets/milk.png"
                        alt=""
                        />
                        <h5 style="text-align:center; margin-top: 10px; margin-bottom: 10px"> Infant / Children Items </h5>
                    </div>
					<div class="col-lg-3 p-lg-3">
                        <img
                        class=" w-75 mx-auto my-3"
                        src="~/assets/wheelchair.png"
                        alt=""
                        />
                        <h5 style="text-align:center; margin-top: 10px; margin-bottom: 10px"> Mobility Aids</h5>
                    </div>
                </div>

				<p>
					<a
						class="mt-3 btn btn-success btn-md"
						href="/wishlist"
						role="button"
						>See Wish List</a
					>
				</p>
            </div>
			<!-- end of categories-->
		</div>

		<hr>

		<!-- publications -->
		<div class="mt-5 text-center py-5"> 
			<h2 class="text-center mb-3"> Our Publications </h2>
			<div class="container mt-3" v-vpshow>
				<div class="row d-flex align-items-end"> 
					<div class="col-lg-4 p-lg-3">
						<a href="https://www.passiton.org.sg/passiton/slot/u13/about-us/voices_74.pdf">
							<img
							class=" w-75 mx-auto my-3"
							src="~/assets/voices_74_cover.jpg"
							alt=""
							/>
						</a>
                        <h5 style="text-align:center; margin-top: 10px; margin-bottom: 10px">Voices</h5>
                        <div style="margin-bottom: 10px; text-align:center">
							Issue 74, Mar 2015
						</div>
                    </div>
				
                    <div class="col-lg-4 p-lg-3">
						<a href="https://www.passiton.org.sg/passiton/slot/u13/about-us/voices.pdf">
							<img
							class=" w-75 mx-auto my-3"
							src="~/assets/voices_cover.jpg"
							alt=""
							/>
						</a>
                        <h5 style="text-align:center; margin-top: 10px; margin-bottom: 10px">Voices</h5>
                        <div style="margin-bottom: 10px; text-align:center">
							Issue 62, Jan 2012
						</div>
                    </div>
					<div class="col-lg-4 p-lg-3">
						<a href="https://www.passiton.org.sg/passiton/slot/u13/about-us/newpaper_20150222.pdf">
							<img
							class=" w-75 mx-auto my-3"
							src="~/assets/newpaper_20150222_cover.jpg"
							alt=""
							/>
						</a>
                        <h5 style="text-align:center; margin-top: 10px; margin-bottom: 10px"> The New Paper</h5>
                        <div style="margin-bottom: 10px; text-align:center">
							22 Feb 2015
						</div>
                    </div>                    
                </div>
			</div>
		</div>
		<!-- end of publications -->

		<div class="mt-5 px-5 text-center py-5" style="background-color:#F0FDF3">
			<h2> Ready to join us in this meaningful cause?   </h2>
			<h3 class="mt-5"> Start your journey by signing up here!  </h3>
			<p style="text-align: center;" class="mt-4">
                    <a class="mt-3 btn btn-success btn-md mx-2" href="/make-donation" role="button">Make a Donation Now!</a>
                </p>
		</div>
	<Footer></Footer>
	</div>
</template>

<script>
export default {
  
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
