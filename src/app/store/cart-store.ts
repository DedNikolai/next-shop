import { CartItem, Product } from '@prisma/client';
import { create } from 'zustand';
import { addProductToCart, getCart } from '../services/cart';
import { number } from 'yup';
import toast from 'react-hot-toast';

interface CartItemWithProduct extends CartItem {
    product: Product;
  }
  
  interface CartState {
    cartItems: CartItemWithProduct[];
    loading: boolean;
    fetchCart: () => void;
    addItem: (productId: number, quantity: number) => Promise<CartItemWithProduct []>;
    removeItem: (itemId: number) => void;
    clearCart: () => void;
  }

  export const useCartStore = create<CartState>((set) => ({
    cartItems: [],
    loading: true, 

    fetchCart: async () =>{
        try {
            set({loading: true})
            const data = await getCart();
            set({cartItems: data})
        }catch (error) {
          console.error(error);
        } finally {
          set({ loading: false });
        }
    },

    addItem: async (productId: number, quantity: number) => {
      try {
        set({loading: true});
        const data = await addProductToCart(productId, quantity);
        if (data) {
          toast.success('Product added')
        }
        set({cartItems: data})
        return new Promise(res => res(data))
      } catch(error){
        console.error(error);
        return new Promise(res => res([]))
      } finally {
        set({ loading: false });
      }
    },

    removeItem: (itemId) => set((state) => ({
      cartItems: state.cartItems.filter(item => item.id !== itemId)
    })),

    clearCart: () => set({ cartItems: [] }),

  }));