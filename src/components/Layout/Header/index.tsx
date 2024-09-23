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
import { useAuth } from "@/stores/auth";

export const Header = () => {
  const isLogged = useAuth((state) => state.isLogged);
  const onLogout = useAuth((state) => state.onLogout);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-0">
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

            {isLogged ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                      <span className="sr-only">User menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Menu</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Perfil</DropdownMenuItem>
                    <DropdownMenuItem>Pedidos</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout}>Sair</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button variant="ghost" asChild>
                <Link href="/auth/signin">Log in</Link>
              </Button>
            )}
          </div>

          <div className="sm:hidden flex items-end gap-1">
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
                <nav className="flex flex-col space-y-4 mt-4">
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
                  {isLogged ? (
                    <>
                      <Button variant="ghost" className="justify-start">
                        <User className="h-5 w-5 mr-2" />
                        Perfil
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        Pedidos
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        Sair
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
