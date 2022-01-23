<template>
  <div class="pa-2">
    <v-row v-if="movie" class="mt-2">
      <v-col md="5">
        <v-card
          hover
          :loading="loading"
          class="mx-auto"
          width="100%"
          height="auto"
        >
          <v-img height="100%" :src="movie.Poster" contain> </v-img>
        </v-card>
      </v-col>
      <v-col md="7">
        <v-row align="start" class="mt-1">
          <v-card>
            <v-card-text>
              <v-card-title class="ma-0 pa-0">
                {{ movie.Title }}
              </v-card-title>
              <v-row align="center pa-2">
                <v-rating
                  :value="movie.imdbRating"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="">
                  {{ movie.imdbRating }} ({{ movie.imdbVotes }})
                </div>
              </v-row>
            </v-card-text>
            <div class="pl-4" style="text-align: left;">{{ movie.Plot }}</div>
            <v-divider class="mt-4"></v-divider>
            <v-card-text style="text-align: left;">
              <v-row>
                <v-col md="3">
                  <div>Director:</div>
                </v-col>
                <v-col md="9">
                  <div>{{ movie.Director }}</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="3">
                  <div>Writer:</div>
                </v-col>
                <v-col md="9">
                  <div>{{ movie.Writer }}</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="3">
                  <div>Actors</div>
                </v-col>
                <v-col md="9">
                  <div>{{ movie.Actors }}</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="3">
                  <div>Production:</div>
                </v-col>
                <v-col md="9">
                  <div>{{ movie.Production }}</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="3">
                  <div>Released At:</div>
                </v-col>
                <v-col md="9">
                  <div>{{ movie.Released }}</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="3">
                  <div>Country:</div>
                </v-col>
                <v-col md="9">
                  <div>{{ movie.Country }}</div>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      movie: null
    };
  },
  mounted(){
      this.getMovieByImdbId()
      console.log(this.$route.params)
  },
  methods: {
      async getMovieByImdbId(){
          this.axios.get("http://www.omdbapi.com/?apikey=4d3f75e4&i=" + this.$route.params.movie_id)
          .then((response)=> {
              this.movie = response.data;
          })
      }
  }
};
</script>
