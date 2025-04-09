import { FC, useState, useEffect, useMemo, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'
import {
    MOCK_PRODUCTS,
    CATEGORIES,
    LOW_STOCK_THRESHOLD,
    Product
} from '../components/data/mockData'

/**
 * Composants réutilisables
 */
const LoadingSpinner: FC = () => (
    <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
        <p className="mt-2 text-gray-600">Chargement des produits...</p>
    </div>
)

const NoResults: FC = () => (
    <div className="p-8 text-center text-gray-500">
        Aucun produit ne correspond à vos critères de recherche.
    </div>
)

const FilterField: FC<{
    id: string;
    label: string;
    children: React.ReactNode;
}> = ({ id, label, children }) => (
    <div className="w-full md:w-auto md:flex-1">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        {children}
    </div>
)

/**
 * Page d'inventaire des produits avec fonctionnalités de recherche et filtrage
 */
const InventoryPage: FC = () => {
    const { user } = useAuth()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
    const [sortBy, setSortBy] = useState('name')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    // Fonction pour déterminer si un produit a une quantité basse
    const isLowQuantity = (quantity: number): boolean => quantity < LOW_STOCK_THRESHOLD

    // Récupération des produits
    useEffect(() => {
        const fetchProducts = async (): Promise<void> => {
            setLoading(true)
            try {
                // Simulation d'une requête API
                await new Promise(resolve => setTimeout(resolve, 800))
                setProducts(MOCK_PRODUCTS)
            } catch (error) {
                console.error('Failed to fetch products:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    // Gestionnaires d'événements
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value)
    }

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        setSelectedCategory(e.target.value || null)
    }

    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        setSortBy(e.target.value)
    }

    const handlePriceRangeChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setPriceRange({ ...priceRange, max: parseInt(e.target.value) })
    }

    // Filtrage des produits
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.reference.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = selectedCategory ? product.category === selectedCategory : true
            const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max

            return matchesSearch && matchesCategory && matchesPrice
        })
    }, [products, searchTerm, selectedCategory, priceRange])

    // Tri des produits
    const sortedProducts = useMemo(() => {
        return [...filteredProducts].sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name)
                case 'price_asc':
                    return a.price - b.price
                case 'price_desc':
                    return b.price - a.price
                case 'quantity':
                    return b.quantity - a.quantity
                default:
                    return 0
            }
        })
    }, [filteredProducts, sortBy])

    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Inventaire</h1>

                {user?.role === 'admin' && (
                    <Link
                        to="/inventory/new"
                        className="bg-white hover:bg-gray-100 text-gray-600 px-4 py-2 rounded-md"
                    >
                        Ajouter un produit
                    </Link>
                )}
            </div>

            <div className="bg-white rounded-lg shadow">
                {/* Filtres */}
                <div className="p-4 border-b">
                    <div className="flex flex-wrap gap-4">
                        <FilterField id="search" label="Rechercher">
                            <input
                                id="search"
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Rechercher..."
                                className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md"
                            />
                        </FilterField>

                        <FilterField id="category" label="Catégorie">
                            <select
                                id="category"
                                value={selectedCategory || ''}
                                onChange={handleCategoryChange}
                                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md"
                            >
                                <option value="">Toutes les catégories</option>
                                {CATEGORIES.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </FilterField>

                        <FilterField id="sortBy" label="Trier par">
                            <select
                                id="sortBy"
                                value={sortBy}
                                onChange={handleSortChange}
                                className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md"
                            >
                                <option value="name">Nom</option>
                                <option value="price_asc">Prix (croissant)</option>
                                <option value="price_desc">Prix (décroissant)</option>
                                <option value="quantity">Quantité la plus élevée</option>
                            </select>
                        </FilterField>

                        <FilterField id="priceRange" label={`Plage de prix: ${priceRange.min}$ - ${priceRange.max}$`}>
                            <input
                                id="priceRange"
                                type="range"
                                min="0"
                                max="1000"
                                value={priceRange.max}
                                onChange={handlePriceRangeChange}
                                className="w-full"
                            />
                        </FilterField>
                    </div>
                </div>

                {/* Liste des produits */}
                <div className="overflow-x-auto">
                    {loading ? (
                        <LoadingSpinner />
                    ) : sortedProducts.length === 0 ? (
                        <NoResults />
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Référence
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nom
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Catégorie
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Prix
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Quantité
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {sortedProducts.map((product) => (
                                <tr key={product.id} className={isLowQuantity(product.quantity) ? 'bg-red-50' : ''}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.reference}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.price.toFixed(2)} $
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={isLowQuantity(product.quantity) ? 'text-red-600 font-medium' : ''}>
                        {product.quantity}
                          {isLowQuantity(product.quantity) && (
                              <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                            Stock bas
                          </span>
                          )}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link to={`/inventory/${product.id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                                            Détails
                                        </Link>
                                        {user?.role === 'admin' && (
                                            <>
                                                <Link to={`/inventory/${product.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                                                    Modifier
                                                </Link>
                                                <button className="text-red-600 hover:text-red-900">
                                                    Supprimer
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination */}
                <div className="px-4 py-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Affichage de 1-{sortedProducts.length} sur {sortedProducts.length} résultats
                        </div>
                        <div className="flex space-x-2">
                            <button disabled className="px-3 py-1 border rounded text-gray-400 bg-gray-50">
                                &lt;
                            </button>
                            <button className="px-3 py-1 border rounded bg-blue-600 text-white">
                                1
                            </button>
                            <button disabled className="px-3 py-1 border rounded text-gray-400 bg-gray-50">
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InventoryPage