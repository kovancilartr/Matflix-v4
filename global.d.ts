import { User } from "@auth/core/types";

declare module "@auth/core/types" {
  interface User {
    id: string;
    name: string;
    surname: string;
    username: string;
    email: string;
    avatar: string;
    role?: string;
    status?: string;
    department?: string;
    class?: string;
  }
}