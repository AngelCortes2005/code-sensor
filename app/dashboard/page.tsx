import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Image from "next/image";
import { LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">No has iniciado sesión.</p>
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="p-8 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-transparent bg-clip-text bg-linear-to-r from-[#019A8E] to-CodeSensor-Primary shadow font-bold">
            Welcome, {user?.name}
          </h1>
          <p className="text-sm text-gray-500">
            Welcome to your dashboard where you can manage 
            your repositories and view analysis reports.
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              src={user?.image || "/avatar-placeholder.png"}
              alt="Avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-red-600">
                Log-Out
                <DropdownMenuShortcut><LogOut /></DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </div>
  );
};

export default DashboardPage;
