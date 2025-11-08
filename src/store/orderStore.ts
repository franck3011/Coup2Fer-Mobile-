import { create } from 'zustand'
import { Order } from '../types'

interface OrderState {
  orders: Order[]
  loading: boolean
  setOrders: (orders: Order[]) => void
  addOrder: (order: Order) => void
  updateOrder: (id: string, updates: Partial<Order>) => void
}

// Commandes demo pour test
const DEMO_ORDERS: Order[] = [
  {
    id: 'order-1',
    userId: 'user-demo',
    userName: 'Client Demo',
    userPhone: '+33 6 12 34 56 78',
    userAddress: '123 Rue de Paris, 75001 Paris',
    status: 'in_progress',
    items: [
      { type: 'Chemise', quantity: 3, specialCare: false, price: 15 },
      { type: 'Pantalon', quantity: 2, specialCare: false, price: 12 }
    ],
    pickupDate: new Date().toISOString(),
    pickupTimeSlot: '10-12',
    deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryTimeSlot: '14-16',
    estimatedPrice: 69,
    paymentStatus: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export const useOrderStore = create<OrderState>((set) => ({
  orders: DEMO_ORDERS,
  loading: false,
  setOrders: (orders) => set({ orders }),
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
  updateOrder: (id, updates) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, ...updates } : order
      ),
    })),
}))
