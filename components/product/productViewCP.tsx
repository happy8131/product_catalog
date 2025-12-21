import Image from 'next/image';
import Link from 'next/link';

export default function ProductViewCP({ product, from }) {
    return (
        <div>
            <div>Product View CP</div>
            <div>{product.pno}</div>
            <div>{product.pname}</div>
            <div>{product.price}</div>
            <div>{product.writer}</div>
            <div>{product.createDate}</div>

            {product.fileName?.map((fileName) => (
                <div className="relateve w-1/3 h-80" key={fileName}>
                    <Image
                        src={`http://localhost:8080/${fileName}`}
                        alt={product.pname}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="33vw"
                        priority={true}
                    />
                </div>
            ))}

            <div>
                <Link href={from}>
                    <button>이전 화면</button>
                </Link>
            </div>
        </div>
    );
}
