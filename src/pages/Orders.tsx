import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useOrderStore } from '../store/orderStore'
import { Package, Clock } from 'lucide-react'

export default function Orders() {
  const { orders } = useOrderStore()
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active')

  const activeOrders = orders.filter(o => 
    ['pending', 'confirmed', 'picked_up', 'in_progress', 'ready', 'out_for_delivery'].includes(o.status)
  )

  const historyOrders = orders.filter(o => ['delivered', 'cancelled'].includes(o.status))

  const displayedOrders = activeTab === 'active' ? activeOrders : historyOrders

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'En attente',
      confirmed: 'Confirmée',
      picked_up: 'Collectée',
      in_progress: 'En cours',
      ready: 'Prête',
      out_for_delivery: 'En livraison',
      delivered: 'Livrée',
      cancelled: 'Annulée'
    }
    return labels[status] || status
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      picked_up: 'bg-purple-100 text-purple-800',
      in_progress: 'bg-orange-100 text-orange-800',
      ready: 'bg-cyan-100 text-cyan-800',
      out_for_delivery: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="p-4">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Package size={28} />
        Mes Commandes
      </h1>

      {/* Onglets */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            activeTab === 'active'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <Clock size={20} className="inline mr-2" />
          En cours ({activeOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            activeTab === 'history'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Historique ({historyOrders.length})
        </button>
      </div>

      {/* Liste des commandes */}
      {displayedOrders.length === 0 ? (
        <div className="card text-center py-12">
          <Package className="mx-auto text-gray-400 mb-4" size={64} />
          <p className="text-gray-600 mb-4">
            {activeTab === 'active' 
              ? 'Aucune commande en cours' 
              : 'Aucune commande dans l\'historique'}
          </p>
          {activeTab === 'active' && (
            <Link to="/new-order" className="btn-primary inline-block">
              Passer une commande
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {displayedOrders.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-gray-900">#{order.id.slice(0, 12)}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>

              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Articles</span>
                  <span className="font-medium">{order.items.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Montant</span>
                  <span className="font-bold text-primary-600">
                    {(order.finalPrice || order.estimatedPrice).toFixed(2)} €
                  </span>
                </div>
                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Livraison prévue</span>
                    <span className="font-medium">
                      {new Date(order.deliveryDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
