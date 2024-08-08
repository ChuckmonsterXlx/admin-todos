import { redirect } from "next/navigation";
import { Metadata } from "next";

import { auth } from "@/auth.config";
import { WidgetItem } from "@/components";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard Page",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <WidgetItem title="Logged user S-Side">
        <div className="flex flex-col">
          <span>username {session.user?.name}</span>
          <span>email: {session.user?.email}</span>
        </div>

        <div className="break-all">{JSON.stringify(session)}</div>
      </WidgetItem>
    </div>
  );
}
