import { useParams, useNavigate } from 'react-router-dom'
import { useOrderStore } from '../store/orderStore'
import { ArrowLeft, Package, MapPin, Calendar, Clock, CreditCard, CheckCircle } from 'lucide-react'

export default function OrderDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { orders } = useOrderStore()

  const order = orders.find(o => o.id === id)

  if (!order) {
    return (
      <div className="px-4 py-6">
        <div className="card text-center py-12">
          <Package className="mx-auto text-gray-400 mb-4" size={64} />
          <p className="text-gray-600">Commande introuvable</p>
          <button onClick={() => navigate('/orders')} className="btn-primary mt-4">
            Retour aux commandes
          </button>
        </div>
      </div>
    )
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'En attente de confirmation',
      confirmed: 'Confirmée',
      picked_up: 'Collectée',
      in_progress: 'En cours de traitement',
      ready: 'Prête pour livraison',
      out_for_delivery: 'En cours de livraison',
      delivered: 'Livrée',
      cancelled: 'Annulée'
    }
    return labels[status] || status
  }

  const statusSteps = [
    { key: 'confirmed', label: 'Confirmée' },
    { key: 'picked_up', label: 'Collectée' },
    { key: 'in_progress', label: 'En cours' },
    { key: 'ready', label: 'Prête' },
    { key: 'out_for_delivery', label: 'En livraison' },
    { key: 'delivered', label: 'Livrée' }
  ]

  const currentStepIndex = statusSteps.findIndex(step => step.key === order.status)

  return (
    <div className="px-4 py-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/orders')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Commande #{order.id.slice(0, 12)}</h1>
          <p className="text-sm text-gray-600">
            {new Date(order.createdAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Statut actuel */}
      <div className="card bg-primary-50 border-primary-200 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary-600 rounded-full p-3">
            <CheckCircle className="text-white" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Statut</p>
            <p className="font-bold text-gray-900">{getStatusLabel(order.status)}</p>
          </div>
        </div>

        {/* Timeline */}
        {order.status !== 'cancelled' && order.status !== 'pending' && (
          <div className="space-y-2">
            {statusSteps.map((step, index) => (
              <div key={step.key} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStepIndex ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {index <= currentStepIndex ? '✓' : index + 1}
                </div>
                <span className={`text-sm ${
                  index <= currentStepIndex ? 'text-gray-900 font-medium' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Articles */}
      <div className="card mb-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Package size={20} />
          Articles ({order.items.length})
        </h3>
        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{item.type}</p>
                <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
              </div>
              <p className="font-bold text-primary-600">
                {((item.price || 0) * item.quantity).toFixed(2)} €
              </p>
            </div>
          ))}
        </div>
        <div className="border-t mt-4 pt-4 flex items-center justify-between">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-primary-600">
            {(order.finalPrice || order.estimatedPrice).toFixed(2)} €
          </span>
        </div>
      </div>

      {/* Informations de livraison */}
      <div className="card mb-6">
        <h3 className="font-bold text-gray-900 mb-4">Informations</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Calendar className="text-gray-400 mt-1" size={20} />
            <div>
              <p className="text-sm text-gray-600">Collecte</p>
              <p className="font-medium text-gray-900">
                {new Date(order.pickupDate).toLocaleDateString('fr-FR')}
              </p>
              <p className="text-sm text-gray-600">{order.pickupTimeSlot}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="text-gray-400 mt-1" size={20} />
            <div>
              <p className="text-sm text-gray-600">Livraison</p>
              <p className="font-medium text-gray-900">
                {new Date(order.deliveryDate).toLocaleDateString('fr-FR')}
              </p>
              <p className="text-sm text-gray-600">{order.deliveryTimeSlot}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="text-gray-400 mt-1" size={20} />
            <div>
              <p className="text-sm text-gray-600">Adresse</p>
              <p className="font-medium text-gray-900">{order.userAddress}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CreditCard className="text-gray-400 mt-1" size={20} />
            <div>
              <p className="text-sm text-gray-600">Paiement</p>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                order.paymentStatus === 'paid'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {order.paymentStatus === 'paid' ? 'Payé' : 'En attente'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      {order.paymentStatus === 'pending' && order.status !== 'cancelled' && (
        <div className="card bg-green-50 border-green-200">
          <p className="text-sm text-gray-700 mb-3">Réglez votre commande maintenant</p>
          <button className="btn-primary w-full flex items-center justify-center gap-2">
            <CreditCard size={20} />
            Payer {(order.finalPrice || order.estimatedPrice).toFixed(2)} €
          </button>
        </div>
      )}
    </div>
  )
}
