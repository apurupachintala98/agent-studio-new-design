import { API_CONFIG } from "@/config/api-config"
 
export interface CreateAgentResponse {
    agent_uuid: string
    message: string
}
 
export interface LLMModel {
    model_id: string
    model_name: string
}
 
export interface LoginPayload {
  email: string
  password: string
  isSso: boolean
}
 
export interface LoginResponse {
  token: string
}
 
export interface CreateAgentPayload {
  agent_uuid: string
  sesn_id: string
  user_id: string
  aplctn_cd: string
}
 
export interface ConfigureAgentPayload {
  sesn_id: string
  agent_name: string
  db: string
  schema: string
  application_name: string
  description: string
 
  model_config: {
    orchestration: string
  }
 
  orchestration_config: {
    budget: {
      seconds: number
      tokens: number
    }
    features: {
      thread_memory: boolean
    }
    agent_instructions: {
      response: string
      orchestration: string
      system: string
    }
  }
 
  features: {
    thread_memory: boolean
  }
}
 
export interface ConfigureToolsPayload {
  sesn_id: string
 
  tool_choice: {
    type: string
    name: string[]
  }
 
  tools: Array<{
    type: string
    name: string
    description: string
    db_name: string
    input_schema: string
  }>
 
  tool_resources: Record<
    string,
    {
      semantic_model_file: string
      db_name: string
      input_schema: string
      execution_environment: {
        type: string
        warehouse: string
        query_timeout: number
      }
    }
  >
 
  orchestration_instructions: string
}
 
export interface RuntimeConfigPayload {
    agent_name: string
    db: string
    schema: string
    application_name: string
    user_identity: string
}
 
export interface GenerateAgentResponse {
  agent_url: string
}
 
export const agentApi = {
    // Create a new agent
    async createAgent(payload: CreateAgentPayload): Promise<CreateAgentResponse> {
  const response = await fetch(`${API_CONFIG.BASE_URL}/api/agent/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
 
  if (!response.ok) {
    throw new Error("Failed to create agent")
  }
 
  return response.json()
},
    // Get available LLM models
    async getLLMs(): Promise<LLMModel[]> {
        const response = await fetch(`${API_CONFIG.BASE_URL}/api/llms`)
 
        if (!response.ok) {
            throw new Error("Failed to fetch LLMs")
        }
 
        return response.json()
    },
 
    // Configure agent with all details
    async configureAgent(agentUuid: string, payload: ConfigureAgentPayload): Promise<void> {
        const response = await fetch(`${API_CONFIG.BASE_URL}/api/agent/${agentUuid}/configure`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
 
        if (!response.ok) {
            throw new Error("Failed to configure agent")
        }
    },
 
    // Download agent code
    async downloadAgent(agentUuid: string): Promise<Blob> {
        const response = await fetch(`${API_CONFIG.BASE_URL}/api/agent/${agentUuid}/download`)
 
        if (!response.ok) {
            throw new Error("Failed to download agent")
        }
 
        return response.blob()
    },
 
    async configureTools(agentUuid: string, payload: ConfigureToolsPayload): Promise<void> {
        const response = await fetch(`${API_CONFIG.BASE_URL}/api/agent/${agentUuid}/tools`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
 
        if (!response.ok) {
            throw new Error("Failed to configure tools")
        }
    },
 
    async configureRuntime(agentUuid: string, payload: RuntimeConfigPayload): Promise<void> {
        const response = await fetch(`${API_CONFIG.BASE_URL}/api/agent/${agentUuid}/runtime-configure`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
 
        if (!response.ok) {
            throw new Error("Failed to configure runtime")
        }
    },
 
     // Generate agent in Snowflake
  async generateAgentInSnowflake(agentUuid: string): Promise<GenerateAgentResponse> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/agent/${agentUuid}/generate_agent_in_snowflake`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
 
    if (!response.ok) {
      throw new Error("Failed to generate agent in Snowflake")
    }
 
    return response.json()
  },
 
  async login(email: string, password: string): Promise<LoginResponse> {
    const payload: LoginPayload = {
      email,
      password,
      isSso: false,
    }
 
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
 
    if (!response.ok) {
      throw new Error("Invalid credentials")
    }
 
    const data = await response.json()
 
    if (!data.token) {
      throw new Error("Invalid credentials")
    }
 
    return data
  },
 
}