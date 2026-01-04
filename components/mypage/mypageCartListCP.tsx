'use client';

import useSWR from 'swr';
import { CartItemDTO } from '@/types/cart';
import { cartListFetcher } from '@/lib/cartListUtil';
import CartItem from './item/cartItem';

export default function MyPageCartListCP() {
    const { data: cartItems, mutate } = useSWR<CartItemDTO[]>(
        '/api/cart/list',
        cartListFetcher,
        { revalidateIfStale: false }
    );

    if (!cartItems) {
        return <div></div>;
    }

    return (
        <div>
            <div>
                <div>Cart Items {cartItems.length}</div>
                <ul>
                    {cartItems?.map((cartItem, index) => (
                        <CartItem cartItem={cartItem} key={index} />
                    ))}
                </ul>
            </div>
        </div>
    );
}
