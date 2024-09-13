import { Button } from "@/components";
import { MountainIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export const Auth: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 text-gray-950 dark:text-gray-50">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">Acme Inc</span>
        </Link>
        <Button.ColorMode />
      </div>

      <div className="flex items-center justify-center p-10 h-full">
        {children}
      </div>
    </div>
  );
};
