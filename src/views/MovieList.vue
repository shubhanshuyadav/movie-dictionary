<template>
  <div>
    <v-container class="grey lighten-5 mb-6">
      <v-row align="end" class="pt-4">
        <v-col md="11" xs="11" sm="11" class="ma-0 pa-0" style="text-align:right">
            <input v-model="search" class="search_input" placeholder="Type movie title....." id="searches" list="suggestions"/>
            <datalist id="suggestions">
                <option v-for="item in recent_searches" :value="item" :key="item"/>
            </datalist>
        </v-col>
        <v-col md="1" xs="1" sm="1" class="ma-0 pa-0" style="text-align:right">
            <button class="search_input_btn" @click="searchMovies()">Search</button>
        </v-col>

      </v-row>
      <v-alert
        class="mt-4"
            v-if="error"
            color="error"
            type="error"
        >{{error_message}}</v-alert>
      <v-row no-gutters v-if="movies">
        <v-col md="3" sm="4" xs="6" class="pa-1" v-for="movie in movies.Search" :key="movie.imdbID">
          <v-card style="border:2px solid gray" :to="{name:'movie-details',params:{movie_id:movie.imdbID}}" hover :loading="loading" class="mx-auto my-12" max-width="374" height="auto" max-height="350px">
            <v-img
              height="100%"
              :src="movie.Poster"
              contain
            >
            <v-container class="grey lighten-5 ma-0 pa-0">
                <v-row
                    align="end"
                    no-gutters
                    style="height: 350px;"
                >
                    <v-col>
                    <v-card
                        color="transparent"
                        class="text-weight-bold"
                        style="color:white"
                        flat
                        width="100%"

                    >
                        <div class="headline movie-title-bg">{{movie.Title}}</div>
                    </v-card>
                    </v-col>
                </v-row>
                </v-container>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else no-gutters style="height: 100vh;" align="center">
          <v-col align-self="center">
              <v-alert
                class="mt-4"
                    v-if="success"
                    color="success"
                    type="success"
                >{{success_message}}</v-alert>
              <div v-else>Search your favorite movie from top......</div>
          </v-col>

      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      movies: null,
      error: false,
      error_message: null,
      success: false,
      success_message: null
    };
  },
  mounted() {
      this.showSuccess("Welcome "+this.loggedInUser.name)
  },
  computed: {
    loggedInUser: () => {
      return JSON.parse(localStorage.getItem("loggedInUser"));
    },
    recent_searches:() => {
        let searches = JSON.parse(localStorage.getItem("recentSearches"));
        if(!searches){
            return [];
        }
        return searches;
    }
  },
  methods: {
    async searchMovies() {
        try {
            if((!this.search)||this.search==""){
                throw new Error("At least one character required to search")
            }
            let movies = await this.axios
            .get("http://www.omdbapi.com/?apikey=4d3f75e4&s=" + this.search)
            .catch((err)=> {
                throw err;
            })
            .then((response) => {
                if(response.data.Error){
                    throw new Error(response.data.Error)
                }
                return response.data;
            });
            this.movies = movies;
            this.storeRecentSearches(this.search)
        }catch(error) {
            this.showError(error.message);
        }

    },

    storeRecentSearches(searchedStrings){
        let searches = this.recent_searches;
        let is_already_pushed = searches.indexOf(searchedStrings)!=-1;
        if(!is_already_pushed){
            searches.push(searchedStrings);
            localStorage.setItem('recentSearches',JSON.stringify(searches))
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
    showSuccess(message){
        this.success = true;
        this.success_message = message;
        setTimeout(() => {
            this.success = false;
            this.success_message = null;
        }, 2000);
    },
  },
};
</script>
<style scoped>
    .movie-title-bg {
        background: rgb(0 0 0 / 79%);
    }
    .search_input {
        border:2px solid gray;
        border-radius: 5px;
        height:40px;
        padding: 4px;
        width:100%
    }
    .search_input_btn{
        border:2px solid gray;
        border-radius: 5px;
        text-align: center;
        height:40px;
        padding: 4px;
        margin-left: 2px;
        width:100%
    }

</style>
