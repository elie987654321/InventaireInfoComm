const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-white border-t py-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm text-gray-600">
                        © {currentYear} Services Info-Comm - Tous droits réservés
                    </div>

                    <div className="flex space-x-4 mt-2 md:mt-0">
                        <a href="https://www.infocomm.ca/fr/terms-and-conditions/" target="_blank" className="text-sm text-gray-600 hover:text-blue-600">
                            Termes et conditions
                        </a>
                        <a href="https://www.infocomm.ca/fr/privacy-policy/" target="_blank" className="text-sm text-gray-600 hover:text-blue-600">
                            Politique de confidentialité
                        </a>
                    </div>

                    <div className="text-xs text-gray-500 mt-2 md:mt-0">
                        Ce site a été réalisé par Team4
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer