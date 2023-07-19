export interface Event {
  id?: number;
  name: string;
  sport: 'football' | 'basketball' | 'hockey' | 'tennis';
  status: 'inactive' | 'active' | 'finished';
  startTime: Date;
  finishTime: Date;
}

export interface EventsResponse {
  events: Event[];
  totalItems: number;
  totalPages: number;
}
