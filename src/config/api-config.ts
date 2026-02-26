const hostname = window.location.hostname.toLowerCase()
 
let BASE_URL = ""
 
if (hostname === "localhost" || hostname === "127.0.0.1") {
  BASE_URL = "http://10.188.220.91:8000"
 
} else if (hostname.includes(".sit.")) {
  BASE_URL = "https://agentbuilder-be.edl.sit.awsdns.internal.das"
 
} else if (hostname.includes(".uat.")) {
  BASE_URL = "https://agentbuilder-be.edl.uat.awsdns.internal.das"
 
} else if (hostname.includes(".prod.")) {
  BASE_URL = "https://agentbuilder-be.edl.prod.awsdns.internal.das"
 
} else if (hostname.includes(".dev.")) {
  BASE_URL = "https://agentbuilder-be.edl.dev.awsdns.internal.das"
 
} else {
  console.warn("Unknown environment, hostname:", hostname)
  BASE_URL = "https://agentbuilder-be.edl.dev.awsdns.internal.das"
}
 
export const API_CONFIG = { BASE_URL }


 
let AGENT_BASE_URL = ""
 
if (hostname === "localhost" || hostname === "127.0.0.1") {
  AGENT_BASE_URL = "https://aedl-devops.edl.dev.awsdns.internal.das/tekton"
 
} else if (hostname.includes(".sit.")) {
  AGENT_BASE_URL = "https://aedl-devops.edl.sit.awsdns.internal.das/tekton"
 
} else if (hostname.includes(".uat.")) {
  AGENT_BASE_URL = "https://aedl-devops.edl.uat.awsdns.internal.das/tekton"
 
} else if (hostname.includes(".prod.")) {
  AGENT_BASE_URL = "https://aedl-devops.edl.prod.awsdns.internal.das/tekton"
 
} else if (hostname.includes(".dev.")) {
  AGENT_BASE_URL = "https://aedl-devops.edl.dev.awsdns.internal.das/tekton"
 
} else {
  console.warn("Unknown environment, hostname:", hostname)
  AGENT_BASE_URL = "https://aedl-devops.edl.dev.awsdns.internal.das/tekton"
}
 
export const AGENT_API_CONFIG = { AGENT_BASE_URL }