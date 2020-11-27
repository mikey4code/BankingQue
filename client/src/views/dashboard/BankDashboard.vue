<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
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
          <v-col
            cols="12"
            class="text-right"
          >
            <v-btn
              v-if="$store.state.isUserLoggedIn"
              color="success"
              class="mr-0"
              @click="nextCus"
            >
              Next Customer
            </v-btn>
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
      } catch (err) {
        console.log(err)
      }
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
      async nextCus () {
        try {
          const text = (await WaitingService.sendtext()).data
          console.log('hello', text)
          this.useracc = (await AccountService.useramount({
            accnumber: text.accnumber,
            amount: text.amount,
            trantype: text.trantype,
          })).data
          const del = await WaitingService.removeq()
          console.log('hello', del)
          location.reload()
        } catch (err) {
          console.log(err)
        }
      },
    },
  }
</script>
