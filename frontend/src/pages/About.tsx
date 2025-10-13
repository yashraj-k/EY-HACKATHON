import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Users, Target, Award, Globe, ArrowRight } from 'lucide-react'

const About: React.FC = () => {
  const values = [
    {
      title: 'Our mission',
      description: 'To accelerate drug discovery and pharmaceutical innovation through advanced AI technology, making breakthrough treatments accessible to patients worldwide.',
      icon: Target,
      color: 'blue'
    },
    {
      title: 'Our approach',
      description: 'We combine cutting-edge AI research with practical applications, focusing on solving real-world challenges in drug development and healthcare.',
      icon: Award,
      color: 'purple'
    },
    {
      title: 'Our impact',
      description: 'From molecular analysis to clinical trial optimization, our AI systems are transforming how pharmaceutical companies discover and develop new treatments.',
      icon: Globe,
      color: 'green'
    }
  ]

  const team = [
    {
      name: 'Nimish Vadgaonkar',
      role: 'Founder',
      expertise: 'AI, Development & Research',
      image: 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800'
    },
    {
      name: 'Yashraj Kabre',
      role: 'Co-founder',
      expertise: 'Backend',
      image: 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800'
    },
    {
      name: 'Shubham Shah',
      role: 'Co-founder',
      expertise: 'PPT & Ideas',
      image: 'bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800'
    },
    {
      name: 'Parinita Thayyil',
      role: 'Co-founder',
      expertise: 'AI & Research',
      image: 'bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800'
    },
    {
      name: 'Reet Jain',
      role: 'Co-founder',
      expertise: 'PPT & Ideas',
      image: 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800'
    }
  ]

  const stats = [
    { number: '11', label: 'AI Agents', description: 'Specialized agents working in harmony' },
    { number: '500+', label: 'Research Papers', description: 'Published in top-tier journals' },
    { number: '50+', label: 'Pharma Partners', description: 'Leading pharmaceutical companies' },
    { number: '95%', label: 'Accuracy Rate', description: 'In drug-target prediction' }
  ]

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
                About{' '}
                <span className="gradient-text">PharmaSynth-X</span>
              </h1>
              <p className="text-large text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                We're pioneering the future of drug discovery through advanced AI technology, 
                combining cutting-edge research with practical applications to accelerate pharmaceutical innovation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-hover group"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
                  value.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                  value.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                  'bg-gradient-to-r from-green-500 to-green-600'
                }`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="heading-md text-gray-900 dark:text-white mb-4">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-max">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-lg text-gray-900 dark:text-white mb-6">
                Our team
              </h2>
              <p className="text-large text-gray-600 dark:text-gray-300">
                Meet the experts behind our AI-powered drug discovery platform
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-hover group text-center"
              >
                <div className={`w-24 h-24 rounded-full mx-auto mb-4 ${member.image} flex items-center justify-center`}>
                  <Users className="w-12 h-12 text-gray-600 dark:text-gray-400" />
                </div>
                <h3 className="heading-md text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-lg text-gray-900 dark:text-white mb-6">
              Get in touch
            </h2>
            <p className="text-large text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Ready to revolutionize your drug discovery process? 
              Contact us to learn more about our AI-powered solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="btn-primary text-lg px-8 py-4 flex items-center justify-center group">
                Contact Us
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary text-lg px-8 py-4 flex items-center justify-center">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About