import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateQualityBlueprint = async (requirement: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `
    As an expert SDET and Java Architect, analyze this requirement: "${requirement}"
    
    Provide a dual-part response:
    1. PROFESSIONAL GHERKIN: A complete Feature file with Background and Scenarios (including edge cases).
    2. JAVA BOILERPLATE: A Selenium Page Object Model (POM) class in Java that would support these tests. Use modern Java 21 features and clean coding standards.
    
    Format the output with clear headers like "### GHERKIN SCENARIOS" and "### JAVA PAGE OBJECT".
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.5,
      topP: 0.8
    }
  });

  return response.text || "Analysis failed.";
};

export const generateArchitectureDesign = async (requirement: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `
    As a Lead System Architect, design a high-level solution for: "${requirement}"
    
    Your response must include:
    1. DIAGRAM: A valid Mermaid.js graph code block (e.g., graph TD or sequenceDiagram) illustrating the system components and flow.
    2. TECHNICAL RATIONALE: A detailed explanation of the architectural choices (scalability, performance, security).
    3. TECH STACK: Recommended tools and frameworks.
    
    Structure the response with clear headers: "### ARCHITECTURE DIAGRAM", "### RATIONALE", and "### RECOMMENDED STACK".
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.4
    }
  });

  return response.text || "Architecture design failed.";
};

export const reviewJavaCode = async (code: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `
    Act as a Senior Java Mentor. Review this code for:
    1. Clean Code & SOLID principles.
    2. Performance (Complexity analysis).
    3. Concurrency safety (if applicable).
    4. Modern Java (17/21) refactoring suggestions.
    
    Code:
    \`\`\`java
    ${code}
    \`\`\`
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.3
    }
  });

  return response.text || "Review failed.";
};

export const explainJavaCode = async (code: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `
    Act as a Senior Technical Writer and Java Architect. 
    Explain this Java code in clear, human-readable terms for a non-technical stakeholder, 
    but also provide a "Developer Deep Dive" section for engineers.
    
    Code:
    \`\`\`java
    ${code}
    \`\`\`
    
    Format the output with headers:
    ### OVERVIEW
    ### HOW IT WORKS
    ### DEVELOPER DEEP DIVE
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.3
    }
  });

  return response.text || "Explanation failed.";
};

export const evaluateQuality = async (content: string): Promise<any> => {
  const ai = getAIClient();
  const prompt = `
    Evaluate this engineering portfolio content against a strict professional rubric.
    CONTENT: "${content.substring(0, 2000)}"
    
    Rules:
    - Impact needs metrics (%, $, time) for scores > 80.
    - Specificity needs tools/versions for scores > 80.
    - Credibility drops if hyperbole is used.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: "You are a picky Engineering Manager. Output strictly valid JSON scoring the content.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          scores: {
            type: Type.OBJECT,
            properties: {
              clarity: { type: Type.INTEGER },
              impact: { type: Type.INTEGER },
              specificity: { type: Type.INTEGER },
              credibility: { type: Type.INTEGER }
            }
          },
          average: { type: Type.INTEGER },
          feedback: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["scores", "average", "feedback"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const generateProjectStory = async (projectName: string, role: string, bullets: string): Promise<any> => {
  const ai = getAIClient();
  const prompt = `
    Transform the following project notes into high-impact career assets.
    PROJECT NAME: ${projectName}
    ROLE: ${role}
    RAW NOTES: ${bullets}
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: "You are a world-class Career Coach for Senior Java Engineers and SDETs. Output strictly valid JSON.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          portfolioDescription: { type: Type.STRING },
          starFormat: {
            type: Type.OBJECT,
            properties: {
              situation: { type: Type.STRING },
              task: { type: Type.STRING },
              action: { type: Type.STRING },
              result: { type: Type.STRING }
            }
          },
          resumeBullets: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          linkedinPost: { type: Type.STRING }
        },
        required: ["portfolioDescription", "starFormat", "resumeBullets", "linkedinPost"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};