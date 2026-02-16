export async function fetchApi(endpoint) {
  const baseUrl = typeof window === 'undefined'
    ? (process.env.NEXT_PUBLIC_BASE_URL || 
       (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000'))
    : '';

  const url = `${baseUrl}/api/proxy${endpoint}`;
  
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const text = await res.text();
    console.error("STATUS:", res.status);
    console.error("BODY:", text);
    throw new Error(`API request failed: ${res.status}`);
  }

  return res.json();
}