import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Reference from './pages/Reference'
import CortexAgent from './pages/CortexAgent'
import LangraphAgent from './pages/LangraphAgent'
import Chat from './components/Chat'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reference" element={<Reference />} />
        <Route path="/cortex-agent/:agentId" element={<CortexAgent />} />
        <Route path="/langraph-agent" element={<LangraphAgent />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
