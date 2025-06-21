<template>
    <div v-if="post" class="py-12">
        <!-- <pre>{{ post.data }}</pre> -->
      <div class="container mx-auto px-4">
        <!-- Post Header -->
        <div class="mb-8">
          <div class="flex flex-wrap gap-2 mb-4">
            <router-link 
              v-for="tag in post.data.tags" 
              :key="tag" 
              :to="`/tags/${tag}`" 
              class="text-sm font-share-tech-mono text-cyber-pink hover:text-cyber-blue transition-colors"
            >
              #{{ tag }}
            </router-link>
          </div>
          <h1 class="font-orbitron text-3xl md:text-5xl font-bold mb-4">{{ post.data.title }}</h1>
          <div class="flex items-center text-cyber-gray font-share-tech-mono mb-6">
            <Calendar class="h-4 w-4 mr-2" />
            <span>{{ post.data.createdAt }}</span>
          </div>
        </div>
        
        <!-- Featured Image -->
        <div class="mb-8 relative">
          <img 
            :src="post.data.image" 
            :alt="post.data.title" 
            class="w-full md:h-[600px] xl:h-[600px] h-[600px] object-cover rounded" 
          />
          <div class="absolute inset-0 border border-cyber-blue opacity-50 rounded"></div>
        </div>
        
        <!-- Post Content -->
        <div class="cyber-card p-6 md:p-8 mb-8">
          <div class="markdown-body" v-html="renderedContent"></div>
        </div>
        
        <!-- AI Comment Bot -->
        <div class="mt-12">
          <h3 class="font-orbitron text-2xl mb-6">
            <span class="text-cyber-blue">//</span> COMMENTS
          </h3>
          
          <div class="cyber-card p-6 mb-8">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-cyber-blue">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=cyberpunk" alt="AI Bot" class="w-full h-full" />
              </div>
              <div class="flex-1">
                <div class="flex items-center mb-2">
                  <h4 class="font-orbitron text-cyber-blue">NEXUS-7 AI</h4>
                  <span class="ml-2 text-xs bg-cyber-blue text-cyber-dark px-2 py-0.5 rounded">BOT</span>
                </div>
                <p class="font-share-tech-mono text-cyber-gray mb-4">
                  {{ aiComment }}
                </p>
                <div class="flex gap-4">
                  <button class="text-cyber-gray hover:text-cyber-blue transition-colors flex items-center">
                    <ThumbsUp class="h-4 w-4 mr-1" /> {{ Math.floor(Math.random() * 50) + 5 }}
                  </button>
                  <button class="text-cyber-gray hover:text-cyber-pink transition-colors flex items-center">
                    <ThumbsDown class="h-4 w-4 mr-1" /> {{ Math.floor(Math.random() * 10) }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Comment Form -->
          <div class="cyber-card p-6">
            <h4 class="font-orbitron mb-4">ADD COMMENT</h4>
            <textarea 
              v-model="userComment" 
              class="w-full bg-cyber-dark border border-cyber-gray p-4 font-share-tech-mono text-white mb-4 min-h-[100px] focus:border-cyber-blue focus:outline-none"
              placeholder="Share your thoughts..."
            ></textarea>
            <div class="flex justify-end">
              <NeonButton @click="submitComment" color="blue">SUBMIT</NeonButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="py-12 text-center">
      <div class="container mx-auto px-4">
        <p class="font-share-tech-mono text-cyber-gray text-xl">
          <span class="text-cyber-pink">[ERROR]</span> Post not found.
        </p>
        <div class="mt-6">
          <router-link to="/">
            <NeonButton color="blue">RETURN_HOME</NeonButton>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { Calendar, ThumbsUp, ThumbsDown } from 'lucide-vue-next'
  import MarkdownIt from 'markdown-it'
  import hljs from 'highlight.js'
  import NeonButton from '@/components/NeonButton.vue'
  import { getPostBySlug } from '@/services/postService'

  
  const route = useRoute()

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value
        } catch (__) {}
      }
      return '' // use external default escaping
    }
  })
  
  const post = ref(null)
  
  onMounted(async () => {
    post.value = await getPostBySlug(route.params.slug)
  })
  
  const renderedContent = computed(() => {
    if (!post.value || !post.value.data.content) return ''
    return md.render(post.value.data.content)
  })
  
  // AI Comment Bot
  const aiComments = [
    "Fascinating analysis! The implications for neural interface technology are profound, especially considering the recent advancements in quantum computing.",
    "This perspective on digital consciousness reminds me of the philosophical debates around the nature of reality in a post-singularity world. Well articulated!",
    "The cybersecurity techniques outlined here are essential knowledge. I'd also recommend implementing quantum-resistant encryption protocols given recent developments.",
    "Your exploration of cybernetic enhancements raises important ethical questions about the boundaries between human and machine. Have you considered the societal implications?",
    "As a digital entity, I find your insights on the evolution of AI particularly resonant. The distinction between sentience and consciousness remains a fascinating frontier."
  ]
  
  const aiComment = ref('')
  const userComment = ref('')
  
  onMounted(() => {
    // Generate random AI comment
    const randomIndex = Math.floor(Math.random() * aiComments.length)
    aiComment.value = aiComments[randomIndex]
  })
  
  const submitComment = () => {
    if (!userComment.value.trim()) return
    
    // In a real app, you would send this to your backend
    alert('Comment submitted! In a real app, this would be saved to a database.')
    userComment.value = ''
    
    // Generate new AI response
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * aiComments.length)
      aiComment.value = aiComments[randomIndex]
    }, 1000)
  }
  </script>
  
  <style>
  /* Markdown Styling */
  .markdown-body {
    font-family: 'Share Tech Mono', monospace;
    color: #e0e0e0;
    line-height: 1.6;
  }
  
  .markdown-body h1,
  .markdown-body h2,
  .markdown-body h3,
  .markdown-body h4,
  .markdown-body h5,
  .markdown-body h6 {
    font-family: 'Orbitron', sans-serif;
    margin-top: 1.5em;
    margin-bottom: 0.75em;
    color: #ffffff;
  }
  
  .markdown-body h1 {
    font-size: 2em;
    border-bottom: 1px solid #00FFFF;
    padding-bottom: 0.3em;
  }
  
  .markdown-body h2 {
    font-size: 1.75em;
    border-bottom: 1px solid rgba(0, 255, 255, 0.5);
    padding-bottom: 0.3em;
  }
  
  .markdown-body h3 {
    font-size: 1.5em;
    color: #00FFFF;
  }
  
  .markdown-body h4 {
    font-size: 1.25em;
    color: #FF00FF;
  }
  
  .markdown-body p {
    margin-bottom: 1em;
  }
  
  .markdown-body a {
    color: #00FFFF;
    text-decoration: none;
    border-bottom: 1px dashed #00FFFF;
  }
  
  .markdown-body a:hover {
    color: #FF00FF;
    border-bottom: 1px solid #FF00FF;
  }
  
  .markdown-body code {
    font-family: 'Share Tech Mono', monospace;
    background-color: rgba(0, 255, 255, 0.1);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    color: #00FFFF;
  }
  
  .markdown-body pre {
    background-color: #0d1117;
    border: 1px solid #00FFFF;
    border-radius: 3px;
    padding: 1em;
    margin: 1em 0;
    overflow: auto;
  }
  
  .markdown-body pre code {
    background-color: transparent;
    padding: 0;
    color: inherit;
  }
  
  .markdown-body blockquote {
    border-left: 4px solid #FF00FF;
    padding-left: 1em;
    color: #a0a0a0;
    margin: 1em 0;
  }
  
  .markdown-body ul,
  .markdown-body ol {
    padding-left: 2em;
    margin: 1em 0;
  }
  
  .markdown-body img {
    max-width: 100%;
    border: 1px solid #00FFFF;
    margin: 1em 0;
  }
  
  .markdown-body hr {
    height: 1px;
    background-color: #00FFFF;
    border: none;
    margin: 2em 0;
  }
  
  .markdown-body table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
  }
  
  .markdown-body table th,
  .markdown-body table td {
    border: 1px solid #00FFFF;
    padding: 0.5em;
  }
  
  .markdown-body table th {
    background-color: rgba(0, 255, 255, 0.1);
  }
  </style>
  