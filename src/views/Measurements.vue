<template>
  <div class="container mx-auto px-4 py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4 text-[#2C3E50]">Take Your Measurements</h1>
      <p class="text-xl text-gray-600">Follow our step-by-step guide for accurate measurements</p>
    </div>

    <el-steps :active="activeStep" finish-status="success" class="mb-8">
      <el-step v-for="step in steps" :key="step.label" :title="step.label" />
    </el-steps>

    <div v-if="measurementsSaved" class="mb-8">
      <el-alert
        type="success"
        show-icon
        :closable="false"
      >
        <template #title>
          Your measurements have been saved successfully!
        </template>
        <template #default>
          <el-button 
            class="mt-2"
            @click="resetMeasurements"
            :icon="RefreshCw"
          >
            Start New Measurements
          </el-button>
        </template>
      </el-alert>
    </div>

    <el-row :gutter="24" class="responsive-row">
      <el-col :xs="24" :sm="24" :md="12">
        <el-card class="measurement-card">
          <template #header>
            <div class="flex items-center justify-between gap-2">
              <span class="text-base sm:text-lg font-semibold">{{ currentStep.label }}</span>
              <el-tooltip
                :content="showTips ? 'Hide Tips' : 'Show Tips'"
                placement="top"
              >
                <el-button 
                  :icon="HelpCircle"
                  circle
                  size="small"
                  @click="showTips = !showTips"
                />
              </el-tooltip>
            </div>
          </template>

          <p class="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{{ currentStep.instructions }}</p>

          <el-collapse-transition>
            <div v-show="showTips" class="tips-section">
              <div class="border-l-4 border-primary p-3 sm:p-4 bg-primary/5 mb-3 sm:mb-4">
                <h4 class="font-semibold mb-2 text-sm sm:text-base">Measurement Tips:</h4>
                <ul class="list-disc list-inside space-y-1 text-xs sm:text-sm">
                  <li v-for="tip in currentStep.tips" :key="tip">{{ tip }}</li>
                </ul>
              </div>
            </div>
          </el-collapse-transition>

          <el-form-item 
            :error="measurementError"
            class="mb-0 mt-auto"
          >
            <el-input-number
              v-model="measurements[currentStep.label]"
              :min="currentStep.minValue"
              :max="currentStep.maxValue"
              :step="0.5"
              size="large"
              class="w-full"
              :placeholder="`Enter ${currentStep.label.toLowerCase()} measurement`"
            >
              <template #append>{{ currentStep.unit }}</template>
            </el-input-number>
          </el-form-item>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12">
        <el-card class="h-full">
          <template #header>
            <div class="text-base sm:text-lg font-semibold">Video Tutorial</div>
          </template>

          <div class="aspect-video bg-gray-100 rounded-lg mb-3 sm:mb-4 relative w-full" style="padding-top: 75%">
            <!-- Video player placeholder -->
            <div class="absolute inset-0 flex items-center justify-center text-gray-500 text-sm sm:text-base">
              Video tutorial for {{ currentStep.label.toLowerCase() }} measurement
            </div>
          </div>

          <div class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-auto">
            <el-button 
              :icon="ArrowLeft"
              @click="previousStep"
              :disabled="activeStep === 0"
              class="w-full sm:w-auto"
            >
              Back
            </el-button>

            <el-button 
              v-if="isLastStep"
              type="primary"
              :icon="Save"
              :loading="saving"
              @click="saveMeasurements"
              :disabled="!isCurrentStepValid"
              class="w-full sm:w-auto"
            >
              Save Measurements
            </el-button>
            <el-button 
              v-else
              type="primary"
              @click="nextStep"
              :disabled="!isCurrentStepValid"
              class="w-full sm:w-auto"
            >
              Next
              <el-icon class="el-icon--right"><arrow-right /></el-icon>
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { HelpCircle, ArrowLeft, ArrowRight, Save, RefreshCw } from 'lucide-vue-next'
import type { Component } from 'vue'

interface Step {
  label: string
  instructions: string
  videoUrl: string
  tips: string[]
  minValue: number
  maxValue: number
  unit: string
}

const steps: Step[] = [
  {
    label: 'Chest',
    instructions: 'Measure around the fullest part of your chest, keeping the tape parallel to the ground.',
    videoUrl: 'https://example.com/chest-measurement',
    tips: [
      'Take a deep breath and measure',
      'Keep the tape snug but not tight',
      'Make sure the tape is level around your body'
    ],
    minValue: 30,
    maxValue: 60,
    unit: 'inches'
  },
  {
    label: 'Waist',
    instructions: 'Measure around your natural waistline, keeping the tape comfortably loose.',
    videoUrl: 'https://example.com/waist-measurement',
    tips: [
      'Locate your natural waistline',
      'Keep one finger between the tape and your body',
      'Avoid measuring over thick clothing'
    ],
    minValue: 24,
    maxValue: 50,
    unit: 'inches'
  },
  {
    label: 'Shoulders',
    instructions: 'Measure across the back from shoulder point to shoulder point.',
    videoUrl: 'https://example.com/shoulder-measurement',
    tips: [
      'Stand naturally with arms at sides',
      'Measure from the outer edges of each shoulder',
      'Keep the tape straight across the back'
    ],
    minValue: 14,
    maxValue: 30,
    unit: 'inches'
  }
]

const activeStep = ref(0)
const showTips = ref(false)
const measurements = ref<Record<string, number>>({})
const saving = ref(false)
const measurementsSaved = ref(false)

const currentStep = computed(() => steps[activeStep.value])
const isLastStep = computed(() => activeStep.value === steps.length - 1)

const measurementError = computed(() => {
  const value = measurements.value[currentStep.value.label]
  if (value === undefined) return ''
  if (value < currentStep.value.minValue || value > currentStep.value.maxValue) {
    return `Please enter a value between ${currentStep.value.minValue} and ${currentStep.value.maxValue} ${currentStep.value.unit}`
  }
  return ''
})

const isCurrentStepValid = computed(() => {
  const value = measurements.value[currentStep.value.label]
  return value !== undefined && !measurementError.value
})

const nextStep = () => {
  if (activeStep.value < steps.length - 1) {
    activeStep.value++
    showTips.value = false
  }
}

const previousStep = () => {
  if (activeStep.value > 0) {
    activeStep.value--
    showTips.value = false
  }
}

const saveMeasurements = async () => {
  saving.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  measurementsSaved.value = true
  saving.value = false
}

const resetMeasurements = () => {
  measurements.value = {}
  activeStep.value = 0
  measurementsSaved.value = false
  showTips.value = false
}
</script>

<style scoped>
.measurement-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tips-section {
  margin: -8px -20px 16px;
  padding: 0 20px;
}

.responsive-row {
  margin-left: -12px !important;
  margin-right: -12px !important;
}

.responsive-row :deep(.el-col) {
  padding-left: 12px !important;
  padding-right: 12px !important;
}

@media (max-width: 768px) {
  .responsive-row {
    margin-left: -8px !important;
    margin-right: -8px !important;
  }

  .responsive-row :deep(.el-col) {
    padding-left: 8px !important;
    padding-right: 8px !important;
  }
}
</style>