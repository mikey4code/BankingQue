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
                    v-model="debit.trantype"
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
                    v-model="debit.firstn"
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
                    v-model="debit.address"
                    class="purple-input"
                    :rules="[required]"
                    label="Address"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="debit.phone"
                    class="purple-input"
                    :rules="numberRules"
                    label="Phone Number"
                    required
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="debit.license"
                    class="purple-input"
                    :rules="[required]"
                    label="License Number"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="City"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="debit.accnumber"
                    class="purple-input"
                    :rules="[required]"
                    label="Account Number"
                    required
                  />
                </v-col>
                <v-col>
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
  import DebitService from '@/services/DebitService'
  export default {
    data () {
      return {
        items: ['Debit'],
        debit: {
          trantype: null,
          firstn: null,
          lastn: null,
          address: null,
          phone: null,
          license: null,
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
          .keys(this.debit)
          .every(key => !!this.debit[key])
        if (!areAllFieldsFilledIn) {
          this.error = 'Please fill in all the required fields.'
          return
        }
        try {
          await DebitService.post(this.debit)
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
