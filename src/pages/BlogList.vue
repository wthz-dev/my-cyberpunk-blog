<template>
  <div class="py-12">
    <div class="container mx-auto px-4">
      <h1 class="font-orbitron text-4xl md:text-5xl font-bold mb-8">
        <span class="text-cyber-blue">//</span> BLOG
      </h1>
      
      <!-- Filter by tag -->
      <div class="mb-8">
        <div class="flex flex-wrap gap-2">
          <button 
            @click="selectedTag = null" 
            class="text-sm font-share-tech-mono px-3 py-1 rounded"
            :class="selectedTag === null ? 'bg-cyber-blue text-cyber-dark' : 'bg-cyber-dark-lighter text-cyber-gray hover:text-cyber-blue'"
          >
            ALL
          </button>
          <button 
            v-for="tag in allTags" 
            :key="tag" 
            @click="selectedTag = tag"
            class="text-sm font-share-tech-mono px-3 py-1 rounded"
            :class="selectedTag === tag ? 'bg-cyber-pink text-cyber-dark' : 'bg-cyber-dark-lighter text-cyber-gray hover:text-cyber-pink'"
          >
            #{{ tag }}
          </button>
        </div>
      </div>
      
      <!-- Blog posts grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="post in filteredPosts" 
          :key="post.id" 
          class="cyber-card overflow-hidden group"
        >
          <!-- Post image -->
          <div class="relative h-48 overflow-hidden">
            <img 
              :src="post.image" 
              :alt="post.title" 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent opacity-70"></div>
            <div class="absolute bottom-0 left-0 right-0 p-4">
              <div class="flex flex-wrap gap-2 mb-2">
                <router-link 
                  v-for="tag in post.tags" 
                  :key="tag" 
                  :to="`/tags/${tag}`" 
                  class="text-xs font-share-tech-mono text-cyber-pink hover:text-cyber-blue transition-colors"
                >
                  #{{ tag }}
                </router-link>
              </div>
            </div>
          </div>
          
          <!-- Post content -->
          <div class="p-6">
            <h2 class="font-orbitron text-xl font-bold mb-2 group-hover:text-cyber-blue transition-colors">
              <router-link :to="`/blog/${post.slug}`">{{ post.title }}</router-link>
            </h2>
            <div class="flex items-center text-cyber-gray font-share-tech-mono text-sm mb-3">
              <Calendar class="h-3 w-3 mr-2" />
              <span>{{ post.date }}</span>
            </div>
            <p class="font-share-tech-mono text-cyber-gray text-sm mb-4 line-clamp-3">
              {{ post.excerpt }}
            </p>
            <router-link 
              :to="`/blog/${post.slug}`" 
              class="font-orbitron text-cyber-blue hover:text-cyber-pink transition-colors inline-flex items-center"
            >
              READ_MORE <ChevronRight class="h-4 w-4 ml-1" />
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Empty state -->
      <div v-if="filteredPosts.length === 0" class="text-center py-12">
        <p class="font-share-tech-mono text-cyber-gray text-xl">
          <span class="text-cyber-pink">[NOTICE]</span> No posts found with the selected tag.
        </p>
        <button 
          @click="selectedTag = null" 
          class="mt-4 font-orbitron text-cyber-blue hover:text-cyber-pink transition-colors"
        >
          SHOW_ALL_POSTS
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Calendar, ChevronRight } from 'lucide-vue-next'
import { getPosts } from '@/services/postService'

const posts = ref([])
const selectedTag = ref(null)

const allTags = computed(() => {
  const tags = new Set()
  posts.value.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
})

const filteredPosts = computed(() => {
  if (!selectedTag.value) return posts
  return posts.filter(post => post.tags.includes(selectedTag.value))
})

onMounted(async () => {
  try {
    const res = await getPosts()
    posts.value = Array.isArray(res.data) ? res.data : res.data.posts || []
  } catch (e) {
    console.error('ไม่สามารถโหลดโพสต์:', e)
  }
})
</script>
