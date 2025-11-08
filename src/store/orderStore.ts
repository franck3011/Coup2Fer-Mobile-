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
    id: 'order-2024-001',
    userId: 'user-demo',
    userName: 'Client Demo',
    userPhone: '+33 6 12 34 56 78',
    userAddress: '123 Rue de Paris, 75001 Paris',
    status: 'out_for_delivery',
    items: [
      { type: 'Chemise', quantity: 5, specialCare: false, price: 5 },
      { type: 'Pantalon', quantity: 3, specialCare: false, price: 6 }
    ],
    pickupDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    pickupTimeSlot: '10-12',
    deliveryDate: new Date().toISOString(),
    deliveryTimeSlot: '14-16',
    estimatedPrice: 43,
    finalPrice: 43,
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    id: 'order-2024-002',
    userId: 'user-demo',
    userName: 'Client Demo',
    userPhone: '+33 6 12 34 56 78',
    userAddress: '123 Rue de Paris, 75001 Paris',
    status: 'in_progress',
    items: [
      { type: 'Robe', quantity: 2, specialCare: true, price: 15 },
      { type: 'Veste', quantity: 1, specialCare: false, price: 12 }
    ],
    pickupDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    pickupTimeSlot: '14-16',
    deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryTimeSlot: '10-12',
    estimatedPrice: 42,
    paymentStatus: 'pending',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    id: 'order-2024-003',
    userId: 'user-demo',
    userName: 'Client Demo',
    userPhone: '+33 6 12 34 56 78',
    userAddress: '123 Rue de Paris, 75001 Paris',
    status: 'confirmed',
    items: [
      { type: 'Manteau', quantity: 1, specialCare: true, price: 20 },
      { type: 'Chemise', quantity: 4, specialCare: false, price: 5 }
    ],
    pickupDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    pickupTimeSlot: '10-12',
    deliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryTimeSlot: '14-16',
    estimatedPrice: 40,
    paymentStatus: 'pending',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    id: 'order-2024-004',
    userId: 'user-demo',
    userName: 'Client Demo',
    userPhone: '+33 6 12 34 56 78',
    userAddress: '123 Rue de Paris, 75001 Paris',
    status: 'delivered',
    items: [
      { type: 'Chemise', quantity: 10, specialCare: false, price: 5 },
      { type: 'Pantalon', quantity: 5, specialCare: false, price: 6 }
    ],
    pickupDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    pickupTimeSlot: '14-16',
    deliveryDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryTimeSlot: '10-12',
    estimatedPrice: 80,
    finalPrice: 75,
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'order-2024-005',
    userId: 'user-demo',
    userName: 'Client Demo',
    userPhone: '+33 6 12 34 56 78',
    userAddress: '123 Rue de Paris, 75001 Paris',
    status: 'ready',
    items: [
      { type: 'Veste', quantity: 2, specialCare: false, price: 12 },
      { type: 'Pantalon', quantity: 3, specialCare: false, price: 6 }
    ],
    pickupDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    pickupTimeSlot: '10-12',
    deliveryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryTimeSlot: '14-16',
    estimatedPrice: 42,
    finalPrice: 42,
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    id: 'order-2024-006',
    userId: 'user-demo',
    userName: 'Client Demo',
    userPhone: '+33 6 12 34 56 78',
    userAddress: '123 Rue de Paris, 75001 Paris',
    status: 'delivered',
    items: [
      { type: 'Robe', quantity: 1, specialCare: true, price: 15 }
    ],
    pickupDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    pickupTimeSlot: '10-12',
    deliveryDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryTimeSlot: '14-16',
    estimatedPrice: 15,
    finalPrice: 15,
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
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
