import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Types
export type UserRole = 'admin' | 'user'

export interface User {
    id: number
    username: string
    role: UserRole
}

interface AuthContextType {
    user: User | null
    login: (username: string, password: string) => Promise<void>
    logout: () => void
    isLoading: boolean
    error: string | null
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Check if user is already logged in (from localStorage)
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setIsLoading(false)
    }, [])

    const login = async (username: string, password: string) => {
        setIsLoading(true)
        setError(null)

        try {
            // In a real app, this would be an API call
            // For now, let's simulate a successful login with mock data
            // Replace with actual API integration later

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800))

            // Mock authentication logic
            if (username === 'admin' && password === 'password') {
                const userData: User = {
                    id: 1,
                    username: 'admin',
                    role: 'admin'
                }
                setUser(userData)
                localStorage.setItem('user', JSON.stringify(userData))
            } else if (username === 'user' && password === 'password') {
                const userData: User = {
                    id: 2,
                    username: 'user',
                    role: 'user'
                }
                setUser(userData)
                localStorage.setItem('user', JSON.stringify(userData))
            } else {
                throw new Error('Identifiant ou mot de passe incorrect')
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue')
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
    {children}
    </AuthContext.Provider>
)
}

// Custom hook to use auth context
export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}