import { 
    getAllDocSlugsSchema, 
    getAllRedirectsSchema,
    getStaticPageSchema, 
    getStaticShopSchema,
    getPageSchema, 
    getProductSchema,
    getCollectionSchema 
} from '@lib/cms-providers/dato';
import { Obj } from '@typograph/types';
import { Page } from '@typograph/interfaces';
import { ProductProp, CollectionGridProps } from '@typograph/types/queries';

export async function getAllDocSlugs(doc: string): Promise<any[]> {
    return getAllDocSlugsSchema(doc);
}

export async function getAllRedirects(): Promise<any[]> {
    return getAllRedirectsSchema();
}

export async function getStaticPage(pageData: any): Promise<any> {
    return getStaticPageSchema(pageData);
}

export async function getStaticShopPage(pageData: any, preview: Obj): Promise<any> {
    return getStaticShopSchema(pageData, preview);
}

export async function getPage(slug: any, preview: any): Promise<Page> {
    return getPageSchema(slug, preview);
}

async function getProduct(slug: any, preview: any): Promise<ProductProp> {
    return getProductSchema(slug, preview);
}

async function getCollection(slug: any, preview: any): Promise<CollectionGridProps> {
    return getCollectionSchema(slug, preview);
}