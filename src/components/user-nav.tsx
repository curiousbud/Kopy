/**
 * @fileoverview The user navigation component.
 *
 * This component displays the user's avatar and a dropdown menu with
 * links to profile, settings, and other user-specific actions. It also
 * handles the sign-in and sign-out logic using Next-Auth.
 */

"use client";

// Import hooks for routing and session management.
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
// Import UI components.
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";
// Import icons.
import { LogIn, LogOut, User, Settings, LifeBuoy, Puzzle } from "lucide-react";

/**
 * The UserNav component.
 * It conditionally renders a sign-in button or the user dropdown menu
 * based on the authentication status.
 * @returns {JSX.Element} The rendered user navigation component.
 */
export function UserNav() {
  const router = useRouter();
  // The useSession hook provides the session data and the authentication status.
  const { data: session, status } = useSession();

  /**
   * Handles the "Support" menu item click by opening the user's default email client.
   */
  const handleSupport = () => {
    window.location.href = "mailto:support@kopy.app";
  };

  // While the session is loading, display a skeleton placeholder.
  if (status === 'loading') {
    return <Skeleton className="h-9 w-9 rounded-full" />;
  }

  // If the user is not authenticated, display a "Sign In" button.
  if (!session) {
    return (
      // When clicked, call the `signIn` function from Next-Auth with the 'google' provider.
      <Button variant="outline" onClick={() => signIn('google')}>
        <LogIn className="mr-2" />
        Sign In
      </Button>
    );
  }

  // If the user is authenticated, display the dropdown menu.
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            {/* Display the user's avatar image from their Google account. */}
            {session.user?.image && <AvatarImage src={session.user.image} data-ai-hint="person portrait" alt={session.user.name || ''} />}
            {/* Fallback to the user's first initial if no image is available. */}
            <AvatarFallback>{session.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {/* The top section of the dropdown, showing user's name and email. */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none font-headline">{session.user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* A group of navigation links. */}
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => router.push('/profile')}>
            <User className="mr-2" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => router.push('/settings')}>
            <Settings className="mr-2" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => router.push('/plugins')}>
            <Puzzle className="mr-2" />
            <span>Plugins</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleSupport}>
            <LifeBuoy className="mr-2" />
            <span>Support</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* The log out button. */}
        <DropdownMenuItem onSelect={() => signOut()}>
          <LogOut className="mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
