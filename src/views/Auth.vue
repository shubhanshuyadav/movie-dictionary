<template>
  <div>
    <v-container fluid >
      <v-row no-gutters  style="height: 100vh;text-align:-webkit-center" align="center" >
        <v-col align-self="center">
          <v-card width="50%">
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
                    :rules="[searchRule]"
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
          isValid:false,
          searchRule: [
                v => !!v || 'At least one character is required to search',
            ],
      }
  },

  methods: {
      async fetchUsers(){
        return this.axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
            return response.data
        })
      },

      async login(){
          try {
            if((!this.username)||(this.username=="")){
                return this.showError("Username is required");
            }
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
          }catch(err){
              this.showError(err.message);
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
