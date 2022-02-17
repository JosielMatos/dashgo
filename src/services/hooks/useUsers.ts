import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

/** Puxar os dados de usuários da api */
async function getUsers(): Promise<User[]> {
  const { data } = await api.get("users");

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
  return users;
}

/** exportar hook com a query dos dados */
export function useUsers() {
  return useQuery("users", getUsers, {
    staleTime: 1000 * 10, // 10s de dados "frescos", antes de ficarem obsoletos
  });
}
