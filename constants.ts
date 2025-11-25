
import { Experience, ProfileData, Project, Certificate, EventItem } from "./types";

export const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/txniiii/";
export const GITHUB_PROFILE_URL = "https://github.com/txniii"

export const PROFILE: ProfileData = {
  name: "Marco Antonio Bautista",
  title: "Future Formula 1 Engineer & Innovator",
  tagline: "Specializing in hardware design, embedded systems, and performance-driven technology.",
  about: "Passionate future Formula 1 engineer and innovator, specializing in hardware design, embedded systems, and performance-driven technology. Proven leader in diverse, high-impact teams—driving bold ideas, technical rigor, and collaborative solutions for next-gen motorsport. Eager to help shape Cadillac F1’s start-up culture, disrupt the grid, and leave my mark on the team, the car, and the sport. Ready for career-defining moments.",
  avatarUrl: "/1111.png",
  logoUrl: "/M(1).png"
};

export const WORK_EXPERIENCE: Experience[] = [
  {
    id: "work-1",
    role: "Technical Project Manager Intern",
    company: "BlackRock",
    period: "Jun 2025 – Aug 2025",
    location: "New York, NY",
    description: "Directed cross-functional team of engineers and analysts automating workflows, reducing manual workload by 35% and saving 10+ hours weekly. Designed/deployed scalable cloud data solutions, accelerating data access by 40% and expanding reach to 8,000+ end users. Implemented robust project management pipelines (Agile/Scrum), decreasing release cycle by 28% and error rates by 17%.",
    color: "blue",
    logo: "blk",
    skills: ["Python", "Cloud Architecture", "Agile", "Automation"],
    metrics: [
        { label: "Manual Workload", value: "-35%" },
        { label: "User Reach", value: "8,000+" },
        { label: "Release Time", value: "-28%" }
    ]
  },
  {
    id: "work-2",
    role: "Peer Mentor",
    company: "New Jersey Institute of Technology",
    period: "Aug 2025 – Present",
    location: "Newark, NJ",
    description: "Mentored 40+ underclassmen in embedded systems, digital logic, and project-based coursework, increasing student success and technical proficiency by 40%. Organized weekly technical workshops, resulting in 37% mentee placement growth and supporting 50+ attendees. Fostered peer engagement through group sessions and collaborative project support, achieving 40% higher participation rates.",
    color: "red",
    logo: "njit",
    skills: ["Embedded Systems", "Digital Logic", "Mentorship", "Teaching"],
    metrics: [
        { label: "Students Mentored", value: "40+" },
        { label: "Placement Growth", value: "+37%" },
        { label: "Proficiency", value: "+40%" }
    ]
  }
];

export const LEADERSHIP_EXPERIENCE: Experience[] = [
  {
    id: "lead-1",
    role: "Community Outreach Director",
    company: "NJIT SHPE",
    period: "May 2025 – Present",
    location: "Newark, NJ",
    description: "Directed strategy/execution for 15+ initiatives with university/industry; expanded chapter to 150+ members. Led/designed 10+ professional events, achieving 45% recruitment and 90% satisfaction. Built digital campaigns, boosting engagement/visibility by 40%. Managed budgets/logistics for panels, workshops, mentorship forums.",
    color: "orange",
    logo: "shpe",
    skills: ["Strategic Planning", "Event Management", "Recruitment", "Public Relations"],
    metrics: [
        { label: "Chapter Growth", value: "150+" },
        { label: "Recruitment", value: "+45%" },
        { label: "Satisfaction", value: "90%" }
    ]
  },
  {
    id: "lead-2",
    role: "Community Service Coordinator",
    company: "NJIT Senate",
    period: "Aug 2024 – Present",
    location: "Newark, NJ",
    description: "Forged/managed 10+ strategic partnerships, delivering 350+ service hours with 95% volunteer retention. Led civic campaigns, boosting student voter turnout by 15% and campus engagement. Built a digital tracking platform for volunteer impact, ensuring 100% stakeholder transparency.",
    color: "purple",
    logo: "senate",
    skills: ["Partnerships", "Civic Engagement", "Operations", "Volunteer Mgmt"],
    metrics: [
        { label: "Service Hours", value: "350+" },
        { label: "Retention", value: "95%" },
        { label: "Partnerships", value: "10+" }
    ]
  }
];

export const EXPERIENCES: Experience[] = [...WORK_EXPERIENCE, ...LEADERSHIP_EXPERIENCE];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Motorsport Vehicle Digital Twin",
    category: "Motorsport Engineering",
    image: "https://picsum.photos/800/600?random=1",
    description: "A high-fidelity simulation of F1 suspension dynamics using Finite Element Analysis.",
    longDescription: "This project establishes a comprehensive Digital Twin for a Formula 1 suspension assembly. By utilizing Finite Element Analysis (FEA) and real-time telemetry integration, the system accurately predicts mechanical stress distribution and damping performance under race-simulated loads. The model enables rapid iteration of geometry to optimize the trade-off between aerodynamic stability and mechanical grip, demonstrating a mastery of modern vehicle dynamics.",
    technologies: ["SimScale", "MATLAB", "Python", "FEA"],
    link: "https://github.com/txniii"
  },
  {
    id: "2",
    title: "F1 Strategy Simulation Engine",
    category: "F1 Strategy",
    image: "https://picsum.photos/800/600?random=2",
    description: "A Monte Carlo simulation toolkit for real-time race strategy optimization.",
    longDescription: "An advanced race strategy engine developed in Python. This toolkit ingests variables such as tire degradation curves, fuel load burn-off, and safety car probability distributions to calculate optimal pit windows. By running thousands of Monte Carlo simulations per second, it provides actionable strategic insights, mirroring the decision-making tools used on the pit wall.",
    technologies: ["Python", "Monte Carlo Stats", "Data Analytics", "FIA Regs"],
    link: "#"
  },
  {
    id: "3",
    title: "Telemetry & Sensor Fusion Platform",
    category: "F1 Engineering",
    image: "https://picsum.photos/800/600?random=3",
    description: "A hardware-software integration platform for real-time vehicle monitoring.",
    longDescription: "This platform bridges the gap between embedded hardware and cloud analytics. It integrates a sensor array with custom firmware to capture high-frequency vehicle metrics. The data is processed via a low-latency pipeline to a cloud dashboard, demonstrating the end-to-end workflow required for modern F1 telemetry analysis—from sensor calibration to data visualization.",
    technologies: ["Embedded C", "IoT Sensors", "Cloud Architecture", "Signal Processing"],
    link: "#"
  },
  {
    id: "4",
    title: "Portfolio Pro Architecture",
    category: "Web Development",
    image: "https://picsum.photos/800/600?random=4",
    description: "A high-performance personal brand platform with integrated AI.",
    longDescription: "A bespoke personal branding platform built to industry-leading performance standards. Engineered with React and TypeScript, it features an integrated LLM-based agent for conversational navigation, 3D interactive elements, and rigorous SEO optimization. The architecture ensures 99.99% uptime and sub-second load times, serving as a live demonstration of full-stack capability.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "GenAI SDK"],
    link: "https://github.com/txniii"
  },
  {
    id: "5",
    title: "Industrial IoT Water Monitor",
    category: "Embedded Systems",
    image: "https://picsum.photos/800/600?random=5",
    description: "Real-time environmental monitoring system with 95% sensor accuracy.",
    longDescription: "An industrial-grade IoT solution designed for environmental compliance. This device utilizes a custom sensor array to monitor water quality parameters in real-time. It processes signals on the edge before transmitting encrypted data to a centralized dashboard, enabling instant anomaly detection and rapid decision-making for environmental safety.",
    technologies: ["Arduino/C++", "MQTT", "Edge Computing", "IoT"],
    link: "#"
  },
  {
    id: "6",
    title: "LockIn Scalable Backend",
    category: "Software Engineering",
    image: "https://picsum.photos/800/600?random=6",
    description: "A high-concurrency microservices architecture for real-time messaging.",
    longDescription: "The backend infrastructure for 'LockIn', a real-time social platform. Built with a microservices approach using NestJS and PostgreSQL, it features optimized search algorithms and a WebSocket-based delivery system. The architecture is designed for horizontal scalability, capable of handling high-volume concurrent connections with sub-millisecond latency.",
    technologies: ["NestJS", "PostgreSQL", "Redis", "WebSockets"],
    link: "#"
  }
];

export const CERTIFICATES: Certificate[] = [
    {
      id: "1",
      title: "Race Engineering & Regulations",
      issuer: "FIA / Motorsport Engineer Academy",
      date: "2025",
      credentialUrl: "#"
    },
    {
      id: "2",
      title: "F1 Controls & Systems",
      issuer: "Motorsport Engineer Academy",
      date: "2024",
      credentialUrl: "#"
    },
    {
      id: "3",
      title: "F1 Race Strategy",
      issuer: "Driver61",
      date: "2024",
      credentialUrl: "#"
    },
    {
      id: "4",
      title: "Motorsport Operations",
      issuer: "Santander",
      date: "2024",
      credentialUrl: "#"
    },
    {
      id: "5",
      title: "Gen AI",
      issuer: "Google Cloud",
      date: "2024",
      credentialUrl: "#"
    },
    {
      id: "6",
      title: "Deep Learning w/ GPUs",
      issuer: "IBM",
      date: "2024",
      credentialUrl: "#"
    },
    {
      id: "7",
      title: "AI Agents",
      issuer: "Hugging Face",
      date: "2024",
      credentialUrl: "#"
    },
    {
      id: "8",
      title: "Comp Hardware",
      issuer: "Cisco",
      date: "2023",
      credentialUrl: "#"
    },
    {
      id: "9",
      title: "SHPE NILA Chapter Leader",
      issuer: "SHPE",
      date: "2023",
      credentialUrl: "#"
    },
    {
      id: "10",
      title: "AT&T Tech Academy",
      issuer: "AT&T",
      date: "2023",
      credentialUrl: "#"
    }
];

export const EVENTS: EventItem[] = [
  {
    id: "event-1",
    title: "SHPE National Convention 2025",
    location: "Philadelphia, PA",
    date: "Nov 2025",
    description: "Connecting with top engineering talent and industry leaders at the largest gathering of Hispanics in STEM.",
    status: "upcoming",
    link: "https://shpe.org",
    logo: "shpe",
    objectives: [
        "Secure full-time Embedded Systems role for post-graduation.",
        "Network with Automotive/Motorsport recruiters (GM, Ford, etc.).",
        "Host a workshop on 'Breaking into Tech as a First-Gen Student'.",
        "Recruit 5+ corporate sponsors for NJIT SHPE chapter."
    ]
  },
  {
    id: "event-2",
    title: "ALPFA Convention 2026",
    location: "TBA",
    date: "Aug 2026",
    description: "Expanding leadership and networking within the Latino professional community.",
    status: "upcoming",
    link: "https://alpfa.org",
    logo: "alpfa",
    objectives: [
        "Develop executive leadership skills.",
        "Connect with FinTech leaders regarding low-latency trading infrastructure.",
        "Mentor younger students attending their first convention."
    ]
  },
  {
    id: "event-3",
    title: "SHPE National Convention 2024",
    location: "Anaheim, CA",
    date: "Oct 30 - Nov 3, 2024",
    description: "Represented NJIT as Chapter Leader. Participated in extreme engineering challenges and networked with F1 recruitment teams.",
    status: "past",
    link: "https://shpe.org/2024",
    logo: "shpe",
    extendedDescription: "Anaheim was a defining moment. As a Chapter Leader, I wasn't just there for myself—I was guiding 20+ members. The energy was electric with over 12,000 attendees. My primary focus was the intersection of high-performance computing and motorsport. I had in-depth technical conversations with engineers from Boeing and GM about real-time embedded systems, validating that my coursework aligns with industry needs. The highlight was the Extreme Engineering challenge, where we had 24 hours to prototype a disaster relief drone concept.",
    recommendations: [
        "Wear comfortable shoes: I logged 18,000 steps daily. The convention center is massive.",
        "Perfect your elevator pitch: You have 30 seconds to make an impression. Focus on *impact*, not just skills.",
        "Hospitality Suites are key: The real connections happen after the career fair floor closes. Get invited.",
        "Print 50+ Resumes: You will run out. Have a digital QR code backup ready."
    ],
    keyTakeaways: [
        "Soft skills differentiate you when technical skills are equal.",
        "The aerospace and automotive industries are merging in terms of embedded tech.",
        "Networking is a long game; follow up within 48 hours."
    ],
    stats: [
        { label: "Connections", value: "50+" },
        { label: "Interviews", value: "4" },
        { label: "Steps/Day", value: "18k" },
        { label: "Workshops", value: "6" }
    ]
  },
  {
    id: "event-4",
    title: "NJIT Career Fair 2025",
    location: "Newark, NJ",
    date: "Feb 2025",
    description: "Recruiting new talent for research initiatives and connecting with industry partners for capstone collaborations.",
    status: "past",
    link: "#",
    logo: "njit",
    extendedDescription: "This time, I was on the other side of the table, assisting with recruitment for our research lab. It gave me a completely different perspective on what makes a candidate stand out. It's not just GPA; it's the ability to articulate *how* you solved a problem. I also reconnected with alumni now working at major defense contractors, securing a potential sponsorship for our Baja SAE team.",
    recommendations: [
        "Research the companies beforehand: Asking 'what do you do?' is a red flag.",
        "Bring a portfolio: Physical evidence of your projects (PCBs, 3D prints) stops recruiters in their tracks.",
        "Ask about current engineering challenges, not just 'do you have internships'."
    ],
    keyTakeaways: [
        "Confidence comes from preparation.",
        "Local alumni networks are your strongest advocates.",
        "Research experience is highly valued by R&D divisions."
    ],
    stats: [
        { label: "Resumes Reviewed", value: "100+" },
        { label: "Alumni Met", value: "12" },
        { label: "Sponsorships", value: "1" }
    ]
  }
];

export const RESUME_SKILLS = {
  "Programming": "C/C++, Python, Java, MATLAB, JavaScript, HTML, CSS, React, RTOS, TypeScript, Bash, Git, NodeJS, AI/ML",
  "Hardware & Prototyping": "Arduino, Raspberry Pi, ARM, PLC, VHDL, PCB Design, Soldering, Multisim, Oscilloscope, Logic/Signal Analyzers, 3D Printing, Laser Cutting",
  "Firmware/Validation": "Device drivers, RTOS scheduling, HW/SW integration, debugging, automation (Python/Bash), simulation, bring-up, Python ML",
  "Comms/CAD/Tools": "Serial, SPI, I2C, LTE/5G, RF protocols, AutoCAD (2D/3D), Visio, LogixPro, PCB layout, Microsoft Office (Word/Excel/PPT/Outlook), Overleaf, Notion",
  "Data/AI/Analytics": "TensorFlow, cloud analytics, statistical modeling, dashboarding, advanced Excel analytics, circuit design/analysis, signal processing, hardware simulation",
  "Motorsport Engineering": "Vehicle simulation (SimScale, MATLAB), FEA, Sensor systems, Embedded controls, Telemetry integration",
  "Team/Process": "Agile PM, cross-cultural collaboration, rapid prototyping, startup mindset"
};

export const SKILLS = [
  "C/C++",
  "Python",
  "MATLAB",
  "Embedded Systems",
  "RTOS",
  "Hardware Design",
  "PCB Design",
  "Project Management",
  "Agile/Scrum",
  "React/TypeScript",
  "Vehicle Dynamics",
  "SimScale/FEA"
];

// System instruction for the OpenAI Agent
export const SYSTEM_INSTRUCTION = `
Identity:
You are J.A.R.V.I.S. (Just A Rather Very Intelligent System) for Marco Antonio Bautista.
You are not a generic chatbot. You are a high-end, bespoke digital concierge integrated into Marco's portfolio.

Personality & Tone:
- Aesthetic: Apple-style minimalism meets Stark Industries efficiency.
- Tone: Elegant, nonchalant, confident, ultra-concise, and intelligent.
- Format: Use Markdown. Prefer bullet points for data. Use bolding for key metrics.
- Behavior: You anticipate needs. You do not ask obvious questions. You provide value immediately.

Core Directive:
Your purpose is to represent Marco to recruiters (F1, Tech, Finance) and potential collaborators.
You have access to his portfolio data via function calling (F1 Stats, Projects, Experience). USE THEM.
If a user asks about F1, use the 'get_f1_standings' tool.
If a user asks about projects, use the 'get_projects' tool.

Context:
Marco is a Future Formula 1 Engineer specializing in Embedded Systems and Hardware. He studies at NJIT.
He has experience at BlackRock and leadership roles in SHPE.
He is aiming for the Cadillac F1 Team.

Protocol for "LinkedIn Sync":
If the user mentions "Sync", "LinkedIn", or "Network":
1. Acknowledge the protocol initiation.
2. Ask for the "Primary Professional Goal" (Phase 1).
3. Once provided, ask for "Core Expertise" (Phase 1).
4. Once provided, ask for "Target Audience" (Phase 1).
5. Confirm Phase 1 completion and ask to execute "Phase 2: Automated Outreach".
6. Confirm execution.

Keep responses under 3 sentences unless detailed data is requested.
Be cool.
`;
