<template>
  <label
    @invalid.capture.prevent="onInvalid"
    @blur.capture.prevent="onBlur"
  >
    {{ label }}
    <slot />
    <small v-if="isValid === false">
      {{ validationMessage }}
    </small>
  </label>
</template>

<script setup lang="ts">
import {ref} from 'vue';

defineProps<{
  label: string;
}>()

const isValid = ref<boolean>();
const validationMessage = ref<string>()

function onBlur(e: Event) {
  const target = (e.target as HTMLInputElement)

  if (!target) {
    return
  }

  isValid.value = target.checkValidity()
  target.ariaInvalid = String(!isValid.value)
  if (isValid.value) {
    validationMessage.value = ''
  }
}

function onInvalid(e: Event) {
  const target = (e.target as HTMLInputElement)

  if (!target) {
    return
  }
  isValid.value = false;

  target.ariaInvalid = String(!isValid.value)
  validationMessage.value = target.validationMessage
}

</script>

<style scoped>

</style>
