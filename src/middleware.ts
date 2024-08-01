import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.rewrite(
    new URL(request.nextUrl.pathname.toLocaleLowerCase(), request.url),
  );
}
