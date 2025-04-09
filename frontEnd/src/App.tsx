import { FC, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './store/AuthContext'

// Pages
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import InventoryPage from './pages/InventoryPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import AdminPage from './pages/AdminPage'
import NotFoundPage from './pages/NotFoundPage'

// Composants
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/common/ProtectedRoute'

/**
 * Composant principal de l'application gérant le routage et la navigation
 */
const App: FC = () => {
    const { user } = useAuth()

    // Routes organisées par catégorie pour une meilleure lisibilité
    const routeConfig = useMemo(() => ({
        // Routes publiques (accessibles sans authentification)
        public: [
            {
                path: '/login',
                element: !user ? <LoginPage /> : <Navigate to="/inventory" replace />
            },
            {
                path: '*',
                element: <NotFoundPage />
            }
        ],
        // Routes générales nécessitant une authentification
        authenticated: [
            {
                path: '/',
                element: <Navigate to="/inventory" replace />
            },
            {
                path: '/dashboard',
                element: <DashboardPage />
            },
            {
                path: '/inventory',
                element: <InventoryPage />
            },
            {
                path: '/inventory/:id',
                element: <ProductDetailsPage />
            }
        ],
        // Routes nécessitant un rôle spécifique
        admin: [
            {
                path: '/admin',
                element: <AdminPage />,
                requiredRole: 'admin' as const
            }
        ]
    }), [user])

    return (
        <Router>
            <Routes>
                {/* Routes publiques */}
                {routeConfig.public.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}

                {/* Routes protégées avec Layout commun */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        {/* Routes nécessitant uniquement l'authentification */}
                        {routeConfig.authenticated.map(({ path, element }) => (
                            <Route key={path} path={path} element={element} />
                        ))}

                        {/* Routes nécessitant des rôles spécifiques (admin)*/}
                        {routeConfig.admin.map(({ path, element, requiredRole }) => (
                            <Route
                                key={path}
                                path={path}
                                element={<ProtectedRoute requiredRole={requiredRole}>{element}</ProtectedRoute>}
                            />
                        ))}
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}
export default App