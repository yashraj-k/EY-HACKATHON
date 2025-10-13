import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, CheckCircle, Clock, AlertCircle, Brain, Zap, Target, ArrowRight } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

interface Agent {
  id: string
  name: string
  emoji: string
  status: 'queued' | 'active' | 'done' | 'error'
  progress: number
  description: string
}

interface KnowledgeChain {
  id: string
  step: string
  confidence: number
  timestamp: number
}

const AgentsInAction: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { drug, areas, depth } = location.state || {}
  
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentPhase, setCurrentPhase] = useState(1)
  const [overallConfidence, setOverallConfidence] = useState(65)
  const [knowledgeChains, setKnowledgeChains] = useState<KnowledgeChain[]>([])
  const [agents, setAgents] = useState<Agent[]>([
    { id: 'profiler', name: 'Molecule Profiler', emoji: '🧠', status: 'done', progress: 100, description: 'Analyzing molecular structure and mechanisms' },
    { id: 'chain', name: 'Knowledge Chain', emoji: '🔗', status: 'active', progress: 75, description: 'Building connections between pathways' },
    { id: 'disease', name: 'Disease Landscape', emoji: '💊', status: 'done', progress: 100, description: 'Mapping disease mechanisms' },
    { id: 'patent', name: 'Patent Intelligence', emoji: '📜', status: 'queued', progress: 0, description: 'Checking patent landscape' },
    { id: 'clinical', name: 'Clinical Strategist', emoji: '🧪', status: 'active', progress: 60, description: 'Designing trial protocols' },
    { id: 'market', name: 'Market Opportunity', emoji: '💰', status: 'queued', progress: 0, description: 'Calculating market potential' },
    { id: 'evidence', name: 'Scientific Evidence', emoji: '🔬', status: 'queued', progress: 0, description: 'Gathering research data' },
    { id: 'regulatory', name: 'Regulatory Pathway', emoji: '📋', status: 'queued', progress: 0, description: 'Mapping approval routes' },
    { id: 'validator', name: 'Hypothesis Validator', emoji: '✅', status: 'queued', progress: 0, description: 'Validating findings' },
    { id: 'synthesis', name: 'Report Synthesis', emoji: '📊', status: 'queued', progress: 0, description: 'Compiling final report' },
    { id: 'master', name: 'Master Agent', emoji: '🎯', status: 'queued', progress: 0, description: 'Coordinating all agents' }
  ])

  // Simulate real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1)
      
      // Update confidence
      setOverallConfidence(prev => Math.min(95, prev + Math.random() * 2))
      
      // Add knowledge chain updates
      if (Math.random() > 0.7) {
        const newChain: KnowledgeChain = {
          id: Date.now().toString(),
          step: generateKnowledgeStep(),
          confidence: Math.floor(Math.random() * 20) + 70,
          timestamp: Date.now()
        }
        setKnowledgeChains(prev => [...prev.slice(-2), newChain])
      }
      
      // Update agent statuses
      setAgents(prev => prev.map(agent => {
        if (agent.status === 'active' && agent.progress < 100) {
          const newProgress = Math.min(100, agent.progress + Math.random() * 5)
          return {
            ...agent,
            progress: newProgress,
            status: newProgress >= 100 ? 'done' : 'active'
          }
        } else if (agent.status === 'queued' && Math.random() > 0.8) {
          return { ...agent, status: 'active' }
        }
        return agent
      }))
      
      // Update phase
      const doneAgents = agents.filter(a => a.status === 'done').length
      if (doneAgents >= 3 && currentPhase === 1) setCurrentPhase(2)
      if (doneAgents >= 7 && currentPhase === 2) setCurrentPhase(3)
      
    }, 1000)

    return () => clearInterval(timer)
  }, [agents, currentPhase])

  const generateKnowledgeStep = () => {
    const steps = [
      `${drug} → AMPK activation → Mitochondrial biogenesis → Neuroprotection → Parkinson's`,
      `${drug} → Anti-inflammatory → COX inhibition → Cancer prevention → NSCLC`,
      `${drug} → Metabolic regulation → Insulin sensitivity → Cognitive function → Alzheimer's`,
      `${drug} → Vascular protection → Endothelial function → Cardiovascular benefits → Heart disease`,
      `${drug} → Immune modulation → T-cell regulation → Autoimmune suppression → MS`
    ]
    return steps[Math.floor(Math.random() * steps.length)]
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'active': return <Clock className="w-4 h-4 text-blue-500 animate-spin" />
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />
      default: return <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'text-green-600 dark:text-green-400'
      case 'active': return 'text-blue-600 dark:text-blue-400'
      case 'error': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-500 dark:text-gray-400'
    }
  }

  const handleViewResults = () => {
    navigate('/analysis/results', {
      state: { drug, areas, depth, agents, knowledgeChains, confidence: overallConfidence }
    })
  }

  const isAnalysisComplete = agents.every(agent => agent.status === 'done')

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-700 dark:via-purple-700 dark:to-blue-900">
        <div className="container-max py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="heading-xl text-white mb-6">
                AI Agents in Action
              </h1>
              <div className="flex items-center justify-center space-x-8 text-blue-100">
                <div className="text-center">
                  <div className="text-2xl font-bold">🎯</div>
                  <div className="text-sm">Analyzing: {drug}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">⏱️</div>
                  <div className="text-sm">Elapsed: {formatTime(elapsedTime)}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">📊</div>
                  <div className="text-sm">Phase: {currentPhase}/3 Validation</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Agent Status Grid */}
      <div className="section-padding bg-white dark:bg-gray-900">
        <div className="container-max">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="heading-lg text-gray-900 dark:text-white mb-8 text-center">
                Agent Status Dashboard
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card-hover group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{agent.emoji}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{agent.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{agent.description}</p>
                        </div>
                      </div>
                      {getStatusIcon(agent.status)}
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-sm">
                        <span className={getStatusColor(agent.status)}>
                          {agent.status === 'done' ? 'Done' : 
                           agent.status === 'active' ? 'Active' : 
                           agent.status === 'error' ? 'Error' : 'Queued'}
                        </span>
                        <span className="text-gray-600 dark:text-gray-300">{agent.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${
                            agent.status === 'done' ? 'bg-green-500' :
                            agent.status === 'active' ? 'bg-blue-500' :
                            agent.status === 'error' ? 'bg-red-500' : 'bg-gray-400'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${agent.progress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Knowledge Chain Building */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <h3 className="heading-md text-gray-900 dark:text-white mb-6 text-center">
                🎪 Live Knowledge Chain Building...
              </h3>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                <AnimatePresence>
                  {knowledgeChains.map((chain, index) => (
                    <motion.div
                      key={chain.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5 }}
                      className="mb-4 last:mb-0"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                            {chain.step}
                          </p>
                        </div>
                        <div className="ml-4 text-right">
                          <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                            {chain.confidence}%
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(chain.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Overall Confidence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mb-12"
            >
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
                <h3 className="heading-md text-gray-900 dark:text-white mb-4">
                  Overall Confidence Score
                </h3>
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {Math.floor(overallConfidence)}%
                  </div>
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <ArrowRight className="w-6 h-6" />
                    <span className="ml-1 font-medium">Rising</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-4">
                  <motion.div
                    className="h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${overallConfidence}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center"
            >
              {isAnalysisComplete ? (
                <button
                  onClick={handleViewResults}
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center mx-auto group"
                >
                  View Detailed Results
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <div className="text-gray-600 dark:text-gray-300">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 mr-2 animate-spin" />
                    <span>Analysis in progress...</span>
                  </div>
                  <p className="text-sm">
                    Estimated completion: {Math.max(0, 5 - Math.floor(elapsedTime / 60))} minutes
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentsInAction
