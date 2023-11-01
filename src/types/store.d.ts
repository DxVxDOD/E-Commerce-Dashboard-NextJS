import { Prisma } from "@prisma/client";

const storePersonDetails = Prisma.validator<Prisma.StoreDefaultArgs>()({
  select: { name: true, userId: true },
});

export type TStorePersonDetails = Prisma.StoreGetPayload<
  typeof storePersonDetails
>;
