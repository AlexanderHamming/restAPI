import { Album } from "@prisma/client";

export type albumId = Pick<Album, "id">

export type createAlbum = Omit<Album, "id">

export type updateAlbum = Partial<createAlbum>
