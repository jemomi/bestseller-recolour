<template>
  <div>
    <form
      ref="createTicketForm"
      @submit="onSubmit"
    >
      <fieldset>
        <LabeledField label="Photo">
          <input
            name="pid"
            type="text"
            placeholder="Photo Id"
            required
          />
        </LabeledField>
        <LabeledField label="Style">
          <input
            name="style"
            type="text"
            placeholder="Style"
            required
          />
        </LabeledField>
        <LabeledField label="Partner">
          <select
            name="partner"
            aria-label="Select priority"
            required
          >
            <option
              selected
              disabled
              value=""
            >
              Select priority
            </option>
            <option
              v-for="(priorityValue, idx) in priorityValues"
              :key="`prioVal${idx}`"
            >
              {{ priorityValue }}
            </option>
          </select>
        </LabeledField>
        <LabeledField label="Partner">
          <input
            name="partner"
            type="text"
            placeholder="Partner"
            required
          />
        </LabeledField>
      </fieldset>

      <button
        type="submit"
        @click.prevent="onBeforeSubmit"
      >
        Create
      </button>
    </form>

  </div>
</template>

<script setup lang="ts">
import {priorityValues} from '@/types/tickets.ts';
import {ref} from 'vue';
import LabeledField from '@/components/FormElements/LabeledField.vue';

const createTicketForm = ref<HTMLFormElement>();

function onSubmit (e: SubmitEvent) {
  console.log(0, e)
}

function onBeforeSubmit () {
  if (!createTicketForm.value) {
    return;
  }
  Object.values(createTicketForm.value).forEach((field: HTMLInputElement | HTMLSelectElement | HTMLButtonElement): void => {
    field.checkValidity()
  })
  createTicketForm.value.querySelector<HTMLInputElement>('[aria-invalid="true"]')?.focus()
}

</script>

<style scoped>

</style>
