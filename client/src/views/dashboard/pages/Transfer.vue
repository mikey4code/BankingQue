<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Edit Profile
            </div>

            <div class="subtitle-1 font-weight-light">
              Complete your profile
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    v-model="transfer.trantype"
                    class="purple-input"
                    :rules="[required]"
                    :items="items"
                    label="Transaction Type"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="transfer.firstn"
                    class="purple-input"
                    :rules="nameRules"
                    label="First Name"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="transfer.lastn"
                    class="purple-input"
                    :rules="nameRules"
                    label="Last Name"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="transfer.accnnumber"
                    class="purple-input"
                    :rules="[required]"
                    label="Account Number"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="transfer.recipn"
                    class="purple-input"
                    :rules="[required]"
                    label="Recipient"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="transfer.amount"
                    class="purple-input"
                    :rules="ammountRules"
                    label="Amount"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                  >
                    Update Profile
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import TransferService from '@/services/TransferService'
  export default {
    data () {
      return {
        items: ['Checkings', 'Savings'],
        transfer: {
          trantype: null,
          firstn: null,
          lastn: null,
          accnumber: null,
          recipn: null,
          amount: null,
        },
        error: null,
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        ammountRules: [
          v => !!v || 'Amount is required',
          v => /.+$.+\..+/.test(v) || 'Amount must be in dollars',
        ],
        required: (values) => !!values || 'Required.',
      }
    },
    computed: {
      ...mapState([
        'isUserLoggedIn',
      ]),
    },
    methods: {
      async create () {
        this.error = null
        const areAllFieldsFilledIn = Object
          .keys(this.transfer)
          .every(key => !!this.transfer[key])
        if (!areAllFieldsFilledIn) {
          this.error = 'Please fill in all the required fields.'
          return
        }
        try {
          console.log('create tansfer ', this.transfer)
          await TransferService.post(this.transfer)
          this.$router.push({
            name: 'dashboard',
          })
        } catch (error) {
          this.error = error.response.data.error
        }
      },
    },
  }
</script>

<style scoped>
</style>
