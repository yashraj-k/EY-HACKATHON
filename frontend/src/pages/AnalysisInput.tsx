import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Play, Brain, Target, Shield, Zap, ArrowRight, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface AnalysisType {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  color: string
}

const AnalysisInput: React.FC = () => {
  const [selectedAnalysis, setSelectedAnalysis] = useState<string>('')

  const analysisTypes: AnalysisType[] = [
    {
      id: 'drug-repurposing',
      name: 'Drug Repurposing Opportunities',
      description: 'Find new uses for existing drugs',
      icon: Brain,
      color: 'blue'
    },
    {
      id: 'market-gap',
      name: 'Market Gap Analysis',
      description: 'Identify underserved therapeutic areas',
      icon: Target,
      color: 'purple'
    },
    {
      id: 'competitive-intel',
      name: 'Competitive Intelligence',
      description: 'Analyze competitor pipelines & patents',
      icon: Shield,
      color: 'green'
    },
    {
      id: 'clinical-optimization',
      name: 'Clinical Trial Optimization',
      description: 'Optimize trial design and endpoints',
      icon: Zap,
      color: 'orange'
    }
  ]

  const handleAnalysisSelect = (id: string) => {
    setSelectedAnalysis(id)
  }

  const handleStartAnalysis = () => {
    if (selectedAnalysis) {
      // Navigate to drug analysis form
      window.location.href = `/analysis/${selectedAnalysis}`
    }
  }

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
                🧠 PharmaSynth-X Analysis
              </h1>
              <p className="text-large text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Choose your analysis type and let our 11 AI agents work together to provide comprehensive insights
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Analysis Selection */}
      <div className="section-padding bg-white dark:bg-gray-900">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="heading-lg text-gray-900 dark:text-white mb-4">
                🎯 What would you like to analyze?
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Select an analysis type to get started
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {analysisTypes.map((analysis, index) => (
                <motion.div
                  key={analysis.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    selectedAnalysis === analysis.id 
                      ? 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => handleAnalysisSelect(analysis.id)}
                >
                  <div className="card-hover group p-6">
                    {/* Selection Indicator */}
                    <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      selectedAnalysis === analysis.id
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {selectedAnalysis === analysis.id && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${
                      analysis.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                      analysis.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                      analysis.color === 'green' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      'bg-gradient-to-r from-orange-500 to-orange-600'
                    }`}>
                      <analysis.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="heading-md text-gray-900 dark:text-white mb-2">
                      {analysis.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {analysis.description}
                    </p>

                    {/* Arrow */}
                    <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Start Analysis Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <button
                onClick={handleStartAnalysis}
                disabled={!selectedAnalysis}
                className={`px-12 py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center mx-auto group ${
                  selectedAnalysis
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                <Play className="w-5 h-5 mr-2" />
                Start Analysis
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              {!selectedAnalysis && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  Please select an analysis type to continue
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-gray-900 dark:text-white mb-6">
              Powered by 11 Specialized AI Agents
            </h2>
            <p className="text-large text-gray-600 dark:text-gray-300">
              Each analysis leverages our complete AI ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Real-time Analysis',
                description: 'Watch as our AI agents work together in real-time',
                icon: Clock,
                color: 'blue'
              },
              {
                title: 'Comprehensive Results',
                description: 'Get detailed insights from multiple perspectives',
                icon: Brain,
                color: 'purple'
              },
              {
                title: 'Interactive Reports',
                description: 'Explore results with interactive visualizations',
                icon: Target,
                color: 'green'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg ${
                  feature.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                  feature.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                  'bg-gradient-to-r from-green-500 to-green-600'
                }`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="heading-md text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisInput
