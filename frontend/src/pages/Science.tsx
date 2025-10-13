import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Dna, Globe, Calculator, Atom, Shield, ArrowRight } from 'lucide-react'

const Science: React.FC = () => {
  const domains = [
    {
      title: 'AI for biology',
      icon: Dna,
      color: 'blue',
      projects: ['Molecule Profiler', 'Disease Landscape', 'Target Discovery', 'Mechanism Analysis']
    },
    {
      title: 'AI for clinical research',
      icon: Globe,
      color: 'purple',
      projects: ['Trial Optimization', 'Patient Stratification', 'Outcome Prediction', 'Safety Analysis']
    },
    {
      title: 'AI for mathematics and computer science',
      icon: Calculator,
      color: 'green',
      projects: ['Algorithm Optimization', 'Data Analysis', 'Pattern Recognition', 'Predictive Modeling']
    },
    {
      title: 'AI for chemistry and pharmacology',
      icon: Atom,
      color: 'orange',
      projects: ['Molecular Design', 'Drug-Target Interaction', 'ADMET Prediction', 'Synthesis Planning']
    },
    {
      title: 'AI transparency',
      icon: Shield,
      color: 'indigo',
      projects: ['Explainable AI', 'Bias Detection', 'Model Validation', 'Ethical Guidelines']
    }
  ]

  const breakthroughs = [
    {
      title: 'AlphaDrug: AI for better understanding drug mechanisms',
      domain: 'biology',
      impact: 'high',
      date: 'June 2024',
      description: 'Revolutionary AI system for comprehensive drug mechanism analysis'
    },
    {
      title: 'PharmaSynth On-Device brings AI to local laboratory devices',
      domain: 'clinical',
      impact: 'high',
      date: 'June 2024',
      description: 'Edge AI deployment for real-time laboratory analysis'
    },
    {
      title: 'Advanced version of PharmaSynth officially achieves gold-medal standard at International Drug Discovery Contest',
      domain: 'mathematics',
      impact: 'high',
      date: 'July 2024',
      description: 'Superior performance in competitive drug discovery challenges'
    },
    {
      title: 'AlphaEarth Foundations helps map molecular interactions in unprecedented detail',
      domain: 'chemistry',
      impact: 'medium',
      date: 'July 2024',
      description: 'Advanced molecular mapping and interaction analysis'
    }
  ]

  const getDomainColor = (domain: string) => {
    switch (domain) {
      case 'biology': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900'
      case 'clinical': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900'
      case 'mathematics': return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900'
      case 'chemistry': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900'
      case 'low': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800'
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
                Unlocking a new era of discovery with AI
              </h1>
              <p className="text-large text-gray-600 dark:text-gray-300 flex items-center justify-center">
                Explore science <ChevronRight className="w-5 h-5 ml-2" />
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Science Domains */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.map((domain, index) => (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-hover group"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
                  domain.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                  domain.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                  domain.color === 'green' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                  domain.color === 'orange' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                  'bg-gradient-to-r from-indigo-500 to-indigo-600'
                }`}>
                  <domain.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="heading-md text-gray-900 dark:text-white mb-4">{domain.title}</h3>
                <div className="space-y-2">
                  {domain.projects.map((project) => (
                    <div key={project} className="text-sm text-gray-600 dark:text-gray-300">{project}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Breakthroughs */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-max">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-lg text-gray-900 dark:text-white mb-6">
                Science
              </h2>
              <p className="text-large text-gray-600 dark:text-gray-300 flex items-center justify-center">
                View news <ChevronRight className="w-5 h-5 ml-2" />
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {breakthroughs.map((breakthrough, index) => (
              <motion.div
                key={breakthrough.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-hover group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDomainColor(breakthrough.domain)}`}>
                    {breakthrough.domain}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(breakthrough.impact)}`}>
                      {breakthrough.impact} impact
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{breakthrough.date}</span>
                  </div>
                </div>
                <h3 className="heading-md text-gray-900 dark:text-white mb-3">{breakthrough.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{breakthrough.description}</p>
                <button className="btn-ghost group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center">
                  Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
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

export default Science