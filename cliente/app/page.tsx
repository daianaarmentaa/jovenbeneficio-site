'ues client';
import { auth0 } from "@/lib/auth0"; // Adjust path if your auth0 client is elsewhere
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <main>
        <a href="/auth/login">Log in</a>
      </main>
    );
  }

  redirect('/home');

}