export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  profilePic?: string;
  whatsapp?: string;
  role: 'Admin' | 'Sub_Admin' | 'member';
  joinedAt: number;
  participationPct: number;
  activityCount: number;
  lastActiveAt: number;
  isActive: boolean;
}

export interface Announcement {
  id: string;
  text: string;
  order: number;
  active: boolean;
  createdAt: number;
}

export interface Group {
  id: string;
  name: string;
  image: string;
  link: string;
  membersCount: number;
  owner?: string;
  subAdmins?: string[];
}

export interface ProjectRecord {
  id: string;
  title: string;
  month: string;
  successCount: number;
  topAchievement: string;
  assurancePct: number;
  notes?: string;
  attachments?: string[];
}

export interface ScriptUpdate {
  id: string;
  title: string;
  description: string;
  fileLink?: string;
  active: boolean;
  createdAt: number;
}

export interface ScriptAccount {
  id: string;
  title: string;
  email?: string;
  password?: string;
  fileLink?: string;
}

export interface ScriptAccess {
  id: string;
  userId: string;
  scriptId: string;
  apiKey: string;
  createdAt: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'script_update' | 'announcement' | 'broadcast';
  title: string;
  message: string;
  read: boolean;
  createdAt: number;
}

export interface StatsSummary {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  totalProjects: number;
  averageParticipation: number;
}

export type View = 'home' | 'signup' | 'login' | 'dashboard' | 'script' | 'about' | 'admin';
export type DashboardTab = 'members' | 'records' | 'projects' | 'script';
export type AdminTab = 'announcements' | 'scripts' | 'scriptAccounts' | 'groups' | 'projects' | 'members' | 'scriptAccess';
