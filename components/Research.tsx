
import React, { useState } from 'react';

// --- Types & Data ---

interface SourceLink {
  type: 'PDF' | 'REPO' | 'SIM' | 'DATABASE' | 'BLUEPRINT' | 'TELEMETRY';
  label: string;
  url: string;
}

// Unified interface for both Academic and F1 topics
interface DetailedTopic {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  desc: string; // Short description for card
  abstract: string; // Long description for modal
  methodology: string[];
  methodologyDetails: string[];
  metrics: { label: string; value: string; trend?: 'up' | 'down' }[];
  citations?: number;
  extendedTech: string[];
  sources: SourceLink[];
  
  // F1 Specific
  discipline?: string;
  status?: 'Active' | 'Simulated' | 'Deployed' | 'Prototyped';
  icon?: React.ReactNode;
  techSpecs?: string[]; // Used in F1 Card
  impact?: string;      // Used in F1 Card
}

const F1_ENGINEERING_DATA: DetailedTopic[] = [
  {
    id: 'f1-aero',
    discipline: 'Aerodynamics',
    title: 'Active Aero & Ground Effect',
    subtitle: 'CFD Optimization of Venturi Tunnels',
    year: '2025',
    tags: ['CFD', 'Aerodynamics', 'Fluid Dynamics'],
    desc: 'Computational Fluid Dynamics (CFD) optimization of Venturi tunnels for maximum downforce, managing flow separation and porpoising phenomena.',
    abstract: 'Maximizing downforce while managing porpoising is the primary aerodynamic challenge of the current regulation set. This research utilizes massive parallel CFD simulations to optimize the floor edge vorticity. Furthermore, we prototyped an active slat mechanism (concept) that dynamically alters wing angle-of-attack based on GPS position and brake pressure to shed drag on straights.',
    methodology: [
        "RANS/LES CFD Simulations",
        "Wind Tunnel Correlation",
        "Vortex Generator Placement",
        "Porpoising Mitigation Strategy"
    ],
    methodologyDetails: [
        "Ran 500+ simulations using OpenFOAM on a high-performance compute cluster to map pressure distribution under the floor and identify stall points.",
        "Correlated CFD results with 60% scale wind tunnel PIV (Particle Image Velocimetry) data to refine turbulence models and boundary layer assumptions.",
        "Iteratively tested vortex generator geometries to seal the floor edge, preventing low-pressure leakage and maintaining suction.",
        "Developed suspension damper maps to mechanically stabilize the platform ride height, reducing aerodynamic stall cycles (porpoising)."
    ],
    metrics: [
        { label: "Downforce", value: "+2500N", trend: "up" },
        { label: "Drag", value: "-4.2%", trend: "down" },
        { label: "Efficiency", value: "L/D 4.5", trend: "up" }
    ],
    extendedTech: ["OpenFOAM", "ANSYS Fluent", "Python (Data Analysis)", "CATIA V5", "High-Performance Computing"],
    sources: [
        { type: "SIM", label: "CFD Flow Field", url: "#" },
        { type: "PDF", label: "Wind Tunnel Report", url: "#" }
    ],
    techSpecs: ['CFD RANS', 'Active Slats', 'Ground Effect', 'Vortex Gen'],
    impact: '-12% Drag / +2.5G Cornering',
    status: 'Active',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
         <path d="M9.5 5.5c2.5-1.5 5.5-1.5 8 0" />
         <path d="M2 12h20" />
         <path d="M5 18c2.5 1.5 5.5 1.5 8 0" />
         <path d="M12 9v6" />
      </svg>
    )
  },
  {
    id: 'f1-mat',
    discipline: 'Materials Science',
    title: 'Sustainable Bio-Composites',
    subtitle: 'Flax Fiber & Recycled Additive Mfg',
    year: '2024',
    tags: ['Materials', '3D Printing', 'Sustainability'],
    desc: 'Transitioning from traditional carbon fiber to flax-based bio-composites for non-structural bodywork to meet net-zero carbon goals.',
    abstract: 'To meet the sport\'s net-zero carbon goals, this project explores the substitution of non-structural carbon fiber panels with flax-based composites. Additionally, we employ Direct Metal Laser Sintering (DMLS) to manufacture suspension uprights. Topology optimization algorithms remove material from low-stress regions, resulting in organic, bone-like structures that are lighter yet stiffer than machined equivalents.',
    methodology: [
        "Material Characterization",
        "Topology Optimization",
        "DMLS Printing Parameters",
        "Destructive Testing"
    ],
    methodologyDetails: [
        "Conducted tensile and flexural testing on flax fiber weaves to determine Young's modulus and failure modes compared to traditional pre-preg carbon.",
        "Used Altair OptiStruct to generate density maps, minimizing mass while adhering to stiffness constraints under braking and cornering loads.",
        "Optimized laser power and scan speed for Scalmalloy printing to minimize porosity and residual thermal stress.",
        "Validated printed parts via X-ray CT scanning and physical load testing to failure to certify safety factors."
    ],
    metrics: [
        { label: "Weight", value: "-40%", trend: "down" },
        { label: "Cost", value: "-15%", trend: "down" },
        { label: "CO2", value: "-60%", trend: "down" }
    ],
    extendedTech: ["Altair OptiStruct", "EOS M290 Printer", "Materialise Magics", "Instron Testing"],
    sources: [
        { type: "PDF", label: "Material Datasheet", url: "#" },
        { type: "BLUEPRINT", label: "Upright CAD", url: "#" }
    ],
    techSpecs: ['Flax Fiber', 'DMLS', 'Topology Opt', 'Scalmalloy'],
    impact: '40% Carbon Footprint Reduction',
    status: 'Deployed',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05" />
        <path d="M12 22.08V12" />
      </svg>
    )
  },
  {
    id: 'f1-porous',
    discipline: 'Thermodynamics',
    title: 'Porous Composites & Media',
    subtitle: 'TPMS Heat Exchanger Optimization',
    year: '2025',
    tags: ['Thermal', 'Additive Mfg', 'Porous Media'],
    desc: 'Development of Triply Periodic Minimal Surface (TPMS) porous structures for next-gen compact heat exchangers, maximizing thermal rejection.',
    abstract: 'Traditional tube-and-fin radiators are reaching their thermodynamic limits within the aerodynamic constraints of F1 sidepods. This project investigates the application of Porous Media mechanics using Gyroid lattice structures. By controlling the porosity and specific surface area gradient of AlSi10Mg printed cores, we decouple the trade-off between heat transfer efficiency and hydraulic pressure drop.',
    methodology: [
        "Implicit Modeling (nTopology)",
        "Conjugate Heat Transfer CFD",
        "Darcy-Forchheimer Tuning",
        "DMLS Printing"
    ],
    methodologyDetails: [
        "Generated variable-density gyroid lattices using nTopology to bias fluid flow towards hotter boundary layers, optimizing thermal gradients.",
        "Performed CHT simulations in ANSYS Fluent to derive the Nusselt correlations specific to the lattice topology.",
        "Calibrated the permeability and inertial resistance coefficients (Darcy-Forchheimer) for system-level 1D simulation integration.",
        "Manufactured test coupons using DMLS to verify wall thickness fidelity (down to 150µm) and structural integrity."
    ],
    metrics: [
        { label: "Heat Rejection", value: "+18%", trend: "up" },
        { label: "Pressure Drop", value: "-5%", trend: "down" },
        { label: "Mass", value: "-200g", trend: "down" }
    ],
    extendedTech: ["nTopology", "ANSYS CFX", "Matlab", "Computed Tomography", "Metal 3D Printing"],
    sources: [
        { type: "SIM", label: "CHT Flow Fields", url: "#" },
        { type: "PDF", label: "Permeability Study", url: "#" }
    ],
    techSpecs: ['TPMS Gyroid', 'AlSi10Mg', 'High Surface Area', 'Low Delta-P'],
    impact: 'Compact Packaging / Drag Reduction',
    status: 'Prototyped',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
         <path d="M4 14a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6H4v-6z" />
         <path d="M12 10V4" />
         <path d="M8 7l4-3 4 3" />
         <circle cx="8" cy="18" r="1" fill="currentColor" />
         <circle cx="12" cy="18" r="1" fill="currentColor" />
         <circle cx="16" cy="18" r="1" fill="currentColor" />
      </svg>
    )
  },
  {
    id: 'f1-elec',
    discipline: 'Electrical Engineering',
    title: 'High-Voltage Hybrid Architecture (800V)',
    subtitle: 'Next-Gen ERS & SiC Inverter Topology',
    year: '2025',
    tags: ['Power Electronics', 'SiC', '800V Architecture'],
    desc: 'Design and optimization of the Energy Recovery System (ERS). Focusing on the MGU-K and MGU-H inverter topologies to maximize efficiency.',
    abstract: 'The modern F1 power unit requires managing energy flows exceeding 4MJ per lap with efficiencies above 96%. This project focuses on the transition to an 800V bus architecture utilizing Silicon Carbide (SiC) MOSFETs. The higher voltage reduces current demand, minimizing I²R losses in the loom, while SiC technology enables switching frequencies up to 100kHz, drastically reducing the size of passive filter components.',
    methodology: [
        "Inverter Topology Selection",
        "Thermal Management Simulation",
        "Gate Driver Optimization",
        "High-Voltage Bench Testing"
    ],
    methodologyDetails: [
        "Evaluated 3-level ANPC vs. 2-level topologies. Selected 3-level Active Neutral Point Clamped for reduced harmonic distortion.",
        "Modeled junction temperatures using ANSYS Icepak. Designed a micro-channel liquid cooling cold plate directly sintered to the power module substrate.",
        "Tuned gate resistance (Rg) and dead-time parameters to mitigate voltage overshoot (Vds) during hard switching events.",
        "Conducted load testing at 900V/600A on a dynamometer to validate thermal models and efficiency maps across the RPM range."
    ],
    metrics: [
        { label: "Efficiency", value: "98.4%", trend: "up" },
        { label: "Weight", value: "-1.2kg", trend: "down" },
        { label: "Power Density", value: "120kW/L", trend: "up" }
    ],
    extendedTech: ["SiC MOSFETs", "ANSYS Icepak", "Altium Designer", "Simulink", "C++ (Inverter Control)", "HV Safety Protocols"],
    sources: [
        { type: "BLUEPRINT", label: "Inverter Schematic", url: "#" },
        { type: "TELEMETRY", label: "Dyno Efficiency Map", url: "#" },
        { type: "PDF", label: "Thermal Analysis", url: "#" }
    ],
    techSpecs: ['800V Bus', 'SiC Inverters', '4MJ/Lap', 'Liquid Cooling'],
    impact: '+160bhp / 33% Efficiency Gain',
    status: 'Deployed',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    )
  },
  {
    id: 'f1-emb',
    discipline: 'Embedded Systems',
    title: 'Real-Time Telemetry & RTOS',
    subtitle: 'Low-Latency Sensor Fusion Kernel',
    year: '2024',
    tags: ['RTOS', 'FPGA', 'Telemetry'],
    desc: 'Development of hard real-time scheduler algorithms for the TAG-320 ECU. Implementing kernel-bypass networking to handle 1,500+ sensor channels.',
    abstract: 'In Formula 1, data is as valuable as fuel. This project involves the development of a custom RTOS scheduler designed to handle over 1,500 data channels at rates up to 1kHz. By offloading sensor pre-processing to an on-board FPGA, we relieve the main ECU CPU load, ensuring critical control loops (throttle, brake-by-wire) maintain deterministic execution times under <50µs jitter.',
    methodology: [
        "RTOS Scheduler Design",
        "FPGA Offloading Logic",
        "Kernel Bypass Networking",
        "Jitter Analysis"
    ],
    methodologyDetails: [
        "Implemented a Rate Monotonic Scheduling (RMS) algorithm to prioritize critical control tasks over telemetry logging.",
        "Designed Verilog modules for the Artix-7 FPGA to handle raw ADC filtering and decimation, piping clean data to the CPU via DMA.",
        "Utilized DPDK (Data Plane Development Kit) principles to bypass the OS networking stack, writing telemetry packets directly to the network interface controller.",
        "Measured interrupt latency and task switching times using hardware trace probes to certify safety-critical compliance."
    ],
    metrics: [
        { label: "Throughput", value: "1.2GB/s", trend: "up" },
        { label: "Latency", value: "<1ms", trend: "down" },
        { label: "Packet Loss", value: "0.0%", trend: "down" }
    ],
    extendedTech: ["FreeRTOS", "Verilog", "C/C++", "Wireshark", "SystemTrace", "ARM Cortex-R52"],
    sources: [
        { type: "REPO", label: "RTOS Kernel Source", url: "#" },
        { type: "TELEMETRY", label: "Bandwidth Logs", url: "#" }
    ],
    techSpecs: ['FreeRTOS', 'FPGA', 'CAN Bus', '1.2GB/s'],
    impact: 'Zero-Packet-Loss Telemetry',
    status: 'Active',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <path d="M7 8h10" />
        <path d="M7 12h6" />
      </svg>
    )
  },
  {
    id: 'f1-ctrl',
    discipline: 'Controls Engineering',
    title: 'Active Differential Control',
    subtitle: 'Torque Vectoring via MPC',
    year: '2025',
    tags: ['Controls', 'MPC', 'Dynamics'],
    desc: 'Modeling non-linear tire slip dynamics to optimize electro-hydraulic differential locking. Utilizing Model Predictive Control (MPC).',
    abstract: 'Traction is the limiting factor in slow-speed corner performance. This control system replaces traditional reactive PID differential maps with a predictive model. By estimating track friction coefficients in real-time and predicting the vehicle yaw response over a finite horizon, the system pre-emptively locks or opens the differential to maximize longitudinal acceleration without inducing understeer.',
    methodology: [
        "Vehicle Dynamics Modeling",
        "MPC Horizon Tuning",
        "Hydraulic Actuation Logic",
        "Driver-in-Loop Simulation"
    ],
    methodologyDetails: [
        "Created a 7-DOF vehicle model in Simulink capturing tire non-linearities (Pacejka Magic Formula).",
        "Formulated the optimization problem to minimize yaw rate error and slip ratio cost functions over a 100ms horizon.",
        "Mapped control outputs to hydraulic valve currents, compensating for fluid viscosity changes with temperature.",
        "Validated control strategies with professional drivers in a motion-platform simulator to ensure natural handling feel."
    ],
    metrics: [
        { label: "Exit Speed", value: "+4kph", trend: "up" },
        { label: "Tire Wear", value: "-10%", trend: "down" },
        { label: "Compute", value: "5ms", trend: "down" }
    ],
    extendedTech: ["Matlab/Simulink", "dSPACE", "C++", "MPC", "Vehicle Dynamics"],
    sources: [
        { type: "SIM", label: "Simulink Model", url: "#" },
        { type: "TELEMETRY", label: "Yaw Rate Logs", url: "#" }
    ],
    techSpecs: ['MPC', 'Simulink', 'Hydraulics', '5ms Loop'],
    impact: 'Corner Exit Speed +4%',
    status: 'Simulated',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    )
  },
];

const ACADEMIC_DATA: DetailedTopic[] = [
  {
    id: 'acad-1',
    title: "Autonomous Path Planning",
    subtitle: "A* Algorithm optimization for unstructured terrain",
    year: "2024",
    tags: ["Robotics", "C++", "Python"],
    desc: "Implemented a modified A* search algorithm incorporating kinematic constraints for a 4-wheel rover.",
    abstract: "Path planning in unstructured environments presents unique challenges regarding traversability and kinematic constraints. This paper proposes a modified A* search algorithm that integrates vehicle dynamics directly into the cost function. By weighting traversal cost with surface roughness estimates derived from LIDAR point clouds, we achieve significantly smoother trajectories that minimize mechanical stress on the rover chassis.",
    methodology: [
        "Lidar Point Cloud Segmentation",
        "Kinematic Cost Function Derivation",
        "Heuristic Weighting Optimization",
        "Gazebo Simulation with ROS 2"
    ],
    methodologyDetails: [
        "Applied Euclidean Cluster Extraction to segment non-ground obstacles. Implemented Voxel Grid filtering (leaf size 0.05m) to downsample heavy point clouds while preserving geometric fidelity.",
        "Formulated a multi-objective cost function J(x) = w1*dist + w2*roughness + w3*energy. Energy term derived from wheel-soil interaction models (Bekker theory).",
        "Developed a custom admissible heuristic h(n) combining Euclidean distance with a terrain difficulty penalty map pre-computed via satellite imagery.",
        "Simulated in Gazebo Ignition utilizing ODE physics engine. Modeled slip and friction coefficients for Martian regolith simulant (JSC-1A)."
    ],
    metrics: [
        { label: "Compute Reduction", value: "40%", trend: "up" },
        { label: "Path Smoothness", value: "+25%", trend: "up" },
        { label: "Traversal Success", value: "99.9%", trend: "up" }
    ],
    extendedTech: ["ROS 2 Humble", "Gazebo Ignition", "PCL", "Eigen", "C++17", "Python 3.10", "OpenCV", "Docker"],
    sources: [
        { type: "PDF", label: "Full Dissertation (Encrypted)", url: "#" },
        { type: "REPO", label: "GitHub: /autonomous-rover-nav", url: "#" },
        { type: "SIM", label: "Gazebo World Files", url: "#" }
    ]
  },
  {
    id: 'acad-2',
    title: "IoT Environmental Grid",
    subtitle: "Low-power mesh network for climate monitoring",
    year: "2023",
    tags: ["IoT", "Embedded", "LoRaWAN"],
    desc: "Designed a distributed sensor array using ESP32 modules communicating via LoRaWAN. Optimized sleep cycles to achieve 6-month battery life.",
    abstract: "Remote environmental monitoring requires robust, low-power communication networks. This project evaluates a mesh network topology utilizing LoRaWAN for long-range, low-bitrate data transmission. We introduce an adaptive duty-cycling algorithm that dynamically adjusts sleep intervals based on battery voltage and solar harvesting rates.",
    methodology: [
        "Hardware Design (ESP32 + SX1276)",
        "Mesh Protocol Implementation",
        "Adaptive Duty Cycling Algorithm",
        "Field Testing (5km Range)"
    ],
    methodologyDetails: [
        "Integrated ESP32-WROOM-32 with Semtech SX1276 LoRa transceiver. Designed custom PCB with impedance-matched antenna circuitry.",
        "Implemented a custom flooding-based mesh protocol with Time-To-Live (TTL) packet management to prevent broadcast storms.",
        "Developed a PID-controlled sleep scheduler. Sampling rate acts as the control variable, dynamically adjusted based on the state-of-charge.",
        "Conducted line-of-sight (LOS) and non-LOS testing. Achieved -120dBm receiver sensitivity with spreading factor SF12."
    ],
    metrics: [
        { label: "Battery Life", value: "6 Months", trend: "up" },
        { label: "Packet Loss", value: "< 0.5%", trend: "down" },
        { label: "Range", value: "5km", trend: "up" }
    ],
    extendedTech: ["ESP-IDF", "FreeRTOS", "LoRaWAN", "Altium Designer", "C++", "MQTT", "InfluxDB", "Grafana"],
    sources: [
        { type: "PDF", label: "Network Topology Analysis", url: "#" },
        { type: "REPO", label: "Firmware Source", url: "#" },
        { type: "BLUEPRINT", label: "PCB Schematics", url: "#" }
    ]
  },
  {
    id: 'acad-3',
    title: "FPGA Image Processing",
    subtitle: "Real-time edge detection pipeline",
    year: "2023",
    tags: ["Verilog", "FPGA", "Computer Vision"],
    desc: "Developed a hardware-accelerated Sobel filter pipeline on a Xilinx Artix-7 FPGA, achieving 60fps processing at 1080p resolution.",
    abstract: "Software-based image processing often introduces unacceptable latency for real-time control systems. This research presents a fully pipelined architecture for Sobel Edge Detection implemented on a Xilinx Artix-7 FPGA. By exploiting parallelism, we demonstrate a 20x throughput improvement over equivalent ARM Cortex-A9 software implementations.",
    methodology: [
        "Verilog RTL Design",
        "Pipeline Stage Optimization",
        "VGA Controller Implementation",
        "Timing Analysis"
    ],
    methodologyDetails: [
        "Designed the datapath at Register Transfer Level (RTL) using Verilog HDL. Implemented line buffers using Block RAM (BRAM).",
        "Inserted register stages between combinational logic blocks to reduce critical path delay, increasing Fmax to 148.5MHz.",
        "Wrote a custom VGA timing generator conforming to VESA standards. Synchronized pixel clock domains using MMCM.",
        "Performed Static Timing Analysis (STA) using Vivado to ensure setup and hold time violations were resolved."
    ],
    metrics: [
        { label: "Throughput", value: "60 FPS", trend: "up" },
        { label: "Resolution", value: "1080p", trend: "up" },
        { label: "Latency", value: "< 1ms", trend: "down" }
    ],
    extendedTech: ["Xilinx Vivado", "Verilog", "ModelSim", "Artix-7 FPGA", "MATLAB", "Tcl Scripting"],
    sources: [
        { type: "REPO", label: "RTL Codebase", url: "#" },
        { type: "SIM", label: "Waveform Simulation", url: "#" },
        { type: "PDF", label: "Timing Report", url: "#" }
    ]
  },
  {
    id: 'acad-4',
    title: "Swarm Robotics Coordination",
    subtitle: "Decentralized consensus for search & rescue",
    year: "2024",
    tags: ["ROS2", "C++", "Swarm Intelligence"],
    desc: "Simulated a decentralized control strategy for a swarm of 20 robots to map unknown environments without a central server.",
    abstract: "Centralized control in robotic swarms introduces a single point of failure. This paper explores a decentralized consensus algorithm for Search and Rescue (SAR) operations. Using local neighbor-to-neighbor communication, the swarm collectively constructs a global occupancy map.",
    methodology: [
        "Agent-Based Modeling",
        "Decentralized Consensus Logic",
        "ROS 2 Swarm Simulation",
        "Fault Tolerance Testing"
    ],
    methodologyDetails: [
        "Modeled agents as finite state machines with Boids-inspired flocking behaviors (separation, alignment, cohesion).",
        "Implemented Raft-based consensus for map merging. Agents share local occupancy grid updates only with neighbors within radius.",
        "Leveraged ROS 2 Discovery and DDS (Data Distribution Service) middleware to simulate ad-hoc network conditions.",
        "Introduced random node failures and packet loss to validate the swarm's ability to self-heal."
    ],
    metrics: [
        { label: "Map Coverage", value: "98%", trend: "up" },
        { label: "Redundancy", value: "High", trend: "up" },
        { label: "Network Load", value: "Low", trend: "down" }
    ],
    extendedTech: ["ROS 2", "Gazebo", "Python", "C++", "DDS (FastDDS)", "NetworkX", "Matplotlib"],
    sources: [
        { type: "PDF", label: "Swarm Logic Paper", url: "#" },
        { type: "REPO", label: "ROS 2 Packages", url: "#" },
        { type: "SIM", label: "Consensus Logs", url: "#" }
    ]
  },
  {
    id: 'acad-5',
    title: "Topological Quantum Codes",
    subtitle: "Surface Code Stabilization for Qubits",
    year: "2025",
    tags: ["Quantum Computing", "Physics", "Error Correction"],
    desc: "Simulated surface code error correction cycles on a 53-qubit lattice to suppress decoherence.",
    abstract: "Decoherence remains the existential threat to quantum supremacy. This research simulates a rotated surface code lattice to create logical qubits from physical qubit arrays. By measuring stabilizer operators (syndromes) without collapsing the wavefunction, we demonstrate a fault-tolerant threshold improvement.",
    methodology: [
        "Stabilizer Simulation",
        "Minimum Weight Perfect Matching",
        "Lattice Surgery Logic",
        "Depolarizing Noise Model"
    ],
    methodologyDetails: [
        "Simulated the Toric code on an NxN lattice using the stim python package to track Pauli errors.",
        "Implemented a Minimum Weight Perfect Matching (MWPM) decoder to infer error chains from syndrome measurements.",
        "Modeled logical operations (CNOT) via lattice surgery, merging and splitting planar codes.",
        "Benchmarked logical error rates against physical error rates, identifying the pseudothreshold at p=0.01."
    ],
    metrics: [
        { label: "Logical Error", value: "1e-5", trend: "down" },
        { label: "Threshold", value: "0.9%", trend: "up" },
        { label: "Qubit Overhead", value: "High", trend: "down" }
    ],
    extendedTech: ["Qiskit", "Stim", "Python", "Linear Algebra", "Tensor Networks"],
    sources: [
        { type: "PDF", label: "Error Correction Analysis", url: "#" },
        { type: "SIM", label: "Qubit Lattice Viz", url: "#" },
        { type: "REPO", label: "Decoder Algorithm", url: "#" }
    ]
  },
  {
    id: 'acad-6',
    title: "Perovskite Solar Stability",
    subtitle: "2D/3D Heterostructures for PV Efficiency",
    year: "2024",
    tags: ["Materials Science", "Energy", "Nanotech"],
    desc: "Synthesized 2D/3D perovskite bilayers to improve moisture resistance and extend solar cell lifetime.",
    abstract: "Metal-halide perovskites offer high efficiency but suffer from rapid degradation under ambient conditions. This study engineers a hydrophobic 2D perovskite capping layer atop the bulk 3D active layer. This passivation strategy seals grain boundaries, preventing moisture ingress and suppressing ion migration.",
    methodology: [
        "Spin Coating Synthesis",
        "X-Ray Diffraction (XRD)",
        "Photoluminescence Spectroscopy",
        "Maximum Power Point Tracking"
    ],
    methodologyDetails: [
        "Fabricated devices using a one-step anti-solvent deposition method in a nitrogen glovebox.",
        "Confirmed phase purity and crystal orientation using grazing-incidence wide-angle X-ray scattering (GIWAXS).",
        "Measured carrier lifetime using Time-Correlated Single Photon Counting (TCSPC) to quantify recombination suppression.",
        "Subjected cells to ISOS-L-1 standards (continuous 1-sun illumination) for 1000 hours."
    ],
    metrics: [
        { label: "Efficiency", value: "24.2%", trend: "up" },
        { label: "T80 Lifetime", value: "1500h", trend: "up" },
        { label: "Hysteresis", value: "Low", trend: "down" }
    ],
    extendedTech: ["SEM/TEM", "XRD", "Solar Simulators", "Chemical Vapor Deposition", "Python (Data Fitting)"],
    sources: [
        { type: "PDF", label: "Crystallography Data", url: "#" },
        { type: "DATABASE", label: "JV Curves", url: "#" }
    ]
  },
  {
    id: 'acad-7',
    title: "Neuromorphic SNN Accelerator",
    subtitle: "Analog In-Memory Computing",
    year: "2025",
    tags: ["AI Hardware", "VLSI", "Neuroscience"],
    desc: "Designed a Spiking Neural Network (SNN) accelerator using ReRAM crossbars to minimize Von Neumann bottleneck.",
    abstract: "Traditional Deep Learning accelerators consume excessive power due to data movement. This project designs a compute-in-memory architecture using Resistive RAM (ReRAM). By performing matrix-vector multiplication directly within the memory arrays using Kirchhoff's laws, we achieve orders-of-magnitude gains in energy efficiency for edge AI tasks.",
    methodology: [
        "ReRAM Crossbar Modeling",
        "Leaky Integrate-and-Fire Circuit",
        "SNN Training (Surrogate Gradient)",
        "Power Analysis"
    ],
    methodologyDetails: [
        "Modeled memristor non-idealities (conductance drift, write noise) in Verilog-A.",
        "Designed CMOS neuron circuits implementing Leafy Integrate-and-Fire (LIF) dynamics for spike generation.",
        "Trained the SNN offline using PyTorch with surrogate gradients to overcome non-differentiable spike functions.",
        "Simulated system power using Cadence Spectre, focusing on ADC/DAC overhead reduction."
    ],
    metrics: [
        { label: "Energy/Op", value: "50fJ", trend: "down" },
        { label: "Accuracy", value: "92% (MNIST)", trend: "up" },
        { label: "Area", value: "0.5mm²", trend: "down" }
    ],
    extendedTech: ["Cadence Virtuoso", "HSPICE", "PyTorch", "Verilog-A", "Nengo DL"],
    sources: [
        { type: "BLUEPRINT", label: "Circuit Schematic", url: "#" },
        { type: "PDF", label: "Power Analysis", url: "#" }
    ]
  },
  {
    id: 'acad-8',
    title: "Constitutional AI Alignment",
    subtitle: "RLAIF for Ethical LLM Behavior",
    year: "2024",
    tags: ["AI Ethics", "NLP", "Machine Learning"],
    desc: "Implemented a 'Constitutional AI' framework using Reinforcement Learning from AI Feedback (RLAIF) to reduce bias.",
    abstract: "Scaling supervision for Large Language Models (LLMs) is bottlenecked by human labeling. This research implements RLAIF, where a model critiques and revises its own outputs based on a set of natural language 'constitutional' principles. This self-supervision loop aligns the model with safety guidelines without extensive human intervention.",
    methodology: [
        "Supervised Fine-Tuning (SFT)",
        "Reward Model Training",
        "PPO (Proximal Policy Optimization)",
        "Chain-of-Thought Critiques"
    ],
    methodologyDetails: [
        "Drafted a constitution of 10 core principles (e.g., non-violence, helpfulness).",
        "Generated synthetic preference data by having the model critique its own responses against the constitution.",
        "Trained a Reward Model to predict the 'compliance score' of a given completion.",
        "Fine-tuned LLaMA-2-7B using PPO against this reward model, observing a significant reduction in toxic outputs."
    ],
    metrics: [
        { label: "Harmlessness", value: "+30%", trend: "up" },
        { label: "Helpfulness", value: "Stable", trend: "up" },
        { label: "Human Labels", value: "0", trend: "down" }
    ],
    extendedTech: ["PyTorch", "Hugging Face Transformers", "DeepSpeed", "WandB", "LLaMA-2"],
    sources: [
        { type: "REPO", label: "Training Scripts", url: "#" },
        { type: "PDF", label: "Alignment Report", url: "#" }
    ]
  },
  {
    id: 'acad-9',
    title: "Solid-State Battery Electrolytes",
    subtitle: "Sulfide-based Dendrite Suppression",
    year: "2025",
    tags: ["Energy Storage", "Chemistry", "Solid State Physics"],
    desc: "Synthesized Li6PS5Cl argyrodite electrolytes to enable lithium-metal anodes with high critical current density.",
    abstract: "Solid-state batteries promise higher energy density by enabling Lithium-metal anodes. However, dendrite growth causes short circuits. This study synthesizes a sulfide-based solid electrolyte (Li6PS5Cl) with optimized grain boundaries. By applying a hot-pressing technique, we minimize void spaces, increasing the critical current density required for dendrite initiation.",
    methodology: [
        "Solid-State Synthesis",
        "Electrochemical Impedance Spectroscopy",
        "Cyclic Voltammetry",
        "SEM Microstructure Analysis"
    ],
    methodologyDetails: [
        "Prepared precursors (Li2S, P2S5, LiCl) in stoichiometric ratios and ball-milled for 20 hours.",
        "Annealed pellets at 550°C to crystallize the argyrodite phase.",
        "Measured ionic conductivity using EIS across a temperature range of -20°C to 60°C.",
        "Cycled Li|SE|Li symmetric cells to evaluate stripping/plating stability over 500 hours."
    ],
    metrics: [
        { label: "Conductivity", value: "5mS/cm", trend: "up" },
        { label: "Crit. Current", value: "1.2mA/cm²", trend: "up" },
        { label: "Stability", value: ">500 Cycles", trend: "up" }
    ],
    extendedTech: ["Glovebox (Ar)", "Ball Mill", "Potentiostat", "X-Ray Diffraction", "Scanning Electron Microscopy"],
    sources: [
        { type: "DATABASE", label: "EIS Data Logs", url: "#" },
        { type: "PDF", label: "Synthesis Protocol", url: "#" }
    ]
  },
  {
    id: 'acad-10',
    title: "Self-Healing Soft Robotics",
    subtitle: "Dielectric Elastomer Actuators (DEAs)",
    year: "2024",
    tags: ["Robotics", "Materials", "Biomimetics"],
    desc: "Developed soft artificial muscles using self-healing polymers capable of recovering from dielectric breakdown.",
    abstract: "Dielectric Elastomer Actuators (DEAs) function as artificial muscles but fail catastrophically upon electrical breakdown. We formulated a self-healing thermoplastic polyurethane (TPU) modified with Diels-Alder adducts. This material enables the actuator to autonomously heal puncture wounds and recover dielectric strength after breakdown events, extending operational lifespan.",
    methodology: [
        "Polymer Synthesis",
        "Thin-Film Casting",
        "High-Voltage Actuation Testing",
        "Self-Healing Validation"
    ],
    methodologyDetails: [
        "Synthesized furan-maleimide crosslinked TPU networks.",
        "Spin-coated 50µm films and applied compliant carbon grease electrodes.",
        "Measured actuation strain vs. voltage (Maxwell stress) up to 5kV.",
        "Induced breakdown, applied mild heat (60°C), and re-tested dielectric strength to verify recovery."
    ],
    metrics: [
        { label: "Max Strain", value: "25%", trend: "up" },
        { label: "Healing Effic.", value: "90%", trend: "up" },
        { label: "Breakdown Field", value: "80V/µm", trend: "up" }
    ],
    extendedTech: ["DMA (Dynamic Mech Analysis)", "High Voltage Supplies", "Matlab", "Chemical Synthesis"],
    sources: [
        { type: "PDF", label: "Stress-Strain Curves", url: "#" },
        { type: "REPO", label: "Actuation Models", url: "#" }
    ]
  }
];

const Hologram: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center opacity-80 min-h-[150px]">
      <div className={`absolute inset-0 bg-gradient-to-t from-${color}-500/10 to-transparent animate-pulse`}></div>
      {/* Outer Ring */}
      <div className={`w-32 h-32 border-2 border-${color}-500/30 rounded-full animate-[spin_8s_linear_infinite] border-t-transparent border-b-transparent`}></div>
      {/* Inner Ring */}
      <div className={`absolute w-24 h-24 border border-${color}-400/50 rounded-full animate-[spin_5s_linear_infinite_reverse] border-l-transparent border-r-transparent`}></div>
      {/* Core */}
      <div className={`absolute w-3 h-3 bg-${color}-400 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse`}></div>
      
      {/* Scanning Plane */}
      <div className={`absolute w-full h-1 bg-${color}-500/20 top-1/2 -translate-y-1/2 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]`}></div>
    </div>
  );
};

export const Research: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'F1' | 'Academic'>('F1');
  const [selectedTopic, setSelectedTopic] = useState<DetailedTopic | null>(null);

  const data = activeTab === 'F1' ? F1_ENGINEERING_DATA : ACADEMIC_DATA;

  const handleClose = () => {
      setSelectedTopic(null);
      document.body.style.overflow = 'auto';
  };

  const handleSelect = (item: DetailedTopic) => {
      setSelectedTopic(item);
      document.body.style.overflow = 'hidden';
  }

  // Visual Theme Colors based on Tab
  const activeColor = activeTab === 'F1' ? 'red' : 'blue';

  return (
    <section id="research" className="py-32 bg-black relative min-h-screen border-t border-white/5 overflow-hidden">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:50px_50px] pointer-events-none opacity-50"></div>
       
       {/* Ambient Glow */}
       <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none transition-colors duration-1000 ${activeTab === 'F1' ? 'bg-red-900/10' : 'bg-blue-900/10'}`}></div>

       <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
               <h2 className="text-3xl font-semibold text-white tracking-tight mb-2">Technical Research.</h2>
               <p className="text-neutral-400">Deep dives into engineering challenges, methodology, and innovation.</p>
            </div>
            
            {/* Tabs */}
            <div className="flex bg-[#1c1c1e] p-1.5 rounded-full border border-white/10 relative overflow-hidden">
               <button 
                  onClick={() => setActiveTab('F1')}
                  className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'F1' ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
               >
                  F1 Engineering
               </button>
               <button 
                  onClick={() => setActiveTab('Academic')}
                  className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'Academic' ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
               >
                  Academic Papers
               </button>
               
               {/* Sliding Pill */}
               <div 
                  className={`absolute top-1.5 bottom-1.5 rounded-full bg-white/10 border border-white/10 shadow-lg transition-all duration-300 ease-out ${activeTab === 'F1' ? 'left-1.5 w-[125px]' : 'left-[135px] w-[125px]'}`}
               ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
             {data.map((item) => (
                <div 
                   key={item.id}
                   onClick={() => handleSelect(item)}
                   className={`group relative bg-[#1c1c1e] border rounded-3xl p-8 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-2xl overflow-hidden ${activeTab === 'F1' ? 'border-red-500/10 hover:border-red-500/30' : 'border-white/5 hover:border-blue-500/30'}`}
                >
                   {/* Card Glow */}
                   <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br to-transparent rounded-full blur-2xl transition-colors duration-500 opacity-0 group-hover:opacity-100 ${activeTab === 'F1' ? 'from-red-600/20' : 'from-blue-500/20'}`}></div>

                   <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="bg-white/5 px-3 py-1 rounded-full text-xs font-mono text-neutral-400 border border-white/5 group-hover:bg-white/10 transition-colors">
                         {item.year}
                      </div>
                      {item.icon && (
                         <div className={`transition-colors transform group-hover:scale-110 duration-300 ${activeTab === 'F1' ? 'text-neutral-500 group-hover:text-red-400' : 'text-neutral-500 group-hover:text-blue-400'}`}>
                            {item.icon}
                         </div>
                      )}
                   </div>
                   
                   <h3 className={`text-xl font-bold text-white mb-2 transition-colors leading-tight relative z-10 ${activeTab === 'F1' ? 'group-hover:text-red-400' : 'group-hover:text-blue-400'}`}>{item.title}</h3>
                   <div className="text-sm text-neutral-500 mb-4 font-medium relative z-10">{item.subtitle}</div>
                   <p className="text-sm text-neutral-400 leading-relaxed mb-6 line-clamp-3 relative z-10">
                      {item.desc}
                   </p>

                   <div className="flex flex-wrap gap-2 relative z-10">
                      {item.tags.slice(0, 3).map(tag => (
                         <span key={tag} className="text-[10px] uppercase tracking-wider text-neutral-500 border border-neutral-800 px-2 py-1 rounded group-hover:border-neutral-700 transition-colors">
                            {tag}
                         </span>
                      ))}
                   </div>
                </div>
             ))}
          </div>
       </div>

       {/* Modal */}
       {selectedTopic && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
             <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in" onClick={handleClose}></div>
             
             <div className="relative w-full max-w-5xl bg-[#0f0f11] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-fade-in-up">
                 
                 {/* Modal Header Line */}
                 <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${activeColor === 'red' ? 'from-red-600 via-orange-600 to-yellow-600' : 'from-blue-600 via-indigo-600 to-purple-600'}`}></div>
                 
                 {/* Close Button */}
                 <button 
                    onClick={handleClose} 
                    className="absolute top-6 right-6 z-20 p-2 bg-white/5 hover:bg-white/10 rounded-full text-neutral-400 hover:text-white transition-colors border border-white/5"
                 >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>

                 <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12">
                     <div className="flex flex-col lg:flex-row gap-12">
                        
                        {/* Left Column: Content */}
                        <div className="lg:w-2/3">
                           <div className="flex items-center space-x-3 mb-4">
                               <span className={`text-xs font-mono px-2 py-1 rounded border ${activeColor === 'red' ? 'text-red-400 bg-red-500/10 border-red-500/20' : 'text-blue-400 bg-blue-500/10 border-blue-500/20'}`}>{selectedTopic.id.toUpperCase()}</span>
                               <span className="text-xs text-neutral-500 font-bold">{selectedTopic.year}</span>
                               {selectedTopic.status && (
                                   <span className={`text-xs px-2 py-1 rounded border ${selectedTopic.status === 'Deployed' || selectedTopic.status === 'Active' ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-purple-400 bg-purple-500/10 border-purple-500/20'}`}>
                                       {selectedTopic.status}
                                   </span>
                               )}
                           </div>
                           
                           <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">{selectedTopic.title}</h2>
                           <p className="text-xl text-neutral-400 font-light mb-8">{selectedTopic.subtitle}</p>
                           
                           <div className="space-y-10">
                              <div>
                                 <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 border-b border-white/10 pb-2 flex items-center">
                                     <span className={`w-1 h-4 mr-2 rounded-full ${activeColor === 'red' ? 'bg-red-500' : 'bg-blue-500'}`}></span>
                                     Abstract
                                 </h4>
                                 <p className="text-neutral-300 leading-relaxed text-justify text-sm md:text-base">
                                    {selectedTopic.abstract}
                                 </p>
                              </div>

                              <div>
                                 <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 border-b border-white/10 pb-2 flex items-center">
                                     <span className={`w-1 h-4 mr-2 rounded-full ${activeColor === 'red' ? 'bg-orange-500' : 'bg-purple-500'}`}></span>
                                     Methodology
                                 </h4>
                                 <ul className="space-y-4">
                                    {selectedTopic.methodology.map((m, i) => (
                                       <li key={i} className="bg-[#1c1c1e] p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                          <div className={`font-bold text-sm mb-1.5 ${activeColor === 'red' ? 'text-red-400' : 'text-blue-400'}`}>{m}</div>
                                          <div className="text-neutral-400 text-sm leading-relaxed">{selectedTopic.methodologyDetails[i]}</div>
                                       </li>
                                    ))}
                                 </ul>
                              </div>
                           </div>
                        </div>

                        {/* Right Column: Sidebar */}
                        <div className="lg:w-1/3 space-y-6">
                           
                           {/* Hologram / Visual */}
                           <div className="bg-black/40 rounded-3xl border border-white/10 aspect-square flex items-center justify-center overflow-hidden relative">
                               <Hologram color={activeColor} />
                               <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-neutral-500 font-mono">SIMULATION VISUALIZER</div>
                           </div>

                           {/* Metrics */}
                           <div className="bg-[#1c1c1e] p-6 rounded-3xl border border-white/5">
                              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Key Metrics</h4>
                              <div className="space-y-4">
                                 {selectedTopic.metrics.map((metric, i) => (
                                    <div key={i} className="flex justify-between items-center pb-3 border-b border-white/5 last:border-0 last:pb-0">
                                       <span className="text-sm text-neutral-400">{metric.label}</span>
                                       <div className="flex items-center space-x-2">
                                          <span className="text-white font-bold font-mono">{metric.value}</span>
                                          {metric.trend === 'up' ? (
                                             <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                          ) : (
                                             <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                                          )}
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                           
                           {/* Tech Stack */}
                           <div className="bg-[#1c1c1e] p-6 rounded-3xl border border-white/5">
                              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Technologies</h4>
                              <div className="flex flex-wrap gap-2">
                                 {selectedTopic.extendedTech.map(tech => (
                                    <span key={tech} className="text-[10px] bg-white/5 hover:bg-white/10 text-neutral-300 px-2.5 py-1.5 rounded-lg border border-white/5 transition-colors cursor-default">
                                       {tech}
                                    </span>
                                 ))}
                              </div>
                           </div>

                           {/* Sources */}
                           <div className="bg-[#1c1c1e] p-6 rounded-3xl border border-white/5">
                              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">References</h4>
                              <div className="space-y-2">
                                 {selectedTopic.sources.map((source, i) => (
                                    <a 
                                       key={i} 
                                       href={source.url}
                                       className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group border border-transparent hover:border-white/5"
                                    >
                                       <div className="flex items-center space-x-3">
                                          <div className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${source.type === 'PDF' ? 'bg-red-500/10 text-red-500' : source.type === 'REPO' ? 'bg-neutral-500/10 text-neutral-300' : 'bg-blue-500/10 text-blue-500'}`}>
                                              {source.type}
                                          </div>
                                          <span className="text-sm text-neutral-300 group-hover:text-white truncate max-w-[140px]">{source.label}</span>
                                       </div>
                                       <svg className="w-4 h-4 text-neutral-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </a>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                 </div>
             </div>
          </div>
       )}
    </section>
  );
};
