import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'
import Logo from '../common/Logo'
import { useState, useEffect } from 'react'
import { Menu, X, User, LogOut } from 'lucide-react'

const Header = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = () => {
        setMobileMenuOpen(false)
        logout()
        navigate('/login')
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(false)
    }

    return (
        <header className={`w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white shadow py-4'}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="z-20" onClick={closeMobileMenu}>
                        <Logo />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                            Tableau de bord
                        </Link>
                        <Link to="/inventory" className="text-gray-700 hover:text-blue-600 font-medium">
                            Inventaire
                        </Link>
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="text-gray-700 hover:text-blue-600 font-medium">
                                Administration
                            </Link>
                        )}
                    </nav>

                    {/* Desktop User Section */}
                    <div className="hidden md:flex items-center space-x-6">
                        <div className="flex items-center">
                            <User size={18} className="mr-2 text-blue-700" />
                            <span className="text-sm font-medium">{user?.username}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-sm flex items-center text-gray-700 hover:text-blue-600">
                            <LogOut size={18} className="mr-1" />
                            Déconnexion
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden z-20 p-2 rounded-md focus:outline-none"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X size={24} className="text-blue-700" />
                        ) : (
                            <Menu size={24} className="text-blue-700" />
                        )}
                    </button>

                    {/* Mobile Menu */}
                    <div className={`fixed inset-0 bg-white z-10 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
                        <div className="flex flex-col h-full pt-20 px-6 pb-6">
                            <div className="flex-1 flex flex-col space-y-4 mt-4">
                                <Link to="/dashboard" className="py-3 px-4 rounded-lg bg-gray-50 text-gray-800 font-medium" onClick={closeMobileMenu}>
                                    Tableau de bord
                                </Link>
                                <Link to="/inventory" className="py-3 px-4 rounded-lg bg-gray-50 text-gray-800 font-medium" onClick={closeMobileMenu}>
                                    Inventaire
                                </Link>
                                {user?.role === 'admin' && (
                                    <Link to="/admin" className="py-3 px-4 rounded-lg bg-gray-50 text-gray-800 font-medium" onClick={closeMobileMenu}>
                                        Administration
                                    </Link>
                                )}
                            </div>

                            <div className="border-t pt-6 mt-4">
                                <div className="flex items-center mb-6 px-4">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                        <User size={20} className="text-blue-700" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{user?.username}</p>
                                        <p className="text-sm text-gray-500">{user?.role === 'admin' ? 'Administrateur' : 'Utilisateur'}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full py-3 flex items-center justify-center bg-blue-600 text-white rounded-lg font-medium">
                                    <LogOut size={18} className="mr-2" />
                                    Déconnexion
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header