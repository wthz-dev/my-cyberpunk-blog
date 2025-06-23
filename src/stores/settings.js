import { defineStore } from 'pinia'
import { fetchSettings } from '@/services/settingsService'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    data: null,
    loading: false,
    error: null,
  }),
  actions: {
    async loadSettings() {
      this.loading = true
      try {
        this.data = await fetchSettings()
        this.error = null
      } catch (e) {
        this.error = 'โหลดค่าตั้งค่าไม่สำเร็จ'
      }
      this.loading = false
    },
    // สำหรับรีเฟรชหลังแอดมินบันทึก
    async refreshSettings() {
      await this.loadSettings()
    }
  }
})
