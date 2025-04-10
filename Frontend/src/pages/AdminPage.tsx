import { FC, useState } from 'react'
import { Bell, ChevronDown, Download, Plus } from 'lucide-react'
import {
    MOCK_CATEGORIES,
    MOCK_CRITICAL_PRODUCTS,
    MOCK_STOCK_ALERTS,
    MOCK_ADMIN_DASHBOARD_STATS,
    Category,
    CriticalProduct,
    StockAlert,
    DashboardStat
} from '../components/data/mockData'
import { MOCK_USERS } from '../components/data/mockData'

/**
 * Panneau d'administration de l'inventaire
 * Permet de gérer les utilisateurs, catégories, alertes de stock et rapports
 */
const InventoryAdminPanel: FC = () => {
    const [activeTab, setActiveTab] = useState<'utilisateurs' | 'categories' | 'alertes' | 'rapports'>('categories')

    // Données importées du fichier centralisé
    const criticalProducts: CriticalProduct[] = MOCK_CRITICAL_PRODUCTS
    const users = Object.values(MOCK_USERS)
    const categories: Category[] = MOCK_CATEGORIES
    const stockAlerts: StockAlert[] = MOCK_STOCK_ALERTS
    const dashboardStats: DashboardStat[] = MOCK_ADMIN_DASHBOARD_STATS

    /**
     * Composants de l'interface utilisateur
     */
    const ActionButton: FC<{ icon?: React.ReactNode; children: React.ReactNode; onClick?: () => void }> = ({
                                                                                                               icon,
                                                                                                               children,
                                                                                                               onClick
                                                                                                           }) => (
        <button
            onClick={onClick}
            className="flex items-center bg-gray-900 text-white px-4 py-2 rounded"
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    )

    const TabButton: FC<{ active: boolean; onClick: () => void; children: React.ReactNode; showIcon?: boolean }> = ({
                                                                                                                        active,
                                                                                                                        onClick,
                                                                                                                        children,
                                                                                                                        showIcon = true
                                                                                                                    }) => (
        <button
            onClick={onClick}
            className={`flex items-center space-x-1 px-6 py-3 ${
                active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
            }`}
        >
            <span>{children}</span>
            {showIcon && <ChevronDown size={16}/>}
        </button>
    )

    const AlertIcon: FC<{ type: StockAlert['type'] }> = ({ type }) => {
        const iconConfig = {
            rupture: { bg: 'bg-red-100', text: 'text-red-500', symbol: '❗' },
            faible: { bg: 'bg-yellow-100', text: 'text-yellow-500', symbol: '⚠️' },
            reapprovisionne: { bg: 'bg-green-100', text: 'text-green-500', symbol: '✓' }
        }

        const config = iconConfig[type]

        return (
            <div className={`w-8 h-8 rounded-full ${config.bg} flex items-center justify-center`}>
                <span className={config.text}>{config.symbol}</span>
            </div>
        )
    }

    /**
     * Rendu du contenu selon l'onglet actif
     */
    const TabContent = {
        utilisateurs: (
            <div className="p-6">
                <div className="flex justify-end mb-4">
                    <ActionButton icon={<Plus size={18}/>}>Nouvel utilisateur</ActionButton>
                </div>
                <div className="overflow-x-auto bg-white rounded">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b">
                            <th className="px-4 py-3 text-left text-gray-500">NOM D'UTILISATEUR</th>
                            <th className="px-4 py-3 text-left text-gray-500">EMAIL</th>
                            <th className="px-4 py-3 text-left text-gray-500">RÔLE</th>
                            <th className="px-4 py-3 text-left text-gray-500">DERNIÈRE CONNEXION</th>
                            <th className="px-4 py-3 text-left text-gray-500">ACTIONS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-4 py-3 text-gray-600">{user.username}</td>
                                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                                <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'Administrateur' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-600">{user.lastConnection}</td>
                                <td className="px-4 py-3">
                                    <div className="flex space-x-2">
                                        <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded">Modifier</button>
                                        <button className="bg-red-100 text-red-800 px-3 py-1 rounded">Supprimer</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ),

        categories: (
            <div className="p-6">
                <div className="flex justify-end mb-4">
                    <ActionButton icon={<Plus size={18}/>}>Nouvelle catégorie</ActionButton>
                </div>
                <div className="overflow-x-auto bg-white rounded">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b">
                            <th className="px-4 py-3 text-left text-gray-500">NOM DE LA CATÉGORIE</th>
                            <th className="px-4 py-3 text-left text-gray-500">NOMBRE DE PRODUITS</th>
                            <th className="px-4 py-3 text-left text-gray-500">ACTIONS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories.map((category) => (
                            <tr key={category.id} className="border-b">
                                <td className="px-4 py-3 text-blue-600">{category.name}</td>
                                <td className="px-4 py-3 text-gray-600">{category.productCount} produits</td>
                                <td className="px-4 py-3">
                                    <div className="flex space-x-2">
                                        <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded">Modifier</button>
                                        <button className="bg-red-100 text-red-800 px-3 py-1 rounded">Supprimer</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ),

        alertes: (
            <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-600">Historique des alertes de stock</h3>
                <div className="space-y-4">
                    {stockAlerts.map((alert, index) => (
                        <div key={alert.id || index} className="flex items-start p-4 border-b">
                            <div className="mr-4">
                                <AlertIcon type={alert.type}/>
                            </div>
                            <div>
                                <div className="font-semibold">
                                    {alert.type === 'rupture' && 'Rupture de stock: '}
                                    {alert.type === 'faible' && 'Stock faible: '}
                                    {alert.type === 'reapprovisionne' && 'Stock réapprovisionné: '}
                                    {alert.product}
                                    <span className="text-sm text-gray-500 font-normal ml-2">{alert.date}</span>
                                </div>
                                <div className="text-gray-600 mt-1">{alert.message}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),

        rapports: (
            <div className="p-6">
                <div className="flex justify-end mb-6">
                    <ActionButton icon={<Download size={18}/>}>Exporter</ActionButton>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {dashboardStats.map((stat, index) => (
                        <div key={index} className="bg-white p-5 rounded border">
                            <h3 className="text-lg font-semibold text-gray-600">{stat.title}</h3>
                            <div className="my-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                }`}>
                  {stat.count}
                </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">{stat.description}</p>
                            <a href={stat.linkTo} className="text-blue-600 text-sm font-medium hover:underline">
                                {stat.linkText} →
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-gray-900 text-gray-600 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="titre_administration text-3xl font-bold text-blue-500">Administration</h1>
                        <p className="text-gray-400 text-sm">Gérez les utilisateurs, catégories et paramètres du système</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="retour_inventaire bg-white text-blue-600 px-4 py-2 rounded">
                            Retour à l'inventaire
                        </button>
                        <button className="relative">
                            <Bell/>
                            <span className="absolute -top-1 -right-1 bg-red-500 text-gray-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {criticalProducts.length}
              </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Alert Banner */}
            {criticalProducts.length > 0 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4 mx-4">
                    <div className="flex">
                        <div className="flex-shrink-0 text-yellow-500">⚠️</div>
                        <div className="ml-3">
                            <p className="text-yellow-700 font-medium">Produits en stock critique</p>
                            <ul className="mt-2 text-yellow-700 list-disc list-inside">
                                {criticalProducts.map((product, index) => (
                                    <li key={index}>
                                        {product.name} - {product.status || `Quantité: ${product.quantity}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Tabs */}
            <div className="menu_admin mx-4 mt-4 flex space-x-1 bg-gray-800 rounded-t overflow-hidden">
                <TabButton
                    active={activeTab === 'utilisateurs'}
                    onClick={() => setActiveTab('utilisateurs')}
                >
                    Utilisateurs
                </TabButton>
                <TabButton
                    active={activeTab === 'categories'}
                    onClick={() => setActiveTab('categories')}
                >
                    Catégories
                </TabButton>
                <TabButton
                    active={activeTab === 'alertes'}
                    onClick={() => setActiveTab('alertes')}
                >
                    Alertes de stock
                </TabButton>
                <TabButton
                    active={activeTab === 'rapports'}
                    onClick={() => setActiveTab('rapports')}
                    showIcon={false}
                >
                    Rapports
                </TabButton>
            </div>

            {/* Content Area */}
            <div className="mx-4 bg-white rounded-b shadow-md mb-8">
                {TabContent[activeTab]}
            </div>
        </div>
    )
}

export default InventoryAdminPanel