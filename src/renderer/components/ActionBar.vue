<template>
  <div class="action-bar" v-if="results.length > 0">
    <button class="btn btn-action" @click="$emit('copy')" :disabled="!hasSuccess">📋 {{ t('action.copyAll') }}</button>
    <button class="btn btn-action" @click="$emit('open')" :disabled="!hasSuccess">🌐 {{ t('action.openAll') }}</button>
    <button class="btn btn-action" @click="$emit('save')">💾 {{ t('action.save') }}</button>
    <button class="btn btn-action" @click="handleImport">📂 {{ t('action.import') }}</button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps({ results: { type: Array, default: () => [] }, hasSuccess: { type: Boolean, default: false } })
const emit = defineEmits(['copy', 'open', 'save', 'import'])
const handleImport = async () => {
  try {
    const result = await window.electronAPI.dialog.openFile()
    if (result.success && result.content) emit('import', result.content)
  } catch (error) { console.error('导入失败:', error) }
}
</script>

<style scoped>
.action-bar { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
.btn { padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px; }
.btn-action { background: rgba(255, 255, 255, 0.2); color: #fff; backdrop-filter: blur(5px); }
.btn-action:hover:not(:disabled) { background: rgba(255, 255, 255, 0.3); transform: translateY(-2px); }
.btn-action:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
</style>
