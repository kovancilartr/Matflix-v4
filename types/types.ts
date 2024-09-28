export interface User {
  id: number;
  email: string;
  role: string;
  name: string;
  surname: string;
  username: string;
  avatar: string;
  status: string;
  department: string;
  class: string;
  created_at: string;
}

export interface SessionData {
  user: User;
}


{/* EditUserModel Component */}
export interface EditUserModelProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedUser?: User | null;
  editOnSuccess: () => void;
}



/* AdminDashboard Component */
export interface SideNavItem {
  name: string;
  url: string;
  icon: React.ReactNode;
}
export interface TabNavItem {
  name: string;
  url: string;
  icon: React.ReactNode;
}
export interface AdminDashboardProps {
  children: React.ReactNode;
  sidebarMenuItems: SideNavItem[];
  tabMenuItems?: TabNavItem[];
}

/* AddUserModal Component */
export interface AddUserModalProps {
  onSuccess?: (data: any, error: any) => void;
  setOpen: (open: boolean) => void;
  openModel: boolean;
}