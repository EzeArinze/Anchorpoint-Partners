import React, { Suspense } from "react";
import CustomersTable from "./_components/customer-table";
// import { getAllUsers } from "@/data/admin/get-all-users";

async function UsersRoute() {
  // const users = await getAllUsers({ offset: 0 });

  return (
    <div className="mt-4 px-4 lg:px-8 space-y-3">
      <h2 className="font-semibold text-xl">All Users</h2>
      <Suspense>
        <CustomersTable />
      </Suspense>
    </div>
  );
}

export default UsersRoute;
