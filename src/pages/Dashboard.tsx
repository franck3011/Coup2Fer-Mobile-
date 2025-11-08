import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useOrderStore } from '../store/orderStore'
import { Package, Clock, CheckCircle, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuthStore()
  const { orders } = useOrderStore()

  const activeOrders = orders.filter(o => 
    ['pending', 'confirmed', 'picked_up', 'in_progress', 'ready', 'out_for_delivery'].includes(o.status)
  )

  const completedOrders = orders.filter(o => o.status === 'delivered')

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Bienvenue */}
      <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <h2 className="text-2xl font-bold mb-2">Bonjour {user?.displayName}! 👋</h2>
        <p className="text-primary-100">Bienvenue sur votre espace client</p>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-orange-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En cours</p>
              <p className="text-3xl font-bold text-gray-900">{activeOrders.length}</p>
            </div>
            <Clock className="text-orange-500" size={32} />
          </div>
        </div>

        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Terminées</p>
              <p className="text-3xl font-bold text-gray-900">{completedOrders.length}</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </div>
      </div>

      {/* Commandes actives */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Package size={24} />
            Commandes actives
          </h3>
          <Link to="/orders" className="text-primary-600 text-sm font-medium">
            Voir tout
          </Link>
        </div>

        {activeOrders.length === 0 ? (
          <div className="card text-center py-8">
            <Package className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">Aucune commande en cours</p>
            <Link to="/new-order" className="btn-primary mt-4 inline-block">
              Passer une commande
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {activeOrders.slice(0, 3).map((order) => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900">#{order.id.slice(0, 8)}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {order.status === 'pending' && 'En attente'}
                    {order.status === 'confirmed' && 'Confirmée'}
                    {order.status === 'picked_up' && 'Collectée'}
                    {order.status === 'in_progress' && 'En cours'}
                    {order.status === 'ready' && 'Prête'}
                    {order.status === 'out_for_delivery' && 'En livraison'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>{order.items.length} article(s)</p>
                  <p className="font-semibold text-primary-600 mt-1">{order.estimatedPrice.toFixed(2)} €</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Actions rapides */}
      <div className="card bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200 hover:shadow-lg transition-shadow">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <TrendingUp size={20} className="text-primary-600" />
          Envie d'économiser ?
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Profitez de nos abonnements pour bénéficier de tarifs préférentiels !
        </p>
        <Link to="/subscriptions" className="btn-primary w-full block text-center">
          Découvrir les abonnements
        </Link>
      </div>
    </div>
  )
}
