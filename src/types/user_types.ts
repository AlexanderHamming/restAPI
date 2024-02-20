import { User } from "@prisma/client";

export type userId = Pick<User, "id">

export type createUser = Omit<User, "id">


