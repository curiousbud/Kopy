/**
 * @fileoverview The user profile page for the Kopy application.
 *
 * This page displays the authenticated user's information and provides
 * a form for them to (theoretically) update their details. It is a
 * client-side component that relies on the Next-Auth session for user data.
 */

'use client';

// Import React hooks for side effects and navigation.
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Import Next-Auth hooks for session management.
import { useSession } from 'next-auth/react';
// Import UI components from ShadCN.
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from '@/components/ui/skeleton';

/**
 * The ProfilePage component.
 * It conditionally renders a loading skeleton, the profile form, or redirects
 * based on the authentication status.
 * @returns {JSX.Element} The rendered profile page or loading state.
 */
export default function ProfilePage() {
  // The useSession hook from Next-Auth provides session data and status.
  // - `data: session`: The session object, containing user info if authenticated.
  // - `status`: The authentication status ('loading', 'authenticated', 'unauthenticated').
  const { data: session, status } = useSession();
  const router = useRouter();

  /**
   * useEffect hook to handle redirection based on authentication status.
   * This runs whenever the `status` or `router` object changes.
   */
  useEffect(() => {
    // If the session has finished loading and the user is not authenticated,
    // redirect them to the homepage.
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  // While the session is loading, display a skeleton UI to provide feedback to the user.
  if (status === 'loading' || !session) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold font-headline mb-8">Profile</h1>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Update your account details here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-10 w-24" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Once authenticated, render the user's profile information.
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Profile</h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Update your account details here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            {/* Display the user's avatar. */}
            <Avatar className="h-20 w-20">
              {/* The user's image URL from the Google account. */}
              {session.user?.image && <AvatarImage src={session.user.image} data-ai-hint="person portrait" alt={session.user.name || 'User Avatar'} />}
              {/* A fallback that displays the first initial of the user's name if no image is available. */}
              <AvatarFallback>{session.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
            </Avatar>
            {/* The "Change Photo" button is disabled as this functionality is not implemented. */}
            <Button variant="outline" disabled>Change Photo</Button>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            {/* Input field pre-filled with the user's name. */}
            <Input id="name" defaultValue={session.user?.name || ''} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            {/* Email input is disabled as it's typically not changed. */}
            <Input id="email" type="email" defaultValue={session.user?.email || ''} disabled />
          </div>
          <div className="flex justify-end">
            {/* The "Save Changes" button is disabled. */}
            <Button disabled>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
