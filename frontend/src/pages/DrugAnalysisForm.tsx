import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Play, ArrowLeft, Brain, Target, Zap, Clock, CheckCircle } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'

interface DrugOption {
  name: string
  description: string
  category: string
}

const DrugAnalysisForm: React.FC = () => {
  const { analysisType } = useParams<{ analysisType: string }>()
  const navigate = useNavigate()
  const [selectedDrug, setSelectedDrug] = useState<string>('')
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [analysisDepth, setAnalysisDepth] = useState<string>('comprehensive')

  const drugOptions: DrugOption[] = [
    { name: 'Metformin', description: 'Type 2 diabetes medication', category: 'Diabetes' },
    { name: 'Aspirin', description: 'NSAID pain reliever', category: 'Pain Relief' },
    { name: 'Statins', description: 'Cholesterol-lowering drugs', category: 'Cardiology' },
    { name: 'Beta-blockers', description: 'Heart medication', category: 'Cardiology' },
    { name: 'ACE Inhibitors', description: 'Blood pressure medication', category: 'Cardiology' },
    { name: 'SSRIs', description: 'Antidepressant medication', category: 'Psychiatry' },
    { name: 'Custom Drug', description: 'Enter your own drug name', category: 'Custom' }
  ]

  const focusAreas = [
    'Oncology', 'Neurology', 'Cardiology', 'Rare Diseases', 'Autoimmune', 'All Areas'
  ]

  const analysisDepths = [
    { id: 'quick', name: 'Quick Scan', duration: '2-3 min', description: 'Basic analysis with key insights' },
    { id: 'comprehensive', name: 'Comprehensive', duration: '5-7 min', description: 'Detailed analysis with full agent network' },
    { id: 'deep', name: 'Deep Research', duration: '10+ min', description: 'Exhaustive analysis with extensive research' }
  ]

  const getAnalysisTitle = () => {
    switch (analysisType) {
      case 'drug-repurposing': return 'Drug Repurposing Analysis'
      case 'market-gap': return 'Market Gap Analysis'
      case 'competitive-intel': return 'Competitive Intelligence Analysis'
      case 'clinical-optimization': return 'Clinical Trial Optimization'
      default: return 'Analysis Configuration'
    }
  }

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

  const handleDrugChange = (drugName: string) => {
    if (drugName === 'Custom Drug') {
      navigate('/analysis/custom-drug', {
        state: {
          analysisType: analysisType,
          selectedAreas: selectedAreas,
          analysisDepth: analysisDepth
        }
      })
    } else {
      setSelectedDrug(drugName)
    }
  }

  const handleLaunchAnalysis = () => {
    if (selectedDrug && selectedAreas.length > 0) {
      navigate(`/analysis/${analysisType}/running`, {
        state: {
          drug: selectedDrug,
          areas: selectedAreas,
          depth: analysisDepth
        }
      })
    }
  }

  const isFormValid = selectedDrug && selectedAreas.length > 0

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
              <button
                onClick={() => navigate('/analysis')}
                className="flex items-center text-blue-100 hover:text-white transition-colors mb-6 mx-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Analysis Types
              </button>
              <h1 className="heading-xl text-white mb-6">
                {getAnalysisTitle()}
              </h1>
              <p className="text-large text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Configure your analysis parameters and launch our AI agents
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Analysis Configuration */}
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            {/* Drug Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🎯 Analyze: 
                <select
                  value={selectedDrug}
                  onChange={(e) => handleDrugChange(e.target.value)}
                  className="ml-3 px-3 py-2 text-lg rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a drug...</option>
                  {drugOptions.map((drug) => (
                    <option key={drug.name} value={drug.name}>
                      {drug.name} - {drug.description}
                    </option>
                  ))}
                </select>
              </h2>
              
              {selectedDrug && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    <strong>{selectedDrug}</strong> selected for analysis
                  </p>
                </div>
              )}
            </motion.div>

            {/* Focus Areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🔍 Focus Areas:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {focusAreas.map((area) => (
                  <button
                    key={area}
                    onClick={() => handleAreaToggle(area)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-left text-sm ${
                      selectedAreas.includes(area)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded border-2 mr-2 flex items-center justify-center ${
                        selectedAreas.includes(area)
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {selectedAreas.includes(area) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="font-medium">{area}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Analysis Depth */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                📊 Analysis Depth:
              </h3>
              <div className="space-y-3">
                {analysisDepths.map((depth) => (
                  <label
                    key={depth.id}
                    className={`block p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      analysisDepth === depth.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="analysisDepth"
                        value={depth.id}
                        checked={analysisDepth === depth.id}
                        onChange={(e) => setAnalysisDepth(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div className="ml-3">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900 dark:text-white text-sm">
                            {depth.name}
                          </span>
                          <span className="ml-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                            {depth.duration}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          {depth.description}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
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
                onClick={handleLaunchAnalysis}
                disabled={!isFormValid}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center mx-auto group ${
                  isFormValid
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                <Play className="w-4 h-4 mr-2" />
                Launch AI Agents
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              {!isFormValid && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  Please select a drug and at least one focus area to continue
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              What happens next?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our 11 AI agents will work together to analyze your request
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Agent Activation',
                description: 'All 11 specialized agents activate and begin their analysis',
                icon: Brain,
                color: 'blue'
              },
              {
                step: '2',
                title: 'Real-time Processing',
                description: 'Watch agents collaborate and build knowledge chains',
                icon: Zap,
                color: 'purple'
              },
              {
                step: '3',
                title: 'Results Delivery',
                description: 'Get comprehensive results with interactive visualizations',
                icon: Target,
                color: 'green'
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg ${
                  item.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                  item.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                  'bg-gradient-to-r from-green-500 to-green-600'
                }`}>
                  <span className="text-white font-bold text-sm">{item.step}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrugAnalysisForm
