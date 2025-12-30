'use client';

import { putAccount } from '@/actions/accountActions';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useActionState, useEffect } from 'react';

export default function AccountModifyCP() {
    const { data: session, status, update } = useSession();

    const [state, action, isPending] = useActionState(putAccount, {
        message: '',
        result: '',
    });

    useEffect(() => {
        if (state.result === 'success') {
            alert('다시 로그인 필요');
            signOut({ callbackUrl: '/' });
        }
    }, [state]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    // 2. data 객체의 존재 유무를 확인하는 타입 가드
    if (session?.user) {
        // 이제 TypeScript는 session.user가 존재함을 알고 있습니다.
        const { email, name } = session.user;
        return (
            <div>
                <p>이메일: {email}</p>
                <p>이름: {name}</p>
            </div>
        );
    }

    return (
        <div>
            <div>Account Modify Component</div>
            <form action={action}>
                <div>
                    Email{' '}
                    <input
                        type="text"
                        name="email"
                        defaultValue={session?.user?.email}
                        readOnly
                    ></input>
                </div>
                <div>
                    Nickname{' '}
                    <input
                        type="text"
                        name="nickname"
                        defaultValue={session?.user?.name}
                    ></input>
                </div>
                <div>
                    Password <input type="password" name="password"></input>
                </div>
                <button type="submit" disabled={isPending}>
                    {isPending ? '저장 중...' : '저장하기'}
                </button>
            </form>
        </div>
    );
}
