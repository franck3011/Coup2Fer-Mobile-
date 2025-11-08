import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useOrderStore } from '../store/orderStore'
import { Camera, Plus, Minus, Calendar, Clock, MapPin, CreditCard } from 'lucide-react'
import type { OrderItem } from '../types'

export default function NewOrder() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { addOrder } = useOrderStore()
  
  const [items, setItems] = useState<OrderItem[]>([
    { type: 'Chemise', quantity: 0, specialCare: false, price: 5 },
    { type: 'Pantalon', quantity: 0, specialCare: false, price: 6 },
    { type: 'Veste', quantity: 0, specialCare: false, price: 12 },
    { type: 'Robe', quantity: 0, specialCare: false, price: 15 },
    { type: 'Manteau', quantity: 0, specialCare: false, price: 20 }
  ])
  
  const [pickupDate, setPickupDate] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [address, setAddress] = useState('')

  const updateQuantity = (index: number, delta: number) => {
    setItems(items.map((item, i) => 
      i === index ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ))
  }

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * (item.price || 0), 0)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const selectedItems = items.filter(item => item.quantity > 0)
    
    if (selectedItems.length === 0) {
      alert('Veuillez sélectionner au moins un article')
      return
    }

    const order = {
      id: 'order-' + Date.now(),
      userId: user!.id,
      userName: user!.displayName,
      userPhone: user!.phoneNumber,
      userAddress: address,
      status: 'pending' as const,
      items: selectedItems,
      pickupDate,
      pickupTimeSlot: '10-12' as const,
      deliveryDate,
      deliveryTimeSlot: '14-16' as const,
      estimatedPrice: calculateTotal(),
      paymentStatus: 'pending' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    addOrder(order)
    navigate('/orders')
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const total = calculateTotal()

  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Camera size={28} />
        Nouvelle Commande
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Articles */}
        <div className="card">
          <h3 className="font-bold text-gray-900 mb-4">Sélectionnez vos articles</h3>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.type}</p>
                  <p className="text-sm text-gray-600">{item.price}€ / pièce</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateQuantity(index, -1)}
                    className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    disabled={item.quantity === 0}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(index, 1)}
                    className="w-8 h-8 rounded-full bg-primary-600 border-2 border-primary-600 flex items-center justify-center text-white hover:bg-primary-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dates */}
        <div className="card space-y-4">
          <h3 className="font-bold text-gray-900">Dates de collecte et livraison</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Calendar size={16} />
              Date de collecte
            </label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="input-field"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Calendar size={16} />
              Date de livraison souhaitée
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="input-field"
              required
              min={pickupDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Adresse */}
        <div className="card">
          <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
            <MapPin size={16} />
            Adresse de collecte et livraison
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input-field"
            rows={3}
            placeholder="123 Rue de Paris, 75001 Paris"
            required
          />
        </div>

        {/* Récapitulatif */}
        {totalItems > 0 && (
          <div className="card bg-primary-50 border-primary-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-700">Total articles</span>
              <span className="font-bold text-gray-900">{totalItems}</span>
            </div>
            <div className="flex items-center justify-between text-xl">
              <span className="font-bold text-gray-900">Total estimé</span>
              <span className="font-bold text-primary-600">{total.toFixed(2)} €</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              * Prix indicatif, le montant final sera confirmé après inspection
            </p>
          </div>
        )}

        {/* Bouton de validation */}
        <button
          type="submit"
          disabled={totalItems === 0}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <CreditCard size={20} />
          Passer la commande
        </button>
      </form>
    </div>
  )
}
