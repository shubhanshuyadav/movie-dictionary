<template>
  <div>
    <v-container fluid fill-height>
      <v-row class="align-center justify-center">
        <v-col cols="12" sm="8" md="5">
          <v-card>
            <v-card-title primary-title class="justify-center">
              <v-icon size="80" color="primary">mdi-account-circle</v-icon>
            </v-card-title>
            <v-card-title primary-title class="justify-center">
              <h2>Login</h2>
            </v-card-title>
            <v-card-text class="pa-5">
              <v-form ref="form" v-model="isValid">
                <v-text-field
                  outline
                  label="Username"
                  name="user_name"
                  required
                ></v-text-field>
                <v-text-field
                  outlined
                  type="password"
                  label="Password"
                  required
                  name="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                large
                width="30%"
                color="primary"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  setup() {

  },
};
</script>
