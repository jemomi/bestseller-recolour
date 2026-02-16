export type TicketStatus = 'Pending' | 'Sent' | 'In Progress' | 'Completed' | 'Rejected';
export type TicketPriority = 'High' | 'Medium' | 'Low';

export type TicketSummary = {
  id: number;
  name: string;
  status: TicketStatus;
};

export type TicketDetail = TicketSummary & {
  files: string[];
  guideline: string | null;
};
