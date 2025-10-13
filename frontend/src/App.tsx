import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Models from './pages/Models'
import Research from './pages/Research'
import Science from './pages/Science'
import About from './pages/About'
import AnalysisInput from './pages/AnalysisInput'
import DrugAnalysisForm from './pages/DrugAnalysisForm'
import CustomDrugInput from './pages/CustomDrugInput'
import AgentsInAction from './pages/AgentsInAction'
import AnalysisResults from './pages/AnalysisResults'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/models" element={<Models />} />
            <Route path="/research" element={<Research />} />
            <Route path="/science" element={<Science />} />
            <Route path="/about" element={<About />} />
            <Route path="/analysis" element={<AnalysisInput />} />
            <Route path="/analysis/:analysisType" element={<DrugAnalysisForm />} />
            <Route path="/analysis/custom-drug" element={<CustomDrugInput />} />
            <Route path="/analysis/:analysisType/running" element={<AgentsInAction />} />
            <Route path="/analysis/results" element={<AnalysisResults />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
