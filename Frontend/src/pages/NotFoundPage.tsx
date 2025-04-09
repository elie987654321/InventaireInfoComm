import { FC } from 'react'
import { Link } from 'react-router-dom'

/**
 * Page 404 affichée lorsqu'une URL demandée n'existe pas
 */
const NotFoundPage: FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-96 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
            <div className="w-16 h-1 bg-gray-300 mb-6"></div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page non trouvée</h2>
            <p className="text-gray-600 mb-8 max-w-md">
                La page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <Link
                to="/"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
                Retour à l'accueil
            </Link>
        </div>
    )
}

export default NotFoundPage