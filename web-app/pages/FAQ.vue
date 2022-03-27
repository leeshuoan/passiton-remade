<template>
	<div>
		<div class=" px-5 mx-0 text-center">
			<img
                class="img-fluid mx-auto"
				src="~/assets/FAQ.jpg"
				alt=""
				v-vpshow

				/>
		</div>

		<div class="mt-5 px-5 text-center py-5" style="background-color:#F0FDF3">
			<!-- start of accordion -->
            <h2> Frequently Asked Questions </h2>
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
                    >What is Pass-It-On?
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
                                <div style="text-align:justify">
                                    Pass-It-On was started by the Central Singapore CDC and is managed by The Helping Hand. Pass-It-On connects General Public to the needy via Voluntary Welfare Organizations (VWOs). Pass-It-On provides a web platform by channelling the donated items to the needy under the VWOs (for example, Family Service Centres and Senior Citizen Centres) care. 
                                    <br><br>
                                    Anyone, within Singapore, can donate, as long as the items are useful and of good working condition.    
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
                        >Who are the beneficiaries?
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
                                    <div style="text-align:justify">
                                            The beneficiaries of Pass-It-On are the needy who are taken care of by Voluntary Welfare Organisations (VWOs).
                                    </div>
                            </b-card-text>
                        </b-card-body>
                    </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border border-success">
                <b-card-header class="p-1 bg-white" role="tab">
                    <b-button
                    block
                    v-b-toggle.accordion-3
                    variant="white"
                    class="text-success accordion-btn"
                    style="text-align: left"
                    @click="makeActive(3)"
                    >What is the difference between granting a wishlist and donating items?
                    <font-awesome-icon
                        :icon="['fas', 'angle-down']"
                        style="float: right; position: relative; top: 0.15em"
                        :class="{ 'icon-active': accordion3_active }"
                    />
                    </b-button>
                </b-card-header>
                <b-collapse
                    id="accordion-3"
                    accordion="accordion3"
                    role="tabpanel"
                >
                    <b-card-body>
                    <b-card-text>
                        <div style="text-align:justify">
                                Wishlists are items that the beneficiaries taken care of by Voluntary Welfare Organisations (VWOs) have expressed need for. 
                                If you decide to grant a wish list, the VWO will receive a notification and contact you shortly after to confirm details of item donation. 
                                We strongly encourage you to look through the wishlist <a href="all-wishlist">here</a> to determine if your item is a fit for the beneficiaries. 
                                <br><br>
                                On the other hand, if you decide to donate an item that is not on the wishlist, the item will be offered on the portal to be reserved by VWOs if needed.
                        </div>
                    </b-card-text>
                    </b-card-body>
                </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border border-success">
                <b-card-header class="p-1 bg-white" role="tab">
                    <b-button
                    block
                    v-b-toggle.accordion-4
                    variant="white"
                    class="text-success accordion-btn"
                    style="text-align: left"
                    @click="makeActive(4)"
                    >Must my item be brand new?
                    <font-awesome-icon
                        :icon="['fas', 'angle-down']"
                        style="float: right; position: relative; top: 0.15em"
                        :class="{ 'icon-active': accordion4_active }"
                    />
                    </b-button>
                </b-card-header>
                <b-collapse
                    id="accordion-4"
                    accordion="accordion4"
                    role="tabpanel"
                >
                    <b-card-body>
                    <b-card-text>
                        <div style="text-align:justify">
                                It'll be great if your item is brand new. However, it is <b> not neccesssary </b> for your item to brand new. 
                                Items just have to be fully functional and there can be signs of usage. 
                        </div>
                    </b-card-text>
                    </b-card-body>
                </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border border-success">
                <b-card-header class="p-1 bg-white" role="tab">
                    <b-button
                    block
                    v-b-toggle.accordion-5
                    variant="white"
                    class="text-success accordion-btn"
                    style="text-align: left"
                    @click="makeActive(5)"
                    >Can I donate multiple items?
                    <font-awesome-icon
                        :icon="['fas', 'angle-down']"
                        style="float: right; position: relative; top: 0.15em"
                        :class="{ 'icon-active': accordion5_active }"
                    />
                    </b-button>
                </b-card-header>
                <b-collapse
                    id="accordion-5"
                    accordion="accordion5"
                    role="tabpanel"
                >
                    <b-card-body>
                    <b-card-text>
                        <div style="text-align:justify">
                            We are thrilled to hear that you have multiple items to donate. 
                            Please fill in the form for every item that you would like to donate. 
                        </div>
                    </b-card-text>
                    </b-card-body>
                </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border border-success">
                <b-card-header class="p-1 bg-white" role="tab">
                    <b-button
                    block
                    v-b-toggle.accordion-6
                    variant="white"
                    class="text-success accordion-btn"
                    style="text-align: left"
                    @click="makeActive(6)"
                    >Does Pass-It-On have storage facilities?
                    <font-awesome-icon
                        :icon="['fas', 'angle-down']"
                        style="float: right; position: relative; top: 0.15em"
                        :class="{ 'icon-active': accordion6_active }"
                    />
                    </b-button>
                </b-card-header>
                <b-collapse
                    id="accordion-6"
                    accordion="accordion6"
                    role="tabpanel"
                >
                    <b-card-body>
                    <b-card-text>
                        <div style="text-align:justify">
                            No, Pass-It-On will only link donors up with VWOs and we do not provide storage facilities for the items that you would like to donate. 
                        </div>
                    </b-card-text>
                    </b-card-body>
                </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border border-success">
                <b-card-header class="p-1 bg-white" role="tab">
                    <b-button
                    block
                    v-b-toggle.accordion-7
                    variant="white"
                    class="text-success accordion-btn"
                    style="text-align: left"
                    @click="makeActive(7)"
                    >How do items transfer hands?
                    <font-awesome-icon
                        :icon="['fas', 'angle-down']"
                        style="float: right; position: relative; top: 0.15em"
                        :class="{ 'icon-active': accordion7_active }"
                    />
                    </b-button>
                </b-card-header>
                <b-collapse
                    id="accordion-7"
                    accordion="accordion7"
                    role="tabpanel"
                >
                    <b-card-body>
                    <b-card-text>
                        <div style="text-align:justify">
                            To transport an item to VWO/beneficiary, donors can:
                            <ul class="pl-5">
                                <li> Pay for the collection fee  </li>
                                <li> Send the item directly to the VWO/beneficiary or </li>
                                <li> Request for collection/delivery to be paid by the VWO </li>
                            </ul>
                            
                            We <b>strongly recommend donor to pay for the transportation </b> of donated items as it helps beneficiaries save on costs and assists VWOs in their work.
                            <br><br>
                            If the VWO allows, you may send smaller items on your own. For bigger items, VWOs can engage movers at subsidized rates with assistance from the VWOs.
                            Please check with the VWO on rates and associated costs. The price guide can be found <a href="https://www.passiton.org.sg/pio/slot/u13/moving-service/Pass%20It%20On%20-%20Rates%20and%20Terms%20for%20movers%20vs3.1.pdf">here </a> 
                            You may use external service providers to schedule the move as well.
                        </div>
                    </b-card-text>
                    </b-card-body>
                </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border border-success">
                <b-card-header class="p-1 bg-white" role="tab">
                    <b-button
                    block
                    v-b-toggle.accordion-8
                    variant="white"
                    class="text-success accordion-btn"
                    style="text-align: left"
                    @click="makeActive(8)"
                    >I have an item that I want to give away immediately. Are there services to arrange for this?
                    <font-awesome-icon
                        :icon="['fas', 'angle-down']"
                        style="float: right; position: relative; top: 0.15em"
                        :class="{ 'icon-active': accordion8_active }"
                    />
                    </b-button>
                </b-card-header>
                <b-collapse
                    id="accordion-8"
                    accordion="accordion8"
                    role="tabpanel"
                >
                    <b-card-body>
                    <b-card-text>
                        <div style="text-align:justify">
                            We are unable to process urgent requests as the duration of donation process depends on whether your item is required by VWO/beneficiaries. 
                            <br>
                            We suggest avoiding last minute giving. Coordination and arranging for transportation require more time especially if you’re going to:
                            <ul class="pl-5">
                                <li> Relocate to another country or move to another place </li>
                                <li> Renovate the home where some items will no longer fit </li>
                                <li> Replace a used item to make way for a newer or different one </li>
                            </ul>
                        </div>    
                    </b-card-text>
                    </b-card-body>
                </b-collapse>
                </b-card>
            </div>
            <!-- end of accordion -->
		</div>
	<Footer></Footer>
	</div>
</template>

<script>

export default {
    data() {
    return {
        accordion1_active: false,
        accordion2_active: false,
        accordion3_active: false,
        accordion4_active: false,
        accordion5_active: false,
        accordion6_active: false,
        accordion7_active: false,
        accordion8_active: false,
    }
  },

    methods: {
        makeActive(num) {
            const active_accordion = `accordion${num}_active`
            this[active_accordion] = !this[active_accordion]
            console.log(this[active_accordion])
            },
    },
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

.carousel {
            width: 400px;
        }
.accordion-btn:focus {
  outline: none;
  box-shadow: none;
}

.icon-active {
  transform: rotate(180deg);
}
</style>
