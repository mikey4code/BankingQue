<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-banner
      v-if="!$store.state.isUserLoggedIn"
    >
      <v-card
        class="mx-auto"
      >
        <v-img
          class="white--text align-end"
          height="300px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title
            class="justify-center"
          >Banking Queue System</v-card-title>
        </v-img>
      </v-card>
    </v-banner>

    <v-row>
      <v-col
        v-if="!$store.state.isUserLoggedIn"
        cols="12"
        md="6"
      >
        <v-card
          class="ml-auto py-1 primary"
          max-width="400"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>Checking & Saving</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            Number 10
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>

          <div class="text-center my-2">
            <v-btn
              rounded
              color="secondary"
              dark
              to="/login"
            >
              Get started
            </v-btn>
          </div>
        </v-card>
      </v-col>

      <v-col
        v-if="!$store.state.isUserLoggedIn"
        cols="12"
        md="6"
      >
        <v-card
          class="mr-auto py-1 primary"
          max-width="400"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>Transaction</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            Number 10
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>

          <div class="text-center my-2">
            <v-btn
              rounded
              color="secondary"
              dark
              to="/login"
            >
              Get started
            </v-btn>
          </div>
        </v-card>
      </v-col>

      <v-col
        v-if="!$store.state.isUserLoggedIn"
        cols="12"
        md="4"
      >
        <v-card
          class="mx-auto py-1 primary"
          max-width="400"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>Credit Card</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            Number 10
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>

          <div class="text-center my-2">
            <v-btn
              rounded
              color="secondary"
              dark
              to="/login"
            >
              Get started
            </v-btn>
          </div>
        </v-card>
      </v-col>

      <v-col
        v-if="!$store.state.isUserLoggedIn"
        cols="12"
        md="4"
      >
        <v-card
          class="mx-auto py-1 primary"
          max-width="400"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>Debit</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            Number 10
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>

          <div class="text-center my-2">
            <v-btn
              rounded
              color="secondary"
              dark
              to="/login"
            >
              Get started
            </v-btn>
          </div>
        </v-card>
      </v-col>

      <v-col
        v-if="!$store.state.isUserLoggedIn"
        cols="12"
        md="4"
      >
        <v-card
          class="mx-auto py-1 primary"
          max-width="400"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>Transfer</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            Number 10
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>

          <div class="text-center my-2">
            <v-btn
              rounded
              color="secondary"
              dark
              to="/login"
            >
              Get started
            </v-btn>
          </div>
        </v-card>
      </v-col>

      <v-col
        v-if="$store.state.isUserLoggedIn"
        cols="12"
      >
        <base-material-card
          color="primary"
          icon="mdi-clipboard-plus"
          title="Waiting Queue"
          class="px-5 py-3"
        >
          <v-col
            cols="12"
          >
            <v-sheet
              class="mx-auto"
            >
              <v-slide-group
                v-model="waiting"
                class="pa-4"
                show-arrows
              >
                <v-slide-item
                  v-for="(wait, i) in waiting"
                  :key="i"
                >
                  <v-card
                    color="primary"
                    class="ma-4"
                    height="200"
                    width="300"
                  >
                    Next in line {{ i + 1 }}
                    <v-row
                      class="fill-height"
                      align="center"
                      justify="center"
                    >
                      <v-card-title class="headline">
                        {{ wait.firstn }}
                      </v-card-title>

                      <v-card-subtitle>
                        {{ wait.firstn }}
                        {{ wait.lastn }}
                        {{ wait.phone }}
                        {{ wait.firstn }}
                        {{ wait.firstn }}
                      </v-card-subtitle>
                    </v-row>
                  </v-card>
                </v-slide-item>
              </v-slide-group>
            </v-sheet>
          </v-col>
          <v-col
            cols="12"
            class="text-right"
          >
            <v-btn
              v-if="$store.state.isUserLoggedIn"
              color="blue"
              class="mr-0"
              @click="optout"
            >
              Exit Queue
            </v-btn>
          </v-col>
        </base-material-card>
      </v-col>

      <div class="py-3" />

      <v-col
        v-if="$store.state.isUserLoggedIn"
        cols="12"
      >
        <base-material-card
          color="primary"
          icon="mdi-clipboard-plus"
          title="View Account"
          class="px-5 py-3"
        >
          <v-col
            cols="12"
          >
            <v-sheet
              class="mx-auto"
            >
              <v-slide-group
                v-model="model"
                class="pa-4"
                show-arrows
              >
                <v-slide-item
                  v-for="(account, index) in useracc"
                  :key="index"
                >
                  <v-card
                    color="primary"
                    class="mx-3"
                    width="300"
                  >
                    <v-card-title>
                      {{ account.trantype }}
                      {{ account.accnumber }}
                      {{ account.id }}
                    </v-card-title>
                    <br>
                    <v-card-subtitle>
                      Amount : {{ account.amount }}
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-btn
                        color="blue"
                        rounded
                        @click="navigateTo({name: 'account', params:{
                          accountId: account.id
                        }})"
                      >
                        View
                      </v-btn>
                    </v-card-actions>
                    <v-card-actions>
                      <v-btn
                        color="blue"
                        rounded
                        @click="navigateTo({name: 'editaccount', params:{
                          accountId: account.id
                        }})"
                      >
                        Edit
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-slide-item>
              </v-slide-group>
            </v-sheet>
          </v-col>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import WaitingService from '@/services/WaitingService'
  import AccountService from '@/services/AccountService'

  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        waiting: [],
        model: null,
        useracc: [],
      }
    },
    computed: {
      ...mapState([
        'isUserLoggedIn',
        'user',
      ]),
    },
    async mounted () {
      try {
        this.waiting = (await WaitingService.index()).data
        if (this.$store.state.isUserLoggedIn) {
          this.useracc = (await AccountService.useracc({
            UserId: this.$store.state.user.id,
          })).data
        }
      } catch (err) {
        console.log(err)
      }
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
      navigateTo (route) {
        this.$router.push(route)
      },
      async optout () {
        try {
          const del = await WaitingService.exitqueue({
            UserId: this.$store.state.user.id,
          })
          console.log('hello', del)
          location.reload()
        } catch (err) {
          console.log(err)
        }
      },
    },
  }
</script>
