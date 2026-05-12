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
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md">
                Skip to content
            </a>
            <Navbar />
            <Ticker />
            <main id="main-content" className="pt-28">
                {children}
            </main>
            <BackToTop />
            {showFooter && <Footer />}
        </>
    );
};

export default Layout;
