import { GoogleGenAI, Type, Tool, Content, Part } from "@google/genai";
import { PROFILE, EXPERIENCES, PROJECTS, SKILLS, WORK_EXPERIENCE, SYSTEM_INSTRUCTION } from "../constants";

// --- CONFIGURATION ---
// The API key must be obtained exclusively from the environment variable process.env.API_KEY
const API_KEY = process.env.API_KEY;

// --- TYPES ---
interface IntentScore {
  intent: string;
  score: number;
}

// --- UTILS ---
const simulateNetworkDelay = (ms: number = 800) => new Promise(resolve => setTimeout(resolve, ms));

const calculateSimilarity = (text: string, keywords: string[]): number => {
  const lowerText = text.toLowerCase();
  let score = 0;
  keywords.forEach(word => {
    if (lowerText.includes(word.toLowerCase())) score += 1;
  });
  return score;
};

// --- MOCKED DATA SERVICES (Available to Agent as Tools) ---

export const fetchF1News = async (): Promise<F1NewsItem[]> => {
  await simulateNetworkDelay(500);
  return [
    { title: "Cadillac F1 Team announces new technical partnership for 2026", source: "Motorsport.com", time: "2h ago", url: "#" },
    { title: "Verstappen praises RB21 chassis balance after simulator session", source: "F1.com", time: "5h ago", url: "#" },
    { title: "FIA updates technical regulations regarding active aero", source: "Autosport", time: "8h ago", url: "#" }
  ];
};

export interface DriverStanding { position: string; name: string; team: string; points: string; }
export interface ConstructorStanding { position: string; team: string; points: string; }
export interface F1StandingsData { drivers: DriverStanding[]; constructors: ConstructorStanding[]; }
export const fetchF1Standings = async (): Promise<F1StandingsData> => {
    await simulateNetworkDelay(500);
    return {
        drivers: [
            { position: "1", name: "Max Verstappen", team: "Red Bull Racing", points: "25" },
            { position: "2", name: "Lewis Hamilton", team: "Ferrari", points: "18" },
            { position: "3", name: "Lando Norris", team: "McLaren", points: "15" },
            { position: "4", name: "Charles Leclerc", team: "Ferrari", points: "12" },
            { position: "5", name: "Oscar Piastri", team: "McLaren", points: "10" }
        ],
        constructors: [
            { position: "1", team: "Ferrari", points: "30" },
            { position: "2", team: "Red Bull Racing", points: "25" },
            { position: "3", team: "McLaren", points: "25" },
            { position: "4", team: "Mercedes", points: "12" },
            { position: "5", team: "Williams", points: "8" }
        ]
    };
};

export interface RaceEvent { round: string; name: string; date: string; circuit: string; country: string; }
export const fetchRaceCalendar = async (): Promise<RaceEvent[]> => {
  await simulateNetworkDelay(500);
  return [
      { round: "1", name: "Australian Grand Prix", date: "Mar 16", circuit: "Albert Park", country: "Australia" },
      { round: "2", name: "Chinese Grand Prix", date: "Mar 23", circuit: "Shanghai International Circuit", country: "China" },
      { round: "3", name: "Japanese Grand Prix", date: "Apr 6", circuit: "Suzuka Circuit", country: "Japan" }
  ];
};

export const checkLinkedInProfile = async (name: string, currentTitle: string): Promise<{
  hasUpdates: boolean;
  data?: { title: string; company: string; summary: string; sourceUrl?: string };
}> => {
  await simulateNetworkDelay(2000);
  return {
    hasUpdates: true,
    data: {
      title: currentTitle, 
      company: "Cadillac F1 Team (Aspiring)",
      summary: "Engineer focused on High-Performance Embedded Systems & Motorsport.",
      sourceUrl: "https://www.linkedin.com/in/txniiii/"
    }
  };
};

export const findProjectsForProfile = async (name: string): Promise<any[]> => {
    await simulateNetworkDelay(1500);
    return [
        {
            id: 'auto-1',
            title: "Autonomous Drone Swarm",
            description: "Coordinated flight control utilizing ROS2 and PX4.",
            technologies: ["C++", "ROS2", "PX4"],
            category: "Robotics",
            image: "https://picsum.photos/800/600?random=101"
        }
    ];
};

export interface F1NewsItem { title: string; source: string; time: string; url: string; }
export const generateDriverComparison = async (driver1: string, driver2: string): Promise<string> => {
  await simulateNetworkDelay(1500);
  return `Comparing ${driver1} and ${driver2} reveals a clash of styles. ${driver1} typically favors aggressive entry speed, whereas ${driver2} is known for surgical precision.`;
};

export interface RacePrediction { winner: string; podium: string[]; darkHorse: string; confidence: number; reasoning: string; }
export const predictNextRace = async (raceName: string, circuit: string, topDrivers: string[], conditions: string = "Dry"): Promise<RacePrediction> => {
    await simulateNetworkDelay(2000);
    return {
         winner: topDrivers[0] || "Verstappen",
         podium: [topDrivers[0] || "Verstappen", topDrivers[1] || "Hamilton", topDrivers[2] || "Norris"],
         darkHorse: "Alex Albon",
         confidence: 88,
         reasoning: `Based on the ${conditions.toLowerCase()} conditions at ${circuit}, aerodynamic efficiency will be paramount.`
     };
};

export interface LiveFeedItem { id: string; timestamp: string; message: string; type: 'overtake' | 'pit' | 'incident' | 'fastest-lap' | 'info'; }
export const fetchLiveRaceFeed = async (lap: number = 50): Promise<LiveFeedItem[]> => {
  await simulateNetworkDelay(800);
  return [
      { id: `sim-${Date.now()}`, timestamp: `Lap ${lap}/58`, message: "Verstappen sets a new fastest sector 2.", type: 'fastest-lap' }
  ];
};


// --- GEMINI TOOL DEFINITIONS ---

const tools: Tool[] = [
  {
    functionDeclarations: [
      {
        name: "get_f1_standings",
        description: "Get the current Formula 1 driver and constructor standings.",
        parameters: { type: Type.OBJECT, properties: {} },
      },
      {
        name: "get_projects",
        description: "Get the list of Marco's technical projects and portfolio items.",
        parameters: { type: Type.OBJECT, properties: {} },
      },
      {
        name: "get_experience",
        description: "Get Marco's work and leadership experience.",
        parameters: { type: Type.OBJECT, properties: {} },
      },
      {
        name: "get_skills",
        description: "Get Marco's technical skills list.",
        parameters: { type: Type.OBJECT, properties: {} },
      },
    ],
  },
];

// --- GEMINI API HANDLER ---

const callGemini = async (contents: Content[]): Promise<string> => {
    if (!API_KEY) throw new Error("No API Key");

    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const model = "gemini-2.5-flash";

    const response = await ai.models.generateContent({
        model: model,
        contents: contents,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            tools: tools,
        }
    });

    const candidate = response.candidates?.[0];
    if (!candidate || !candidate.content || !candidate.content.parts) return "Connection established but no data received.";

    const modelTurn = candidate.content;
    const parts = modelTurn.parts;

    // Check for function calls
    const functionCalls = parts.filter(p => p.functionCall);

    if (functionCalls.length > 0) {
        const functionResponses: Part[] = [];
        
        for (const part of functionCalls) {
            const call = part.functionCall!;
            let result: any = {};

            if (call.name === "get_f1_standings") {
                result = await fetchF1Standings();
            } else if (call.name === "get_projects") {
                result = PROJECTS;
            } else if (call.name === "get_experience") {
                result = EXPERIENCES;
            } else if (call.name === "get_skills") {
                result = SKILLS;
            }

            functionResponses.push({
                functionResponse: {
                    name: call.name,
                    response: { result: result }
                }
            });
        }

        // Create the new history including the model's tool calls and the user's tool responses
        const nextContents: Content[] = [
            ...contents,
            modelTurn,
            { role: "user", parts: functionResponses }
        ];

        // Call Gemini again with the function responses
        const secondResponse = await ai.models.generateContent({
            model: model,
            contents: nextContents,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                tools: tools
            }
        });
        
        return secondResponse.candidates?.[0]?.content?.parts?.[0]?.text || "";
    }

    return parts[0].text || "";
};


// --- ADVANCED LOCAL BRAIN (FALLBACK) ---
// Used if API key is missing or fails.

const localAgent = async (history: { role: 'user' | 'model'; text: string }[], newMessage: string): Promise<string> => {
    const complexityDelay = newMessage.length * 5 + 600; 
    await simulateNetworkDelay(complexityDelay);
  
    const lowerMsg = newMessage.toLowerCase();
    const lastModelMsg = [...history].reverse().find(m => m.role === 'model')?.text || "";
  
    // LinkedIn Sync State Machine
    if (lastModelMsg.includes("Primary Professional Goal") && !lastModelMsg.includes("Core Expertise")) {
       return "Goal mapped. \n\n**Phase 1 (Step 2)**: List 3-5 **Core Expertise** skills for this vector.";
    }
    if (lastModelMsg.includes("Core Expertise") && !lastModelMsg.includes("Target Audience")) {
       return "Expertise indexed. \n\n**Phase 1 (Final)**: Define **Target Audience** (Industry/Role).";
    }
    if (lastModelMsg.includes("Target Audience") && !lastModelMsg.includes("Phase 2")) {
       return "Targeting locked. \n\n**Phase 2: Automated Outreach**\n\nIdentified 25 high-value prospects. Execute outreach sequence?";
    }
    if (lastModelMsg.includes("Phase 2") && (lowerMsg.includes("yes") || lowerMsg.includes("execute"))) {
       return "Sequence initiated. \n\n**Phase 3: Monitoring** active. I will report on conversation metrics weekly. \n\n*J.A.R.V.I.S. Standing by.*";
    }
  
    // Intent Scoring
    const intents: IntentScore[] = [
      { intent: 'LINKEDIN_INIT', score: calculateSimilarity(lowerMsg, ['linkedin', 'sync', 'network', 'connect']) * 2 },
      { intent: 'F1_DATA', score: calculateSimilarity(lowerMsg, ['f1', 'standings', 'winning', 'points', 'championship']) * 2 },
      { intent: 'PROJECTS', score: calculateSimilarity(lowerMsg, ['project', 'portfolio', 'built', 'app', 'code', 'work']) },
      { intent: 'EXPERIENCE', score: calculateSimilarity(lowerMsg, ['experience', 'job', 'resume', 'career']) },
      { intent: 'SKILLS', score: calculateSimilarity(lowerMsg, ['skill', 'tech', 'stack', 'cpp', 'python']) },
      { intent: 'CONTACT', score: calculateSimilarity(lowerMsg, ['contact', 'email', 'reach']) },
      { intent: 'IDENTITY', score: calculateSimilarity(lowerMsg, ['who are you', 'bot', 'ai', 'jarvis']) },
      { intent: 'GREETING', score: calculateSimilarity(lowerMsg, ['hi', 'hello', 'hey']) }
    ];
  
    const bestMatch = intents.sort((a, b) => b.score - a.score)[0];
  
    if (bestMatch.intent === 'LINKEDIN_INIT' && bestMatch.score > 0) {
      return `**LinkedIn Sync Protocol v2.1**\n\nI will optimize your network vector. \n\n**Phase 1: Initialization**\n\nWhat is your **Primary Professional Goal** for the next 6 months?`;
    }
    if (bestMatch.intent === 'F1_DATA' && bestMatch.score > 0) {
       const standings = await fetchF1Standings();
       return `**Live Telemetry:**\n\n• **Driver:** ${standings.drivers[0].name} (${standings.drivers[0].points} PTS)\n• **Constructor:** ${standings.constructors[0].team} (${standings.constructors[0].points} PTS)\n\nRed Bull remains the dominant variable.`;
    }
    if (bestMatch.intent === 'PROJECTS' && bestMatch.score > 0) {
       return `Marco has deployed **${PROJECTS.length} major systems**.\n\nNotable: **${PROJECTS[0].title}** (${PROJECTS[0].category}).\n\nShall I pull the schematics?`;
    }
    if (bestMatch.intent === 'EXPERIENCE' && bestMatch.score > 0) {
      return `Current Trajectory:\n\n1. **${WORK_EXPERIENCE[0].company}** - ${WORK_EXPERIENCE[0].role}\n2. **${WORK_EXPERIENCE[1].company}** - ${WORK_EXPERIENCE[1].role}\n\nHigh-impact technical roles.`;
    }
    if (bestMatch.intent === 'SKILLS' && bestMatch.score > 0) {
      return `**Core Stack:**\n\n• Embedded: RTOS, PCB, C/C++\n• Software: React, Python, TypeScript\n• Engineering: MATLAB, SimScale\n\nA hybrid hardware-software profile.`;
    }
    if (bestMatch.intent === 'CONTACT' && bestMatch.score > 0) {
      return `Secure Channel: **mabautista358@gmail.com**`;
    }
    if (bestMatch.intent === 'IDENTITY' && bestMatch.score > 0) {
      return `I am J.A.R.V.I.S., Marco's digital interface. My code is elegant, my data is precise.`;
    }
    if (bestMatch.intent === 'GREETING' && bestMatch.score > 0) {
      return `System Online. How can I assist you today?`;
    }
  
    return `I did not recognize that command pattern. Try inquiring about **F1 Standings**, **Projects**, or initiate **Sync**.`;
};

// --- MAIN EXPORT ---

export const sendMessageToAgent = async (history: { role: 'user' | 'model'; text: string }[], newMessage: string): Promise<string> => {
    try {
        if (API_KEY) {
            // Prepare contents for Gemini
            const contents: Content[] = history.map(m => ({ 
                role: m.role === 'model' ? 'model' : 'user', 
                parts: [{ text: m.text }] 
            }));
            // Add the new message from user
            contents.push({ role: "user", parts: [{ text: newMessage }] });
            
            return await callGemini(contents);
        } else {
            console.warn("No API Key found. Using local fallback brain.");
            return await localAgent(history, newMessage);
        }
    } catch (error) {
        console.error("Agent Error (Fallback Triggered):", error);
        return await localAgent(history, newMessage);
    }
};
