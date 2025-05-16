import { UserCircle2, Book, Briefcase } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  description: string;
  userRole: 'lawyer' | 'client' | 'provider';
}

export function DashboardHeader({ title, description, userRole }: DashboardHeaderProps) {
  const RoleIcon = 
    userRole === 'lawyer' ? Briefcase :
    userRole === 'client' ? UserCircle2 : Book;
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      
      <div className="flex items-center p-2 pl-3 pr-4 bg-primary/10 rounded-full text-primary">
        <RoleIcon className="mr-2 h-5 w-5" />
        <span className="font-medium capitalize">{userRole} Portal</span>
      </div>
    </div>
  );
}