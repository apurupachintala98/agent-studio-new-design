import { API_CONFIG } from "../config/api-config"

export interface Provider {
  provider_id: string
  provider_name: string
}

export interface LLMModel {
  model_id: string
  model_name: string
}

export interface CreateAgentPayload {
  agent_name: string
  agent_description: string
  agent_instructions: {
    system: string
    orchestration: string
    response_structure: string
  }
  llm_config: {
    model_id: string
    model_name: string
    provider_name: string
    llm_auth: {
      base_url: string
      pat_token: string
    }
    llm_model_config: {
      temperature: number
      max_tokens: number
    }
  }
}

export interface CreateAgentResponse {
  agent_uuid: string
  message: string
}

export interface MemoryConfigPayload {
  short_term_memory_needed: boolean
  long_term_memory_needed: boolean
  long_term_memory_config: {
    semantic_user_profile: boolean
    episodic_user_experience: boolean
    procedural_user_instructions: boolean
    custom: boolean
  }
  db_host: string
  db_port: number
  db_username: string
  db_password: string
  db_name: string
  db_schema: string
}

export interface MemoryConfigResponse {
  connection_successful: boolean
  message: string
}

export interface MCPToolConfig {
  transport: string
  name: string
  description: string
  config: {
    url?: string
    config?: string
    command?: string
    args?: string // Changed from string[] to string
  }
}

export interface ToolsConfigPayload {
  mcp_tools: MCPToolConfig[]
}

export interface BackendConfigPayload {
    host: string

  port: number
}

export interface FrontendConfigPayload {
  port: number
}

export interface DefaultConfig {
  profile_config: {
    agent_instructions: {
      system: string
      orchestration: string
      response_structure: string
    }
    llm_config: {
      model_id: string
      model_name: string
      provider_name: string
      llm_auth: {
        base_url: string
        pat_token: string
      }
      llm_model_config: {
        temperature: number
        max_tokens: number
      }
    }
  }
  memory_config: {
    short_term_memory_needed: boolean
    long_term_memory_needed: boolean
    long_term_memory_config: {
      semantic_user_profile: boolean
      episodic_user_experience: boolean
      procedural_user_instructions: boolean
      custom: boolean
    }
    db_type: string
    db_host: string
    db_port: number
    db_username: string
    db_password: string
    db_name: string
    db_schema: string
  }
  tool_config: {
    transport: string
    name: string
    description: string
    config: {
      command?: string
      args?: string
    }
  }
  backend_config: {
    host: string
    port: number
  }
  frontend_config: {
    port: number
  }
}

export const langgraphApi = {
  // Get all providers
  async getProviders(): Promise<Provider[]> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/lsa/providers`)

    if (!response.ok) {
      throw new Error("Failed to fetch providers")
    }

    return response.json()
  },

  // Get LLMs for a specific provider
  async getLLMs(providerId: string): Promise<LLMModel[]> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/lsa/providers/${providerId}/llms`)

    if (!response.ok) {
      throw new Error("Failed to fetch LLMs")
    }

    return response.json()
  },

  // Create a new agent
  async createAgent(payload: CreateAgentPayload): Promise<CreateAgentResponse> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/lsa/agent/create`, {
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

  // Configure memory
  async configureMemory(agentUuid: string, payload: MemoryConfigPayload): Promise<MemoryConfigResponse> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/lsa/agent/${agentUuid}/memory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error("Failed to configure memory")
    }

    return response.json()
  },

  // Upload custom tool file
  async uploadToolFile(agentUuid: string, file: File): Promise<any> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch(`${API_CONFIG.BASE_URL}/api/lsa/agent/${agentUuid}/tools/upload`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload tool file")
    }

    return response.json()
  },

  // Configure tools
  async configureTools(agentUuid: string, payload: ToolsConfigPayload): Promise<any> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/lsa/agent/${agentUuid}/tools`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error("Failed to configure tools")
    }

    return response.json()
  },

  // Configure backend
  async configureBackend(agentUuid: string, payload: BackendConfigPayload): Promise<any> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/lsa/agent/${agentUuid}/backend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error("Failed to configure backend")
    }

    return response.json()
  },

  // Configure frontend
  async configureFrontend(agentUuid: string, payload: FrontendConfigPayload): Promise<any> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/lsa/agent/${agentUuid}/frontend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error("Failed to configure frontend")
    }

    return response.json()
  },

  // Download agent
  async downloadAgent(agentUuid: string): Promise<Blob> {
    const url = `${API_CONFIG.BASE_URL}/api/lsa/agent/${agentUuid}/download`

    const response = await fetch(url)


    if (!response.ok) {
      const errorText = await response.text()
      throw new Error("Failed to download agent")
    }

    const blob = await response.blob()
    return blob
  },

   // Deploy agent
   async deployAgent(agentUuid: string): Promise<any> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/lsa/agent/${agentUuid}/deploy`)

    if (!response.ok) {
      throw new Error("Failed to deploy agent")
    }

    return response.json()
  },

   // Get MCP servers by scopes
  async getMcpServersByScopes(scopes: string[]): Promise<any> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/common/mcp-servers/by-scopes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scopes }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch MCP servers by scopes")
    }

    return response.json()
  },

   async getDefaultConfig(): Promise<DefaultConfig> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/lsa/default_inputs`)

    if (!response.ok) {
      throw new Error("Failed to fetch config values")
    }

    return response.json()
  },
}

