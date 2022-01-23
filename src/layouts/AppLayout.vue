<template>
  <v-app id="inspire">

    <v-app-bar
      class="pl-0"
      min-height="40px"
      dense
      extension-height="20px"
    >
      <template v-slot:default>
        <v-container class="mx-auto my-0 pr-0">
          <v-row >
            <!-- Logo -->
            <div class="d-flex ">
              <v-card
                color="transparent"
                href="/"
                flat
                link
                rounded="0"
                class=" py-1 pl-3 pr-5 "
              >
                <v-img :width="'40px'" contain src="@/assets/logo.png"></v-img>
              </v-card>
            </div>



            <v-spacer></v-spacer>

            <!-- Logout -->
            <v-btn
              height="30px"
              rounded
              class="mr-2"
              color="primary"
              @click="logout"
              >Logout</v-btn
            >
          </v-row>
        </v-container>
      </template>



    </v-app-bar>
    <!-- Main component -->
    <v-main >
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name:"AppLayout",
  methods: {
      logout() {
          if(confirm("Are you sure you want to logout?")){
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("recentSearches");
            this.$router.push({name:"Auth"})
          }


      }
  }
};
</script>
