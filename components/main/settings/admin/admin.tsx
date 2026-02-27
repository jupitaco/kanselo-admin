import { getAllAdminApi } from "@/services/apis/auth.api";
import { AdminTable } from "../../users/userComponents";

import { PaginationProvider } from "@/context/paginateContext";
import { SearchPageParams } from "@/types/global";
import { ErrorUI } from "@/components/ui/emptyState";

export default async function Administrator({
  params,
}: {
  params: SearchPageParams;
}) {
  const rsp = await getAllAdminApi(params?.page || "1");

  if (!rsp?.ok) {
    return <ErrorUI code={rsp?.body?.code} message={rsp?.body?.message} />;
  }

  const { admins, page, limit, total } = rsp?.body?.data;

  const adminData = {
    page,
    total,
    limit,
    assets: admins,
  };
  return (
    <PaginationProvider data={adminData}>
      <AdminTable />
    </PaginationProvider>
  );
}
