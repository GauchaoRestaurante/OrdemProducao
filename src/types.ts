export type ShiftType = 'madrugada' | 'almoco' | 'jantar';

export interface TaskItem {
  id: string;
  num: number | string;
  description: string;
  responsible: string;
  completed: boolean;
  notes: string;
  estimatedTime?: string;
}

export interface ProductionSection {
  id: string;
  title: string;
  subtitle?: string;
  items: TaskItem[];
}

export interface ClosingCheckItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface ProductionOrder {
  id: string;
  shift: ShiftType;
  date: string;
  menu: string;
  elaboratedBy: string;
  sections: ProductionSection[];
  closingChecks: ClosingCheckItem[];
  pendingNotes: string;
  shiftSupervisor: string;
  receivedBy: string;
  lastUpdated: string;
}

export interface Collaborator {
  id: string;
  name: string;
  role: string;
  preferredShift?: ShiftType[];
  notes?: string;
}

export type FontSizeSetting = 'compact' | 'normal' | 'large' | 'extra';
