import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Background from '../common/background'

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Background/>
            <Header />
            <main className="flex-grow container mx-auto px-4 py-6">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout