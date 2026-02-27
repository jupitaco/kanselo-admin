import { UserInfoSkeleton } from "@/components/main/users/userComponents";

import GoBackBtn from "@/components/ui/goBackBtn";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";

export default async function Page() {
  return (
    <div className="space-y-4 p-5">
      <GoBackBtn title="Back" className="outline-btn btn" />

      <main className="flex flex-wrap gap-4">
        <UserInfoSkeleton userType="Mentee" />
        <aside className="flex-1 space-y-8 rounded-xl bg-white p-4">
          <h4 className="font-semibold">Consultations</h4>
          <TableSkeleton columns={3} rows={12} />
        </aside>
      </main>
    </div>
  );
}
