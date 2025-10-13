import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Download, Share, RefreshCw, CheckCircle, AlertTriangle, Info, ArrowRight, BarChart3, Network } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

interface Finding {
  id: string
  disease: string
  score: number
  confidence: number
  status: 'high' | 'medium' | 'low'
  description: string
  evidence: string[]
  marketSize: string
  timeline: string
}

const AnalysisResults: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { drug, areas, depth, agents, knowledgeChains, confidence } = location.state || {}
  
  const [activeTab, setActiveTab] = useState<'findings' | 'graph' | 'report'>('findings')
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null)

  const findings: Finding[] = [
    {
      id: '1',
      disease: "Parkinson's Disease",
      score: 92,
      confidence: 89,
      status: 'high',
      description: 'Strong evidence for neuroprotective effects through AMPK activation and mitochondrial biogenesis',
      evidence: [
        'AMPK activation improves mitochondrial function',
        'Reduces oxidative stress in dopaminergic neurons',
        'Clinical trials show cognitive improvement',
        'Patent landscape shows opportunity'
      ],
      marketSize: '$4.2B by 2030',
      timeline: '18-24 months to Phase II'
    },
    {
      id: '2',
      disease: 'Non-Small Cell Lung Cancer (NSCLC)',
      score: 85,
      confidence: 82,
      status: 'high',
      description: 'Anti-inflammatory properties show promise for cancer prevention and treatment',
      evidence: [
        'COX-2 inhibition reduces tumor growth',
        'Anti-angiogenic effects observed',
        'Synergistic with existing therapies',
        'Large unmet medical need'
      ],
      marketSize: '$12.8B by 2030',
      timeline: '24-30 months to Phase II'
    },
    {
      id: '3',
      disease: "Alzheimer's Disease",
      score: 72,
      confidence: 68,
      status: 'medium',
      description: 'Moderate evidence for cognitive benefits, but regulatory challenges exist',
      evidence: [
        'Improves insulin sensitivity in brain',
        'Reduces amyloid beta accumulation',
        'Limited clinical data available',
        'Competitive landscape crowded'
      ],
      marketSize: '$8.5B by 2030',
      timeline: '36-42 months to Phase II'
    },
    {
      id: '4',
      disease: 'Multiple Sclerosis',
      score: 68,
      confidence: 65,
      status: 'medium',
      description: 'Immune-modulating effects show potential, but requires more research',
      evidence: [
        'Reduces inflammatory cytokines',
        'Improves T-cell regulation',
        'Limited preclinical data',
        'High competition in space'
      ],
      marketSize: '$3.1B by 2030',
      timeline: '42-48 months to Phase II'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900'
      case 'low': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'high': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'medium': return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'low': return <Info className="w-5 h-5 text-red-500" />
      default: return <Info className="w-5 h-5 text-gray-500" />
    }
  }

  const handleNewAnalysis = () => {
    navigate('/analysis')
  }

  const handleDownloadReport = () => {
    // Simulate report download
    const reportData = {
      drug,
      areas,
      depth,
      findings,
      confidence,
      timestamp: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${drug}-analysis-report.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 dark:from-green-700 dark:via-blue-700 dark:to-purple-700">
        <div className="container-max py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="heading-xl text-white mb-6">
                Analysis Complete!
              </h1>
              <div className="flex items-center justify-center space-x-8 text-blue-100">
                <div className="text-center">
                  <div className="text-2xl font-bold">🎯</div>
                  <div className="text-sm">{drug} Repurposing Potential</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{Math.floor(confidence)}/100</div>
                  <div className="text-sm">Overall Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">📊</div>
                  <div className="text-sm">{findings.length} Opportunities</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Results Tabs */}
      <div className="section-padding bg-white dark:bg-gray-900">
        <div className="container-max">
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-12"
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                {[
                  { id: 'findings', label: 'Top Findings', icon: BarChart3 },
                  { id: 'graph', label: 'Knowledge Graph', icon: Network },
                  { id: 'report', label: 'Full Report', icon: Download }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {activeTab === 'findings' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Findings List */}
                  <div className="space-y-6">
                    {findings.map((finding, index) => (
                      <motion.div
                        key={finding.id}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={`card-hover cursor-pointer transition-all duration-200 ${
                          selectedFinding?.id === finding.id ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
                        }`}
                        onClick={() => setSelectedFinding(finding)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            {getStatusIcon(finding.status)}
                            <div className="ml-3">
                              <h3 className="font-semibold text-gray-900 dark:text-white">{finding.disease}</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                  {finding.score}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">/100</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(finding.status)}`}>
                                  {finding.status} potential
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                          {finding.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>Market: {finding.marketSize}</span>
                          <span>Timeline: {finding.timeline}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Finding Details */}
                  <div className="lg:sticky lg:top-8 lg:h-fit">
                    {selectedFinding ? (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="card-hover"
                      >
                        <h3 className="heading-md text-gray-900 dark:text-white mb-6">
                          {selectedFinding.disease} Analysis
                        </h3>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Evidence:</h4>
                            <ul className="space-y-2">
                              {selectedFinding.evidence.map((item, index) => (
                                <li key={index} className="flex items-start">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Market Size</div>
                              <div className="font-semibold text-gray-900 dark:text-white">{selectedFinding.marketSize}</div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Timeline</div>
                              <div className="font-semibold text-gray-900 dark:text-white">{selectedFinding.timeline}</div>
                            </div>
                          </div>

                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                            <div className="text-sm text-blue-800 dark:text-blue-200 mb-2">Confidence Score</div>
                            <div className="flex items-center">
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mr-2">
                                {selectedFinding.confidence}%
                              </div>
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="h-2 bg-blue-500 rounded-full"
                                  style={{ width: `${selectedFinding.confidence}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="card-hover text-center py-12">
                        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">
                          Select a finding to view detailed analysis
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'graph' && (
                <div className="text-center">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-12">
                    <Network className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                    <h3 className="heading-md text-gray-900 dark:text-white mb-4">
                      Interactive Knowledge Graph
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                      Visualize the connections between {drug} and various disease pathways, 
                      mechanisms, and therapeutic opportunities.
                    </p>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-8 border-2 border-dashed border-gray-300 dark:border-gray-600">
                      <p className="text-gray-500 dark:text-gray-400">
                        Interactive knowledge graph visualization would be implemented here
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                        This would show the real-time connections built by our AI agents
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'report' && (
                <div className="max-w-4xl mx-auto">
                  <div className="card-hover">
                    <h3 className="heading-md text-gray-900 dark:text-white mb-6">
                      Comprehensive Analysis Report
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                            {findings.length}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">Opportunities Found</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                            {Math.floor(confidence)}%
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">Overall Confidence</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                            {agents?.length || 11}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">AI Agents Used</div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Executive Summary</h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          Our comprehensive analysis of {drug} reveals significant repurposing potential across multiple 
                          therapeutic areas. The highest-scoring opportunity is {findings[0]?.disease} with a score of {findings[0]?.score}/100, 
                          followed by {findings[1]?.disease} at {findings[1]?.score}/100. The analysis leveraged our complete 
                          AI agent ecosystem to evaluate molecular mechanisms, market opportunities, patent landscape, 
                          and regulatory pathways.
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={handleDownloadReport}
                          className="btn-primary flex items-center"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Full Report
                        </button>
                        <button className="btn-secondary flex items-center">
                          <Share className="w-4 h-4 mr-2" />
                          Share Results
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleNewAnalysis}
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center group"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  New Analysis
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="btn-secondary text-lg px-8 py-4 flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Explore More Drugs
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisResults
