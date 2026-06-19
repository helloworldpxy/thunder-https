<template>
  <div class="link-input-container">
    <div class="input-header">
      <label class="input-label">{{ t('input.label') }}</label>
      <div class="input-actions">
        <button class="btn btn-secondary" @click="handlePaste">📋 {{ t('input.paste') }}</button>
        <button class="btn btn-secondary" @click="handleClear">🗑️ {{ t('input.clear') }}</button>
      </div>
    </div>
    <textarea ref="textareaRef" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="t('input.placeholder')" class="link-textarea" rows="6"></textarea>
    <button class="btn btn-primary convert-btn" @click="$emit('convert')">🔄 {{ t('input.convert') }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps({ modelValue: { type: String, default: '' } })
const emit = defineEmits(['update:modelValue', 'convert'])
const textareaRef = ref(null)

const handlePaste = async () => {
  try {
    const result = await window.electronAPI.clipboard.read()
    if (result.success && result.text) emit('update:modelValue', result.text)
  } catch (error) { console.error('粘贴失败:', error) }
}
const handleClear = () => { emit('update:modelValue', ''); textareaRef.value?.focus() }
</script>

<style scoped>
.link-input-container { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border-radius: 12px; padding: 20px; margin-bottom: 20px; }
.input-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.input-label { font-size: 16px; font-weight: 600; }
.input-actions { display: flex; gap: 8px; }
.link-textarea { width: 100%; min-height: 120px; padding: 12px; border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 8px; background: rgba(255, 255, 255, 0.9); color: #333; font-size: 14px; font-family: 'Consolas', 'Monaco', monospace; resize: vertical; box-sizing: border-box; transition: border-color 0.3s ease; }
.link-textarea:focus { outline: none; border-color: #fff; }
.link-textarea::placeholder { color: #999; font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif; }
.convert-btn { width: 100%; margin-top: 15px; padding: 14px; font-size: 16px; font-weight: 600; }
.btn { padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; transition: all 0.3s ease; }
.btn-primary { background: #fff; color: #667eea; }
.btn-primary:hover { background: #f0f0f0; transform: translateY(-2px); }
.btn-secondary { background: rgba(255, 255, 255, 0.2); color: #fff; }
.btn-secondary:hover { background: rgba(255, 255, 255, 0.3); }
</style>
