from langgraph.graph import StateGraph, END
from typing import Dict, Any, List, TypedDict
import asyncio

from agents.master_agent import MasterAgent
from agents.molecule_profiler import MoleculeProfilerAgent, DiseaseLandscapeAgent, KnowledgeChainAgent
from utils.config import AIConfig

class AnalysisState(TypedDict):
    drug_name: str
    target_disease: str
    phase: str
    parameters: Dict[str, Any]
    results: Dict[str, Any]
    current_agent: str
    progress: float
    status: str

class MainWorkflow:
    """Main workflow orchestrating all agents"""
    
    def __init__(self, config: AIConfig):
        self.config = config
        self.agents = {
            "master_agent": MasterAgent(config),
            "molecule_profiler": MoleculeProfilerAgent(config),
            "disease_landscape": DiseaseLandscapeAgent(config),
            "knowledge_chain": KnowledgeChainAgent(config),
            # Add other agents here
        }
        self.graph = self._build_graph()
    
    def _build_graph(self) -> StateGraph:
        """Build the LangGraph workflow"""
        workflow = StateGraph(AnalysisState)
        
        # Add nodes for each phase
        workflow.add_node("discovery_phase", self._discovery_phase)
        workflow.add_node("validation_phase", self._validation_phase)
        workflow.add_node("business_phase", self._business_phase)
        workflow.add_node("synthesis", self._synthesis_phase)
        
        # Define the flow
        workflow.set_entry_point("discovery_phase")
        workflow.add_edge("discovery_phase", "validation_phase")
        workflow.add_edge("validation_phase", "business_phase")
        workflow.add_edge("business_phase", "synthesis")
        workflow.add_edge("synthesis", END)
        
        return workflow.compile()
    
    async def _discovery_phase(self, state: AnalysisState) -> AnalysisState:
        """Phase 1: Discovery - Molecular and disease analysis"""
        state["current_agent"] = "discovery_phase"
        state["progress"] = 25.0
        
        # Run discovery agents
        discovery_results = {}
        
        # Molecule Profiler
        molecule_result = await self.agents["molecule_profiler"].run(state)
        discovery_results["molecule_analysis"] = molecule_result.results
        
        # Disease Landscape
        disease_result = await self.agents["disease_landscape"].run(state)
        discovery_results["disease_analysis"] = disease_result.results
        
        # Knowledge Chain
        knowledge_result = await self.agents["knowledge_chain"].run(state)
        discovery_results["knowledge_integration"] = knowledge_result.results
        
        state["results"]["discovery"] = discovery_results
        return state
    
    async def _validation_phase(self, state: AnalysisState) -> AnalysisState:
        """Phase 2: Validation - Clinical and regulatory analysis"""
        state["current_agent"] = "validation_phase"
        state["progress"] = 50.0
        
        # Mock validation results
        validation_results = {
            "clinical_analysis": {
                "trial_design": "Phase II randomized controlled trial",
                "patient_population": "Adults with chronic inflammation",
                "primary_endpoint": "Reduction in inflammatory markers",
                "sample_size": 200
            },
            "regulatory_analysis": {
                "regulatory_pathway": "505(b)(2) NDA",
                "requirements": [
                    "Safety studies",
                    "Efficacy trials",
                    "Manufacturing data"
                ],
                "timeline": "18-24 months"
            }
        }
        
        state["results"]["validation"] = validation_results
        return state
    
    async def _business_phase(self, state: AnalysisState) -> AnalysisState:
        """Phase 3: Business Case - Market and IP analysis"""
        state["current_agent"] = "business_phase"
        state["progress"] = 75.0
        
        # Mock business results
        business_results = {
            "market_analysis": {
                "market_size": "$2.5B",
                "growth_rate": "5.2% CAGR",
                "competitors": ["Ibuprofen", "Naproxen", "Celecoxib"],
                "market_share_potential": "15-20%"
            },
            "ip_analysis": {
                "patent_landscape": "Clear",
                "freedom_to_operate": "High",
                "key_patents": [
                    {"number": "US12345678", "expiry": "2030", "relevance": "Medium"}
                ]
            }
        }
        
        state["results"]["business"] = business_results
        return state
    
    async def _synthesis_phase(self, state: AnalysisState) -> AnalysisState:
        """Final synthesis of all results"""
        state["current_agent"] = "synthesis"
        state["progress"] = 100.0
        state["status"] = "completed"
        
        # Master agent synthesis
        master_result = await self.agents["master_agent"].run(state)
        state["results"]["synthesis"] = master_result.results
        
        return state
    
    async def run_analysis(
        self,
        drug_name: str,
        target_disease: str = "",
        phase: str = "discovery",
        parameters: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Run the complete analysis workflow"""
        
        initial_state: AnalysisState = {
            "drug_name": drug_name,
            "target_disease": target_disease,
            "phase": phase,
            "parameters": parameters or {},
            "results": {},
            "current_agent": "",
            "progress": 0.0,
            "status": "running"
        }
        
        # Execute the workflow
        final_state = await self.graph.ainvoke(initial_state)
        
        return final_state["results"]
