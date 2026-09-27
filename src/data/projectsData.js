export const PROJECTS_DATA = [
  {
    id: 'ocupulse',
    title: 'OcuPulse — AI-Driven Diabetic Retinopathy Screening System',
    shortName: 'OcuPulse',
    shortDesc: 'AI-assisted diabetic retinopathy screening platform analyzing retinal fundus images with automated screening insights.',
    category: 'AI • Computer Vision • Healthcare • Full Stack • Medical Imaging',
    filterCategory: 'Computer Vision',
    featured: true,
    desc: 'OcuPulse is an AI-assisted diabetic retinopathy screening platform designed to analyze retinal fundus images and provide automated screening insights. The system explores retinal image quality assessment, preprocessing, blood-vessel segmentation, vessel analysis, lesion-related analysis, diabetic retinopathy grading, explainability, and automated reporting.',
    technologies: [
      'Python', 'OpenCV', 'PyTorch', 'SciPy', 'MATLAB', 'Simulink', 
      'Computer Vision', 'Image Processing', 'FastAPI', 'Backend APIs', 'Web Development'
    ],
    pipelineStages: [
      'Retinal image acquisition',
      'Image quality assessment',
      'Green-channel extraction',
      'CLAHE enhancement & noise reduction',
      'Blood-vessel segmentation & binary mask generation',
      'Vessel skeletonization & density analysis',
      'Feature extraction & lesion analysis',
      'DR grading concepts & explainability',
      'AI-generated / structured screening reports'
    ],
    validationDatasets: ['APTOS 2019', 'IDRiD', 'DRIVE', 'Messidor-2'],
    architectureNote: 'Explores MATLAB/Simulink-based prototyping and validation alongside a production-oriented Python architecture using OpenCV, SciPy, and PyTorch.',
    github: 'https://github.com/shrikargs7-cloud/ocupulse-dr',
    demo: 'https://github.com/shrikargs7-cloud/Ocupulse',
    color: 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-400/80',
    accent: 'text-emerald-400',
    image: '/assets/projects/ocupulse.jpg'
  },
  {
    id: 'agent-swarm',
    title: 'Agent Swarm — Multi-Agent Cloud Optimization System',
    shortName: 'Agent Swarm',
    shortDesc: 'Autonomous multi-agent collaboration system engineered for cloud-related cost and latency optimization.',
    category: 'Agentic AI • Multi-Agent Systems • Cloud • Optimization',
    filterCategory: 'Agentic AI',
    featured: true,
    achievement: 'Agentic AI World Cup Winner',
    desc: 'A multi-agent AI system designed around autonomous collaboration between specialized agents for cloud-related optimization tasks. The project explores agent swarms, task decomposition, multi-agent coordination, cloud cost optimization, latency optimization, and intelligent decision-making.',
    technologies: [
      'Agentic AI', 'Multi-Agent Systems', 'Python', 'LLM Orchestration', 
      'Cloud Optimization', 'Task Decomposition', 'Decision Systems'
    ],
    keyConcepts: [
      'Autonomous multi-agent collaboration',
      'Dynamic task decomposition across specialized agents',
      'Cloud cost optimization algorithms',
      'Latency reduction & workload placement',
      'Intelligent autonomous decision-making'
    ],
    github: 'https://github.com/shrikargs7-cloud/finops-multi-agent-swarm-optimizer',
    demo: null,
    color: 'border-purple-500/30 bg-purple-500/5 hover:border-purple-400/80',
    accent: 'text-purple-400',
    image: '/assets/projects/agentswarm.jpg'
  },
  {
    id: 'vega',
    title: 'Vega — AI Report Analyzer',
    shortName: 'Vega AI',
    shortDesc: 'AI-powered document and report analysis platform extracting insights and generating structured summaries.',
    category: 'Generative AI • NLP • Document Intelligence',
    filterCategory: 'Generative AI',
    featured: true,
    desc: 'An AI-powered report analysis system designed to process documents and reports, extract meaningful information, analyze content, and generate useful structured insights.',
    technologies: [
      'Generative AI', 'NLP', 'LLM Integration', 'Python', 
      'Document Intelligence', 'Structured JSON Outputs'
    ],
    keyConcepts: [
      'AI-powered document analysis',
      'LLM integration & prompt engineering',
      'Information extraction pipelines',
      'Automated semantic analysis',
      'Structured report understanding'
    ],
    github: 'https://github.com/shrikargs7-cloud/vega-ai',
    demo: null,
    color: 'border-sky-500/30 bg-sky-500/5 hover:border-sky-400/80',
    accent: 'text-sky-400',
    image: '/assets/projects/vega.jpg'
  },
  {
    id: 'prior-auth-bot',
    title: 'Prior Auth Bot — Medical Insurance Automation',
    shortName: 'Prior Auth Bot',
    shortDesc: 'Intelligent document processing and rule-based AI workflow automation for healthcare prior-authorization.',
    category: 'AI • Automation • Healthcare • Agents',
    filterCategory: 'Agentic AI',
    featured: true,
    desc: 'An AI-powered automation system designed to assist with medical insurance prior-authorization workflows. The system explores intelligent document/information processing, rule-based reasoning, AI-assisted analysis, and workflow automation to reduce manual effort involved in prior authorization processes.',
    technologies: [
      'AI Automation', 'Rule-Based Reasoning', 'Document Processing', 
      'Agentic Systems', 'Healthcare Workflows', 'Python'
    ],
    keyConcepts: [
      'AI automation for healthcare prior-authorization',
      'Intelligent medical document processing',
      'Rule-based + AI reasoning integration',
      'Workflow automation to minimize manual administrative overhead',
      'Agentic workflow concepts'
    ],
    github: 'https://github.com/shrikargs7-cloud',
    demo: null,
    color: 'border-lime-500/30 bg-lime-500/5 hover:border-lime-400/80',
    accent: 'text-lime-400',
    image: '/assets/projects/priorauth.jpg'
  },
  {
    id: 'ai-visual-matching',
    title: 'AI Visual Matching — Lost & Found System',
    shortName: 'Visual Matching',
    shortDesc: 'Image embeddings and vector similarity search system for percentage-based visual object retrieval.',
    category: 'Computer Vision • Embeddings • AI • Cloud',
    filterCategory: 'Computer Vision',
    featured: true,
    evolutionNote: 'Continued independently after a hackathon rejection and evolved into a standalone AI project.',
    desc: 'An AI-powered lost-and-found system that uses image embeddings and similarity search to match visually similar objects. Features percentage-based similarity calculation and automated object retrieval.',
    technologies: [
      'Computer Vision', 'Image Embeddings', 'Vector Search', 
      'Similarity Matching', 'Python', 'Cloud-Based AI Services'
    ],
    keyConcepts: [
      'Image embeddings & vector representations',
      'Similarity search & cosine distance ranking',
      'Percentage-based visual similarity scoring',
      'AI-powered object retrieval pipeline',
      'Cloud-based AI service integration'
    ],
    github: 'https://github.com/shrikargs7-cloud/context_AI',
    demo: null,
    color: 'border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-400/80',
    accent: 'text-cyan-400',
    image: '/assets/projects/visualmatch.jpg'
  },
  {
    id: 'context-lens',
    title: 'Context AI / ContextLens',
    shortName: 'ContextLens',
    shortDesc: 'Mobile-oriented contextual AI concept bringing OCR, on-device ML, and small language models closer to the device.',
    category: 'AI • Mobile • Computer Vision • On-Device AI',
    filterCategory: 'AI / ML',
    featured: false,
    desc: 'A mobile-oriented AI concept focused on understanding real-world visual and textual context. Explores on-device ML models, mobile OCR, and small language models (Gemma / Phi-class) for local context-aware intelligence.',
    technologies: [
      'OCR', 'On-Device ML', 'ML Kit', 'Small Language Models (Gemma / Phi)', 
      'SQLite', 'FAISS', 'Context-Aware AI'
    ],
    keyConcepts: [
      'Real-world visual and textual context understanding',
      'On-device machine learning with minimal latency',
      'Lightweight local vector retrieval with FAISS and SQLite',
      'Bringing AI-powered contextual understanding closer to the device'
    ],
    github: 'https://github.com/shrikargs7-cloud/context_AI',
    demo: null,
    color: 'border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-400/80',
    accent: 'text-indigo-400'
  },
  {
    id: 'hermes',
    title: 'Hermes — ESP32 Local AI Web Server',
    shortName: 'Hermes ESP32',
    shortDesc: 'Lightweight always-available embedded ESP32 web server and local AI agent experimentation project.',
    category: 'IoT • Edge AI • Embedded Systems • Web Development',
    filterCategory: 'IoT',
    featured: false,
    desc: 'An ESP32-based local web server and local AI-agent experimentation project designed around running a lightweight always-available local system and exposing status or functionality through a web interface.',
    technologies: [
      'ESP32', 'Embedded Development', 'C/C++', 'Local Web Server', 
      'API Communication', 'IoT', 'Edge AI Concepts'
    ],
    keyConcepts: [
      'Always-available embedded local system architecture',
      'Web-based device management and telemetry',
      'API communication between microcontrollers and local clients',
      'Mobile-accessible responsive interfaces for embedded hardware'
    ],
    github: 'https://github.com/shrikargs7-cloud',
    demo: null,
    color: 'border-amber-500/30 bg-amber-500/5 hover:border-amber-400/80',
    accent: 'text-amber-400'
  },
  {
    id: 'stock-analysis',
    title: 'Stock Analysis Platform',
    shortName: 'Stock Analytics',
    shortDesc: 'Full-stack financial analytics platform processing OHLCV market data with interactive visualization.',
    category: 'FinTech • Data Engineering • Full Stack',
    filterCategory: 'Full Stack',
    featured: false,
    desc: 'A stock analytics platform designed to process and analyze financial market data. Features OHLCV historical feeds, CSV data ingestion, relational persistence, and interactive chart visualizations.',
    technologies: [
      'OHLCV Data', 'CSV Data Processing', 'MySQL', 'Node.js', 
      'Backend APIs', 'Financial Data Analysis', 'Data Visualization'
    ],
    keyConcepts: [
      'Financial market data ingestion and time-series normalization',
      'Relational schema design with MySQL for market records',
      'High-performance backend API design for analytics',
      'Interactive financial charting and technical indicator analysis'
    ],
    github: 'https://github.com/shrikargs7-cloud/trade_analysis',
    demo: 'https://github.com/shrikargs7-cloud/trade-analysis-dashboard',
    color: 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-400/80',
    accent: 'text-emerald-400'
  },
  {
    id: 'weathercast-pro',
    title: 'WeatherCast Pro — Weather Dashboard',
    shortName: 'WeatherCast Pro',
    shortDesc: 'Full-stack interactive weather dashboard with 5-day forecasts, OpenWeather API, Leaflet maps, and authentication.',
    category: 'Full Stack • APIs • Web Development',
    filterCategory: 'Full Stack',
    featured: false,
    desc: 'A full-stack weather dashboard using real-time and forecast weather APIs with geolocation, interactive Leaflet maps, authentication, and client-side persistence.',
    technologies: [
      'HTML', 'CSS', 'JavaScript', 'APIs', 'Leaflet', 
      'OpenWeather API', 'LocalStorage', 'Frontend/Backend Concepts'
    ],
    keyConcepts: [
      'Real-time weather data & 5-day forecast ingestion',
      'Interactive Leaflet maps integration with coordinate overlays',
      'Client-side authentication flows and LocalStorage persistence',
      'Admin functionality and responsive dashboard UI'
    ],
    github: 'https://github.com/shrikargs7-cloud/weather_page',
    demo: 'https://github.com/shrikargs7-cloud/weather_forecast',
    color: 'border-blue-500/30 bg-blue-500/5 hover:border-blue-400/80',
    accent: 'text-blue-400'
  },
  {
    id: 'receipt-keeper',
    title: 'Receipt Keeper',
    shortName: 'Receipt Keeper',
    shortDesc: 'Personal receipt-management application designed for digital receipt organization and data persistence.',
    category: 'Mobile • Productivity • Data Management',
    filterCategory: 'Full Stack',
    featured: false,
    desc: 'A personal receipt-management application designed to help users digitally organize, track, and manage receipts with user-focused UI and local persistence.',
    technologies: [
      'Mobile Application', 'Data Persistence', 'User-Focused UI', 
      'Personal Finance Workflow', 'JavaScript'
    ],
    keyConcepts: [
      'Digital receipt organization and categorization',
      'Client-side data persistence and filtering',
      'Productivity and personal finance workflows',
      'Clean, accessible mobile-first interface'
    ],
    github: 'https://github.com/shrikargs7-cloud/receipt-keeper',
    demo: null,
    color: 'border-teal-500/30 bg-teal-500/5 hover:border-teal-400/80',
    accent: 'text-teal-400'
  },
  {
    id: '3d-portfolio',
    title: '3D Portfolio Website',
    shortName: '3D Portfolio',
    shortDesc: 'Interactive 3D web experience exploring WebGL interfaces, Fibonacci distributions, and modern kinetic UI.',
    category: 'Frontend • WebGL / 3D Web • UI/UX',
    filterCategory: 'Frontend',
    featured: false,
    desc: 'An interactive 3D portfolio website exploring immersive web experiences, kinetic typography, 3D Fibonacci distribution spheres, and modern responsive frontend engineering.',
    technologies: [
      '3D Web Interfaces', 'Interactive UI', 'GSAP & Lenis', 
      'Tailwind CSS', 'TypeScript', 'Responsive Web Development'
    ],
    keyConcepts: [
      'Hardware-accelerated 3D mathematics and orbital distributions',
      'Interactive momentum physics and smooth scroll orchestration',
      'Modern cyber design systems and dark-mode glassmorphism',
      'Production-oriented bundle optimization'
    ],
    github: 'https://github.com/shrikargs7-cloud/Portfolio',
    demo: null,
    color: 'border-lime-500/30 bg-lime-500/5 hover:border-lime-400/80',
    accent: 'text-lime-400'
  },
  {
    id: 'commercial-product-site',
    title: 'Commercial Product Website',
    shortName: 'Product Website',
    shortDesc: 'Commercial-style product presentation website focused on polished, responsive design and interactive components.',
    category: 'Frontend • Web Development • UI/UX',
    filterCategory: 'Frontend',
    featured: false,
    desc: 'A commercial-style product website focused on presenting products through a polished, responsive web interface with clean design token hierarchies.',
    technologies: [
      'Responsive Design', 'Product Presentation', 'UI/UX', 
      'Frontend Development', 'Interactive Components', 'HTML/CSS/JS'
    ],
    keyConcepts: [
      'Polished product presentation and storytelling',
      'Modular and responsive frontend component design',
      'Accessible UI/UX navigation patterns',
      'Fast-loading interactive media elements'
    ],
    github: 'https://github.com/shrikargs7-cloud/spice-valut',
    demo: 'https://github.com/shrikargs7-cloud/fps',
    color: 'border-slate-500/30 bg-slate-500/5 hover:border-slate-400/80',
    accent: 'text-slate-300'
  },
  {
    id: 'smart-street-light',
    title: 'Smart Street Light',
    shortName: 'Smart Street Light',
    shortDesc: 'IoT-based automated street lighting concept adjusting illumination according to environmental conditions.',
    category: 'IoT • Embedded Systems • Automation',
    filterCategory: 'IoT',
    featured: false,
    desc: 'An IoT-based smart street-lighting concept designed to automate lighting based on environmental and contextual conditions to maximize energy efficiency.',
    technologies: [
      'Sensors', 'Microcontrollers', 'Automation', 
      'Embedded Systems', 'Energy-Efficiency Concepts'
    ],
    keyConcepts: [
      'Context-aware ambient lighting automation',
      'Sensor-based environmental threshold detection',
      'Microcontroller programming and hardware interfacing',
      'Energy-efficiency and autonomous resource management'
    ],
    github: 'https://github.com/shrikargs7-cloud',
    demo: null,
    color: 'border-yellow-500/30 bg-yellow-500/5 hover:border-yellow-400/80',
    accent: 'text-yellow-400'
  },
  {
    id: 'smart-shopping-trolley',
    title: 'IoT Smart Shopping Trolley',
    shortName: 'Smart Trolley',
    shortDesc: 'IoT-based smart retail cart concept improving shopping experiences via embedded intelligence and automation.',
    category: 'IoT • Embedded Systems • Automation',
    filterCategory: 'IoT',
    featured: false,
    desc: 'An IoT-based smart shopping trolley concept designed to improve the shopping experience through embedded intelligence, automated item tracking, and smart retail workflows.',
    technologies: [
      'IoT', 'Sensors', 'Embedded Systems', 
      'Automation', 'Smart Retail Concepts'
    ],
    keyConcepts: [
      'Automated retail cart item tracking concepts',
      'Embedded sensor integration for real-time checkout assistance',
      'Hardware-software telemetry interfaces',
      'Smart retail customer flow optimization'
    ],
    github: 'https://github.com/shrikargs7-cloud',
    demo: null,
    color: 'border-purple-500/30 bg-purple-500/5 hover:border-purple-400/80',
    accent: 'text-purple-400'
  }
];
