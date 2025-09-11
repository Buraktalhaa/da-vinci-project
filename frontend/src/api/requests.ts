export const API_BASE_URL = 'http://localhost:3000';

export async function PostRequest({ endpoint, body }: { endpoint: string; body: any }) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'API POST request failed');
  }
  return res.json();
}


export async function GetRequest({ endpoint }: { endpoint: string }) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'API GET request failed');
  }
  return res.json();
}

export async function DeleteRequest({ endpoint }: { endpoint: string }) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, { method: 'DELETE' });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'API DELETE request failed');
  }
  return res.json();
}



export async function PutRequest({ endpoint, body }: { endpoint: string; body: any }) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'API PUT request failed');
  }
  return res.json();
}
