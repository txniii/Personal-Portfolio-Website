
import React, { useState, useEffect, useRef } from 'react';

// --- DATA & TYPES ---

interface DriverStats {
    name: string;
    team: string;
    wins: number;
    poles: number;
    avgPitTime: number;
    color: string;
}

const DRIVERS: DriverStats[] = [
    { name: "Max Verstappen", team: "Red Bull", wins: 62, poles: 40, avgPitTime: 2.3, color: "text-blue-500" },
    { name: "Lewis Hamilton", team: "Ferrari", wins: 105, poles: 104, avgPitTime: 2.5, color: "text-red-500" },
    { name: "Lando Norris", team: "McLaren", wins: 3, poles: 2, avgPitTime: 2.4, color: "text-orange-500" }
];

interface EngineEra {
    name: string;
    years: string;
    specs: string;
    stats: { rpm: string; power: string; weight: string };
    desc: string;
}

const ERAS: EngineEra[] = [
    { 
        name: "V10 Era", 
        years: "1995-2005", 
        specs: "3.0L Naturally Aspirated", 
        stats: { rpm: "19,000", power: "900hp", weight: "90kg" },
        desc: "The golden age of sound. Unrestricted fuel flow and lightweight packaging created the most visceral driving experience in history."
    },
    { 
        name: "V8 Era", 
        years: "2006-2013", 
        specs: "2.4L Naturally Aspirated", 
        stats: { rpm: "18,000", power: "750hp", weight: "95kg" },
        desc: "Defined by regulation tightness and the introduction of KERS (Kinetic Energy Recovery System), foreshadowing the hybrid future."
    },
    { 
        name: "Turbo Hybrid", 
        years: "2014-Present", 
        specs: "1.6L V6 + ERS", 
        stats: { rpm: "15,000", power: "1000hp+", weight: "150kg+" },
        desc: "The most efficient internal combustion engines ever built. Thermal efficiency exceeding 50% via MGU-K and MGU-H integration."
    }
];

// --- SUB-COMPONENTS ---

// 1. Telemetry Graph (SVG)
const TelemetryGraph: React.FC<{ driver: DriverStats }> = ({ driver }) => {
    // Generate simulated lap data
    const points = Array.from({ length: 50 }, (_, i) => {
        const x = i * 6;
        const baseSpeed = 200;
        // Create a track profile (straights and corners)
        const y = baseSpeed + Math.sin(i * 0.2) * 100 + Math.random() * 10; 
        return `${x},${300 - y * 0.8}`;
    }).join(" ");

    return (
        <div className="relative w-full h-48 bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden">
            <div className="absolute top-2 left-3 text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
                Speed Trace [Simulated] - {driver.team}
            </div>
            <svg className="w-full h-full p-4" viewBox="0 0 300 150" preserveAspectRatio="none">
                {/* Grid Lines */}
                <path d="M0 30 H300 M0 75 H300 M0 120 H300" stroke="#333" strokeWidth="0.5" strokeDasharray="4 4" />
                
                {/* Data Line */}
                <polyline 
                    points={points} 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    className={`${driver.color} drop-shadow-[0_0_10px_rgba(currentColor,0.5)]`}
                >
                     <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="2s" />
                </polyline>
                
                {/* Gradient Fill */}
                <linearGradient id={`grad-${driver.name}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" className={driver.color} />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" className={driver.color} />
                </linearGradient>
                <polyline 
                    points={`${points} 300,150 0,150`} 
                    fill={`url(#grad-${driver.name})`} 
                    stroke="none" 
                    className={driver.color}
                />
            </svg>
        </div>
    );
};

// 2. 3D Wireframe Visualizer (Canvas) - Updated for Interaction
const AeroVisualizer: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Refs for animation loop variables to avoid re-renders
    const rotationRef = useRef({ x: 0.2, y: -0.5 });
    const isDraggingRef = useRef(false);
    const lastMouseRef = useRef({ x: 0, y: 0 });
    const mousePosRef = useRef({ x: 0, y: 0 });

    const hotspots = [
        { id: 1, x: 0, y: 0.2, z: -0.8, label: "Nose Cone", desc: "Impact structure & flow conditioning." },
        { id: 2, x: 1.4, y: 0.1, z: 0.2, label: "Endplate", desc: "Vortex generation to seal floor edges." },
        { id: 3, x: -1.4, y: 0.1, z: 0.2, label: "Endplate", desc: "Outwash generation." },
        { id: 4, x: 0.5, y: -0.1, z: 0.2, label: "Main Plane", desc: "Primary downforce generation." },
        { id: 5, x: -0.5, y: -0.1, z: 0.2, label: "Flap Adjust", desc: "Angle of attack mechanism." }
    ];

    // Wireframe Data (Front Wing Abstract)
    const vertices = [
        // Nose
        {x:0, y:0.2, z:-1.2}, {x:0.3, y:0.2, z:-0.5}, {x:-0.3, y:0.2, z:-0.5},
        // Main Plane Center
        {x:0.3, y:0, z:-0.5}, {x:-0.3, y:0, z:-0.5}, 
        // Main Plane Wings
        {x:1.5, y:0, z:0.3}, {x:1.5, y:0, z:-0.2}, {x:0.3, y:0, z:0.3}, 
        {x:-1.5, y:0, z:0.3}, {x:-1.5, y:0, z:-0.2}, {x:-0.3, y:0, z:0.3},
        // Endplates Right
        {x:1.5, y:0.4, z:0.3}, {x:1.5, y:0.4, z:-0.2},
        // Endplates Left
        {x:-1.5, y:0.4, z:0.3}, {x:-1.5, y:0.4, z:-0.2}
    ];

    const edges = [
        // Nose
        [0,1], [0,2], [1,2],
        // Wing connection to nose
        [1,3], [2,4],
        // Right Wing
        [3,7], [7,5], [5,6], [6,3], 
        // Left Wing
        [4,10], [10,8], [8,9], [9,4],
        // Right Endplate
        [5,11], [11,12], [12,6],
        // Left Endplate
        [8,13], [13,14], [14,9]
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrame: number;

        const render = () => {
            if (!canvas || !containerRef.current) return;
            const rect = canvas.getBoundingClientRect();
            
            // Handle canvas resize
            if (canvas.width !== rect.width || canvas.height !== rect.height) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }

            const width = canvas.width;
            const height = canvas.height;
            const cx = width / 2;
            const cy = height / 2;
            const scale = Math.min(width, height) * 0.25;

            ctx.clearRect(0, 0, width, height);

            // Auto rotate slowly if not dragging
            if (!isDraggingRef.current) {
                rotationRef.current.y += 0.002;
            }

            const cosY = Math.cos(rotationRef.current.y);
            const sinY = Math.sin(rotationRef.current.y);
            const cosX = Math.cos(rotationRef.current.x);
            const sinX = Math.sin(rotationRef.current.x);

            // Project Vertices
            const projected = vertices.map(v => {
                // Rotate Y
                let x = v.x * cosY - v.z * sinY;
                let z = v.x * sinY + v.z * cosY;
                
                // Rotate X
                let y = v.y * cosX - z * sinX;
                z = v.y * sinX + z * cosX;

                // Perspective
                const fov = 5; // Field of view
                const dist = fov / (fov + z);
                
                return {
                    x: cx + x * scale * dist,
                    y: cy + y * scale * dist,
                    z: z
                };
            });

            // Draw Edges
            ctx.strokeStyle = '#00f2fe';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            edges.forEach(([i, j]) => {
                if (projected[i] && projected[j]) {
                    ctx.moveTo(projected[i].x, projected[i].y);
                    ctx.lineTo(projected[j].x, projected[j].y);
                }
            });
            ctx.stroke();

            // Project and Draw Hotspots
            let activePoint = null;

            hotspots.forEach(h => {
                // Rotate Y
                let x = h.x * cosY - h.z * sinY;
                let z = h.x * sinY + h.z * cosY;
                
                // Rotate X
                let y = h.y * cosX - z * sinX;
                z = h.y * sinX + z * cosX;

                const fov = 5;
                const dist = fov / (fov + z);
                
                const px = cx + x * scale * dist;
                const py = cy + y * scale * dist;

                // Check mouse distance
                const dx = mousePosRef.current.x - px;
                const dy = mousePosRef.current.y - py;
                const distance = Math.sqrt(dx*dx + dy*dy);

                if (distance < 25) {
                    activePoint = { x: px, y: py, data: h };
                }

                // Draw Hotspot Marker
                ctx.fillStyle = 'rgba(0, 242, 254, 0.8)';
                ctx.beginPath();
                ctx.arc(px, py, 3, 0, Math.PI * 2);
                ctx.fill();
                
                // Pulsing ring
                ctx.strokeStyle = `rgba(0, 242, 254, ${0.4 + Math.sin(Date.now() / 200) * 0.3})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(px, py, 6 + Math.sin(Date.now() / 200) * 2, 0, Math.PI * 2);
                ctx.stroke();
            });

            // Draw Tooltip (on top of everything)
            if (activePoint) {
                const { x, y, data } = activePoint;
                
                // Connector line
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + 20, y - 30);
                ctx.lineTo(x + 160, y - 30);
                ctx.stroke();
                
                // Dot at elbow
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(x + 20, y - 30, 2, 0, Math.PI * 2);
                ctx.fill();

                // Text Background (Semi-transparent black)
                ctx.fillStyle = 'rgba(10, 10, 10, 0.85)';
                ctx.fillRect(x + 20, y - 55, 140, 25);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.strokeRect(x + 20, y - 55, 140, 25);
                
                // Labels
                ctx.fillStyle = '#00f2fe';
                ctx.font = 'bold 11px Courier New';
                ctx.fillText(data.label.toUpperCase(), x + 28, y - 39);
                
                ctx.fillStyle = '#cccccc';
                ctx.font = '10px sans-serif';
                ctx.fillText(data.desc, x + 25, y - 18);
            }
            
            // Update Cursor
            if (containerRef.current) {
                containerRef.current.style.cursor = isDraggingRef.current ? 'grabbing' : activePoint ? 'pointer' : 'grab';
            }

            animationFrame = requestAnimationFrame(render);
        };
        
        render();
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    const onMouseDown = (e: React.MouseEvent) => {
        isDraggingRef.current = true;
        lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: React.MouseEvent) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
            mousePosRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        }

        if (isDraggingRef.current) {
            const dx = e.clientX - lastMouseRef.current.x;
            const dy = e.clientY - lastMouseRef.current.y;
            rotationRef.current.y += dx * 0.01;
            rotationRef.current.x += dy * 0.01;
            lastMouseRef.current = { x: e.clientX, y: e.clientY };
        }
    };

    const onMouseUp = () => {
        isDraggingRef.current = false;
    };
    
    const onMouseLeave = () => {
        isDraggingRef.current = false;
    };

    return (
        <div ref={containerRef} className="relative w-full h-80 bg-[#050505] rounded-xl border border-white/10 overflow-hidden group">
            <div className="absolute top-3 left-3 z-10 pointer-events-none">
                <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                    <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest">Interactive Aero Model</span>
                </div>
                <div className="text-[9px] text-neutral-500 mt-1">Drag to Rotate • Hover Hotspots</div>
            </div>
            
            <canvas 
                ref={canvasRef} 
                className="w-full h-full block touch-none"
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
            />
            
            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,254,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,254,0.03)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none"></div>
        </div>
    );
};

// 3. Pit Stop Game
const PitStopGame: React.FC = () => {
    const [state, setState] = useState<'idle' | 'waiting' | 'ready' | 'finished'>('idle');
    const [time, setTime] = useState(0);
    const timerRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);

    const handleStart = () => {
        if (state === 'idle' || state === 'finished') {
            setState('waiting');
            setTime(0);
            const delay = 2000 + Math.random() * 3000;
            setTimeout(() => {
                setState('ready');
                startTimeRef.current = performance.now();
                timerRef.current = window.setInterval(() => {
                    setTime(performance.now() - startTimeRef.current);
                }, 10);
            }, delay);
        } else if (state === 'ready') {
            clearInterval(timerRef.current);
            setState('finished');
        } else if (state === 'waiting') {
            // Early start penalty
            setState('idle');
            alert("Jump start penalty! Wait for the lights.");
        }
    };

    return (
        <div className="bg-[#111] p-6 rounded-2xl border border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Pit Stop Reaction Sim</h4>
            
            <div 
                onClick={handleStart}
                className={`
                    w-full h-32 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 select-none
                    ${state === 'idle' ? 'bg-neutral-800 hover:bg-neutral-700' : 
                      state === 'waiting' ? 'bg-red-900 border-2 border-red-600' :
                      state === 'ready' ? 'bg-green-600 border-4 border-green-400 scale-105' :
                      'bg-blue-900 border-2 border-blue-500'}
                `}
            >
                {state === 'idle' && <span className="text-white font-bold">CLICK TO SERVICE</span>}
                {state === 'waiting' && <span className="text-red-200 font-mono animate-pulse">HOLD...</span>}
                {state === 'ready' && <span className="text-white font-black text-3xl">RELEASE!</span>}
                {state === 'finished' && (
                    <div>
                        <div className="text-4xl font-mono font-bold text-white mb-1">{(time / 1000).toFixed(3)}s</div>
                        <div className="text-[10px] text-blue-300 uppercase">World Record: 1.80s</div>
                    </div>
                )}
            </div>
            
            <div className="mt-4 text-[10px] text-neutral-500">
                Tests your reaction time simulating the mechanic's gun release signal.
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

export const F1: React.FC = () => {
    const [activeDriverIdx, setActiveDriverIdx] = useState(0);
    const [strategyInput, setStrategyInput] = useState({ track: 'Monaco', condition: 'Wet' });
    const [showLogic, setShowLogic] = useState(false);
    const [eraIdx, setEraIdx] = useState(2);

    const activeDriver = DRIVERS[activeDriverIdx];

    const getStrategy = () => {
        if (strategyInput.condition === 'Wet') return "Start Intermediates → No Pit Stop (Track Position Critical)";
        if (strategyInput.track === 'Monaco') return "Soft → Hard (Lap 24) - Overcut Strategy";
        return "Medium → Hard (Lap 18) - Undercut Strategy";
    };

    return (
        <section id="f1" className="py-32 bg-black relative min-h-screen border-t border-neutral-900">
             {/* Background Tech Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-16">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="h-px w-12 bg-red-600"></div>
                        <span className="text-red-500 font-mono text-xs font-bold tracking-[0.2em] uppercase">Advanced Systems</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
                        Telemetry <span className="text-neutral-600">Hub.</span>
                    </h2>
                    <p className="text-neutral-400 max-w-2xl font-light text-lg">
                        Using Formula 1 as a metaphor for high-performance engineering, data analysis, and strategic optimization.
                    </p>
                </div>

                {/* 1. DASHBOARD GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
                    
                    {/* Left: Driver Telemetry (8 Cols) */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Selector */}
                        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
                            {DRIVERS.map((d, i) => (
                                <button
                                    key={d.name}
                                    onClick={() => setActiveDriverIdx(i)}
                                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all whitespace-nowrap ${i === activeDriverIdx ? 'bg-white text-black border-white' : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-white/30'}`}
                                >
                                    {d.name}
                                </button>
                            ))}
                        </div>

                        {/* Graph Card */}
                        <div className="bg-[#111] border border-white/5 rounded-3xl p-6 md:p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{activeDriver.name}</h3>
                                    <div className={`text-xs font-bold uppercase tracking-wider ${activeDriver.color}`}>{activeDriver.team}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-mono font-bold text-white">{activeDriver.wins}</div>
                                    <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Career Wins</div>
                                </div>
                            </div>
                            
                            <TelemetryGraph driver={activeDriver} />
                            
                            <div className="grid grid-cols-3 gap-4 mt-6">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="text-neutral-500 text-[10px] uppercase mb-1">Pole Positions</div>
                                    <div className="text-white font-mono font-bold">{activeDriver.poles}</div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="text-neutral-500 text-[10px] uppercase mb-1">Avg Pit Stop</div>
                                    <div className="text-white font-mono font-bold">{activeDriver.avgPitTime}s</div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="text-neutral-500 text-[10px] uppercase mb-1">Grid Delta</div>
                                    <div className="text-green-400 font-mono font-bold">-0.21s</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Strategy & Game (4 Cols) */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Predictive Engine */}
                        <div className="bg-[#111] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-purple-900/20 rounded-full blur-2xl"></div>
                             
                             <h3 className="text-lg font-bold text-white mb-4 relative z-10">Strategy Engine</h3>
                             
                             <div className="space-y-4 relative z-10">
                                 <div className="grid grid-cols-2 gap-3">
                                     <select 
                                        value={strategyInput.track}
                                        onChange={(e) => setStrategyInput({...strategyInput, track: e.target.value})}
                                        className="bg-[#222] text-white text-xs p-2 rounded border border-white/10 outline-none"
                                     >
                                         <option value="Monaco">Monaco</option>
                                         <option value="Silverstone">Silverstone</option>
                                         <option value="Monza">Monza</option>
                                     </select>
                                     <select 
                                        value={strategyInput.condition}
                                        onChange={(e) => setStrategyInput({...strategyInput, condition: e.target.value})}
                                        className="bg-[#222] text-white text-xs p-2 rounded border border-white/10 outline-none"
                                     >
                                         <option value="Dry">Dry</option>
                                         <option value="Wet">Wet</option>
                                         <option value="Mixed">Mixed</option>
                                     </select>
                                 </div>

                                 <div className="p-4 bg-black/40 rounded-xl border-l-2 border-purple-500">
                                     <div className="text-[10px] text-purple-400 uppercase mb-1">Recommended Strategy</div>
                                     <div className="text-white text-sm font-medium leading-tight">
                                         {getStrategy()}
                                     </div>
                                 </div>

                                 <button 
                                    onClick={() => setShowLogic(!showLogic)}
                                    className="text-[10px] text-neutral-500 hover:text-white underline decoration-dotted transition-colors"
                                 >
                                     {showLogic ? "Hide Algorithm" : "View Algorithm Logic"}
                                 </button>
                                 
                                 {showLogic && (
                                     <div className="text-[10px] font-mono text-green-400 bg-[#050505] p-3 rounded border border-white/10">
                                         {`def calculate_strat(track, weather):`} <br/>
                                         {`  if weather == 'Wet': return NO_STOP`} <br/>
                                         {`  deg = track_degradation[track]`} <br/>
                                         {`  return optimize(stops, deg)`}
                                     </div>
                                 )}
                             </div>
                        </div>

                        {/* Pit Stop Game */}
                        <PitStopGame />
                    </div>
                </div>

                {/* 2. ENGINEERING DEEP DIVE */}
                <div className="mb-20">
                     <h2 className="text-2xl font-bold text-white mb-8">Engineering Deep Dive</h2>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {/* Aero Visualizer */}
                         <div className="bg-[#111] border border-white/5 rounded-3xl p-6">
                             <div className="flex justify-between items-center mb-6">
                                 <h3 className="text-lg font-bold text-white">Aero Concepts</h3>
                                 <span className="text-[10px] bg-cyan-900/20 text-cyan-400 px-2 py-1 rounded border border-cyan-500/20">WebGL / Canvas</span>
                             </div>
                             <p className="text-sm text-neutral-400 mb-6">
                                 Interactive visualization of aerodynamic surfaces. Mouse over to rotate the wireframe model and explore components.
                             </p>
                             <AeroVisualizer />
                         </div>

                         {/* Engine Regulation Time-Lapse */}
                         <div className="bg-[#111] border border-white/5 rounded-3xl p-6 flex flex-col">
                             <div className="flex justify-between items-center mb-6">
                                 <h3 className="text-lg font-bold text-white">Power Unit Evolution</h3>
                                 <span className="text-[10px] bg-orange-900/20 text-orange-400 px-2 py-1 rounded border border-orange-500/20">SQL / Data</span>
                             </div>
                             
                             <div className="flex-1 flex flex-col justify-center">
                                 <input 
                                    type="range" 
                                    min="0" 
                                    max="2" 
                                    value={eraIdx} 
                                    onChange={(e) => setEraIdx(Number(e.target.value))}
                                    className="w-full mb-8 accent-white cursor-pointer"
                                 />
                                 
                                 <div className="relative animate-fade-in">
                                     <div className="flex justify-between items-end mb-2">
                                         <h4 className="text-2xl font-bold text-white">{ERAS[eraIdx].name}</h4>
                                         <span className="text-sm font-mono text-neutral-500">{ERAS[eraIdx].years}</span>
                                     </div>
                                     <div className="text-sm text-neutral-300 font-medium mb-4">{ERAS[eraIdx].specs}</div>
                                     <p className="text-sm text-neutral-400 mb-6 leading-relaxed min-h-[60px]">
                                         {ERAS[eraIdx].desc}
                                     </p>
                                     
                                     <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                                         <div>
                                             <div className="text-[10px] text-neutral-500 uppercase">RPM Limit</div>
                                             <div className="text-white font-mono">{ERAS[eraIdx].stats.rpm}</div>
                                         </div>
                                         <div>
                                             <div className="text-[10px] text-neutral-500 uppercase">Output</div>
                                             <div className="text-white font-mono">{ERAS[eraIdx].stats.power}</div>
                                         </div>
                                         <div>
                                             <div className="text-[10px] text-neutral-500 uppercase">Weight</div>
                                             <div className="text-white font-mono">{ERAS[eraIdx].stats.weight}</div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                </div>

                {/* 3. PERSONAL CONNECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1c1c1e] to-black border border-white/5 hover:border-white/20 transition-all group">
                        <div className="text-3xl mb-4">🏆</div>
                        <h3 className="text-xl font-bold text-white mb-2">'My Grand Prix' Project</h3>
                        <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                            How I applied F1's "marginal gains" philosophy to optimize a React Native application, reducing load times by 40% through rigorous profiling and asset compression.
                        </p>
                        <span className="text-xs font-bold text-white uppercase tracking-wider group-hover:underline">Read Case Study &rarr;</span>
                    </div>

                    <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1c1c1e] to-black border border-white/5 hover:border-white/20 transition-all group">
                        <div className="text-3xl mb-4">📝</div>
                        <h3 className="text-xl font-bold text-white mb-2">Themed Analysis</h3>
                        <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                            "What Software Engineering Can Learn from F1 Strategy": A deep dive into decision making under pressure, probabilistic modeling, and the cost of latency.
                        </p>
                        <span className="text-xs font-bold text-white uppercase tracking-wider group-hover:underline">Read Article &rarr;</span>
                    </div>
                </div>

            </div>
        </section>
    );
};
