export interface User {
  id: string
  email: string
  displayName: string
  phoneNumber: string
  role: 'client' | 'driver' | 'admin'
  createdAt: Date
}

export interface Order {
  id: string
  userId: string
  userName: string
  userPhone: string
  userAddress: string
  status: OrderStatus
  items: OrderItem[]
  pickupDate: string
  pickupTimeSlot: TimeSlot
  deliveryDate: string
  deliveryTimeSlot: TimeSlot
  estimatedPrice: number
  finalPrice?: number
  paymentStatus: PaymentStatus
  paymentMethod?: PaymentMethod
  createdAt: Date
  updatedAt: Date
  driverId?: string
}

export interface OrderItem {
  type: string
  quantity: number
  specialCare: boolean
  price?: number
  notes?: string
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'picked_up'
  | 'in_progress'
  | 'ready'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'

export type TimeSlot = 
  | '8-10'
  | '9:00-11:00'
  | '10-12'
  | '10:00-12:00'
  | '12-14'
  | '12:00-14:00'
  | '14-16'
  | '14:00-16:00'
  | '16-18'
  | '16:00-18:00'
  | '18-20'
  | '18:00-20:00'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export type PaymentMethod = 'card' | 'cash' | 'mobile'
