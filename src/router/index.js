import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../views/Auth.vue';
import MovieList from '../views/MovieList.vue';
import MovieDetails from "../views/MovieDetails.vue"

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
    meta: {
			layout: 'AuthLayout',
		},
  },
  {
    path: '/movies',
    name: 'movies',
    component: MovieList,
    meta: {
			layout: 'AppLayout',
		},
  },
  {
    path: '/movie-details/:movie_id',
    name: 'movie-details',
    component: MovieDetails,
    meta: {
			layout: 'AppLayout',
		},
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//Navigation Guards: Check authenticated routes
router.beforeEach((to, from, next) => {
  let isAuthenticated = localStorage.getItem('isLoggedIn')
  if (to.name == 'Auth' && isAuthenticated) next({ name: 'movies' })
  if (to.name != 'Auth' && !isAuthenticated) next({ name: 'Auth' })
  next()
})
export default router
