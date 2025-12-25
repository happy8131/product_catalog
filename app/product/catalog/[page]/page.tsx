/* eslint-disable @typescript-eslint/no-empty-object-type */
import ProductCatalogCP from '@/components/product/productCatalogCP';

type PageProps = {
    params: Promise<{
        page: string;
    }>;
    searchParams: Promise<{}>;
};

export async function generateStaticParams() {
    // const res = await fetch(
    //     `http://localhost:8080/api/products/countCatalog?size=4`
    // );

    // const pageCount = await res.json();

    // const arr = [];
    // for (let i = 1; i <= pageCount; i++) {
    //     arr.push({ page: String(i) });
    // }
    const arr = [{ page: '1' }, { page: '2' }];
    return arr;
}
//ISR
export default async function ProductCatalogPage({
    params,
    searchParams,
}: PageProps) {
    const param = await params;

    const pageStr = param.page || '1';
    const sizeStr = '4';

    const res = await fetch(
        `http://localhost:8080/api/products/list?page=${pageStr}&size=${sizeStr}`,
        { next: { revalidate: 60 * 60 * 24 } }
    );

    const result = await res.json();
    //  console.log(result);
    const { list, total, pageRequestDTO } = result;
    return (
        <div>
            <div>Product Catalog Page {pageStr}</div>

            <ProductCatalogCP
                products={list}
                total={total}
                current={pageRequestDTO.page}
                size={pageRequestDTO.size}
            />
        </div>
    );
}
