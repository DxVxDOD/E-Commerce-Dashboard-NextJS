"use client";

import { FC } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type TApiAlertProps = {
  title: string;
  description: string;
  variant: "public" | "admin";
};

const textMap: Record<TApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<TApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert: FC<TApiAlertProps> = ({ title, description, variant }) => {
  const onCopy = async (description: string) => {
    await navigator.clipboard.writeText(description);
  };

  return (
    <Alert>
      <Server className={"h-4 w-4"} />
      <AlertTitle className={"flex items-center gap-x-2"}>
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className={"mt-4 flex items-center justify-between"}>
        <code
          className={
            " relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
          }
        >
          {description}
        </code>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => onCopy(description)}
        >
          <Copy className={"h-4 w-4"} />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
