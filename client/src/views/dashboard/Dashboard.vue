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
          class="--text-align-mid"
          height="250px"
          src="@/assets/waiting.jpg"
        >
          <v-card-title class="banner justify-center ma-15">
            Banking Queue System
          </v-card-title>
          <v-card-title class="justify-center">
            This a vertual waiting queue where you can make appointment while you wait in you car.</v-card-title>
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
            src="@/assets/acccounts.jpg"
          />

          <v-card-text class="text--primary">
            <div class="text-center my-2">
              Accounts
            </div>

            <div class="text-center my-2">
              Checking and Savings Accounts
            </div>
          </v-card-text>

          <div class="text-center my-2">
            <v-btn
              rounded
              color="secondary"
              dark
              to="/login"
            >
              Select
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
            src="@/assets/transcation.png"
          />

          <v-card-text class="text--primary">
            <div class="text-center my-2">
              Transcation
            </div>

            <div class="text-center my-2">
              Deposit or withdrawal from account
            </div>
          </v-card-text>

          <div class="text-center my-2">
            <v-btn
              rounded
              color="secondary"
              dark
              to="/login"
            >
              Select
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
            src="@/assets/credit card.jpg"
          />

          <v-card-text class="text--primary">
            <div class="text-center my-2">
              Credit Card
            </div>

            <div class="text-center my-2">
              Open a new Credit Card
            </div>
          </v-card-text>

          <div class="text-center my-2">
            <v-btn
              rounded
              color="secondary"
              dark
              to="/login"
            >
              Select
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
            src="@/assets/debit.png"
          />

          <v-card-text class="text--primary">
            <div class="text-center my-2">
              Debit Card
            </div>

            <div class="text-center my-2">
              Get a new debit card for your account
            </div>
          </v-card-text>

          <div class="text-center my-2">
            <v-btn
              rounded
              color="secondary"
              dark
              to="/login"
            >
              Select
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
            src="@/assets/transfer.png"
          />

          <v-card-text class="text--primary">
            <div class="text-center my-2">
              Transfer
            </div>

            <div class="text-center my-2">
              Move money between Accounts
            </div>
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
                    height="250"
                    width="300"
                    elevation="4"
                  >
                    <v-row
                      align="center"
                      justify="center"
                    >
                      <v-card-title class="headline pa-6">
                        Hi {{ wait.firstn }},
                      </v-card-title>
                      <v-card-text class="text-center pt-2">
                        You have joined the queue for:
                        <br>
                        <span
                          class="trantype text-center font-weight-black"
                        >
                          {{ wait.trantype }}
                        </span>
                      </v-card-text>
                      <div>
                        <v-btn
                          fab
                          dark
                          x-large
                        >
                          <span class="position">{{ i + 1 }}</span>
                        </v-btn>
                      </div>
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
          // location.reload()
        } catch (err) {
          console.log(err)
        }
      },
    },
  }
</script>
<style>
  .trantype {
    font-size:1.5em;
  }
  .position {
    font-size:4em;
  }
  .banner {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size:3.5em;
  }
</style>
