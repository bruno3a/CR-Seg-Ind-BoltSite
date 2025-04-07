import { Context } from '@cloudflare/workers-types';

export async function onRequest(context: Context) {
  // Handle API requests
  if (context.request.url.includes('/api/')) {
    // Proxy to your API server
    const url = new URL(context.request.url);
    url.hostname = process.env.API_HOST || 'localhost';
    url.port = process.env.API_PORT || '3010';
    
    return fetch(url.toString(), context.request);
  }

  // Serve static assets
  return context.next();
}