import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// export function middleware(request) {
//   // 요청 URL을 콘솔에 출력합니다.
//   console.log('Middleware run............:', request.nextUrl.pathname);
//   return NextResponse.next();
// }

export default withAuth({
    callbacks: {
        authorized: ({ token }) => {
            console.log(
                '-----------------------------------------------',
                token
            );
            return !!token;
        },
    },
});

export const config = {
    // 미들웨어를 모든 경로에 적용합니다.
    matcher: ['/admin/:path*', '/mypage', '/product/query'],
};
