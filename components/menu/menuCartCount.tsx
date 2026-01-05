'use client';

import { cartListFetcher } from '@/lib/cartListUtil';
import Link from 'next/link';
import useSWR from 'swr';

export default function MenuCartCount() {
    const { data: cartItems, isLoading } = useSWR(
        '/api/cart/list',
        cartListFetcher,
        { revalidateIfStale: false }
    );

    if (isLoading) {
        return <div>Loading....</div>;
    }

    return (
        <div className="cursor-pointer">
            <Link href="/mypage">CART ITEMS: {cartItems.length}</Link>
        </div>
    );
}
