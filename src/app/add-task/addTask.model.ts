export interface PrioOption {
  priority: string;
  value: string;
  icon: string;
  class: string;
}

export interface Category {
  name: string;
}


export interface Task {
  id?: number;
  title: string;
  description: string;
  assignedTo: number[];
  dueDate: string;
  priority: string;
  category: string;
  subtasks?: any[];
  status: string;
}

export interface Subtask {
  value: string;
  edit: boolean;
  done: boolean;
}

