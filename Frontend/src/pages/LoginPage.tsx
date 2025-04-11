import {JSX, useState} from 'react'
import { useAuth } from '../store/AuthContext'
import Logo from '../Components/common/Logo.tsx'
import Background from '../Components/common/background.tsx'

/**
 * Composant LoginPage
 *
 * Affiche un formulaire de connexion permettant aux utilisateurs de s'authentifier
 * avec leur nom d'utilisateur et mot de passe. Inclut des fonctionnalités comme
 * l'affichage/masquage du mot de passe, la gestion des erreurs d'authentification
 * et l'indication de chargement pendant la tentative de connexion.
 *
 * @returns {JSX.Element} - Composant React de la page de connexion
 */
const LoginPage = (): JSX.Element => {
    // États pour gérer les champs de formulaire
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)

    // Récupération des fonctionnalités d'authentification du contexte
    const { login, isLoading, error } = useAuth()

    /**
     * Gère la soumission du formulaire de connexion
     *
     * @param {React.FormEvent} e - L'événement de soumission du formulaire
     * @returns {Promise<void>} - Promise asynchrone résolue après la tentative de connexion
     */
    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault() // Empêche le rechargement de la page
        await login(username, password)
    }

    /**
     * Bascule la visibilité du mot de passe
     *
     * @returns {void}
     */
    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background component */}
            <Background />

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative z-10">
                {/* Logo de l'application */}
                <div className="flex justify-center mb-6">
                    <Logo />
                </div>

                <h1 className="text-2xl font-bold text-gray-600 text-center mb-6">Connexion</h1>

                <form onSubmit={handleSubmit}>
                    {/* Champ de saisie du nom d'utilisateur */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Identifiant utilisateur
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            aria-required="true"
                            autoComplete="username"
                            data-testid="username-input"
                        />
                    </div>

                    {/* Champ de saisie du mot de passe avec toggle visibilité */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Mot de passe
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                aria-required="true"
                                autoComplete="current-password"
                                data-testid="password-input"
                            />
                            {/* Bouton pour afficher/masquer le mot de passe */}
                            <button
                                type="button"
                                className="absolute bg-black-800 inset-y-0 right-0 px-3 text-sm text-white hover:text-blue-600"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                data-testid="toggle-password-visibility"
                            >
                                {showPassword ? "Masquer" : "Afficher"}
                            </button>
                        </div>
                        {/* Lien "Mot de passe oublié" */}
                        <div className="mt-1 text-right">
                            <a
                                href="#"
                                className="text-sm text-blue-600 hover:underline"
                                aria-label="Récupérer un mot de passe oublié"
                            >
                                Mot de passe oublié ?
                            </a>
                        </div>
                    </div>

                    {/* Affichage des messages d'erreur */}
                    {error && (
                        <div
                            className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm"
                            role="alert"
                            aria-live="assertive"
                        >
                            {error}
                        </div>
                    )}

                    {/* Bouton de soumission avec état de chargement */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-black-800 text-white hover:text-blue-600 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        aria-busy={isLoading}
                        data-testid="login-button"
                    >
                        {isLoading ? "Connexion en cours..." : "Connexion"}
                    </button>
                </form>
            </div>

            {/* Small credit at the bottom */}
            <div className="absolute bottom-2 text-center w-full text-xs text-gray-600 z-10">
                <p>© {new Date().getFullYear()} - Système d'inventaire Info-Comm</p>
            </div>
        </div>
    )
}

export default LoginPage
