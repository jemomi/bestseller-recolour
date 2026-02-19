import type {TicketStatus} from '@shared/types';

export const statusValues = {
  Pending: 'Pending' ,
  Sent: 'Sent' ,
  'In Progress': 'In Progress' ,
  Completed: 'Completed' ,
  Rejected: 'Rejected' ,
} satisfies Record<TicketStatus, string>;
