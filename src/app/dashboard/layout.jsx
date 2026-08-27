import RequireAuth from "@/components/auth/RequireAuth";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardLayout({ children }) {
  return (
    <RequireAuth>
      <DashboardShell>{children}</DashboardShell>
    </RequireAuth>
  );
}
