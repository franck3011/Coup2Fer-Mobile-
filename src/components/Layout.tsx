import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, Package, User, PlusCircle, MapPin } from 'lucide-react'

export default function Layout() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-primary-600 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-center">COUP 2 FER</h1>
          <p className="text-center text-sm text-primary-100">Pressing à domicile</p>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-lg mx-auto px-0">
        <Outlet />
      </main>

      {/* Navigation bas */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-lg mx-auto flex justify-around items-center h-16">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              isActive('/') ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Accueil</span>
          </Link>

          <Link
            to="/orders"
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              isActive('/orders') ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            <Package size={24} />
            <span className="text-xs mt-1">Commandes</span>
          </Link>

          <Link
            to="/new-order"
            className="flex flex-col items-center justify-center flex-1 h-full text-primary-600"
          >
            <div className="bg-primary-600 text-white rounded-full p-3 -mt-8 shadow-lg">
              <PlusCircle size={24} />
            </div>
            <span className="text-xs mt-1">Nouvelle</span>
          </Link>

          <Link
            to="/tracking"
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              isActive('/tracking') ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            <MapPin size={24} />
            <span className="text-xs mt-1">Suivi</span>
          </Link>

          <Link
            to="/profile"
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              isActive('/profile') ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            <User size={24} />
            <span className="text-xs mt-1">Profil</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
