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
                  <v-text-field
                    v-model="credit.trantype"
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
                    v-model="credit.firstn"
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
                    v-model="credit.lastn"
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
                    v-model="credit.address"
                    class="purple-input"
                    :rules="[required]"
                    label="Adress"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="credit.phone"
                    class="purple-input"
                    :rules="numberRules"
                    label="Phone Number"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="credit.license"
                    class="purple-input"
                    :rules="licenseRules"
                    label="License Number"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    v-model="credit.income"
                    class="purple-input"
                    :options="options"
                    :rules="[required]"
                    label="Income"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="credit.accnumber"
                    class="purple-input"
                    :rules="[required]"
                    label="Account Number"
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
                    @click="create"
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
  import CreditService from '@/services/CreditService'
  export default {
    data () {
      return {
        items: ['Credit'],
        options: ['25000 and less', '25000 and more', 'Between 50000 and 75000', 'Between 75000 and 100000', '100000 or more'],
        credit: {
          trantype: null,
          firstn: null,
          lastn: null,
          address: null,
          phone: null,
          license: null,
          income: null,
          accnumber: null,
        },
        error: null,
        valid: true,
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        numberRules: [
          v => !!v || 'Phone number is required',
          v => (v && v.length === 10) || 'Phone number must be equal to 10 digits',
        ],
        licenseRules: [
          v => !!v || 'License number is required',
          v => (v && v.length === 9) || 'License number must be equal to 9 digits',
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
          .keys(this.credit)
          .every(key => !!this.credit[key])
        if (!areAllFieldsFilledIn) {
          this.error = 'Please fill in all the required fields.'
          return
        }
        try {
          if (this.options === '25000 and less') {
            this.credit.limit = 12500
          }
          if (this.options === '25000 and more') {
            this.credit.limit = 15000
          }
          if (this.options === 'Between 50000 and 75000') {
            this.credit.limit = 25000
          }
          if (this.options === 'Between 75000 and 100000') {
            this.credit.limit = 37500
          }
          if (this.options === '100000 or more') {
            this.credit.limit = 50000
          }
          await CreditService.post(this.credit)
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
