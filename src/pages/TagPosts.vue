<template>
  <div class="py-12">
    <div class="container mx-auto px-4">
      <h1 class="font-orbitron text-3xl md:text-4xl font-bold mb-8 text-center">
        <span class="text-cyber-blue">#</span>{{ tag }}
      </h1>
      
      <!-- Posts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PostCard 
          v-for="post in filteredPosts" 
          :key="post.slug" 
          :post="post" 
        />
      </div>
      
      <!-- Empty state -->
      <div v-if="filteredPosts.length === 0" class="text-center py-12">
        <p class="font-share-tech-mono text-xl text-cyber-gray">
          <span class="text-cyber-pink">[ERROR]</span> No posts found with tag #{{ tag }}.
        </p>
        <div class="mt-6">
          <router-link to="/">
            <NeonButton color="blue">RETURN_HOME</NeonButton>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PostCard from '@/components/PostCard.vue'
import NeonButton from '@/components/NeonButton.vue'
import posts from '@/data/posts.json'

const route = useRoute()

const tag = computed(() => route.params.tag)

const filteredPosts = computed(() => {
  return posts.filter(post => post.tags.includes(tag.value))
})
</script>
