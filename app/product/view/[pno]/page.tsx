import ProductViewCP from '@/components/product/productViewCP';

export async function generateStaticParams() {
    // const res = await fetch(
    //     `http://localhost:8080/api/products/event?count=10`
    // );
    // const pnos = await res.json();

    // return pnos.map((pno) => ({ pno: String(pno) }));
    const arr = [{ pno: '1' }, { pno: '2' }, { pno: '2' }];

    return arr;
}

export default async function ProductViewPage({ params, searchParams }) {
    const param = await params;

    const pno = param.pno;

    const res = await fetch(`http://localhost:8080/api/products/${pno}`);
    const product = await res.json();
    //   console.log(product);

    const query = await searchParams;

    console.log('query', query);
    const from = query.from
        ? decodeURIComponent(query.from)
        : '/product/catalog/1';

    return (
        <div>
            <div>Product View Page</div>
            <ProductViewCP product={product} from={from} />
        </div>
    );
}
