const API_BASE_URL =
  import.meta.env.VITE_MCP_API_BASE_URL ||
  "https://mcpgatewayapi.edamcpdev.awsdns.internal.das"
 
const HMAC_SECRET = "EdA_McP_GaTewAy_hMAc" || ""
 
if (!API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not defined')
}
 
if (!HMAC_SECRET) {
  throw new Error('VITE_HMAC_SECRET_KEY is not defined')
}
 
async function generateHmac(secret: string, message: string) {
  const encoder = new TextEncoder()
 
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
 
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(message))
 
  return Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}
 
export async function hmacFetch<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: Record<string, any>
): Promise<T> {
 
  let bodyString = ''
 
  if (method !== 'GET') {
    if (!body || Object.keys(body).length === 0) {
      throw new Error(`${method} ${endpoint} requires a request body`)
    }
    bodyString = JSON.stringify(body)
  }
 
  const signature = await generateHmac(
    HMAC_SECRET,
    bodyString
  )
 
  const headers: Record<string, string> = {
    'X-HMAC-Signature': signature,
  }
 
  if (method !== 'GET') {
    headers['Content-Type'] = 'application/json'
  }
 
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: method !== 'GET' ? bodyString : undefined,
  })
 
  if (!response.ok) {
    const text = await response.text()
    console.error(`[v0] API Error (${response.status}):`, text)
    throw new Error(text)
  }
 
  return response.json()
}
 
 
export interface Agent {
  id: string
  name: string
  description?: string
  [key: string]: any
}
 
interface AgentsResponse {
  data?: {
    records?: Agent[]
  }
}
 
export async function fetchAgents() {
  try {
    const response = await hmacFetch<AgentsResponse>(
      '/edagenai/list-agents',
      'GET'
    )
   
    // Extract agents from response
    const agents = response.data?.records || []
    return agents
  } catch (error) {
    console.error('[v0] Failed to fetch agents:', error)
    throw error
  }
}
 