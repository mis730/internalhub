
export interface Employee {
  id: string;
  name: string;
  role: string;
  deptId: string;
  team: string;
  managerId: string | null;
  email: string;
  phone: string;
  location: string;
  photoUrl: string;
  bio: string;
  skills: string[];
}

export interface Department {
  id: string;
  name: string;
  description: string;
  responsibilities: string[];
  leadId: string;
  icon: string;
}

export interface WorkflowStep {
  id: string;
  order: number;
  title: string;
  ownerDept: string;
  inputs: string;
  outputs: string;
  tools: string[];
  sla: string;
  description: string;
}

export interface Resource {
  id: string;
  category: string;
  name: string;
  url: string;
  description: string;
}

export interface PortalConfig {
  logoUrl: string;
  bgImage?: string; // Base64 string for full page background
  accentColor: string;
  footerText: string;
  adminPasscode: string;
  announcement: string;
}

export interface HubData {
  employees: Employee[];
  departments: Department[];
  workflow: WorkflowStep[];
  resources: Resource[];
  config: PortalConfig;
}
