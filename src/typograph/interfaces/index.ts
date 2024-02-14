export interface LayoutProps {
    title?: string;
    description?: string;
    metaTitle?: string;
    metaDescription?: string;
    image?: string;
    children: React.ReactNode;
    loadTwitterWidget?: boolean;
}