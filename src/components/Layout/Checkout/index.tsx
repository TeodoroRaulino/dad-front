"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Menu, MountainIcon } from "lucide-react";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";
import { ColorMode } from "@/components";

export const Checkout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <MountainIcon className="h-6 w-6" />
              <span className="ml-2 text-xl font-bold">Acme Inc</span>
            </Link>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <ColorMode />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Orders</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="sm:hidden flex items-end gap-1">
            <ColorMode />

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-4">
                  <Button variant="ghost" className="justify-start">
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Orders
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Settings
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Log out
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
