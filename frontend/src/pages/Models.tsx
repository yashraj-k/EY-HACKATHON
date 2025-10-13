import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Brain, Zap, Target, Shield, Play, Download, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Models: React.FC = () => {
  const models = [
    {
      id: 'analysis-engine',
      name: 'Analysis Engine',
      description: 'Our most intelligent AI models for comprehensive drug analysis',
      category: 'analysis',
      capabilities: ['Molecule Profiler', 'Disease Landscape', 'Knowledge Chain', 'Patent Intelligence'],
      status: 'available',
      icon: Brain,
      color: 'blue',
      buttonText: 'Launch Live Demo',
      quickDemos: [
        { label: '🔍 Try Metformin Analysis', link: '/analysis/drug-repurposing', state: { drug: 'Metformin', areas: ['Neurology'], depth: 'quick' } },
        { label: '💊 Test with Aspirin', link: '/analysis/drug-repurposing', state: { drug: 'Aspirin', areas: ['Oncology'], depth: 'quick' } },
        { label: '🧬 Custom Drug Input', link: '/analysis', state: {} }
      ]
    },
    {
      id: 'prediction-models',
      name: 'Prediction Models',
      description: 'Lightweight, state-of-the-art models for market and clinical predictions',
      category: 'prediction',
      capabilities: ['Market Opportunity', 'Clinical Trial Strategist', 'Scientific Evidence', 'Regulatory Pathway'],
      status: 'available',
      icon: Zap,
      color: 'purple',
      buttonText: 'View Live Predictions',
      quickDemos: [
        { label: '📈 Market Opportunity', link: '/analysis/market-gap', state: { drug: 'Custom', areas: ['Oncology'], depth: 'comprehensive' } },
        { label: '🧪 Trial Success Rates', link: '/analysis/clinical-optimization', state: { drug: 'Custom', areas: ['All Areas'], depth: 'comprehensive' } },
        { label: '📜 Regulatory Pathways', link: '/analysis/competitive-intel', state: { drug: 'Custom', areas: ['All Areas'], depth: 'comprehensive' } }
      ]
    },
    {
      id: 'optimization-tools',
      name: 'Optimization Tools',
      description: 'Advanced tools for hypothesis validation and report synthesis',
      category: 'optimization',
      capabilities: ['Hypothesis Validator', 'Report Synthesis', 'Master Agent', 'Quality Assurance'],
      status: 'beta',
      icon: Target,
      color: 'green',
      buttonText: 'Try Optimization Tools',
      quickDemos: [
        { label: '✅ Validate Hypothesis', link: '/analysis', state: {} },
        { label: '📊 Generate Reports', link: '/analysis', state: {} },
        { label: '🎯 Master Agent', link: '/analysis', state: {} }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900'
      case 'beta': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900'
      case 'coming-soon': return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800'
    }
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
      case 'purple': return 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
      case 'green': return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section - DeepMind Style */}
      <section className="section-padding bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container-max">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="heading-xl text-gray-900 dark:text-white mb-8">
                Build with our next generation{' '}
                <span className="gradient-text">AI systems</span>
              </h1>
              <p className="text-large text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Explore our comprehensive suite of AI models designed for drug discovery and pharmaceutical innovation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Models Grid */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-max">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-lg text-gray-900 dark:text-white mb-6">
                Build with our next generation AI systems
              </h2>
              <p className="text-large text-gray-600 dark:text-gray-300 flex items-center justify-center">
                Explore models <ChevronRight className="w-5 h-5 ml-2" />
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {models.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-hover group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-4 shadow-lg ${
                      model.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                      model.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                      'bg-gradient-to-r from-green-500 to-green-600'
                    }`}>
                      <model.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="heading-md text-gray-900 dark:text-white">{model.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(model.status)}`}>
                        {model.status}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{model.description}</p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Capabilities:</h4>
                  <div className="space-y-2">
                    {model.capabilities.map((capability) => (
                      <div key={capability} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-3 ${
                          model.color === 'blue' ? 'bg-blue-500' :
                          model.color === 'purple' ? 'bg-purple-500' :
                          'bg-green-500'
                        }`}></div>
                        {capability}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link to="/analysis" className="btn-primary flex-1 flex items-center justify-center group">
                    {model.buttonText}
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button className="btn-secondary">
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Demo Options */}
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Quick Demos:</p>
                  <div className="flex flex-wrap gap-2">
                    {model.quickDemos.map((demo, demoIndex) => (
                      <Link 
                        key={demoIndex}
                        to={demo.link} 
                        state={demo.state}
                        className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        {demo.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Model Ecosystem */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-gray-900 dark:text-white mb-6">
              Model ecosystem
            </h2>
            <p className="text-large text-gray-600 dark:text-gray-300">
              Models and experiments built with our core AI systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'PharmaSynth Robotics', description: 'AI agents for laboratory automation' },
              { name: 'Project Astra', description: 'Advanced drug-target interaction analysis' },
              { name: 'Project Mariner', description: 'Clinical trial optimization platform' },
              { name: 'PharmaSynth Diffusion', description: 'Molecular structure generation' }
            ].map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-hover group"
              >
                <h3 className="heading-md text-gray-900 dark:text-white mb-2">{project.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Start Building */}
      <section className="section-padding bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-700 dark:via-purple-700 dark:to-blue-900">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-lg text-white mb-6">
              Start building
            </h2>
            <p className="text-large text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Begin your journey with our AI-powered drug discovery platform and unlock the future of pharmaceutical innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group">
                View Models
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center">
                Try Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Models