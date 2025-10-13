import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Play, Brain, Zap, Target, Shield, ArrowRight } from 'lucide-react'
import HorizontalScrollButtons from '../components/common/HorizontalScrollButtons'

const Home: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320, // Width of one card + gap
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320, // Width of one card + gap
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen">
            {/* Hero Section - Full Screen Image Background */}
            <section className="relative h-screen overflow-hidden">
              {/* Full Screen Image Background */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src="/Assets/BuildwithournextgenerationAIsystems.png"
                  alt="Build with our next generation AI systems"
                  className="w-full h-full object-cover"
                />
                
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
                
                {/* Gradient Overlay for Better Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>
              </div>

        {/* Content Overlay - Spread across whole screen */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container-max w-full">
            <div className="max-w-6xl mx-auto text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                  Build with our next generation{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    AI systems
                  </span>
                </h1>
                <p className="text-2xl md:text-3xl lg:text-4xl text-gray-200 max-w-5xl mx-auto leading-relaxed">
                  Revolutionary AI platform for comprehensive drug discovery analysis, 
                  combining 11 specialized agents to accelerate pharmaceutical innovation and unlock new possibilities in medicine.
                </p>
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-xl font-semibold text-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center group">
                    Explore Models
                    <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-12 py-6 rounded-xl font-semibold text-xl transition-all duration-200 flex items-center group">
                    <Play className="w-6 h-6 mr-2" />
                    Watch Demo
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Simple Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </motion.div>
        </div>
      </section>

      {/* Models Section - DeepMind Style */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Analysis Engine */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card-hover group"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="heading-md text-gray-900 dark:text-white">Analysis Engine</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Our most intelligent AI models</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Comprehensive drug analysis powered by advanced AI models for molecular profiling and disease landscape mapping.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Molecule Profiler
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Disease Landscape
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Knowledge Chain
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Patent Intelligence
                </div>
              </div>
              <button className="btn-ghost group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center">
                Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Prediction Models */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card-hover group"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="heading-md text-gray-900 dark:text-white">Prediction Models</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Lightweight, state-of-the-art models</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Advanced prediction models for market analysis, clinical trial optimization, and regulatory pathway mapping.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Market Opportunity
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Clinical Trial Strategist
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Scientific Evidence
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Regulatory Pathway
                </div>
              </div>
              <button className="btn-ghost group-hover:text-purple-600 dark:group-hover:text-purple-400 flex items-center">
                Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Optimization Tools */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card-hover group"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="heading-md text-gray-900 dark:text-white">Optimization Tools</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Advanced optimization and synthesis</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Sophisticated tools for hypothesis validation, report synthesis, and quality assurance in drug discovery.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Hypothesis Validator
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Report Synthesis
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Master Agent
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Quality Assurance
                </div>
              </div>
              <button className="btn-ghost group-hover:text-green-600 dark:group-hover:text-green-400 flex items-center">
                Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research Section - DeepMind Style */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-max">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-lg text-gray-900 dark:text-white mb-6">
                Our latest AI breakthroughs and updates from the lab
              </h2>
              <p className="text-large text-gray-600 dark:text-gray-300 flex items-center justify-center">
                Explore research <ChevronRight className="w-5 h-5 ml-2" />
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card-hover group"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-2xl mb-6 flex items-center justify-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="heading-md text-gray-900 dark:text-white mb-3">Projects</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Explore some of the biggest AI innovations in drug discovery and pharmaceutical research.
              </p>
              <button className="btn-ghost group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center">
                Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card-hover group"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-2xl mb-6 flex items-center justify-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="heading-md text-gray-900 dark:text-white mb-3">Publications</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Read a selection of our recent papers and research findings in AI-powered drug discovery.
              </p>
              <button className="btn-ghost group-hover:text-purple-600 dark:group-hover:text-purple-400 flex items-center">
                Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card-hover group"
            >
              <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-2xl mb-6 flex items-center justify-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="heading-md text-gray-900 dark:text-white mb-3">News</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Discover the latest updates from our research lab and breakthrough announcements.
              </p>
              <button className="btn-ghost group-hover:text-green-600 dark:group-hover:text-green-400 flex items-center">
                Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Agents Section - DeepMind Style Horizontal Scroll */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-max">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-lg text-gray-900 dark:text-white mb-6">
                🎯 PharmaSynth-X: The 11 Agent Dream Team
              </h2>
              <p className="text-large text-gray-600 dark:text-gray-300 flex items-center justify-center">
                Meet our specialized AI agents <ChevronRight className="w-5 h-5 ml-2" />
              </p>
            </motion.div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="relative">
            <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide horizontal-scroll">
              <div className="flex space-x-6 pb-6" style={{ width: 'max-content' }}>
                {[
                  {
                    id: 1,
                    name: "Proactive Monitoring Agent",
                    nickname: "The Always-On Scout",
                    emoji: "🚨",
                    description: "Constantly scans new research papers, patents, and clinical trials. Looks for patterns and emerging opportunities. Sends alerts when it finds something promising.",
                    analogy: "Think: Your personal research assistant that never sleeps",
                    color: "from-red-500 to-red-600"
                  },
                  {
                    id: 2,
                    name: "Knowledge Chain Agent",
                    nickname: "The Dot Connector",
                    emoji: "🔗",
                    description: "Finds connections between different research areas. Links mechanisms from one disease to another. Builds reasoning chains: 'Drug A → Pathway B → Disease C'",
                    analogy: "Think: A detective connecting clues across different cases",
                    color: "from-blue-500 to-blue-600"
                  },
                  {
                    id: 3,
                    name: "Molecule Profiler Agent",
                    nickname: "The Drug Expert",
                    emoji: "💊",
                    description: "Analyzes how drugs work (mechanisms of action). Looks at safety profiles and side effects. Studies how the body processes the drug.",
                    analogy: "Think: A pharmacist who knows everything about each medicine",
                    color: "from-green-500 to-green-600"
                  },
                  {
                    id: 4,
                    name: "Disease Landscape Agent",
                    nickname: "The Market Analyst",
                    emoji: "🏥",
                    description: "Studies different diseases and patient populations. Identifies unmet medical needs. Analyzes competitor drugs and treatment gaps.",
                    analogy: "Think: A healthcare strategist finding where help is needed most",
                    color: "from-purple-500 to-purple-600"
                  },
                  {
                    id: 5,
                    name: "Patent Intelligence Agent",
                    nickname: "The Legal Eagle",
                    emoji: "📜",
                    description: "Checks what's already patented. Finds patent expiration dates. Identifies freedom-to-operate opportunities.",
                    analogy: "Think: A lawyer specialized in drug patents",
                    color: "from-indigo-500 to-indigo-600"
                  },
                  {
                    id: 6,
                    name: "Clinical Trial Strategist Agent",
                    nickname: "The Study Designer",
                    emoji: "🧪",
                    description: "Looks at ongoing clinical trials. Suggests optimal trial designs for new uses. Estimates success probabilities.",
                    analogy: "Think: A clinical research coordinator",
                    color: "from-cyan-500 to-cyan-600"
                  },
                  {
                    id: 7,
                    name: "Market Opportunity Agent",
                    nickname: "The Business Mind",
                    emoji: "💰",
                    description: "Calculates potential market size and revenue. Analyzes pricing and reimbursement. Estimates return on investment.",
                    analogy: "Think: A business development manager",
                    color: "from-yellow-500 to-yellow-600"
                  },
                  {
                    id: 8,
                    name: "Scientific Evidence Agent",
                    nickname: "The Research Validator",
                    emoji: "🔬",
                    description: "Gathers scientific proof from research papers. Checks biological plausibility. Looks for supporting evidence.",
                    analogy: "Think: A rigorous scientist checking all the facts",
                    color: "from-teal-500 to-teal-600"
                  },
                  {
                    id: 9,
                    name: "Regulatory Pathway Agent",
                    nickname: "The Approval Guide",
                    emoji: "📋",
                    description: "Maps out FDA/regulatory requirements. Suggests fastest approval pathways. Estimates regulatory risks and timelines.",
                    analogy: "Think: A regulatory affairs specialist",
                    color: "from-orange-500 to-orange-600"
                  },
                  {
                    id: 10,
                    name: "Hypothesis Validator Agent",
                    nickname: "The Quality Checker",
                    emoji: "✅",
                    description: "Takes all information and gives a confidence score. Flags potential risks and issues. Makes the final go/no-go recommendation.",
                    analogy: "Think: An investment committee making the final decision",
                    color: "from-pink-500 to-pink-600"
                  },
                  {
                    id: 11,
                    name: "Report Synthesis Agent",
                    nickname: "The Storyteller",
                    emoji: "📊",
                    description: "Creates beautiful, easy-to-understand reports. Generates investment memos and presentations. Makes everything look professional and convincing.",
                    analogy: "Think: A consultant who creates amazing slide decks",
                    color: "from-violet-500 to-violet-600"
                  }
                ].map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex-shrink-0 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Agent Header */}
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${agent.color} rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
                        <span className="text-2xl">{agent.emoji}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{agent.id}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Agent</p>
                      </div>
                    </div>

                    {/* Agent Name */}
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{agent.name}</h4>
                    
                    {/* Nickname */}
                    <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-4">"{agent.nickname}"</p>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">
                      {agent.description}
                    </p>

                    {/* Analogy */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                        {agent.analogy}
                      </p>
                    </div>

                    {/* Learn More Button */}
                    <button className="w-full btn-ghost group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-center">
                      Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Scroll Buttons */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
              aria-label="Scroll left"
            >
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300 rotate-180" />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* How They Work Together Section */}
          <div className="mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h3 className="heading-md text-gray-900 dark:text-white mb-6">
                🎪 How They Work Together - Simple Example
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Scenario: Finding new uses for Aspirin
              </p>
            </motion.div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Proactive Monitoring Agent spots new aspirin research",
                  "Knowledge Chain Agent connects 'aspirin → anti-inflammatory → cancer prevention'",
                  "Molecule Profiler confirms aspirin's mechanisms support this",
                  "Disease Landscape finds cancer has high unmet need",
                  "Patent Intelligence checks if this use is already protected",
                  "Clinical Trial Strategist designs a study plan",
                  "Market Opportunity calculates potential profits",
                  "Scientific Evidence gathers supporting research",
                  "Regulatory Pathway maps FDA approval route",
                  "Hypothesis Validator gives final score (92/100!)",
                  "Report Synthesis creates the investment proposal"
                ].map((step, index) => (
                  <div key={index} className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - DeepMind Style */}
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

export default Home
