import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function MyPage() {
    const session = await getServerSession(authOptions);

    console.log('myPage:', session);

    return (
        <div>
            <div>My Page </div>

            {!session?.user?.email && <div>로그인 필요</div>}

            {session?.user?.email && (
                <div>
                    <div>이미 로그인 된 사용자 {session.user.email}</div>
                </div>
            )}
        </div>
    );
}
