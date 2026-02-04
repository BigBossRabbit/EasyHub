import { ReactNode } from 'react';
import Footer from './Footer';
import BackToTop from './BackToTop';
import Navbar from './Navbar';

interface LayoutProps {
    children: ReactNode;
    showFooter?: boolean;
}

const Layout = ({ children, showFooter = true }: LayoutProps) => {
    return (
        <>
            <Navbar />
            <main className="pt-20">
                {children}
            </main>
            <BackToTop />
            {showFooter && <Footer />}
        </>
    );
};

export default Layout;
