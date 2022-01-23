<template>
  <div>
    <v-container class="grey lighten-5 mb-6">
      <v-row>
        <v-col md="11">
          <v-text-field
            v-model="search"
            label="Search Movie"
            placeholder="Type movie title....."
            rounded
            append-outer-icon="mdi-send"
          ></v-text-field>
        </v-col>
        <v-col md="1">
          <v-btn elevation="2" @click="searchMovies()">Search</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters v-if="movies">
        <v-col md="3" class="pa-1" v-for="movie in movies.Search" :key="movie.imdbID">
          <v-card :to="{name:'movie-details',params:{movie_id:movie.imdbID}}" hover :loading="loading" class="mx-auto my-12" max-width="374" max-height="300px">
            <v-img
              height="100%"

              :src="movie.Poster"
              contain
            >
            <v-container class="grey lighten-5 ma-0 pa-0">
                <v-row
                    align="end"
                    no-gutters
                    style="height: 300px;"
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
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      movies: null
    };
  },
  computed: {
    loggedInUser: () => {
      return JSON.parse(localStorage.getItem("loggedInUser"));
    },
  },
  methods: {
    async searchMovies() {
      let movies = await this.axios
        .get("http://www.omdbapi.com/?apikey=4d3f75e4&s=" + this.search)
        .then((response) => {
          return response.data;
        });
      console.log(movies);
      this.movies = movies;
    },
  },
};
</script>
<style scoped>
    .movie-title-bg {
        background: rgb(0 0 0 / 79%);
    }
</style>
