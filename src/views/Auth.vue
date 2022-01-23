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
                    v-model="username"
                  outline
                  label="Username"
                  name="user_name"
                  required
                ></v-text-field>
              </v-form>
            <v-alert
                v-if="error"
                color="error"
                type="error"
            >{{error_message}}</v-alert>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                large
                width="30%"
                color="primary"
                @click="login"
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
  data() {
      return {
          username: '',
          error: false,
          error_message: '',
          isValid:false
      }
  },

  methods: {
      async fetchUsers(){
        return this.axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
            return response.data
        })
      },

      async login(){
          let available_users = await this.fetchUsers();

          let _this = this
          // Find the username in available users data
          let existing_user = available_users.find( user => {
              return user.username == _this.username
          })

          if(!existing_user){
              this.showError("User not found");
          }

          if(existing_user){
              this.onSuccessFullLogin(existing_user)
          }
      },

      showError(message){
          this.error = true;
          this.error_message = message;
          setTimeout(() => {
              this.error = false;
              this.error_message = null;
          }, 2000);
      },

      onSuccessFullLogin(user){
          localStorage.setItem('isLoggedIn',true);
          localStorage.setItem('loggedInUser',JSON.stringify(user));
          this.$router.push({
            name: 'movies'
        })
      }
  }
};
</script>
