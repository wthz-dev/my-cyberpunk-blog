<template>
  <div class="py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="font-orbitron text-3xl md:text-5xl font-bold mb-8 text-center">
          <span class="text-cyber-blue">//</span> ABOUT ME
        </h1>
        
        <!-- Profile Section -->
        <div class="cyber-card p-6 md:p-8 mb-12">
          <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
            <!-- Avatar -->
            <div class="w-48 h-48 relative">
              <div class="w-full h-full border-2 border-cyber-blue overflow-hidden">
                <img 
                  src="../assets/avatar.jpg" 
                  alt="Cyberpunk Avatar" 
                  class="w-full h-full object-cover"
                />
              </div>
              <!-- Decorative elements -->
              <div class="absolute top-[-10px] right-[-10px] w-6 h-6 border border-cyber-pink"></div>
              <div class="absolute bottom-[-10px] left-[-10px] w-6 h-6 border border-cyber-yellow"></div>
            </div>
            
            <!-- Bio -->
            <div class="flex-1">
              <h2 class="font-orbitron text-2xl mb-4 text-cyber-blue">WTHZ_MIS</h2>
              <div class="font-share-tech-mono text-cyber-gray mb-6">
                <p class="mb-4">
                  Name: Torkait Sukpramote
                  Profession: Senior Software Developer
                  Hobbies: Assembling model cars, remote control drift cars
                  This blog is about sharing my journey in tech, design, and retro gaming.
                </p>
                <p>
                  Skills
                  Backend Development
                  Node.js
                  NestJS
                  Sequelize
                  Golang
                  .NET Core
                  PHP
                  Database Management
                  MySQL
                  MariaDB
                  MongoDB
                  Frontend Development
                  Vue.js
                  Nuxt.js
                  React.js
                  Next.js
                  JavaScript
                  TypeScript
                  Real-Time Communication
                  Socket.io
                  Websocket
                  DevOps & Deployment
                  Docker
                  PM2
                  Nginx
                  Ubuntu Server
                  AWS EC2
                  SSL Certificate Config
                  DNS Configuration
                </p>
              </div>
              
              <!-- Skills -->
              <div class="mb-6">
                <h3 class="font-orbitron text-lg mb-3 text-cyber-pink">SKILLS</h3>
                <div class="flex flex-wrap gap-2">
                  <span class="bg-cyber-dark px-3 py-1 text-xs font-share-tech-mono text-cyber-blue border border-cyber-blue">
                    Backend Development
                  </span>
                  <span class="bg-cyber-dark px-3 py-1 text-xs font-share-tech-mono text-cyber-pink border border-cyber-pink">
                    Frontend Development
                  </span>
                  <span class="bg-cyber-dark px-3 py-1 text-xs font-share-tech-mono text-cyber-yellow border border-cyber-yellow">
                    DevOps & Deployment
                  </span>
                  <span class="bg-cyber-dark px-3 py-1 text-xs font-share-tech-mono text-cyber-green border border-cyber-green">
                    Real-Time Communication
                  </span>
                  <span class="bg-cyber-dark px-3 py-1 text-xs font-share-tech-mono text-cyber-blue border border-cyber-blue">
                    Database Management
                  </span>
                </div>
              </div>
              
              <!-- Social Links -->
              <div class="flex gap-4">
                <a href="#" class="cyber-button p-2">
                  <Github class="h-5 w-5" />
                </a>
                <a href="#" class="cyber-button p-2">
                  <Twitter class="h-5 w-5" />
                </a>
                <a href="#" class="cyber-button p-2">
                  <Linkedin class="h-5 w-5" />
                </a>
                <a href="#" class="cyber-button p-2">
                  <Mail class="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Timeline Section -->
        <h2 class="font-orbitron text-2xl md:text-3xl font-bold mb-6 text-center">
          <span class="text-cyber-pink">//</span> TIMELINE
        </h2>
        
        <div class="cyber-card p-6 md:p-8 mb-12">
          <div class="relative border-l-2 border-cyber-blue pl-8 ml-4">
            <!-- Timeline Item -->
            <div class="mb-12 relative">
              <div class="absolute top-0 left-[-41px] w-6 h-6 bg-cyber-dark border-2 border-cyber-blue rounded-full"></div>
              <div class="absolute top-0 left-[-38px] w-0 h-0 bg-cyber-blue animate-ping rounded-full"></div>
              <h3 class="font-orbitron text-xl mb-2 text-cyber-blue">2077 - PRESENT</h3>
              <h4 class="font-orbitron text-lg mb-3">LEAD NETRUNNER @ ARASAKA CORP</h4>
              <p class="font-share-tech-mono text-cyber-gray">
                Developing next-gen neural interfaces and security systems for corporate clients. Specialized in breach protocol optimization and ICE penetration techniques.
              </p>
            </div>
            
            <!-- Timeline Item -->
            <div class="mb-12 relative">
              <div class="absolute top-0 left-[-41px] w-6 h-6 bg-cyber-dark border-2 border-cyber-pink rounded-full"></div>
              <h3 class="font-orbitron text-xl mb-2 text-cyber-pink">2075 - 2077</h3>
              <h4 class="font-orbitron text-lg mb-3">FREELANCE NETRUNNER</h4>
              <p class="font-share-tech-mono text-cyber-gray">
                Contracted for various high-risk operations across Night City. Specialized in data extraction, system infiltration, and digital forensics.
              </p>
            </div>
            
            <!-- Timeline Item -->
            <div class="relative">
              <div class="absolute top-0 left-[-41px] w-6 h-6 bg-cyber-dark border-2 border-cyber-yellow rounded-full"></div>
              <h3 class="font-orbitron text-xl mb-2 text-cyber-yellow">2070 - 2075</h3>
              <h4 class="font-orbitron text-lg mb-3">NEURAL ENGINEER @ MILITECH</h4>
              <p class="font-share-tech-mono text-cyber-gray">
                Developed combat neural interfaces and tactical network systems for military applications. Led a team of engineers in creating breakthrough cyberware technology.
              </p>
            </div>
          </div>
        </div>
        
        <!-- Contact Section -->
        <h2 class="font-orbitron text-2xl md:text-3xl font-bold mb-6 text-center">
          <span class="text-cyber-yellow">//</span> CONTACT ME
        </h2>
        
        <div class="cyber-card p-6 md:p-8">
          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label for="name" class="block font-orbitron mb-2">NAME</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name"
                class="w-full bg-cyber-dark border border-cyber-gray p-4 font-share-tech-mono text-white focus:border-cyber-blue focus:outline-none"
                placeholder="YOUR NAME"
              />
            </div>
            
            <div>
              <label for="email" class="block font-orbitron mb-2">EMAIL</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email"
                class="w-full bg-cyber-dark border border-cyber-gray p-4 font-share-tech-mono text-white focus:border-cyber-blue focus:outline-none"
                placeholder="YOUR EMAIL"
              />
            </div>
            
            <div>
              <label for="message" class="block font-orbitron mb-2">MESSAGE</label>
              <textarea 
                id="message" 
                v-model="form.message"
                class="w-full bg-cyber-dark border border-cyber-gray p-4 font-share-tech-mono text-white min-h-[150px] focus:border-cyber-blue focus:outline-none"
                placeholder="YOUR MESSAGE"
              ></textarea>
            </div>
            
            <div class="flex justify-end">
              <NeonButton type="submit" color="yellow">SEND_MESSAGE</NeonButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Github, Twitter, Linkedin, Mail } from 'lucide-vue-next'
import NeonButton from '../components/NeonButton.vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = () => {
  // In a real app, you would send this to your backend
  alert('Message sent! In a real app, this would be sent to a server.')
  form.value = {
    name: '',
    email: '',
    message: ''
  }
}
</script>

<style scoped>
.cyber-button {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid #00FFFF;
  box-shadow: 0 0 5px #00FFFF;
  transition: all 0.3s ease;
}

.cyber-button:hover {
  box-shadow: 0 0 10px #00FFFF;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
