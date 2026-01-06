import React, { useState, useEffect, useRef, useMemo } from 'react';
import { generateQualityBlueprint, reviewJavaCode, explainJavaCode, generateArchitectureDesign } from '../services/geminiService';
import { AIToolType } from '../types';

declare global {
  interface Window {
    mermaid: any;
  }
}

interface GherkinStep {
  keyword: string;
  text: string;
}

interface GherkinScenario {
  name: string;
  steps: GherkinStep[];
}

interface GherkinFeature {
  name: string;
  scenarios: GherkinScenario[];
}

const LOADING_MESSAGES: Record<AIToolType, string[]> = {
  [AIToolType.GHERKIN_GEN]: [
    "Parsing system requirements...",
    "Identifying behavioral edge cases...",
    "Structuring Gherkin feature definitions...",
    "Synthesizing Java Page Object Model...",
    "Finalizing quality blueprint..."
  ],
  [AIToolType.CODE_REVIEW]: [
    "Analyzing Java AST structure...",
    "Auditing SOLID principle compliance...",
    "Evaluating performance complexity...",
    "Checking for concurrency pitfalls...",
    "Compiling refactoring suggestions..."
  ],
  [AIToolType.CODE_EXPLAINER]: [
    "Deconstructing code logic...",
    "Translating logic for stakeholders...",
    "Analyzing technical implementation details...",
    "Structuring developer deep-dive...",
    "Generating human-readable summary..."
  ],
  [AIToolType.ARCH_COPILOT]: [
    "Processing architectural constraints...",
    "Designing system topology...",
    "Generating Mermaid diagram definitions...",
    "Drafting technical rationale...",
    "Finalizing blueprint visualization..."
  ]
};

const GherkinVisualizer: React.FC<{ rawText: string }> = ({ rawText }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const feature = useMemo(() => {
    const lines = rawText.split('\n');
    const parsed: GherkinFeature = { name: 'Untitled Feature', scenarios: [] };
    let currentScenario: GherkinScenario | null = null;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('Feature:')) {
        parsed.name = trimmed.replace('Feature:', '').trim();
      } else if (trimmed.startsWith('Scenario:') || trimmed.startsWith('Example:')) {
        currentScenario = { name: trimmed.replace(/Scenario:|Example:/, '').trim(), steps: [] };
        parsed.scenarios.push(currentScenario);
      } else if (currentScenario && /^(Given|When|Then|And|But)\s/i.test(trimmed)) {
        const parts = trimmed.split(/\s+/);
        currentScenario.steps.push({
          keyword: parts[0],
          text: parts.slice(1).join(' ')
        });
      }
    });
    return parsed;
  }, [rawText]);

  if (feature.scenarios.length === 0) return (
    <div className="flex flex-col items-center justify-center h-full py-12 text-slate-500">
      <p className="text-xs font-bold uppercase tracking-widest">No valid Gherkin found for visualization</p>
    </div>
  );

  return (
    <div ref={containerRef} className="w-full h-full min-h-[500px] overflow-auto bg-slate-950/20 rounded-3xl border border-slate-800/50 p-8 relative">
      <div className="flex flex-col items-center min-w-[800px]">
        
        {/* Feature Root */}
        <div className="relative z-20 group mb-24">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-slate-900 border border-indigo-500/50 px-10 py-5 rounded-2xl shadow-2xl flex flex-col items-center">
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2">Feature Specification</span>
            <h4 className="text-white font-black text-lg text-center max-w-md leading-tight">{feature.name}</h4>
          </div>
        </div>

        {/* Scenarios Row with SVG Paths */}
        <div className="relative flex justify-center gap-12 w-full pt-10">
          <svg className="absolute top-[-96px] left-0 w-full h-24 pointer-events-none overflow-visible">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="1" />
              </linearGradient>
            </defs>
            {feature.scenarios.map((_, idx) => {
              const scenarioCount = feature.scenarios.length;
              const spacing = 100 / (scenarioCount + 1);
              const xPos = `${(idx + 1) * spacing}%`;
              return (
                <path 
                  key={idx}
                  d={`M 50% 0 C 50% 50, ${xPos} 50, ${xPos} 96`}
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="2"
                  className="animate-pulse"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                />
              );
            })}
          </svg>

          {feature.scenarios.map((scenario, sIdx) => (
            <div key={sIdx} className="relative flex flex-col items-center w-full max-w-[320px]">
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 p-6 rounded-3xl w-full hover:border-indigo-500/50 transition-all duration-500 shadow-xl group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-black text-xs">
                    {sIdx + 1}
                  </div>
                  <span className="bg-indigo-500/10 text-[9px] font-black text-indigo-400 px-2 py-1 rounded-full uppercase tracking-tighter">
                    {scenario.steps.length} Logic Steps
                  </span>
                </div>
                
                <h5 className="text-white font-bold text-sm mb-6 leading-snug group-hover:text-indigo-400 transition-colors">
                  {scenario.name}
                </h5>
                
                <div className="space-y-4">
                  {scenario.steps.map((step, tIdx) => (
                    <div key={tIdx} className="flex gap-4 items-start relative">
                      {tIdx < scenario.steps.length - 1 && (
                        <div className="absolute left-[15px] top-6 bottom-[-16px] w-[1px] bg-slate-800"></div>
                      )}
                      <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center border text-[8px] font-black uppercase ${
                        step.keyword.toLowerCase() === 'given' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' :
                        step.keyword.toLowerCase() === 'when' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                        step.keyword.toLowerCase() === 'then' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
                        'bg-slate-800 border-slate-700 text-slate-500'
                      }`}>
                        {step.keyword[0]}
                      </div>
                      <div>
                        <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">{step.keyword}</span>
                        <p className="text-[11px] text-slate-300 leading-tight font-medium">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SAMPLES = {
  [AIToolType.GHERKIN_GEN]: "User should be able to checkout with multiple items using a discount code. Handle the case where the code is expired.",
  [AIToolType.CODE_REVIEW]: "public void process(List<User> users) {\n  for(int i=0; i<users.size(); i++) {\n    if(users.get(i).isActive()) {\n      saveToDb(users.get(i));\n    }\n  }\n}",
  [AIToolType.ARCH_COPILOT]: "Architect a high-availability notification service using Spring Boot, Kafka, and a distributed caching layer.",
  [AIToolType.CODE_EXPLAINER]: "public List<String> fetchActiveEmails(List<User> users) {\n  return users.stream()\n    .filter(User::isActive)\n    .map(User::getEmail)\n    .distinct()\n    .collect(Collectors.toList());\n}"
};

export const AITools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AIToolType>(AIToolType.GHERKIN_GEN);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'CODE' | 'VISUAL'>('CODE');
  const mermaidRef = useRef<HTMLDivElement>(null);

  // Cycle through loading messages
  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingStage(0);
      interval = setInterval(() => {
        setLoadingStage(prev => (prev < 4 ? prev + 1 : prev));
      }, 1500);
    } else {
      setLoadingStage(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (output && activeTab === AIToolType.ARCH_COPILOT && window.mermaid) {
      const mermaidCode = output.match(/```mermaid([\s\S]*?)```/);
      if (mermaidCode && mermaidRef.current) {
        try {
          const code = mermaidCode[1].trim();
          mermaidRef.current.innerHTML = `<div class="mermaid">${code}</div>`;
          window.mermaid.init(undefined, mermaidRef.current.querySelectorAll('.mermaid'));
        } catch (e) {
          console.error("Mermaid error", e);
          if (mermaidRef.current) mermaidRef.current.innerHTML = '<p class="text-xs text-red-500">Diagram rendering failed. Check syntax.</p>';
        }
      }
    }
  }, [output, activeTab]);

  const handleProcess = async () => {
    setLoading(true);
    setCopied(false);
    setOutput('');
    try {
      let result = '';
      if (activeTab === AIToolType.GHERKIN_GEN) result = await generateQualityBlueprint(input);
      else if (activeTab === AIToolType.CODE_REVIEW) result = await reviewJavaCode(input);
      else if (activeTab === AIToolType.CODE_EXPLAINER) result = await explainJavaCode(input);
      else if (activeTab === AIToolType.ARCH_COPILOT) {
        result = await generateArchitectureDesign(input);
      }
      setOutput(result);
    } catch (error) {
      setOutput("Error: Service unavailable. Verify your GEMINI_API_KEY.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = output.replace(/```mermaid[\s\S]*?```/g, ''); 
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const gherkinText = useMemo(() => {
    if (activeTab !== AIToolType.GHERKIN_GEN) return '';
    const match = output.match(/### GHERKIN SCENARIOS([\s\S]*?)(###|$)/i);
    if (match) return match[1].trim();
    
    const featureIndex = output.indexOf('Feature:');
    if (featureIndex !== -1) {
      const endOfGherkin = output.indexOf('###', featureIndex + 8);
      return output.substring(featureIndex, endOfGherkin === -1 ? output.length : endOfGherkin).trim();
    }
    return '';
  }, [output, activeTab]);

  return (
    <section id="ai-tools" className="py-24 px-4 bg-slate-900/50 border-y border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-white">Engineering Intelligence Hub</h2>
          <p className="text-slate-400">Collaborate with Alex's Digital Twin to solve complex backend and testing challenges.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-slate-800/40 rounded-3xl p-6 border border-slate-700/50 flex flex-col">
            <div className="flex p-1 bg-slate-900 rounded-xl mb-6 self-start flex-wrap gap-1">
              {[
                { id: AIToolType.GHERKIN_GEN, label: 'Gherkin Agent' },
                { id: AIToolType.CODE_REVIEW, label: 'Code Auditor' },
                { id: AIToolType.CODE_EXPLAINER, label: 'Code Explainer' },
                { id: AIToolType.ARCH_COPILOT, label: 'Arch Co-Pilot' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setInput(''); setOutput(''); setViewMode('CODE'); }}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-grow flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {activeTab === AIToolType.ARCH_COPILOT ? "System Requirement" : "Analysis Input"}
                </label>
                <button 
                  onClick={() => setInput(SAMPLES[activeTab])}
                  className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  LOAD SAMPLE
                </button>
              </div>
              
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full flex-grow bg-slate-900 border border-slate-700 rounded-2xl p-4 text-sm mono focus:ring-2 focus:ring-indigo-500 outline-none placeholder-slate-700 resize-none min-h-[250px]"
                placeholder={activeTab === AIToolType.ARCH_COPILOT ? "Describe a system requirement..." : "Paste code or content here..."}
              />

              <button
                onClick={handleProcess}
                disabled={loading || !input.trim()}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group overflow-hidden relative"
              >
                {loading && (
                  <div className="absolute inset-0 bg-indigo-700/50 flex items-center justify-start">
                    <div 
                      className="h-full bg-indigo-400/50 transition-all duration-700 ease-out" 
                      style={{ width: `${(loadingStage + 1) * 20}%` }}
                    />
                  </div>
                )}
                <span className="relative z-10">
                  {loading ? LOADING_MESSAGES[activeTab][loadingStage] : "Execute Analysis"}
                </span>
              </button>
            </div>
          </div>

          {/* Result Column */}
          <div className="lg:col-span-7 bg-black/40 rounded-3xl border border-slate-700/50 flex flex-col overflow-hidden relative group">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/30">
              <div className="flex gap-4 items-center">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Output Environment</span>
                {activeTab === AIToolType.GHERKIN_GEN && output && (
                  <div className="flex bg-slate-900 rounded-lg p-0.5 border border-slate-700">
                    <button 
                      onClick={() => setViewMode('CODE')}
                      className={`px-3 py-1 rounded-md text-[9px] font-bold transition-all ${viewMode === 'CODE' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
                    >
                      CODE
                    </button>
                    <button 
                      onClick={() => setViewMode('VISUAL')}
                      className={`px-3 py-1 rounded-md text-[9px] font-bold transition-all ${viewMode === 'VISUAL' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
                    >
                      FLOW
                    </button>
                  </div>
                )}
              </div>
              {output && (
                <button 
                  onClick={handleCopy}
                  className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
                >
                  {copied ? 'COPIED!' : 'COPY ASSETS'}
                </button>
              )}
            </div>
            
            <div className="flex-grow flex flex-col overflow-hidden">
              {activeTab === AIToolType.ARCH_COPILOT && output && (
                 <div ref={mermaidRef} className="p-4 bg-white/5 border-b border-slate-800 min-h-[300px] flex items-center justify-center overflow-x-auto relative">
                    {/* Mermaid diagram rendered here */}
                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/40 rounded text-[8px] font-black text-slate-500 uppercase tracking-widest">
                      Live Topology
                    </div>
                 </div>
              )}
              
              <div className="flex-grow overflow-y-auto max-h-[600px] relative">
                {output ? (
                  viewMode === 'VISUAL' && activeTab === AIToolType.GHERKIN_GEN ? (
                    <div className="p-2 h-full">
                      <GherkinVisualizer rawText={gherkinText} />
                    </div>
                  ) : (
                    <div className="p-6 text-sm mono leading-relaxed text-slate-300 whitespace-pre-wrap selection:bg-indigo-500/30">
                      {output.replace(/```mermaid[\s\S]*?```/g, '')}
                    </div>
                  )
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4 py-12">
                    {loading ? (
                      <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                          <div className="w-16 h-16 border-2 border-slate-800 rounded-full"></div>
                          <div 
                            className="absolute inset-0 border-2 border-indigo-500 rounded-full border-t-transparent animate-spin"
                            style={{ animationDuration: '0.8s' }}
                          ></div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-xs font-black text-indigo-400 uppercase tracking-widest animate-pulse">
                            {LOADING_MESSAGES[activeTab][loadingStage]}
                          </span>
                          <div className="flex gap-1.5">
                            {[0, 1, 2, 3, 4].map(step => (
                              <div 
                                key={step} 
                                className={`w-8 h-1 rounded-full transition-all duration-500 ${step <= loadingStage ? 'bg-indigo-500' : 'bg-slate-800'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 border border-slate-800 rounded-full flex items-center justify-center">
                           <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <p className="text-center max-w-[200px] text-xs font-bold tracking-tight">System ready. Waiting for requirement payload.</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {loading && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-900 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-700 ease-out" 
                  style={{ width: `${(loadingStage + 1) * 20}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};