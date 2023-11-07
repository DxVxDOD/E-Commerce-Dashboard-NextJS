import { auth, UserButton } from "@clerk/nextjs";
import MainNavbar from "@/components/nav/MainNavbar";
import StoreSwitcher from "@/components/nav/StoreSwitcher";
import { redirect } from "next/navigation";
import { wrapInObject } from "@/lib/promiseWrap";
import { Store } from ".prisma/client";

const Navbar = async () => {

  const { userId } = auth();

  if(!userId) redirect('/sign-in');

  const { data: storesData, error: storesError } = await wrapInObject<Store[]>(prisma?.store.findMany({
    where: {
      userId
    }
  }))

  if (storesError) console.log(storesError)

  return (
    <section className={"border-b border-black"}>
      <div className={"flex h-16 items-center px-4"}>
        <StoreSwitcher items={storesData as Store[]} />
        <div>Routes</div>
        <MainNavbar />
        <div className={"ml-auto flex items-center space-x-4"}>
          <UserButton afterSignOutUrl={"/"} />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
