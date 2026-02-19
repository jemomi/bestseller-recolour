<template>
  <div>
    <form
      ref="createTicketForm"
      @submit.prevent="onSubmit"
    >
      <fieldset>
        <LabeledField label="Photo">
          <input
            name="photoId"
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
        <LabeledField label="Priority">
          <select
            name="priority"
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
              :value="priorityValue"
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

function onSubmit () {
  const form = createTicketForm.value;

  if (!form) {
    return
  }
  if (!form.checkValidity()) {
    const fields = Array.from(form.elements)
    fields.forEach((field) => {field.checkVisibility()})
    return
  }

  const formData = new FormData(form)

  fetch('api/tickets/create', {
    method: 'POST',
    body: formData,
  })
}
</script>

<style scoped>

</style>
