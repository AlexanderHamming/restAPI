import { Photo } from "@prisma/client";

export type photoId = Pick<Photo, "id">

export type createPhoto = Omit<Photo, "id">

export type updatePhoto = Partial<createPhoto>
