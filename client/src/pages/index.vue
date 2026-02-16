<template>
  <div v-if="!pending">
    <pre v-for="ticket in listTickets" :key="ticket.id">
      id: {{ ticket.id }}
      name: {{ ticket.name }}
      status: {{ ticket.status }}
    </pre>
  </div>

</template>

<script setup lang="ts">
import {useFetch} from '@/composables/useFetch.ts';
import type {TicketSummary} from '@shared/types';

const { pending, data: listTickets } = useFetch<TicketSummary[]>(() => '/api/tickets')

</script>

<style scoped>

</style>
