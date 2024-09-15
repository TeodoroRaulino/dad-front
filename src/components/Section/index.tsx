"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  button?: React.ReactNode;
  mainClassName?: string;
  contentClassName?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  title,
  description,
  button,
  mainClassName,
  contentClassName,
}) => {
  return (
    <Card className={cn("xl:col-span-2", mainClassName)}>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="grid gap-2">
          {title && <CardTitle>{title}</CardTitle>}
          {description && (
            <CardDescription className="text-sm text-gray-500">
              {description}
            </CardDescription>
          )}
        </div>
        {button && button}
      </CardHeader>
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  );
};
