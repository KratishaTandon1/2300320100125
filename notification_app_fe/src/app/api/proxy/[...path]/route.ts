import { NextRequest, NextResponse } from 'next/server';

const TARGET_BASE_URL = 'http://4.224.186.213';

async function handleProxy(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    const resolvedParams = await params;
    const path = resolvedParams.path.join('/');
    const searchParams = request.nextUrl.searchParams.toString();
    const targetUrl = `${TARGET_BASE_URL}/${path}${searchParams ? `?${searchParams}` : ''}`;

    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.delete('referer');

    const fetchOptions: RequestInit = {
      method: request.method,
      headers: headers,
      redirect: 'manual',
    };

    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      fetchOptions.body = await request.arrayBuffer();
    }

    const response = await fetch(targetUrl, fetchOptions);

    const responseHeaders = new Headers(response.headers);
    responseHeaders.set('Access-Control-Allow-Origin', '*');

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error: any) {
    console.warn('Proxy route error:', error);
    return NextResponse.json({ error: 'Proxy Request Failed', details: error.message }, { status: 502 });
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;
export const OPTIONS = handleProxy;
