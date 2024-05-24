import { authOptions } from "@/auth";
import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <WidgetItem title="Logged user S-Side">
        <div className="flex flex-col">
          <span>{session.user?.name}</span>
        </div>
      </WidgetItem>
    </div>
  );
}
