import { ReactNode } from 'react';
import Footer from './Footer';
import BackToTop from './BackToTop';

interface LayoutProps {
    children: ReactNode;
    showFooter?: boolean;
}

const Layout = ({ children, showFooter = true }: LayoutProps) => {
    return (
        <>
            {children}
            <BackToTop />
            {showFooter && <Footer />}
        </>
    );
};

export default Layout;
