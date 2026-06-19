<template>
  <span class="protocol-badge" :class="protocolClass">{{ protocolName }}</span>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps({ protocol: { type: String, required: true } })
const protocolClass = computed(() => ({ thunder: 'badge-thunder', qqdl: 'badge-qqdl', flashget: 'badge-flashget', ed2k: 'badge-ed2k', magnet: 'badge-magnet' }[props.protocol] || 'badge-unknown'))
const protocolName = computed(() => ({ thunder: t('protocols.thunder'), qqdl: t('protocols.qqdl'), flashget: t('protocols.flashget'), ed2k: t('protocols.ed2k'), magnet: t('protocols.magnet') }[props.protocol] || t('protocols.unknown')))
</script>

<style scoped>
.protocol-badge { display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; }
.badge-thunder { background: linear-gradient(135deg, #f39c12, #e67e22); color: #fff; }
.badge-qqdl { background: linear-gradient(135deg, #3498db, #2980b9); color: #fff; }
.badge-flashget { background: linear-gradient(135deg, #2ecc71, #27ae60); color: #fff; }
.badge-ed2k { background: linear-gradient(135deg, #9b59b6, #8e44ad); color: #fff; }
.badge-magnet { background: linear-gradient(135deg, #e74c3c, #c0392b); color: #fff; }
.badge-unknown { background: linear-gradient(135deg, #95a5a6, #7f8c8d); color: #fff; }
</style>
