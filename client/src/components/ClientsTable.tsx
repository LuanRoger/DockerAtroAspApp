import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { useStore } from "@nanostores/react";
import usersStore from "../stores/users_store";
import pageStore from "../stores/page_store";
import type Client from "../services/models/client";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import ClientTableRow from "./ClientTableRow";
import { Skeleton } from "./ui/skeleton";

export default function ClientsTable() {
  const $page = useStore(pageStore);
  const $users = useStore(usersStore);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers(page: number) {
      const users = await getUsers(page);
      usersStore.set(users);
    }

    setIsLoading(true);
    Promise.all([fetchUsers($page)]).then(() => setIsLoading(false));
  }, [$page]);

  if (isLoading) {
    return <ClientsTableLoading />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {$users.map((client: Client) => (
          <ClientTableRow client={client} />
        ))}
      </TableBody>
    </Table>
  );
}

function ClientsTableLoading() {
  const skeletonRowLoading = <Skeleton className="w-full h-20" />;
  const skeletonHeaderLoading = <Skeleton className="w-20 h-5"/>;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between">
        {skeletonHeaderLoading}
        {skeletonHeaderLoading}
        {skeletonHeaderLoading}
        {skeletonHeaderLoading}
      </div>
      {skeletonRowLoading}
      {skeletonRowLoading}
      {skeletonRowLoading}
    </div>
  );
}
