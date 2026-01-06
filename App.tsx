
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { AITools } from './components/AITools';
import { PROJECTS, SKILLS } from './constants.tsx';
import { Project } from './types';

const CaseStudyModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-900/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex justify-between items-center z-10">
          <div>
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-lg">
              Case Study: {project.category}
            </span>
            <h2 className="text-2xl font-black text-gray-900 mt-2">{project.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 sm:p-12 space-y-12">
          {/* Outcome Header */}
          <div className="bg-indigo-600 rounded-3xl p-8 text-white">
            <div className="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-2">Primary Outcome</div>
            <p className="text-xl font-bold leading-relaxed">{project.caseStudy.outcome}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Col: Context & Contributions */}
            <div className="space-y-10">
              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">The Context</h3>
                <p className="text-gray-600 leading-relaxed font-medium">{project.caseStudy.context}</p>
              </section>

              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Key Contributions</h3>
                <ul className="space-y-4">
                  {project.caseStudy.contributions.map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-[10px] font-black mt-1">
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Right Col: Challenges, Improvements & Stack */}
            <div className="space-y-10">
              <section className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Engineering Challenges</h3>
                <ul className="space-y-4">
                  {project.caseStudy.challenges.map((item, i) => (
                    <li key={i} className="text-sm">
                      <div className="text-gray-900 font-bold mb-1">• {item.split(':')[0]}</div>
                      <div className="text-gray-500 pl-4">{item.split(':')[1]}</div>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Future roadmap</h3>
                <ul className="space-y-2">
                  {project.caseStudy.improvements.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 italic">
                      → {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-500 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showBackendSpec, setShowBackendSpec] = useState(false);

  return (
    <Layout>
      <Hero />
      
      {/* About Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-black text-gray-900 leading-tight">About My <br/><span className="text-indigo-600">Engineering Ethos</span></h2>
            </div>
            <div className="md:w-2/3">
              <p className="text-lg text-gray-600 leading-relaxed">
                I am a Senior Java Engineer and SDET with a passion for building systems that don't just work but stay working. With deep expertise in the Spring Boot ecosystem and Selenium-based automation, I bridge the gap between development and quality assurance. I specialize in designing distributed test harnesses and optimizing CI/CD pipelines to ensure maximum reliability without sacrificing speed. 
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mt-6">
                My approach is rooted in clean code principles and proactive bottleneck identification. Recently, I've been integrating generative AI into the testing lifecycle to eliminate repetitive boilerplate and focus on complex edge cases. I help teams scale by building tools that make quality an inherent part of the development process.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                {SKILLS.map(s => (
                  <span key={s.name} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 shadow-sm">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Studio Feature */}
      <AITools />

      {/* Backend Architecture Preview (New) */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative group">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl font-black text-white mb-4">Full-Stack Capability: Spring Boot Backend</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Explore the scalable Java architecture that powers these AI features. Built with Spring Boot, Bucket4j rate limiting, and secure Gemini integration.
              </p>
            </div>
            <button 
              onClick={() => setShowBackendSpec(!showBackendSpec)}
              className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold hover:bg-indigo-50 transition-all flex items-center gap-2"
            >
              {showBackendSpec ? 'Hide Architecture' : 'View Backend Spec'}
              <svg className={`w-4 h-4 transition-transform ${showBackendSpec ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          {showBackendSpec && (
            <div className="mt-12 bg-black/50 rounded-3xl p-6 md:p-10 border border-gray-800 animate-in slide-in-from-top-4 duration-500">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div>
                   <h4 className="text-indigo-400 text-[10px] font-black uppercase mb-6 tracking-widest">API Endpoint Logic</h4>
                   <div className="space-y-6">
                     {[
                       { m: 'POST', p: '/api/ai/generate', d: 'Securely proxies requests to Gemini using system instructions.' },
                       { m: 'POST', p: '/api/ai/evaluate', d: 'In-memory rate-limited endpoint for content auditing.' }
                     ].map((api, i) => (
                       <div key={i} className="flex gap-4 items-start">
                         <span className="bg-indigo-600/20 text-indigo-400 text-[9px] font-black px-2 py-1 rounded">{api.m}</span>
                         <div>
                           <div className="text-white font-mono text-xs mb-1">{api.p}</div>
                           <div className="text-gray-500 text-[11px]">{api.d}</div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
                 <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                    <h4 className="text-gray-400 text-[10px] font-black uppercase mb-4 tracking-widest">Stack Decisions</h4>
                    <ul className="space-y-3 text-xs text-gray-300">
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Spring Boot 3.3 (Java 21)</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Bucket4j for Token Bucket Throttling</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> JSR-380 Bean Validation</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Google Cloud Run Optimized</li>
                    </ul>
                 </div>
               </div>
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-gray-900 tracking-tight">Technical Case Studies</h2>
              <p className="text-gray-500 max-w-lg">Strategic implementations of Java backends and scalable quality ecosystems.</p>
            </div>
            <div className="hidden md:block h-px flex-grow mx-12 bg-gray-100" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PROJECTS.map((project) => (
              <div key={project.id} className="group flex flex-col h-full bg-gray-50/50 p-8 rounded-[2.5rem] border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg uppercase tracking-widest">
                      {project.category}
                    </span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                    {project.caseStudy.outcome}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-white text-gray-400 rounded-md text-[9px] font-black uppercase border border-gray-100">
                      {tag}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-2 text-sm font-black tracking-widest text-indigo-600 hover:gap-3 transition-all text-left"
                >
                  READ CASE STUDY
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* Skills Stats Section */}
      <section id="skills" className="py-24 px-4 bg-gray-950 text-white rounded-[4rem] mx-4 sm:mx-8 mb-20 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">The Technical Toolkit</h2>
            <p className="text-gray-400">Mastery levels across core engineering and quality stacks.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((skill) => (
              <div key={skill.name} className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <div className="text-[10px] font-black text-indigo-400 mb-1 uppercase tracking-tighter">{skill.category}</div>
                    <div className="text-xl font-bold text-white">{skill.name}</div>
                  </div>
                  <div className="text-2xl font-black text-indigo-500/50 group-hover:text-indigo-400 transition-colors">{skill.level}%</div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-indigo-500 h-full transition-all duration-1000 ease-out" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">
            Ready to ship <span className="text-indigo-600">faster</span>?
          </h2>
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-medium">
            I'm looking for teams that value robust architecture and automated quality. Let's discuss how my SDET background can elevate your Java ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="mailto:hello@alexchen.dev" className="px-12 py-5 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-2xl shadow-gray-200">
              Email Me Directly
            </a>
            <a href="#" className="px-12 py-5 bg-white border-2 border-gray-200 text-gray-900 rounded-2xl font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all">
              LinkedIn Profile
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;
