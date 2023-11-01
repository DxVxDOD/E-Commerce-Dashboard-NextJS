import { UserButton } from "@clerk/nextjs";
import MainNavbar from "@/components/nav/MainNavbar";
import StoreSwitcher from "@/components/nav/StoreSwitcher";

const Navbar = () => {
  return (
    <section className={"border-b border-black"}>
      <div className={"flex h-16 items-center px-4"}>
        <StoreSwitcher/>
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
