import { CartItem, Product, Order, User } from '@prisma/client';
import { create } from 'zustand';
import { addProductToCart, getCart, updateCartItemQuantity } from '../services/cart';
import toast from 'react-hot-toast';
import axiosInstance from '../services/instance';
import { ApiRoutes } from '../services/constants';

interface CartItemWithProduct extends CartItem {
    product: Product;
}

interface OrderType {
  userId?: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  comment?: string | null;
  total: number;
  paymentType: string;
  items: string;
}

interface CartState {
    cartItems: CartItemWithProduct[];
    loading: boolean;
    fetchCart: () => void;
    addItem: (productId: number, quantity: number) => Promise<CartItemWithProduct []>;
    removeItem: (productId: number) => void;
    createOrder: (data: OrderType) => Promise<Order>;
    updateQuantity: (productId: number, quantity: number) => void;
    setLoading: (status: boolean) => void; 
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

    removeItem: async (productId) => {
      try {
        set({loading: true});
        const data = await updateCartItemQuantity(productId, 0);
        if (data) {
          toast.success('Product deleted')
        }
        set({cartItems: data})
      } catch(error){
        console.error(error);
      } finally {
        set({ loading: false });
      }
    },

    createOrder: async (data) => {
      try {
        set({loading: true})
        const res = await axiosInstance.post(`${ApiRoutes.ORDER}`, data);
        if (res.status === 200) {
          toast.success('Order was created');
          set({cartItems: []})
        } else {
          toast.error('Cant create order')
        }
        return res.data;
      } catch(error) {
        console.log(error)
        toast.error("Cant create order")
      } 
    },

    updateQuantity: async (productId: number, quantity: number) => {
      try {
        set({loading: true});
        const data = await updateCartItemQuantity(productId, quantity);
        if (data) {
          toast.success('Product quantity updated')
        }
        set({cartItems: data})
      } catch(error){
        console.error(error);
      } finally {
        set({ loading: false });
      }
    },

    setLoading: (status: boolean) => {
      set({loading: status})
    }

  }));