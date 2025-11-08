import { useAuthStore } from '../store/authStore'
import { User, Mail, Phone, LogOut, Settings } from 'lucide-react'

export default function Profile() {
  const { user, signOut } = useAuthStore()

  const handleSignOut = () => {
    signOut()
  }

  if (!user) return null

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header profil */}
      <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <User size={40} className="text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.displayName}</h2>
            <p className="text-primary-100">Client</p>
          </div>
        </div>
      </div>

      {/* Informations */}
      <div className="card">
        <h3 className="font-bold text-gray-900 mb-4">Mes informations</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="text-gray-400" size={20} />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="text-gray-400" size={20} />
            <div>
              <p className="text-sm text-gray-600">Téléphone</p>
              <p className="font-medium text-gray-900">{user.phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button className="card w-full flex items-center gap-3 hover:bg-gray-50 transition-colors">
          <Settings className="text-gray-600" size={24} />
          <div className="flex-1 text-left">
            <p className="font-medium text-gray-900">Paramètres</p>
            <p className="text-sm text-gray-600">Modifier mes informations</p>
          </div>
        </button>

        <button
          onClick={handleSignOut}
          className="card w-full flex items-center gap-3 hover:bg-red-50 transition-colors"
        >
          <LogOut className="text-red-600" size={24} />
          <div className="flex-1 text-left">
            <p className="font-medium text-red-600">Déconnexion</p>
            <p className="text-sm text-gray-600">Se déconnecter de l'application</p>
          </div>
        </button>
      </div>

      {/* Version */}
      <div className="text-center text-sm text-gray-500">
        <p>COUP 2 FER Mobile</p>
        <p>Version 1.0.0</p>
      </div>
    </div>
  )
}
