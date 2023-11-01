import { ReactNode } from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { wrapInObject } from "@/lib/promiseWrap";
import prismaDb from "@/lib/prismadb";
import Navbar from "@/components/nav/Navbar";
import { Store } from ".prisma/client";

const DashboardLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { storeId: string };
}) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const { data: storeData, error: storeError } = await wrapInObject<Store>(
    prismaDb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    }),
  );

  if (storeError) redirect("/");

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
