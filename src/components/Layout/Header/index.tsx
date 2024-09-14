"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Search, Menu, MountainIcon } from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";
import { Cart, ColorMode } from "@/components";

const isLoggedIn = false; //TODO: Change this to true to see the logged-in state

export const Header = () => {
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

          <div className="hidden sm:block flex-1 max-w-md mx-4">
            <form className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </form>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <ColorMode />
            <Cart />

            {isLoggedIn ? (
              <>
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
              </>
            ) : (
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
            )}
          </div>

          <div className="sm:hidden">
            <ColorMode />
            <Cart />

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4">
                  <form className="relative">
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full pl-10"
                    />
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  </form>
                  {isLoggedIn ? (
                    <>
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
                    </>
                  ) : (
                    <Button variant="ghost" asChild className="justify-start">
                      <Link href="/auth/login">Log in</Link>
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
