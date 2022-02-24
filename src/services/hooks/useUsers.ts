import { useQuery } from "react-query";
import { api } from "../api";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface GetUsersResponse {
  users: User[];
  totalCount: number;
}

/** Puxar os dados de usuários da api */
async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get("users", {
    params: {
      page,
    },
  });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return {
    users,
    totalCount,
  };
}

/** exportar hook com a query dos dados */
export function useUsers(page: number) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 5, // 5min de dados "frescos", antes de ficarem obsoletos
  });
}
