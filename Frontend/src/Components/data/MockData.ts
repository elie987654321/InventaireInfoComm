/**
 * Fichier central pour toutes les données de démonstration
 * Utilisé par les différents composants de l'application
 */

// Types pour les données
export interface User {
    id: number
    username: string
    email: string
    role: string
    lastConnection: string
}

export interface Product {
    id: string
    reference: string
    name: string
    price: number
    category: string
    quantity: number
    supplier: string
    model: string
    notes?: string
}

export interface Category {
    id: number
    name: string
    productCount: number
}

export interface CriticalProduct {
    name: string
    quantity: number
    status?: string
}

export interface StockAlert {
    id?: string
    type: 'rupture' | 'faible' | 'reapprovisionne'
    product: string
    date: string
    message: string
}

export interface DashboardStat {
    title: string
    count: string
    description: string
    linkText: string
    linkTo: string
}

export interface DashboardStats {
    totalProducts: number
    lowStockProducts: number
    categories: { name: string; count: number }[]
    recentAlerts: { id: string; message: string; date: string }[]
}

// Constantes pour l'application
export const LOW_STOCK_THRESHOLD = 30
export const CATEGORIES = ['Écran', 'Ordinateur', 'Imprimante', 'Peripherique']

// Données mockées pour l'authentification
export const MOCK_USERS = {
    admin: {
        id: 1,
        username: 'admin',
        email: 'admin@services-infocomm.com',
        role: 'Administrateur',
        lastConnection: '2025-04-09 08 h 30 min 00 s'
    },
    user: {
        id: 2,
        username: 'user',
        email: 'user@example.com',
        role: 'Utilisateur',
        lastConnection: '2025-04-08 14 h 15 min 00 s'
    },
    client1: {
        id: 3,
        username: 'client1',
        email: 'client1@example.com',
        role: 'Utilisateur',
        lastConnection: '2025-04-08 14 h 15 min 00 s'
    },
    client2: {
        id: 4,
        username: 'client2',
        email: 'client2@example.com',
        role: 'Utilisateur',
        lastConnection: '2025-04-07 11 h 45 min 00 s'
    }
}

// Produits de démonstration
export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        reference: 'ABC12345678',
        name: 'Écran Samsung',
        price: 125.99,
        category: 'Écran',
        quantity: 10,
        supplier: 'Samsung',
        model: 'SyncMaster 2243',
        notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        id: '2',
        reference: 'ABC87654321',
        name: 'Écran Dell',
        price: 135.99,
        category: 'Écran',
        quantity: 45,
        supplier: 'Dell',
        model: 'P2419H'
    },
    {
        id: '3',
        reference: 'DEF12345678',
        name: 'Ordinateur Asus',
        price: 899.99,
        category: 'Ordinateur',
        quantity: 0,
        supplier: 'Asus',
        model: 'ROG G15',
        notes: 'Rupture de stock - Commander rapidement'
    },
    {
        id: '4',
        reference: 'GHI12345678',
        name: 'Clavier Logitech',
        price: 79.99,
        category: 'Peripherique',
        quantity: 62,
        supplier: 'Logitech',
        model: 'K380'
    }
]

// Catégories de produits
export const MOCK_CATEGORIES: Category[] = [
    { id: 1, name: 'Écran', productCount: 42 },
    { id: 2, name: 'Ordinateur', productCount: 35 },
    { id: 3, name: 'Périphérique', productCount: 28 },
    { id: 4, name: 'Imprimante', productCount: 22 }
]

// Produits en stock critique
export const MOCK_CRITICAL_PRODUCTS: CriticalProduct[] = [
    { name: 'Écran Samsung SyncMaster 2243', quantity: 10 },
    { name: 'Ordinateur Asus LP1212-12', quantity: 0, status: 'Rupture de stock' }
]

// Alertes de stock
export const MOCK_STOCK_ALERTS: StockAlert[] = [
    {
        id: '1',
        type: 'rupture',
        product: 'Ordinateur Asus LP1212-12',
        date: 'Aujourd\'hui 08:14',
        message: 'Le stock du produit est tombé à 0 unité. Une commande est requise.'
    },
    {
        id: '2',
        type: 'faible',
        product: 'Écran Samsung SyncMaster 2243',
        date: 'Hier 15:22',
        message: 'Le stock du produit est passé sous le seuil d\'alerte (10/30 unités).'
    },
    {
        id: '3',
        type: 'reapprovisionne',
        product: 'Clavier Logitech K120',
        date: '2 avril 2025',
        message: 'Le stock a été réapprovisionné à 45 unités (seuil d\'alerte: 15 unités).'
    }
]

// Statistiques pour le tableau de bord
export const MOCK_DASHBOARD_STATS: DashboardStats = {
    totalProducts: 127,
    lowStockProducts: 14,
    categories: [
        { name: 'Écran', count: 42 },
        { name: 'Ordinateur', count: 35 },
        { name: 'Périphérique', count: 28 },
        { name: 'Imprimante', count: 22 }
    ],
    recentAlerts: [
        {
            id: '1',
            message: 'Vous avez 5 Ordinateur Asus en stock',
            date: '2025-04-08T14:30:00'
        },
        {
            id: '2',
            message: 'Vous avez 10 Écran Samsung en stock',
            date: '2025-04-07T09:15:00'
        },
        {
            id: '3',
            message: 'Vous avez 3 Imprimante HP en stock',
            date: '2025-04-06T16:45:00'
        }
    ]
}

// Statistiques pour la page d'administration
export const MOCK_ADMIN_DASHBOARD_STATS: DashboardStat[] = [
    {
        title: 'Alertes de stock',
        count: '2 produits',
        description: 'Produits actuellement sous le seuil d\'alerte',
        linkText: 'Voir les détails',
        linkTo: '#'
    },
    {
        title: 'Activité récente',
        count: '28 actions',
        description: 'Actions effectuées par les utilisateurs durant le dernier mois',
        linkText: 'Voir le journal',
        linkTo: '#'
    },
    {
        title: 'Utilisateurs actifs',
        count: '3 actifs',
        description: 'Utilisateurs ayant accédé au système pendant le dernier mois',
        linkText: 'Voir les statistiques',
        linkTo: '#'
    }
]