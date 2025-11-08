import { useState } from 'react'
import { Crown, Check, Zap, Sparkles } from 'lucide-react'
import { useSubscriptionStore } from '../store/subscriptionStore'

export default function Subscriptions() {
  const { subscriptions } = useSubscriptionStore()
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'year'>('month')

  return (
    <div className="px-4 py-6 pb-24">
      {/* Header avec animation */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mb-4 animate-bounce">
          <Crown className="text-white" size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Nos Offres Premium
        </h1>
        <p className="text-gray-600">
          Économisez jusqu'à 25% avec nos abonnements
        </p>
      </div>

      {/* Toggle période */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <button
          onClick={() => setSelectedPeriod('month')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            selectedPeriod === 'month'
              ? 'bg-primary-600 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Mensuel
        </button>
        <button
          onClick={() => setSelectedPeriod('year')}
          className={`px-6 py-3 rounded-lg font-medium transition-all relative ${
            selectedPeriod === 'year'
              ? 'bg-primary-600 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Annuel
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            -20%
          </span>
        </button>
      </div>

      {/* Grille des offres */}
      <div className="space-y-4">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className={`relative rounded-2xl border-2 overflow-hidden transition-all hover:scale-[1.02] ${
              sub.popular
                ? 'border-primary-500 shadow-xl'
                : 'border-gray-200 shadow-md'
            }`}
          >
            {/* Badge populaire */}
            {sub.popular && (
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Sparkles size={14} />
                  POPULAIRE
                </div>
              </div>
            )}

            {/* Discount badge */}
            {sub.discount && (
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {sub.discount}
                </div>
              </div>
            )}

            {/* Header avec gradient */}
            <div className={`bg-gradient-to-r ${sub.color} p-6 text-white`}>
              <h3 className="text-2xl font-bold mb-2">{sub.name}</h3>
              <p className="text-white/90 text-sm mb-4">{sub.description}</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold">
                  {selectedPeriod === 'year' 
                    ? (sub.price * 12 * 0.8).toFixed(2)
                    : sub.price.toFixed(2)}
                </span>
                <span className="text-xl pb-1">€</span>
                <span className="text-white/90 pb-1">
                  / {selectedPeriod === 'month' ? 'mois' : 'an'}
                </span>
              </div>
              {selectedPeriod === 'year' && (
                <p className="text-xs text-white/80 mt-2">
                  Soit {((sub.price * 12 * 0.8) / 12).toFixed(2)}€/mois
                </p>
              )}
            </div>

            {/* Features */}
            <div className="p-6 bg-white">
              <ul className="space-y-3 mb-6">
                {sub.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  sub.popular
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {sub.popular ? (
                  <span className="flex items-center justify-center gap-2">
                    <Zap size={20} fill="currentColor" />
                    Choisir Premium
                  </span>
                ) : (
                  'Choisir cette offre'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ / Garanties */}
      <div className="mt-8 space-y-4">
        <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Check className="text-blue-600" size={20} />
            Garantie satisfaction
          </h3>
          <p className="text-sm text-gray-600">
            Résiliez à tout moment. Premier mois satisfait ou remboursé.
          </p>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Zap className="text-green-600" size={20} />
            Activation instantanée
          </h3>
          <p className="text-sm text-gray-600">
            Profitez de vos avantages dès maintenant, sans engagement.
          </p>
        </div>
      </div>
    </div>
  )
}
