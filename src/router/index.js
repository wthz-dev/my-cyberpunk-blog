import { createRouter, createWebHistory } from 'vue-router'

// Import pages
import Home from '@/pages/Home.vue'
import BlogList from '@/pages/BlogList.vue'
import Post from '@/pages/Post.vue'
import TagPosts from '@/pages/TagPosts.vue'
import About from '@/pages/About.vue'
import NotFound from '@/pages/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog',
    name: 'BlogList',
    component: BlogList
  },
  {
    path: '/blog/:slug',
    name: 'Post',
    component: Post,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/tags/:tag',
    name: 'TagPosts',
    component: TagPosts,
    props: true
  },
  {
    // 404 page
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // Always scroll to top
    return { top: 0 }
  }
})

export default router
