import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn } from '../services/authService'

// Import pages
import Home from '@/pages/Home.vue'
import BlogList from '@/pages/BlogList.vue'
import TagPosts from '@/pages/TagPosts.vue'
import About from '@/pages/About.vue'
import NotFound from '@/pages/NotFound.vue'
import AdminLogin from '@/pages/AdminLogin.vue'
import AdminDashboard from '@/pages/AdminDashboard.vue'
import AdminUsers from '@/pages/admin/AdminUsers.vue'
import AdminPosts from '@/pages/admin/AdminPosts.vue'
import AdminTags from '@/pages/admin/AdminTags.vue'
import Post from '@/pages/blog/Slug.vue'

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
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/posts',
    name: 'AdminPosts',
    component: AdminPosts,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/tags',
    name: 'AdminTags',
    component: AdminTags,
    meta: { requiresAuth: true }
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

// Navigation guard to check authentication for routes that require it
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if user is logged in
    if (!isLoggedIn()) {
      // Redirect to login page if not logged in
      next({ name: 'AdminLogin' })
    } else {
      next() // Allow access if logged in
    }
  } else {
    next() // Allow access for routes that don't require auth
  }
})

export default router
