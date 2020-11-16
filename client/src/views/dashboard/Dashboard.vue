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
                    color="green"
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
                        color="orange lighten-2"
                        text
                        @click="navigateTo({name: 'account', params:{
                          accountId: account.id
                        }})"
                      >
                        View
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-slide-item>
              </v-slide-group>
            </v-sheet>
          </v-col>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="warning"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Employees Stats
            </div>

            <div class="subtitle-1 font-weight-light">
              New employees on 15th September, 2016
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items"
            />
          </v-card-text>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <base-material-card class="px-5 py-3">
          <template v-slot:heading>
            <v-tabs
              v-model="tabs"
              background-color="transparent"
              slider-color="white"
            >
              <span
                class="subheading font-weight-light mx-3"
                style="align-self: center"
              >Tasks:</span>
              <v-tab class="mr-3">
                <v-icon class="mr-2">
                  mdi-bug
                </v-icon>
                Bugs
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">
                  mdi-code-tags
                </v-icon>
                Website
              </v-tab>
              <v-tab>
                <v-icon class="mr-2">
                  mdi-cloud
                </v-icon>
                Server
              </v-tab>
            </v-tabs>
          </template>

          <v-tabs-items
            v-model="tabs"
            class="transparent"
          >
            <v-tab-item
              v-for="n in 3"
              :key="n"
            >
              <v-card-text>
                <template v-for="(task, i) in tasks[tabs]">
                  <v-row
                    :key="i"
                    align="center"
                  >
                    <v-col cols="1">
                      <v-list-item-action>
                        <v-checkbox
                          v-model="task.value"
                          color="secondary"
                        />
                      </v-list-item-action>
                    </v-col>

                    <v-col cols="9">
                      <div
                        class="font-weight-light"
                        v-text="task.text"
                      />
                    </v-col>

                    <v-col
                      cols="2"
                      class="text-right"
                    >
                      <v-icon class="mx-1">
                        mdi-pencil
                      </v-icon>
                      <v-icon
                        color="error"
                        class="mx-1"
                      >
                        mdi-close
                      </v-icon>
                    </v-col>
                  </v-row>
                </template>
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
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
        dailySalesChart: {
          data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
              [12, 17, 7, 17, 23, 18, 38],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        dataCompletedTasksChart: {
          data: {
            labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
            series: [
              [230, 750, 450, 300, 280, 240, 200, 190],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        emailsSubscriptionChart: {
          data: {
            labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],

            ],
          },
          options: {
            axisX: {
              showGrid: false,
            },
            low: 0,
            high: 1000,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0,
            },
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                },
              },
            }],
          ],
        },
        headers: [
          {
            sortable: false,
            text: 'ID',
            value: 'id',
          },
          {
            sortable: false,
            text: 'Name',
            value: 'name',
          },
          {
            sortable: false,
            text: 'Salary',
            value: 'salary',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Country',
            value: 'country',
            align: 'right',
          },
          {
            sortable: false,
            text: 'City',
            value: 'city',
            align: 'right',
          },
        ],
        items: [
          {
            id: 1,
            name: 'Dakota Rice',
            country: 'Niger',
            city: 'Oud-Tunrhout',
            salary: '$35,738',
          },
          {
            id: 2,
            name: 'Minerva Hooper',
            country: 'Curaçao',
            city: 'Sinaai-Waas',
            salary: '$23,738',
          },
          {
            id: 3,
            name: 'Sage Rodriguez',
            country: 'Netherlands',
            city: 'Overland Park',
            salary: '$56,142',
          },
          {
            id: 4,
            name: 'Philip Chanley',
            country: 'Korea, South',
            city: 'Gloucester',
            salary: '$38,735',
          },
          {
            id: 5,
            name: 'Doris Greene',
            country: 'Malawi',
            city: 'Feldkirchen in Kārnten',
            salary: '$63,542',
          },
        ],
        tabs: 0,
        tasks: {
          0: [
            {
              text: 'Sign contract for "What are conference organizers afraid of?"',
              value: true,
            },
            {
              text: 'Lines From Great Russian Literature? Or E-mails From My Boss?',
              value: false,
            },
            {
              text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              value: false,
            },
            {
              text: 'Create 4 Invisible User Experiences you Never Knew About',
              value: true,
            },
          ],
          1: [
            {
              text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              value: true,
            },
            {
              text: 'Sign contract for "What are conference organizers afraid of?"',
              value: false,
            },
          ],
          2: [
            {
              text: 'Lines From Great Russian Literature? Or E-mails From My Boss?',
              value: false,
            },
            {
              text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              value: true,
            },
            {
              text: 'Sign contract for "What are conference organizers afraid of?"',
              value: true,
            },
          ],
        },
        list: {
          0: false,
          1: false,
          2: false,
        },
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
