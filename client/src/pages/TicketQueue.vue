<template>
  <div
    v-if="listTickets"
    class="grid"
  >
    <div
      v-for="(status, idx) in statusValues"
      :key="`statusValue-${idx}`"
    >
      <h2>
        {{ status }}
      </h2>
      <ul>
        <li
          v-for="(ticket, ticketIdx) in getTicketsForList(status)"
          :key="`ticket-${ticketIdx}`"
        >
          {{ ticket.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {statusValues} from '@/types/tickets.ts';
import {useFetch} from '@/composables/useFetch.ts';
import type {TicketSummary} from '@shared/types';

const { data: listTickets } = useFetch<TicketSummary[]>(() => '/api/tickets')

const getTicketsForList = (status: string) => listTickets.value?.filter(listTicket => listTicket.status === status);

</script>

<style scoped>

</style>
