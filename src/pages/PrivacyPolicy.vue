<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <div class="bg-cyber-dark border border-cyber-blue shadow-glow p-6 rounded-md">
      <h1 class="font-orbitron text-3xl text-cyber-blue mb-6 border-b border-cyber-pink pb-4">PRIVACY POLICY</h1>
      
      <div class="font-share-tech-mono text-cyber-gray space-y-6">
        <section>
          <h2 class="text-xl text-cyber-pink mb-3">1. INTRODUCTION</h2>
          <p>Welcome to WTHZ_BLOG ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website.</p>
        </section>
        
        <section>
          <h2 class="text-xl text-cyber-pink mb-3">2. DATA WE COLLECT</h2>
          <p>We may collect the following types of information:</p>
          <ul class="list-disc pl-6 mt-2 space-y-2">
            <li><span class="text-cyber-blue">Personal Information:</span> Name, email address, and other contact details you provide when registering or commenting.</li>
            <li><span class="text-cyber-blue">Usage Data:</span> Information about how you interact with our website, including IP address, browser type, pages visited, and time spent.</li>
            <li><span class="text-cyber-blue">Cookies:</span> Small data files stored on your device that help us improve your experience.</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-xl text-cyber-pink mb-3">3. HOW WE USE YOUR DATA</h2>
          <p>We use your information for the following purposes:</p>
          <ul class="list-disc pl-6 mt-2 space-y-2">
            <li>To provide and maintain our website</li>
            <li>To notify you about changes to our services</li>
            <li>To allow you to participate in interactive features</li>
            <li>To provide customer support</li>
            <li>To gather analysis to improve our website</li>
            <li>To monitor the usage of our website</li>
            <li>To detect, prevent, and address technical issues</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-xl text-cyber-pink mb-3">4. DATA SECURITY</h2>
          <p>We implement appropriate security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
        </section>
        
        <section>
          <h2 class="text-xl text-cyber-pink mb-3">5. THIRD-PARTY SERVICES</h2>
          <p>We may employ third-party companies and individuals to facilitate our website, provide services on our behalf, perform website-related services, or assist us in analyzing how our website is used. These third parties have access to your personal data only to perform these tasks and are obligated not to disclose or use it for any other purpose.</p>
        </section>
        
        <section>
          <h2 class="text-xl text-cyber-pink mb-3">6. YOUR DATA RIGHTS</h2>
          <p>You have the right to:</p>
          <ul class="list-disc pl-6 mt-2 space-y-2">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request restriction of processing</li>
            <li>Request transfer of your data</li>
            <li>Withdraw consent</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-xl text-cyber-pink mb-3">7. COOKIES</h2>
          <p>We use cookies to enhance your experience on our website. You can set your browser to refuse all cookies or to indicate when a cookie is being sent. However, some website features may not function properly without cookies.</p>
        </section>
        
        <section>
          <h2 class="text-xl text-cyber-pink mb-3">8. CHILDREN'S PRIVACY</h2>
          <p>Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>
        </section>
        
        <section>
          <h2 class="text-xl text-cyber-pink mb-3">9. CHANGES TO THIS POLICY</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
        </section>
        
        <section>
          <h2 class="text-xl text-cyber-pink mb-3">10. CONTACT US</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <div class="mt-2 p-3 border border-cyber-blue bg-black bg-opacity-50 rounded inline-block">
            <p>Email: {{ contactEmail }}</p>
            <p>Address: {{ contactAddress }}</p>
          </div>
        </section>
        
        <div class="mt-8 pt-4 border-t border-cyber-gray text-right">
          <p>Last Updated: {{ lastUpdated }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
const settings = computed(() => settingsStore.data || {})

const contactEmail = computed(() => settings.value.contactEmail || 'torkait.it@gmail.com')
const contactAddress = computed(() => settings.value.contactAddress || 'Neo-Tokyo District, Cyberpunk City')
const lastUpdated = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<style scoped>
.shadow-glow {
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
}
</style>
