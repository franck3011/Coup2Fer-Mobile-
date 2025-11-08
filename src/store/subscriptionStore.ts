import { create } from 'zustand'

export interface Subscription {
  id: string
  name: string
  price: number
  period: 'month' | 'year'
  description: string
  features: string[]
  popular?: boolean
  discount?: string
  color: string
}

interface SubscriptionStore {
  subscriptions: Subscription[]
}

export const useSubscriptionStore = create<SubscriptionStore>(() => ({
  subscriptions: [
    {
      id: 'basic',
      name: 'Basic',
      price: 29.99,
      period: 'month',
      description: 'Parfait pour débuter',
      features: [
        '10 articles / mois',
        'Collecte à domicile',
        'Livraison standard',
        'Support email',
        '5% de réduction'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 49.99,
      period: 'month',
      description: 'Le plus populaire',
      features: [
        '25 articles / mois',
        'Collecte express',
        'Livraison prioritaire',
        'Support prioritaire',
        '15% de réduction',
        'Traitement délicat offert'
      ],
      popular: true,
      discount: '1 mois offert',
      color: 'from-primary-500 to-primary-600'
    },
    {
      id: 'gold',
      name: 'Gold',
      price: 89.99,
      period: 'month',
      description: 'Pour les professionnels',
      features: [
        'Articles illimités',
        'Collecte express 24h',
        'Livraison express',
        'Support VIP 24/7',
        '25% de réduction',
        'Traitement premium',
        'Repassage gratuit',
        'Emballage luxe'
      ],
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 'family',
      name: 'Famille',
      price: 69.99,
      period: 'month',
      description: 'Idéal pour toute la famille',
      features: [
        '50 articles / mois',
        'Collecte à domicile',
        'Livraison rapide',
        'Multi-utilisateurs',
        '20% de réduction',
        'Traitement délicat',
        'Lavage écologique'
      ],
      color: 'from-green-500 to-green-600'
    }
  ]
}))
