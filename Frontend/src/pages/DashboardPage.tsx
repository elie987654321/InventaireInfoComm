import { FC, useState, useEffect, useMemo } from 'react'
import { useAuth } from '../store/AuthContext'
import AlertDialog from '../Components/common/AlertDialog'
import { MOCK_DASHBOARD_STATS, DashboardStats } from '../Components/data/MockData'

/**
 * Composants réutilisables
 */
const StatCard: FC<{
    title: string;
    value: number | string;
    iconType: 'products' | 'alerts' | 'user';
    valueClassName?: string;
}> = ({ title, value, iconType, valueClassName = '' }) => {
    const CARD_ICONS = {
        products: {
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-600',
            path: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10'
        },
        alerts: {
            bgColor: 'bg-yellow-100',
            textColor: 'text-yellow-600',
            path: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
        },
        user: {
            bgColor: 'bg-green-100',
            textColor: 'text-green-600',
            path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
        }
    }

    const icon = CARD_ICONS[iconType]

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
                <div className={`p-3 rounded-full ${icon.bgColor} ${icon.textColor}`}>
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon.path} />
                    </svg>
                </div>
                <div className="ml-5">
                    <p className="text-gray-500">{title}</p>
                    <h2 className={`text-2xl font-bold ${valueClassName}`}>{value}</h2>
                </div>
            </div>
        </div>
    )
}

const SectionHeader: FC<{ title: string }> = ({ title }) => (
    <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
    </div>
)

const LoadingSpinner: FC = () => (
    <div className="flex justify-center items-center h-64">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
        <p className="ml-2">Chargement du tableau de bord...</p>
    </div>
)

const ErrorMessage: FC = () => (
    <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-600">Une erreur est survenue lors du chargement des données.</p>
    </div>
)

/**
 * Page principale du tableau de bord
 */
const DashboardPage: FC = () => {
    const { user } = useAuth()
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [alertOpen, setAlertOpen] = useState(false)
    const [currentAlert, setCurrentAlert] = useState('')

    // Récupérer les données du tableau de bord
    useEffect(() => {
        const fetchDashboardData = async (): Promise<void> => {
            setLoading(true)
            try {
                // Simulation d'une requête API
                await new Promise(resolve => setTimeout(resolve, 800))
                setStats(MOCK_DASHBOARD_STATS)
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error)
                setStats(null)
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    const handleAlertClick = (message: string): void => {
        setCurrentAlert(message)
        setAlertOpen(true)
    }

    const userRoleDisplay = useMemo(() =>
            user?.role === 'admin' ? 'Administrateur' : 'Utilisateur régulier',
        [user?.role])

    if (loading) return <LoadingSpinner />
    if (!stats) return <ErrorMessage />

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Produits totaux"
                    value={stats.totalProducts}
                    iconType="products"
                    valueClassName="text-blue-600"
                />
                <StatCard
                    title="Produits en stock bas"
                    value={stats.lowStockProducts}
                    iconType="alerts"
                    valueClassName="text-yellow-600"
                />
                <StatCard
                    title="Rôle utilisateur"
                    value={userRoleDisplay}
                    iconType="user"
                    valueClassName="text-green-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Distribution par catégorie */}
                <div className="bg-white text-gray-600 rounded-lg shadow">
                    <SectionHeader title="Distribution par catégorie" />
                    <div className="p-6">
                        <div className="space-y-4">
                            {stats.categories.map((category) => (
                                <div key={category.name}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-gray-700">{category.name}</span>
                                        <span className="text-sm text-gray-500">{category.count} produits</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className="bg-blue-600 h-2.5 rounded-full"
                                            style={{ width: `${(category.count / stats.totalProducts) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Alertes récentes */}
                <div className="bg-white text-gray-600 rounded-lg shadow">
                    <SectionHeader title="Alertes récentes" />
                    <div className="p-6">
                        {stats.recentAlerts.length > 0 ? (
                            <div className="divide-y">
                                {stats.recentAlerts.map((alert) => (
                                    <div key={alert.id} className="py-3">
                                        <div className="flex justify-between">
                                            <button
                                                onClick={() => handleAlertClick(alert.message)}
                                                className="text-sm font-medium text-blue-600 hover:underline"
                                            >
                                                {alert.message}
                                            </button>
                                            <span className="text-xs text-gray-500">
                        {new Date(alert.date).toLocaleDateString()}
                      </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">Aucune alerte récente</p>
                        )}
                    </div>
                </div>
            </div>

            <AlertDialog
                message={currentAlert}
                isOpen={alertOpen}
                onClose={() => setAlertOpen(false)}
            />
        </div>
    )
}

export default DashboardPage