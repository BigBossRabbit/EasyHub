import { ReactNode } from 'react';
import Footer from './Footer';
import BackToTop from './BackToTop';
import Navbar from './Navbar';
import Ticker from './Ticker';

interface LayoutProps {
    children: ReactNode;
    showFooter?: boolean;
}

const Layout = ({ children, showFooter = true }: LayoutProps) => {
    return (
        <>
            <Navbar />
            <Ticker />
            <main className="pt-28">
                {children}
            </main>
            <BackToTop />
            {showFooter && <Footer />}
        </>
    );
};

export default Layout;
