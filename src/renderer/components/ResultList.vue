<template>
  <div class="result-container">
    <div class="result-header">
      <h2 class="result-title">{{ t('result.title') }}</h2>
      <div class="result-stats" v-if="results.length > 0">
        <span class="stat success">✓ {{ successCount }} {{ t('result.success') }}</span>
        <span class="stat failed">✗ {{ failedCount }} {{ t('result.failed') }}</span>
      </div>
    </div>
    <div class="result-list" v-if="results.length > 0">
      <div v-for="(result, index) in results" :key="index" class="result-item" :class="{ success: result.success, failed: !result.success }">
        <div class="result-protocol"><ProtocolBadge :protocol="result.protocol" /></div>
        <div class="result-content">
          <div class="result-original" v-if="!result.success"><span class="label">{{ t('result.original') }}:</span><span class="value">{{ result.originalUrl }}</span></div>
          <div class="result-decoded" v-if="result.success"><span class="label">{{ t('result.decoded') }}:</span><a :href="result.decodedUrl" class="value link" @click.prevent="$emit('open-single', result.decodedUrl)">{{ result.decodedUrl }}</a></div>
          <div class="result-error" v-if="!result.success"><span class="error-message">{{ result.error }}</span></div>
        </div>
        <div class="result-actions" v-if="result.success"><button class="btn btn-icon" @click="$emit('copy-single', result.decodedUrl)" title="复制链接">📋</button></div>
      </div>
    </div>
    <div class="result-empty" v-else><div class="empty-icon">📭</div><p class="empty-text">{{ t('result.noResults') }}</p></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ProtocolBadge from './ProtocolBadge.vue'
const { t } = useI18n()
const props = defineProps({ results: { type: Array, default: () => [] } })
defineEmits(['copy-single', 'open-single'])
const successCount = computed(() => props.results.filter(r => r.success).length)
const failedCount = computed(() => props.results.filter(r => !r.success).length)
</script>

<style scoped>
.result-container { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border-radius: 12px; padding: 20px; margin-bottom: 20px; }
.result-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.result-title { margin: 0; font-size: 18px; font-weight: 600; }
.result-stats { display: flex; gap: 15px; }
.stat { font-size: 14px; padding: 4px 10px; border-radius: 4px; }
.stat.success { background: rgba(46, 204, 113, 0.3); color: #2ecc71; }
.stat.failed { background: rgba(231, 76, 60, 0.3); color: #e74c3c; }
.result-list { display: flex; flex-direction: column; gap: 10px; }
.result-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; border-left: 4px solid transparent; }
.result-item.success { border-left-color: #2ecc71; }
.result-item.failed { border-left-color: #e74c3c; }
.result-content { flex: 1; min-width: 0; }
.label { font-size: 12px; opacity: 0.7; margin-right: 8px; }
.value { font-size: 14px; word-break: break-all; }
.link { color: #fff; text-decoration: underline; cursor: pointer; }
.link:hover { opacity: 0.8; }
.error-message { color: #e74c3c; font-size: 13px; }
.result-actions { display: flex; gap: 5px; }
.btn-icon { background: rgba(255, 255, 255, 0.2); border: none; border-radius: 4px; padding: 6px 8px; cursor: pointer; font-size: 14px; transition: background 0.2s ease; }
.btn-icon:hover { background: rgba(255, 255, 255, 0.3); }
.result-empty { text-align: center; padding: 40px 20px; opacity: 0.6; }
.empty-icon { font-size: 48px; margin-bottom: 10px; }
.empty-text { margin: 0; font-size: 14px; }
</style>
