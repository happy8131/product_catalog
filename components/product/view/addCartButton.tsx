'use client';

import { useAuthCheck } from '@/hooks/useAuthCheck';
import { useState } from 'react';

interface ProductDTO {
    pno: number;
    pname: string;
    price: number;
    writer: string;
    sale: boolean;
    fileNames: string[];
    createdDate: string; // or Date
}

export default function AddCartButton({
    product,
    from,
}: {
    product: ProductDTO;
    from?: string;
}) {
    const { session, router } = useAuthCheck(true);

    const handleClickAdd = async (e: React.MouseEvent) => {
        const param = {
            account: session?.user?.email,
            pno: product.pno,
            quantity: 1,
        };

        const res = await fetch('/api/cart/change', {
            method: 'POST',
            body: JSON.stringify(param),
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await res.json();

        console.log(result);

        setShow(() => true);
    };

    const [show, setShow] = useState(false);

    const closeModal = (value: string) => {
        setShow(() => false);
        if (value === 'c') {
            router.back();
        } else if (value === 'm') {
            router.push(`/mypage`);
        }
        setShow(() => false);
    };

    return (
        <div className="pt-4">
            {session?.user && (
                <button
                    onClick={handleClickAdd}
                    className="w-full px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
                >
                    구매하기
                </button>
            )}
        </div>
    );
}
