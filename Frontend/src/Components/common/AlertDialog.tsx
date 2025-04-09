import { useEffect, useState } from 'react'

interface AlertDialogProps {
    message: string
    isOpen: boolean
    onClose: () => void
}

const AlertDialog = ({ message, isOpen, onClose }: AlertDialogProps) => {
    const [isVisible, setIsVisible] = useState(isOpen)

    useEffect(() => {
        setIsVisible(isOpen)
    }, [isOpen])

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-start mb-4">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-yellow-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">Attention</h3>
                        <div className="mt-2 text-sm text-gray-500">
                            {message}
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AlertDialog