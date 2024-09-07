"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppStore } from "@/lib/hooks";
import { User } from "@/types/models";
import {
  Bell,
  ChevronDown,
  Search,
  User as UserIcon,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import authSlice from "@/features/auth";
import { useRouter } from "next/navigation";

export default function DashboardNavBar() {
  const store = useAppStore();
  const [session, setSession] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    setSession(store.getState().auth.session);
  }, [store]);

  const handleLogout = () => {
    dispatch(authSlice.actions.clearSession());
    router.push("/");
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Input className="w-64" placeholder="Search..." type="search" />
          <Button className="ml-4" variant="ghost">
            <Search className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="ml-4" variant="ghost">
                {session?.full_name}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
