import Button from "@/components/ui/button";
import { AdminTable } from "../../users/userComponents";

export default function Administrator() {
  return (<section className="space-y-6 p-5 rounded-2xl bg-white">
    <header className="flex flex-wrap justify-between items-center gap-4">
      <h4>All Administrators</h4>
      <Button link href="/settings/administrator/create-admin" className="pry-btn">Add Administrators</Button>
    </header>
    <AdminTable />
  </section>)
};
