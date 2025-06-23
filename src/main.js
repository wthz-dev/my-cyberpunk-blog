import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import progress from './utils/progress';

// Create Vue app
const app = createApp(App)

// Create and use Pinia
const pinia = createPinia()
app.use(pinia)

// Use router
app.use(router)

// Mount the app
app.mount('#app')

// Top progress bar integration with router
router.beforeEach((to, from, next) => {
  progress.start();
  next();
});
router.afterEach(() => {
  progress.finish();
});
