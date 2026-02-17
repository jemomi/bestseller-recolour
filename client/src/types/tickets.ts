import type {TicketPriority, TicketStatus} from '@shared/types';

export const priorityValues = {
  Low: 'Low' ,
  Medium: 'Medium' ,
  High: 'High' ,
} satisfies Record<TicketPriority, string>;

export const statusValues = {
  Pending: 'Pending' ,
  Sent: 'Sent' ,
  'In Progress': 'In Progress' ,
  Completed: 'Completed' ,
  Rejected: 'Rejected' ,
} satisfies Record<TicketStatus, string>;
