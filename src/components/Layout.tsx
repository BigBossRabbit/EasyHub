import { ReactNode } from 'react';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
    showFooter?: boolean;
}

const Layout = ({ children, showFooter = true }: LayoutProps) => {
    return (
        <>
            {children}
            {showFooter && <Footer />}
        </>
    );
};

export default Layout;
