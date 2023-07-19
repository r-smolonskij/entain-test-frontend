export type StatusType = 'inactive' | 'active' | 'finished';

export interface Status{
    name: string,
    value: StatusType
  }