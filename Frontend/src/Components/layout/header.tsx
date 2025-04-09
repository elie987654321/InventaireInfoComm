import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../../store/AuthContext'
import Logo from '../common/Logo'

const Header = () => {
    const {user, logout} = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <Logo/>
                        </Link>
                    </div>

                    <nav className="flex items-center space-x-6">
                        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                            Tableau de bord
                        </Link>
                        <Link to="/inventory" className="text-gray-700 hover:text-blue-600">
                            Inventaire
                        </Link>

                        {user?.role === 'admin' && (
                            <Link to="/admin" className="text-gray-700 hover:text-blue-600">
                                Administration
                            </Link>
                        )}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-600">
                            Bonjour, {user?.username}
                        </div>

                        <button
                            onClick={handleLogout}
                            className="text-sm text-gray-700 hover:text-blue-600"
                        >
                            Déconnexion
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header