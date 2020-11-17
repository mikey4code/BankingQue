<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        v-if="!$store.state.isUserLoggedIn"
        cols="12"
      >
        <base-material-card
          color="green"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              GET STARTED
            </div>

            <div class="subtitle-1 font-weight-light">
              Login or Register to access more feather !
            </div>
          </template>
          <v-card-text>
            <v-container
              class="pa-0"
              fluid
            >
              <v-row
                align="center"
              >
                hello welcome to banking queue
                click here login
                <v-btn
                  elevation="5"
                  rounded
                  x-large
                  to="/login"
                >LOGIN</v-btn>
                dont have have an account ?
                then click here to get started
                <v-btn
                  elevation="5"
                  rounded
                  x-large
                  to="/register"
                >REGISTER</v-btn>
              </v-row>
            </v-container>
          </v-card-text>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
      >
        <base-material-card
          color="success"
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
        </base-material-card>
      </v-col>

      <div class="py-3" />

      <v-col
        cols="12"
      >
        <base-material-card
          color="success"
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
    },
  }
</script>
