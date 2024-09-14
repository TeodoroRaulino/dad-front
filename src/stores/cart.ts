import { CartItem } from "@/types/Cart";
import { create } from "zustand";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setIsOpen: (isOpen: boolean) => void;
  total: number;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  isOpen: false,
  total: 0,
  addItem: (newItem) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === newItem.id);
      let updatedItems;

      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...newItem, quantity: 1 }];
      }

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        items: updatedItems,
        isOpen: true,
        total: newTotal,
      };
    }),
  removeItem: (id) =>
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== id);

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        items: updatedItems,
        total: newTotal,
      };
    }),
  updateQuantity: (id, quantity) =>
    set((state) => {
      const updatedItems = state.items
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
        )
        .filter((item) => item.quantity > 0);

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        items: updatedItems,
        total: newTotal,
      };
    }),
  setIsOpen: (isOpen) => set({ isOpen }),
}));
