interface Env {
  API_URL: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const apiUrl = context.env.API_URL || 'http://localhost:3010';
  
  // Construir la URL de la API
  const targetUrl = new URL(url.pathname.replace('/api', ''), apiUrl);
  
  try {
    const response = await fetch(targetUrl.toString(), {
      method: context.request.method,
      headers: context.request.headers,
      body: context.request.body,
    });

    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: 'API Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};