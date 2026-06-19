<template>
  <div class="app-container">
    <header class="app-header">
      <div class="logo">
        <h1>{{ t('app.title') }}</h1>
        <span class="version">v2.0</span>
      </div>
      <div class="header-actions">
        <LangSwitch />
      </div>
    </header>

    <main class="app-main">
      <section class="intro-section" v-if="results.length === 0">
        <div class="intro-card">
          <h2>{{ t('intro.title') }}</h2>
          <p class="intro-desc">{{ t('intro.description') }}</p>
        </div>

        <div class="features-grid">
          <div class="feature-item">
            <span class="feature-icon">🔗</span>
            <h3>{{ t('features.multiProtocol') }}</h3>
            <p>{{ t('features.multiProtocolDesc') }}</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🧠</span>
            <h3>{{ t('features.smartDetect') }}</h3>
            <p>{{ t('features.smartDetectDesc') }}</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📦</span>
            <h3>{{ t('features.batchConvert') }}</h3>
            <p>{{ t('features.batchConvertDesc') }}</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">⚡</span>
            <h3>{{ t('features.oneClick') }}</h3>
            <p>{{ t('features.oneClickDesc') }}</p>
          </div>
        </div>

        <div class="usage-section">
          <h2>{{ t('usage.title') }}</h2>
          <div class="usage-steps">
            <div class="step">
              <span class="step-number">1</span>
              <h4>{{ t('usage.step1') }}</h4>
              <p>{{ t('usage.step1Desc') }}</p>
            </div>
            <div class="step-arrow">→</div>
            <div class="step">
              <span class="step-number">2</span>
              <h4>{{ t('usage.step2') }}</h4>
              <p>{{ t('usage.step2Desc') }}</p>
            </div>
            <div class="step-arrow">→</div>
            <div class="step">
              <span class="step-number">3</span>
              <h4>{{ t('usage.step3') }}</h4>
              <p>{{ t('usage.step3Desc') }}</p>
            </div>
          </div>
        </div>
      </section>

      <LinkInput v-model="inputText" @convert="handleConvert" />
      <ActionBar :results="results" :has-success="hasSuccess" @copy="handleCopy" @open="handleOpen" @save="handleSave" />
      <ResultList :results="results" @copy-single="handleCopySingle" @open-single="handleOpenSingle" />
    </main>

    <footer class="app-footer">
      <div class="footer-info">
        <span>{{ t('app.developer') }}: HelloWorld05</span>
        <span class="separator">|</span>
        <a href="https://github.com/helloworldpxy" target="_blank" rel="noopener noreferrer" class="footer-link">{{ t('app.developerHomepage') }}</a>
        <span class="separator">|</span>
        <a href="https://github.com/helloworldpxy/thunder-https" target="_blank" rel="noopener noreferrer" class="footer-link">{{ t('app.projectHomepage') }}</a>
        <span class="separator">|</span>
        <span>{{ t('app.license') }}: PolyForm Noncommercial</span>
      </div>
      <div class="footer-warning">⚠️ {{ t('app.copyrightWarning') }}</div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LinkInput from './components/LinkInput.vue'
import ActionBar from './components/ActionBar.vue'
import ResultList from './components/ResultList.vue'
import LangSwitch from './components/LangSwitch.vue'
import { useConverter } from './composables/useConverter.js'
import { useClipboard } from './composables/useClipboard.js'

const { t } = useI18n()
const { convert, results, hasSuccess } = useConverter()
const { copyToClipboard } = useClipboard()
const inputText = ref('')

const handleConvert = () => convert(inputText.value)

const handleCopy = async () => {
  const successUrls = results.value.filter(r => r.success).map(r => r.decodedUrl).join('\n')
  if (successUrls) {
    await copyToClipboard(successUrls)
    alert(t('messages.copiedAll'))
  }
}

const handleOpen = async () => {
  for (const result of results.value.filter(r => r.success)) {
    await window.electronAPI.openExternal(result.decodedUrl)
  }
}

const handleSave = async () => {
  const content = results.value.map(r => r.success ? r.decodedUrl : `# ${t('messages.error')}: ${r.originalUrl}`).join('\n')
  await window.electronAPI.dialog.saveFile({ title: t('messages.saveTitle'), content })
}

const handleCopySingle = async (url) => {
  await copyToClipboard(url)
  alert(t('messages.copiedSingle'))
}

const handleOpenSingle = async (url) => {
  if (window.electronAPI) {
    await window.electronAPI.openExternal(url)
  } else {
    window.open(url, '_blank')
  }
}
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: rgba(0, 0, 0, 0.2);
}

.logo { display: flex; align-items: baseline; gap: 10px; }
.logo h1 { margin: 0; font-size: 24px; font-weight: 600; }
.version { font-size: 14px; opacity: 0.8; background: rgba(255, 255, 255, 0.2); padding: 2px 8px; border-radius: 4px; }

.app-main { flex: 1; padding: 30px; max-width: 1000px; margin: 0 auto; width: 100%; box-sizing: border-box; }

.app-footer { padding: 15px 30px; background: rgba(0, 0, 0, 0.2); font-size: 12px; text-align: center; }
.footer-info { margin-bottom: 5px; }
.separator { margin: 0 10px; opacity: 0.5; }
.footer-warning { color: #ffd700; font-weight: 500; }
.footer-link { color: #fff; text-decoration: underline; cursor: pointer; opacity: 0.9; transition: opacity 0.2s; }
.footer-link:hover { opacity: 1; }

.intro-section { margin-bottom: 30px; }
.intro-card { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border-radius: 12px; padding: 24px; margin-bottom: 24px; }
.intro-card h2 { margin: 0 0 12px 0; font-size: 20px; font-weight: 600; }
.intro-desc { margin: 0; font-size: 15px; line-height: 1.6; opacity: 0.95; }

.features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px; }
.feature-item { background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(5px); border-radius: 10px; padding: 20px; transition: transform 0.2s, background 0.2s; }
.feature-item:hover { transform: translateY(-2px); background: rgba(255, 255, 255, 0.12); }
.feature-icon { font-size: 28px; display: block; margin-bottom: 10px; }
.feature-item h3 { margin: 0 0 8px 0; font-size: 16px; font-weight: 600; }
.feature-item p { margin: 0; font-size: 13px; opacity: 0.85; line-height: 1.5; }

.usage-section { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border-radius: 12px; padding: 24px; }
.usage-section h2 { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; text-align: center; }
.usage-steps { display: flex; align-items: center; justify-content: center; gap: 16px; }
.step { text-align: center; flex: 1; max-width: 200px; }
.step-number { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; font-size: 18px; font-weight: 700; margin-bottom: 10px; }
.step h4 { margin: 0 0 6px 0; font-size: 15px; font-weight: 600; }
.step p { margin: 0; font-size: 12px; opacity: 0.85; line-height: 1.4; }
.step-arrow { font-size: 24px; opacity: 0.5; flex-shrink: 0; }
</style>
