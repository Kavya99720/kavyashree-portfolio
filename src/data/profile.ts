export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
}

export interface ProjectEntry {
  title: string;
  stack: string[];
  github: string;
  live?: string;
  bullets: string[];
  featured: boolean;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  dates: string;
  score: string;
}

export interface CertificationItem {
  name: string;
  date?: string;
  verify?: string;
}

export interface CertificationGroup {
  issuer: string;
  items: CertificationItem[];
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  about: string;
  skills: SkillCategory[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  education: EducationEntry[];
  certifications: CertificationGroup[];
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
  resumeUrl: string;
}

export const profile: Profile = {
  name: "Kavyashree C V",
  title: "Generative AI & Agentic AI Engineer",
  location: "Bengaluru, Karnataka",
  about:
    "I'm a Generative AI and Agentic AI enthusiast. As a Generative AI intern at CellStrat, I design and test voice AI agents, and in my own projects I build AI agents, RAG pipelines and MCP servers that turn ideas into working apps. I learn fast, experiment constantly with tools like Claude Code, and I'm excited to grow as a Gen AI and Agentic AI engineer.",
  skills: [
    {
      category: "Languages",
      items: ["Python", "SQL", "TypeScript", "JavaScript", "Java", "Kotlin"],
    },
    {
      category: "Generative AI",
      items: [
        "LLM APIs (Groq, OpenAI, Claude, Gemini)",
        "RAG",
        "ReAct Agents",
        "Multi-Agent Orchestration",
        "MCP",
        "Prompt Engineering",
        "Voice AI Agents",
      ],
    },
    {
      category: "ML / Data",
      items: ["NLP (LDA, NMF, K-Means)", "Pandas", "Excel", "Power BI", "Tableau"],
    },
    {
      category: "Backend & Databases",
      items: [
        "FastAPI",
        "Pydantic",
        "SQLAlchemy",
        "Alembic",
        "REST APIs",
        "PostgreSQL",
        "SQLite",
      ],
    },
    {
      category: "Frontend",
      items: ["React", "Vite", "Streamlit", "Jetpack Compose"],
    },
    {
      category: "Tools & DevOps",
      items: [
        "Git",
        "Docker",
        "Pytest",
        "Vitest",
        "Playwright",
        "Render",
        "Railway",
        "Firebase",
        "Claude Code",
      ],
    },
  ],
  experience: [
    {
      role: "Data Science Intern (Generative AI)",
      company: "CellStrat, Bengaluru",
      dates: "Jun 2026 – Present",
      bullets: [
        "Design, prompt and test voice AI agents for e-commerce, HR recruitment, healthcare, pharma and retail use cases.",
        "Identify and document agent failures with screenshots, prompt snippets and improvement recommendations.",
        "Delivered technical webinars on Generative AI (Transformers, LLMs) and building with Claude (agents, MCP, Claude Code).",
      ],
    },
    {
      role: "Android App Development using Generative AI Intern",
      company: "Mind Matrix, Bengaluru",
      dates: "Feb 2026 – May 2026",
      bullets: [
        "Built Shaale-Vikas, an Android app in Kotlin + Jetpack Compose (MVVM) with Firebase and the Gemini API.",
      ],
    },
  ],
  projects: [
    {
      title: "BillShield — AI Hospital Bill Auditor",
      stack: ["FastAPI", "React", "TypeScript", "SQLite", "MCP"],
      github: "https://github.com/Kavya99720/billshield",
      bullets: [
        "Rules engine flags hospital overcharges against rate schedules and policy clauses with citations; drafts dispute letters.",
        "Human-in-the-loop review with four-eyes rule, scrypt-hashed accounts, signed session cookies, CSRF and login lockout.",
        "Read-only MCP server with PHI masking for AI agents; 99 Pytest + 43 Vitest + Playwright end-to-end tests.",
      ],
      featured: true,
    },
    {
      title: "AI-Powered Document Intelligence & Data Extraction Platform",
      stack: ["FastAPI", "Groq", "PostgreSQL", "Docker"],
      github: "https://github.com/Kavya99720/doc-intelligence-platform",
      live: "https://doc-intelligence-platform-i72d.onrender.com",
      bullets: [
        "OCR (PyMuPDF + Tesseract) + LLM structured extraction for invoices and contracts, validated by a business-rules engine.",
        "Field-level confidence scoring, human-review flagging and PostgreSQL audit trail; Streamlit dashboard, deployed on Render.",
      ],
      featured: true,
    },
    {
      title: "Enterprise AI Operating System — Multi-Agent Orchestration",
      stack: ["FastAPI", "PostgreSQL", "React", "Groq"],
      github: "https://github.com/Kavya99720/enterprise-ai-operating-system",
      bullets: [
        "Custom (non-LangChain) agent/provider architecture: agent selection, LLM execution, retries and execution history.",
      ],
      featured: false,
    },
    {
      title: "AI Placement & Interview Prep Assistant Suite",
      stack: ["FastAPI", "Groq", "Pytest"],
      github: "https://github.com/Kavya99720/interview-prep-assistant-suite",
      bullets: [
        "RAG pipeline, ReAct agent and MCP server built from scratch with rule-based fallbacks and Pytest suites.",
      ],
      featured: false,
    },
    {
      title: "Audio Notes Platform",
      stack: ["FastAPI", "Gnani ASR", "Groq", "Railway"],
      github: "https://github.com/Kavya99720/gnani-audio-notes",
      bullets: [
        "Audio upload to speech-to-text transcript and LLM summary, with progress states and error handling; deployed live.",
      ],
      featured: false,
    },
  ],
  education: [
    {
      degree: "B.E. Computer Science & Engineering",
      institution: "Vemana Institute of Technology, Bengaluru (VTU)",
      dates: "2022 – 2026",
      score: "CGPA 8.32",
    },
    {
      degree: "Pre-University (PCMB)",
      institution: "SVVN PU College, Neraluru",
      dates: "2021 – 2022",
      score: "84.8%",
    },
    {
      degree: "SSLC",
      institution: "New Macaulay English School",
      dates: "2019 – 2020",
      score: "92%",
    },
  ],
  certifications: [
    {
      issuer: "Anthropic",
      items: [
        {
          name: "Claude Code 101",
          date: "Sep 2026",
          verify: "https://academy.claude.com/verify/bcf965871b0ebc2d62e238963de5b7aa",
        },
        {
          name: "Claude Code in Action",
          date: "Sep 2026",
          verify: "https://academy.claude.com/verify/41f9433c5e0ace94cb7a5343d066e023",
        },
        {
          name: "Introduction to Model Context Protocol",
          date: "Sep 2026",
          verify: "https://academy.claude.com/verify/68f086d5e992ce26c0473043ac22c27a",
        },
        {
          name: "Model Context Protocol: Advanced Topics",
          date: "Sep 2026",
          verify: "https://academy.claude.com/verify/142d3e2580e2503fa4512539e5b05afc",
        },
        {
          name: "Introduction to Claude Cowork",
          date: "Sep 2026",
          verify: "https://verify.skilljar.com/c/dnpix8neukw4",
        },
        {
          name: "Claude 101",
          date: "Sep 2026",
          verify: "https://verify.skilljar.com/c/xxqr32epjr2c",
        },
        {
          name: "Building with the Claude API",
          date: "Jul 2026",
          verify: "https://verify.skilljar.com/c/7jkttsc5a6hf",
        },
      ],
    },
    {
      issuer: "NPTEL",
      items: [
        { name: "Artificial Intelligence: Concepts and Techniques", date: "Oct 2025" },
        { name: "Cloud Computing, Blockchain and its Applications" },
      ],
    },
    {
      issuer: "Infosys Springboard",
      items: [{ name: "Python Basics" }, { name: "Java Essentials" }],
    },
    {
      issuer: "Salesforce Trailhead",
      items: [
        { name: "Agentblazer Champion 2026" },
        { name: "17,625+ points, 51+ badges" },
      ],
    },
  ],
  contact: {
    email: "kavyashreecv2@gmail.com",
    linkedin: "https://linkedin.com/in/kavyashree-cv-ai",
    github: "https://github.com/Kavya99720",
  },
  resumeUrl: "/Kavyashree_CV_Resume_Public.pdf",
};
