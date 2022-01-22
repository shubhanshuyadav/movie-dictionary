import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../views/Auth.vue';
import MovieList from '../views/MovieList.vue';
import MovieDetails from "../views/MovieDetails.vue"

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/movies',
    name: 'movies',
    component: MovieList
  },
  {
    path: '/movie-details/:movie_id',
    name: 'movie-details',
    component: MovieDetails
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
