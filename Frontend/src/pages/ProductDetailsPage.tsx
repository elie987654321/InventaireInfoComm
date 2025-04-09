import { FC, useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'
import { MOCK_PRODUCTS, Product, LOW_STOCK_THRESHOLD } from '../components/data/mockData'

/**
 * Types
 */
interface ProductDetail {
    label: string
    value: string | number
    isLowStock?: boolean
}

/**
 * Composants réutilisables
 */
const LoadingSpinner: FC = () => (
    <div className="flex justify-center items-center h-64">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
        <p className="ml-2">Chargement des détails du produit...</p>
    </div>
)

const ErrorDisplay: FC<{ message: string }> = ({ message }) => (
    <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-600">{message}</p>
        <Link to="/inventory" className="mt-4 inline-block text-blue-600 hover:underline">
            Retour à l'inventaire
        </Link>
    </div>
)

const DetailItem: FC<ProductDetail> = ({ label, value, isLowStock }) => (
    <div className="py-3 flex justify-between">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className={`text-sm ${isLowStock ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
            {value}
            {isLowStock && (
                <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
          Stock bas
        </span>
            )}
        </dd>
    </div>
)

const BackButton: FC = () => (
    <Link to="/inventory" className="text-blue-600 hover:underline flex items-center">
        <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour à l'inventaire
    </Link>
)

const ActionButton: FC<{
    type: 'edit' | 'delete';
    onClick?: () => void;
    to?: string;
    children: React.ReactNode;
}> = ({ type, onClick, to, children }) => {
    const buttonClasses = type === 'edit'
        ? "bg-white hover:bg-gray-100 text-gray-600 px-4 py-2 rounded-md flex items-center"
        : "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center";

    const iconPath = type === 'edit'
        ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        : "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16";

    const content = (
        <>
            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
            </svg>
            {children}
        </>
    );

    if (to) {
        return <Link to={to} className={buttonClasses}>{content}</Link>;
    }

    return <button onClick={onClick} className={buttonClasses}>{content}</button>;
}

/**
 * Page de détails d'un produit
 */
const ProductDetailsPage: FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Récupérer les détails du produit
    useEffect(() => {
        const fetchProductDetails = async (): Promise<void> => {
            setLoading(true)
            setError(null)

            try {
                // Simulation d'une requête API
                await new Promise(resolve => setTimeout(resolve, 800))

                if (id) {
                    // Rechercher le produit par ID
                    const foundProduct = MOCK_PRODUCTS.find(p => p.id === id)
                    if (foundProduct) {
                        setProduct(foundProduct)
                    } else {
                        throw new Error('Produit non trouvé')
                    }
                } else {
                    throw new Error('ID du produit manquant')
                }
            } catch (err) {
                setError('Impossible de charger les détails du produit')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchProductDetails()
    }, [id])

    // Gérer la suppression d'un produit
    const handleDelete = useCallback(async (): Promise<void> => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) {
            return
        }

        try {
            // Simulation d'une requête API
            await new Promise(resolve => setTimeout(resolve, 800))

            // Redirection après suppression réussie
            navigate('/inventory', { state: { message: 'Produit supprimé avec succès' } })
        } catch (err) {
            setError('Erreur lors de la suppression du produit')
            console.error(err)
        }
    }, [navigate])

    if (loading) return <LoadingSpinner />
    if (error || !product) return <ErrorDisplay message={error || 'Produit non trouvé'} />

    const isLowStock = product.quantity < LOW_STOCK_THRESHOLD

    // Grouper les détails du produit pour faciliter le rendu
    const leftColumnDetails: ProductDetail[] = [
        { label: 'Référence', value: product.reference },
        { label: 'Catégorie', value: product.category },
        { label: 'Prix', value: `${product.price.toFixed(2)} $` },
        { label: 'Quantité en stock', value: product.quantity, isLowStock }
    ]

    const rightColumnDetails: ProductDetail[] = [
        { label: 'Fournisseur', value: product.supplier },
        { label: 'Modèle', value: product.model }
    ]

    // Ajouter des détails administratifs si l'utilisateur est un administrateur
    if (user?.role === 'admin') {
        rightColumnDetails.push(
            { label: 'Ajouté le', value: '08/04/2025' },
            { label: 'Dernière mise à jour', value: '09/04/2025' }
        )
    }

    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <BackButton />
                    <h1 className="text-2xl font-bold mt-2">{product.name}</h1>
                </div>

                {user?.role === 'admin' && (
                    <div className="flex space-x-3">
                        <ActionButton
                            type="edit"
                            to={`/inventory/${product.id}/edit`}
                        >
                            Modifier
                        </ActionButton>
                        <ActionButton
                            type="delete"
                            onClick={handleDelete}
                        >
                            Supprimer
                        </ActionButton>
                    </div>
                )}
            </div>

            <div className="bg-white text-gray-600 rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-medium">Détails du produit</h3>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <dl className="divide-y">
                                {leftColumnDetails.map((detail) => (
                                    <DetailItem
                                        key={detail.label}
                                        label={detail.label}
                                        value={detail.value}
                                        isLowStock={detail.isLowStock}
                                    />
                                ))}
                            </dl>
                        </div>

                        <div>
                            <dl className="divide-y">
                                {rightColumnDetails.map((detail) => (
                                    <DetailItem
                                        key={detail.label}
                                        label={detail.label}
                                        value={detail.value}
                                    />
                                ))}
                            </dl>
                        </div>
                    </div>

                    {product.notes && (
                        <div className="mt-6">
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Notes</h4>
                            <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{product.notes}</p>
                        </div>
                    )}
                </div>

                {user?.role === 'user' && (
                    <div className="px-6 py-4 bg-gray-50 border-t">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                            Demander une modification de stock
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDetailsPage