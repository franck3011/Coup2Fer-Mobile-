import { useOrderStore } from '../store/orderStore'
import { MapPin, Clock, Package, CheckCircle, Truck, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Tracking() {
  const { orders } = useOrderStore()
  
  // Récupérer toutes les commandes actives
  const activeOrders = orders.filter(o => 
    !['delivered', 'cancelled'].includes(o.status)
  )

  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { label: string; icon: any; color: string; bgColor: string }> = {
      pending: {
        label: 'En attente de confirmation',
        icon: Clock,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100'
      },
      confirmed: {
        label: 'Confirmée - En attente de collecte',
        icon: CheckCircle,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100'
      },
      picked_up: {
        label: 'Collectée - En cours de traitement',
        icon: Package,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100'
      },
      in_progress: {
        label: 'En cours de nettoyage',
        icon: Package,
        color: 'text-orange-600',
        bgColor: 'bg-orange-100'
      },
      ready: {
        label: 'Prête - En attente de livraison',
        icon: CheckCircle,
        color: 'text-cyan-600',
        bgColor: 'bg-cyan-100'
      },
      out_for_delivery: {
        label: 'En cours de livraison',
        icon: Truck,
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-100'
      }
    }
    return statusMap[status] || statusMap.pending
  }

  return (
    <div className="px-4 py-6 pb-24">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-full">
            <MapPin className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Suivi en temps réel</h1>
            <p className="text-sm text-gray-600">Suivez vos commandes en direct</p>
          </div>
        </div>
      </div>

      {/* Commandes actives */}
      {activeOrders.length === 0 ? (
        <div className="card text-center py-12">
          <AlertCircle className="mx-auto text-gray-400 mb-4" size={64} />
          <p className="text-gray-600 mb-2 font-medium">Aucune commande en cours</p>
          <p className="text-sm text-gray-500 mb-6">
            Passez une commande pour suivre son statut en temps réel
          </p>
          <Link to="/new-order" className="btn-primary inline-block">
            Passer une commande
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {activeOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status)
            const Icon = statusInfo.icon

            return (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="block bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-primary-500 hover:shadow-xl transition-all"
              >
                {/* Header avec statut */}
                <div className={`${statusInfo.bgColor} p-4 border-b border-gray-200`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">
                      Commande #{order.id.slice(0, 8)}
                    </span>
                    <span className={`${statusInfo.color}`}>
                      <Icon size={24} />
                    </span>
                  </div>
                  <p className={`text-sm font-medium ${statusInfo.color}`}>
                    {statusInfo.label}
                  </p>
                </div>

                {/* Détails */}
                <div className="p-4 space-y-3">
                  {/* Timeline rapide */}
                  <div className="flex items-center gap-2">
                    {['confirmed', 'picked_up', 'in_progress', 'ready', 'out_for_delivery'].map((step, index) => {
                      const stepIndex = ['confirmed', 'picked_up', 'in_progress', 'ready', 'out_for_delivery'].indexOf(order.status)
                      const currentIndex = ['confirmed', 'picked_up', 'in_progress', 'ready', 'out_for_delivery'].indexOf(step)
                      const isActive = currentIndex <= stepIndex

                      return (
                        <div
                          key={step}
                          className={`h-2 flex-1 rounded-full transition-all ${
                            isActive ? 'bg-primary-600' : 'bg-gray-200'
                          }`}
                        />
                      )
                    })}
                  </div>

                  {/* Infos */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Package size={16} />
                    <span>{order.items.length} article(s)</span>
                  </div>

                  {order.status !== 'delivered' && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>
                        Livraison prévue le {new Date(order.deliveryDate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span className="truncate">{order.userAddress}</span>
                  </div>

                  {/* Prix */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-gray-600">Montant</span>
                    <span className="text-xl font-bold text-primary-600">
                      {(order.finalPrice || order.estimatedPrice).toFixed(2)} €
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-4 pb-4">
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center py-3 rounded-lg font-medium">
                    Voir les détails complets
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* Info carte */}
      <div className="mt-6 card bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <div className="flex items-start gap-3">
          <MapPin className="text-blue-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Suivi GPS en temps réel</h3>
            <p className="text-sm text-gray-600">
              Suivez la position de votre livreur en direct lors de la livraison
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
