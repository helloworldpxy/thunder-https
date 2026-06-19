<template>
  <div class="lang-switch">
    <button class="lang-btn" :class="{ active: currentLocale === 'zh' }" @click="switchLang('zh')">中文</button>
    <button class="lang-btn" :class="{ active: currentLocale === 'en' }" @click="switchLang('en')">EN</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const currentLocale = computed(() => locale.value)
const switchLang = (lang) => { locale.value = lang; localStorage.setItem('locale', lang) }
</script>

<style scoped>
.lang-switch { display: flex; gap: 5px; background: rgba(255, 255, 255, 0.1); border-radius: 6px; padding: 3px; }
.lang-btn { padding: 6px 12px; border: none; border-radius: 4px; background: transparent; color: rgba(255, 255, 255, 0.7); cursor: pointer; font-size: 13px; font-weight: 500; transition: all 0.2s ease; }
.lang-btn:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }
.lang-btn.active { background: rgba(255, 255, 255, 0.2); color: #fff; }
</style>
