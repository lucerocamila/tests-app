export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  createdBy: string;
  company?: Company;
  // test?: Test[];
  test?: Test[];
  token: string;
  avatar?: string;
  roleTitle?: string; 
  companyId?: string;
  testId?: string; 
 
}

export interface Company {
  id: string;
  name: string;
  owner_first_name: string;
  owner_last_name: string;
  phone: string;
  email: string;
  isActive: boolean;
  createdBy: string;
  employees?: Employee[];
}

export interface Test {
  id: string;
  name?: string;
  description?: string;
  isActive?: boolean;
  question?: Question[];
  result?: Result;
}

export interface Question {
  id: string;
  description: string;
  type: null;
  isActive: boolean;
  answer: Answer[];
}

export interface Answer {
  id: string;
  description: string;
  points: number;
  type: null;
  isEmpty: boolean;
  isActive: boolean;
}

export interface Result {
  id: string;
  description: string;
  result_detail: Array<any[]>;
}

export interface Employee {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean
  createdBy: string;
  test: Test[];
}
