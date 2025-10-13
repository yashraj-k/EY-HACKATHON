import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, Brain, Target, BarChart3 } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const CustomDrugInput: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [customDrug, setCustomDrug] = useState<string>('')
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [analysisDepth, setAnalysisDepth] = useState<string>('comprehensive')
  const [isTyping, setIsTyping] = useState<boolean>(false)

  // Get state from previous page
  const { analysisType, selectedAreas: prevAreas, analysisDepth: prevDepth } = location.state || {}

  useEffect(() => {
    if (prevAreas) setSelectedAreas(prevAreas)
    if (prevDepth) setAnalysisDepth(prevDepth)
  }, [prevAreas, prevDepth])

  const focusAreas = [
    'Oncology', 'Neurology', 'Cardiology', 'Rare Diseases', 'Autoimmune', 'All Areas'
  ]

  const analysisDepths = [
    { id: 'quick', name: 'Quick Scan', duration: '2-3 min', description: 'Basic analysis with key insights' },
    { id: 'comprehensive', name: 'Comprehensive', duration: '5-7 min', description: 'Detailed analysis with full agent network' },
    { id: 'deep', name: 'Deep Research', duration: '10+ min', description: 'Exhaustive analysis with extensive research' }
  ]

  const handleAreaToggle = (area: string) => {
    if (area === 'All Areas') {
      setSelectedAreas(['All Areas'])
    } else {
      setSelectedAreas(prev => {
        const filtered = prev.filter(a => a !== 'All Areas')
        if (filtered.includes(area)) {
          return filtered.filter(a => a !== area)
        } else {
          return [...filtered, area]
        }
      })
    }
  }

  const handleSubmit = () => {
    if (customDrug.trim() && selectedAreas.length > 0) {
      navigate(`/analysis/${analysisType}/running`, {
        state: {
          drug: customDrug.trim(),
          areas: selectedAreas,
          depth: analysisDepth,
          isCustom: true
        }
      })
    }
  }

  const isFormValid = customDrug.trim() && selectedAreas.length > 0

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-max py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Custom Drug Analysis
            </h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-8">
        <div className="max-w-4xl mx-auto">
          {/* Drug Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-blue-500" />
                Enter Drug Name
              </h2>
              <div className="relative">
                <textarea
                  value={customDrug}
                  onChange={(e) => {
                    setCustomDrug(e.target.value)
                    setIsTyping(true)
                    setTimeout(() => setIsTyping(false), 1000)
                  }}
                  placeholder="Type the name of the drug you want to analyze..."
                  className="w-full h-24 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-3 right-3"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  </motion.div>
                )}
              </div>
              {customDrug.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                >
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    <strong>{customDrug.trim()}</strong> will be analyzed
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Focus Areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-500" />
                Focus Areas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {focusAreas.map((area) => (
                  <button
                    key={area}
                    onClick={() => handleAreaToggle(area)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-left text-sm ${
                      selectedAreas.includes(area)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded border-2 mr-3 ${
                        selectedAreas.includes(area)
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {selectedAreas.includes(area) && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      {area}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Analysis Depth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-purple-500" />
                Analysis Depth
              </h3>
              <div className="space-y-3">
                {analysisDepths.map((depth) => (
                  <button
                    key={depth.id}
                    onClick={() => setAnalysisDepth(depth.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      analysisDepth === depth.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          analysisDepth === depth.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {analysisDepth === depth.id && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{depth.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{depth.description}</div>
                        </div>
                      </div>
                      <div className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300">
                        {depth.duration}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Launch Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center mx-auto ${
                isFormValid
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5 mr-2" />
              Launch AI Agents
            </button>
            
            {!isFormValid && (
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
                Please enter a drug name and select at least one focus area to continue
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CustomDrugInput
