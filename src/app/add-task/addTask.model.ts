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
  title: string;
  description: string;
  assignedTo: number[];
  dueDate: string;
  priority: string;
  category: string;
  subtasks?: any[];
}

export interface Subtask {
  value: string;
  edit: boolean;
}

