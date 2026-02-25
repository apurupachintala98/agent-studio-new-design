import { hmacFetch } from '../lib/hmac-client'
 
/* ---------- Types ---------- */
 
export interface Agent {
  agnt_id: string
  agnt_nm: string
  agnt_type: string
}
 
interface ListAgentsByAppResponse {
  success: boolean
  message: string
  data: {
    aplctn_cd: string
    count: number
    agents: Agent[]
    fetch_timestamp: string
  }
}
 
interface FetchToolsResponse {
  success: boolean
  message: string
  data: {
    tools: any[]
  }
}
 
interface ListServersResponse {
  success: boolean
  message: string
  data: {
    count: number
    servers: Array<{
      srvr_id: string
      srvr_nm: string
      aplctn_cd: string
      srvr_endpt: string
    }>
    fetch_timestamp: string
  }
}
 
export interface FetchAgentResponse {
  success: boolean
  message: string
  data: {
    record: {
      aplctn_cd: string
      agnt_nm: string
      agnt_id: string
      agnt_intake_id: string
      agnt_type: string
      agnt_desc: string
      agnt_endpt: string
      agnt_card_url: string
      agnt_card_json: any
      agnt_access_scope: string
      db_nm: any
      schma_nm: any
      agnt_owner: string
      oauth_dtls: string
      aprvl_wrkfl: string
      snow_tkt_id: string
      cmnts: string
      mcp_flag: string
      dplymnt_flag: any
      dplymnt_dtm: any
      rqstr_id: string
      creat_dtm: string
      last_updt_user_id: string
      last_updt_dtm: string
      prmotn_flag: string
      last_prmotn_dtm: any
      servers_connected: Array<{
        srvr_id: string
        srvr_nm: string
        aplctn_cd: string
        srvr_endpt: string
      }>
      agents_connected: any[]
    }
    agent_id: string
    table: string
    fetch_timestamp: string
  }
}
 
/* ---------- APIs ---------- */
 
// List agents by application
export async function fetchAgentsByAppCode(
  appCode: string
): Promise<Agent[]> {
  const response = await hmacFetch<ListAgentsByAppResponse>(
    '/edagenai/list-agents-by-application',
    'POST',
    { aplctn_cd: appCode }
  )
 
  if (response.success) {
    return response.data?.agents ?? []
  } else {
    throw new Error('Failed to fetch agents')
  }
}
 
export async function fetchSpecificAgent(
  agntId: string
): Promise<FetchAgentResponse> {
  return hmacFetch(
    '/edagenai/list-specific-agent',
    'POST',
    { agnt_id: agntId }
  )
}
 
export async function fetchToolsByServer(
  serverID: string
): Promise<any[]> {
  const response = await hmacFetch<FetchToolsResponse>(
    '/edagenai/fetch-tools-by-server',
    'POST',
    { srvr_id: serverID }
  )
 
  if (response.success) {
    return response.data?.tools ?? []
  } else {
    throw new Error('Failed to fetch tools by server')
  }
}
 
export async function listServers() {
  const response = await hmacFetch<any>(
    '/edagenai/list-servers',
    'GET'
  )
 
  if (response.success) {
    return response.data?.records ?? []
  }
 
  throw new Error('Failed to fetch servers')
}
