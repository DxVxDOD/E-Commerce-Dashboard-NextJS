"use client";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

const MainNavbar = (className: HTMLAttributes<HTMLElement>) => {
  const pathName = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.store_id}/settings`,
      label: "Settings",
      active: pathName === `/${params.store_id}/settings`,
    },
    {
      href: `/${params.store_id}`,
      label: "Overview",
      active: pathName === `/${params.store_id}`,
    },
    {
      href: `/${params.store_id}/billboards`,
      label: "Billboards",
      active: pathName === `/${params.store_id}/billboards`,
    }
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNavbar;
