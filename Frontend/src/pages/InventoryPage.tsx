import React, {FC, useState, useEffect, useMemo, ChangeEvent} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../store/AuthContext'
import {
    MOCK_PRODUCTS,
    CATEGORIES,
    Product,
    LOW_STOCK_THRESHOLD
} from '../Components/data/MockData'
import {Search, ChevronDown, Plus, SlidersHorizontal, Eye, Edit, Trash2} from 'lucide-react'

/**
 * Page d'inventaire - Gestion complète des produits
 * 
 * Cette page permet de visualiser, filtrer et trier l'ensemble des produits en inventaire.
 * Fonctionnalités:
 * - Recherche textuelle par nom ou référence de produit
 * - Filtrage par catégorie, disponibilité et prix
 * - Tri par différents critères (nom, prix, quantité)
 * - Affichage visuel de l'état des stocks (normal, bas, rupture)
 * - Actions CRUD pour les utilisateurs administrateurs
 */
const InventoryPage: FC = () => {
    // States
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [showFilters, setShowFilters] = useState(false)
    
    /**
     * Configuration des filtres appliqués à l'inventaire
     * 
     * searchTerm: Terme de recherche (nom ou référence du produit)
     * selectedCategory: Filtre par catégorie de produit
     * sortBy: Critère de tri (nom, prix croissant/décroissant, quantité)
     * priceMin/priceMax: Limites de la fourchette de prix
     * availabilityFilter: Filtre de disponibilité (tous, en stock, stock bas, rupture)
     */
    const [filters, setFilters] = useState({
        searchTerm: '',
        selectedCategory: '',
        sortBy: 'name',
        priceMin: 0,
        priceMax: 1000,
        availabilityFilter: 'all'
    })
    const {user} = useAuth()

    const {searchTerm, selectedCategory, sortBy, priceMin, priceMax, availabilityFilter} = filters

    /**
     * Chargement initial des produits
     * 
     * Simule un appel API avec un délai artificiel pour montrer 
     * l'état de chargement.
     */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                await new Promise(resolve => setTimeout(resolve, 800)) // Simulate API delay
                setProducts(MOCK_PRODUCTS)
            } catch (error) {
                console.error("Failed to fetch products:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    /**
     * Gestionnaire générique pour les changements de filtres textuels ou sélections
     * 
     * Prend en paramètre la clé du filtre à modifier et retourne une fonction
     * qui met à jour cette valeur spécifique dans l'objet de filtres.
     * 
     * @param key - Nom de la propriété du filtre à modifier
     * @returns Fonction de gestion d'événement pour le champ concerné
     */
    const handleFilterChange = (key: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters(prev => ({...prev, [key]: e.target.value}))
    }

    /**
     * Gestionnaire spécifique pour les filtres numériques
     * 
     * Gère les limites min/max et assure la conversion en nombre.
     * Particulièrement utile pour les filtres de prix.
     * 
     * @param key - Nom de la propriété du filtre à modifier
     * @param min - Valeur minimale autorisée (optionnelle)
     * @param max - Valeur maximale autorisée (optionnelle)
     * @returns Fonction de gestion d'événement pour le champ concerné
     */
    const handleNumericChange = (key: string, min?: number, max?: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        if ((min === undefined || value >= min) && (max === undefined || value <= max)) {
            setFilters(prev => ({...prev, [key]: value}))
        }
    }

    /**
     * Calcul optimisé des produits filtrés
     * 
     * Applique tous les filtres actifs aux produits:
     * - Filtre textuel (nom ou référence)
     * - Filtre par catégorie
     * - Filtre par fourchette de prix
     * - Filtre par état de stock
     * 
     * Utilise useMemo pour éviter des recalculs inutiles quand
     * des éléments non liés au filtrage sont modifiés.
     */
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.reference.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesCategory = !selectedCategory || product.category === selectedCategory
            const matchesPrice = product.price >= priceMin && product.price <= priceMax

            // Filter based on availability
            const matchesAvailability =
                availabilityFilter === 'all' ||
                (availabilityFilter === 'in_stock' && product.quantity > LOW_STOCK_THRESHOLD) ||
                (availabilityFilter === 'low_stock' && product.quantity > 0 && product.quantity <= LOW_STOCK_THRESHOLD) ||
                (availabilityFilter === 'out_of_stock' && product.quantity === 0)

            return matchesSearch && matchesCategory && matchesPrice && matchesAvailability
        })
    }, [products, searchTerm, selectedCategory, priceMin, priceMax, availabilityFilter])

    /**
     * Tri des produits filtrés selon le critère sélectionné
     * 
     * Trie les produits par:
     * - Nom (ordre alphabétique)
     * - Prix (croissant ou décroissant)
     * - Quantité
     * 
     * Utilise useMemo pour optimiser les performances et éviter
     * des tris redondants quand les données ne changent pas.
     */
    const sortedProducts = useMemo(() => {
        return [...filteredProducts].sort((a, b) => {
            switch (sortBy) {
                case 'price_asc': return a.price - b.price
                case 'price_desc': return b.price - a.price
                case 'quantity': return a.quantity - b.quantity
                case 'name':
                default: return a.name.localeCompare(b.name)
            }
        })
    }, [filteredProducts, sortBy])

    /**
     * Détermine l'état du stock d'un produit
     * 
     * Classifie le niveau de stock en trois catégories:
     * - normal: Quantité supérieure au seuil bas
     * - bas: Quantité positive mais inférieure ou égale au seuil bas
     * - rupture: Quantité nulle
     * 
     * @param quantity - Quantité du produit en stock
     * @returns État du stock sous forme de chaîne ('normal', 'bas', 'rupture')
     */
    const getStockStatus = (quantity: number) => 
        quantity === 0 ? 'rupture' : quantity < LOW_STOCK_THRESHOLD ? 'bas' : 'normal'

    /**
     * Détermine la classe CSS pour une ligne de produit selon son état de stock
     * 
     * Applique un style visuel différent selon l'état du stock:
     * - normal: Fond blanc/gris au survol
     * - bas: Fond jaune pâle
     * - rupture: Fond rouge pâle
     * 
     * @param status - État du stock ('normal', 'bas', 'rupture')
     * @returns Classe CSS à appliquer à la ligne du tableau
     */
    const getRowClass = (status: string) => {
        switch (status) {
            case 'rupture': return 'bg-red-50 hover:bg-red-100'
            case 'bas': return 'bg-yellow-50 hover:bg-yellow-100'
            default: return 'hover:bg-gray-50'
        }
    }

    /**
     * Interface pour les options de sélection
     * Définit la structure des options dans les menus déroulants
     */
    interface SelectOption {
        value: string;
        label: string;
    }

    /**
     * Interface pour le composant SelectWithIcon
     * Définit les propriétés requises pour le composant de sélection
     */
    interface SelectWithIconProps {
        id: string;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
        options: SelectOption[];
        label: string;
    }

    /**
     * Composant réutilisable pour les sélecteurs avec icône
     * 
     * Affiche un menu déroulant avec:
     * - Libellé explicatif
     * - Icône de flèche vers le bas
     * - Options personnalisables
     * 
     * Utilisé pour les filtres de catégorie, disponibilité et tri
     */
    const SelectWithIcon: FC<SelectWithIconProps> = ({id, value, onChange, options, label}) => (
        <div>
            <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-600">{label}</label>
            <div className="relative">
                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    className="w-full pl-4 pr-10 py-2 appearance-none border-2 border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                >
                    {options.map(({value, label}) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown size={18} className="text-gray-400"/>
                </div>
            </div>
        </div>
    )

    return (
        <div>
            {/* Header */}
            <div className="md:flex md:justify-between md:items-center mb-6">
                <h1 className="text-2xl text-gray-600 font-bold md:mb-0 mb-4 text-center md:text-left">Inventaire</h1>

                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-end">
                    {user?.role === 'admin' && (
                        <Link
                            to="/inventory/new"
                            className="flex items-center justify-center bg-blue-200 hover:bg-blue-300 text-blue-700 py-2 px-4 rounded-md no-underline"
                        >
                            <Plus size={18} className="mr-1"/>
                            <span className="whitespace-nowrap">Ajouter un produit</span>
                        </Link>
                    )}

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center justify-center border-2 border-gray-300 bg-black-800 text-white hover:text-blue-600 py-2 px-4 rounded-md"
                    >
                        <SlidersHorizontal size={18} className="mr-1"/>
                        <span className="whitespace-nowrap">Filtres et tri</span>
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className={`bg-white shadow rounded-lg mb-6 overflow-hidden transition-all duration-300 ease-in-out ${showFilters ? 'max-h-[500px] sm:max-h-96' : 'max-h-0'}`}>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <div>
                            <label htmlFor="search" className="block mb-1 text-sm font-medium text-gray-600">
                                Rechercher par nom ou référence
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="search"
                                    value={searchTerm}
                                    onChange={handleFilterChange('searchTerm')}
                                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                                    placeholder="Rechercher..."
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={18} className="text-gray-400"/>
                                </div>
                            </div>
                        </div>

                        {/* Category filter */}
                        <SelectWithIcon
                            id="category"
                            value={selectedCategory}
                            onChange={handleFilterChange('selectedCategory')}
                            label="Catégorie"
                            options={[
                                {value: '', label: 'Toutes les catégories'},
                                ...CATEGORIES.map(category => ({value: category, label: category}))
                            ]}
                        />

                        {/* Availability filter */}
                        <SelectWithIcon
                            id="availability"
                            value={availabilityFilter}
                            onChange={handleFilterChange('availabilityFilter')}
                            label="Disponibilité"
                            options={[
                                {value: 'all', label: 'Tous les produits'},
                                {value: 'in_stock', label: 'En stock'},
                                {value: 'low_stock', label: 'Stock bas'},
                                {value: 'out_of_stock', label: 'Rupture de stock'}
                            ]}
                        />

                        {/* Sort options */}
                        <SelectWithIcon
                            id="sort"
                            value={sortBy}
                            onChange={handleFilterChange('sortBy')}
                            label="Trier par"
                            options={[
                                {value: 'name', label: 'Nom (A-Z)'},
                                {value: 'price_asc', label: 'Prix (croissant)'},
                                {value: 'price_desc', label: 'Prix (décroissant)'},
                                {value: 'quantity', label: 'Quantité'}
                            ]}
                        />

                        {/* Price range */}
                        <div className="md:col-span-2">
                            <div className="flex justify-between mb-1">
                                <label htmlFor="priceRange" className="text-sm font-medium text-gray-600">
                                    Gamme de prix
                                </label>
                                <span className="text-sm text-gray-600">
                                    {priceMin} $ - {priceMax} $
                                </span>
                            </div>

                            <div className="flex gap-2 mb-2">
                                <input
                                    type="number"
                                    min="0"
                                    max={priceMax}
                                    value={priceMin}
                                    onChange={handleNumericChange('priceMin', 0, priceMax)}
                                    className="w-1/2 px-3 py-1 text-sm border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                                />
                                <input
                                    type="number"
                                    min={priceMin}
                                    value={priceMax}
                                    onChange={handleNumericChange('priceMax', priceMin)}
                                    className="w-1/2 px-3 py-1 text-sm border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-500 whitespace-nowrap">Min</span>
                                <input
                                    type="range"
                                    min="0"
                                    max={priceMax}
                                    value={priceMin}
                                    onChange={handleNumericChange('priceMin', 0, priceMax)}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <span className="text-xs text-gray-500 whitespace-nowrap">Max</span>
                                <input
                                    type="range"
                                    min={priceMin}
                                    max="1000"
                                    value={priceMax}
                                    onChange={handleNumericChange('priceMax', priceMin)}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products list */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                {loading ? (
                    <LoadingSpinner/>
                ) : sortedProducts.length === 0 ? (
                    <NoResults/>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200 table-fixed">
                        <thead className="bg-gray-50">
                            <tr>
                                {['Nom', 'Référence', 'Catégorie', 'Prix', 'Quantité', 'Actions'].map(header => (
                                    <th key={header} scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header === 'Actions' ? 'text-center' : ''}`}>
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {sortedProducts.map(product => {
                                const stockStatus = getStockStatus(product.quantity);
                                return (
                                    <tr key={product.id} className={getRowClass(stockStatus)}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link to={`/inventory/${product.id}`} className="text-blue-600 hover:underline">
                                                {product.name}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {product.reference}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {product.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {product.price.toFixed(2)} $
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-left">
                                            <div className="flex items-center">
                                                <span className={`
                                                    ${product.quantity === 0 ? 'text-red-600 font-medium' : 
                                                      product.quantity < LOW_STOCK_THRESHOLD ? 'text-yellow-600 font-medium' : 
                                                      'text-gray-600'}
                                                `}>
                                                    {product.quantity}
                                                </span>
                                                {product.quantity === 0 && (
                                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                        Rupture
                                                    </span>
                                                )}
                                                {product.quantity > 0 && product.quantity < LOW_STOCK_THRESHOLD && (
                                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                        Stock bas
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex justify-center space-x-2">
                                                <Link to={`/inventory/${product.id}`} className="text-blue-600 hover:text-blue-900" title="Voir">
                                                    <Eye size={18}/>
                                                </Link>
                                                {user?.role === 'admin' && (
                                                    <>
                                                        <Link to={`/inventory/${product.id}/edit`} className="text-blue-600 hover:text-blue-900" title="Modifier">
                                                            <Edit size={18}/>
                                                        </Link>
                                                        <button className="bg-black-800 text-red-600 hover:text-red-900" title="Supprimer">
                                                            <Trash2 size={18}/>
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

/**
 * Composant d'affichage pendant le chargement des produits
 * 
 * Affiche une animation rotative (spinner) et un message explicatif
 * permettant à l'utilisateur de comprendre que les données sont en cours
 * de chargement depuis le serveur.
 */
const LoadingSpinner: FC = () => (
    <div className="flex justify-center items-center h-64">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
        <p className="ml-2 text-gray-600">Chargement de l'inventaire...</p>
    </div>
)

/**
 * Composant affiché quand aucun résultat ne correspond aux critères de recherche
 * 
 * Fournit un retour visuel clair avec:
 * - Une icône de recherche
 * - Un message principal indiquant l'absence de résultats
 * - Une suggestion pour modifier les critères de recherche
 */
const NoResults: FC = () => (
    <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="rounded-full bg-gray-100 p-4 mb-4">
            <Search size={32} className="text-gray-400"/>
        </div>
        <p className="text-lg font-medium text-gray-600 mb-2">Aucun produit trouvé</p>
        <p className="text-gray-500">Essayez d'ajuster vos filtres ou effectuez une recherche différente</p>
    </div>
)

export default InventoryPage
