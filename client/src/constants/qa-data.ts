export interface Intent {
  intent: string;
  keywords: string[];
  answer: string;
}

export const fallbackAnswer =
  "Sorry, I'm not sure. Try asking about 'skills', 'projects', or 'education'.";

export const intentData: Intent[] = [
  // --- Greetings ---
   {
    intent: "value_proposition_hire",
    keywords: [
      "hire you",
      "why hire",
      "why should we hire",
      "good fit",
      "why you",
      "what value",
    ],
    answer:
      "You should hire me because I'm not just a developer; I'm a full-stack specialist with proven, hands-on experience in building scalable, production-ready applications. I specialize in modern stacks like Next.js and Nest.js, as you can see in my projects. My passion for clean architecture and continuous learning means I build high-quality, maintainable code and I'm always ready to adapt to new challenges.",
  },
  {
    intent: "greeting",
    keywords: ["hello", "hi", "hey", "start", "begin"],
    answer:
      "Hello! I'm a bot with info on Yasovardhan's resume. Feel free to ask me about his skills, projects, or experience.",
  },
 {
    intent: "hr_strengths",
    keywords: ["strengths", "what are you good at", "strongest skill"],
    answer:
      "My biggest strengths are my full-stack specialization in modern frameworks like Next.js and Nest.js, my practical experience building complete apps like 'casecode', and my passion for clean architecture. I'm also a fast, continuous learner, which is how I picked up Go and Rust.",
  },
  {
    intent: "hr_weakness",
    keywords: ["weakness", "weaknesses", "improve on", "area of growth"],
    answer:
      "Since my formal degree is in Electronics (ECE), not Computer Science, I've had to be extremely self-motivated to learn my full-stack skills. I sometimes find I need to spend extra time deepening my understanding of core CS theory to match the practical, hands-on experience I've gained from building projects.",
  },
  {
    intent: "hr_five_years",
    keywords: ["5 years", "five years", "goals", "future plan"],
    answer:
      "In 5 years, I aim to be a senior developer or technical lead, specializing in high-performance, scalable web applications. I want to be an expert in the MERN stack and advanced backend technologies like Nest.js and Go, while also having the opportunity to mentor other developers.",
  },
  {
    intent: "hr_challenge",
    keywords: [
      "challenging project",
      "difficult problem",
      "overcame a challenge",
    ],
    answer:
      "A good example is the 'visvotsav' college fest project. We needed a simple, real-time database for registrations on a tight deadline and with no budget. I creatively solved this by building a Node.js API to use Google Spreadsheets as a lightweight database. It was a fast, effective, and free solution that handled all the registrations successfully.",
  },
  {
    intent: "hr_pressure",
    keywords: [
      "pressure",
      "tight deadline",
      "stressful situation",
      "handle stress",
    ],
    answer:
      "I handle pressure by breaking down the problem and focusing on clear tasks. For the 'visvotsav' college fest platform, there was a hard deadline. I managed it by separating the work: first building the React frontend, then the Node.js API, and finally integrating the Google Sheets database, ensuring each part was functional before launch.",
  },
  {
    intent: "hr_conflict",
    keywords: ["conflict", "disagreement", "difficult coworker", "argue"],
    answer:
      "In a group project, a teammate and I had a strong disagreement about architecture. I favored a scalable Nest.js backend, while they wanted a simpler Express server to be faster. Instead of arguing, I listened to their goals, acknowledged the need for speed, and then built a small proof-of-concept with Nest.js to show it wouldn't add much time but would be far more maintainable. Seeing the clean structure, they agreed, and we ended up with a much better final product.",
  },
  {
    intent: "hr_learning",
    keywords: [
      "stay updated",
      "keep learning",
      "industry trends",
      "learn new tech",
    ],
    answer:
      "I'm a continuous learner; it's one of my hobbies! I learn by building. I don't just read about new tech; I build projects with it. That's how I learned Next.js for my e-commerce sites, GSAP for my portfolio, and why I'm currently learning Go and Rust on the side.",
  },
  {
    intent: "hr_motivation",
    keywords: ["motivates you", "what drives you", "passionate about"],
    answer:
      "I'm motivated by building things that work well and look good. I'm passionate about clean architecture and innovation. I get a lot of satisfaction from seeing a complex project like 'casecode' go from just an idea to a fully functional, scalable e-commerce site that users can interact with.",
  },
  {
    intent: "hr_ask_questions",
    keywords: ["questions for me", "questions for us", "any questions"],
    answer:
      "Yes, I do. Based on my skills, I have a few questions:\n1. What is your current tech stack for new projects?\n2. What is the biggest technical challenge this team is facing right now?\n3. How do you foster a culture of clean architecture and continuous learning here?",
  },
  {
    intent: "experience_general",
    keywords: ["experience", "work experience", "job history", "work history"],
    answer:
      "My practical experience comes from freelancing and building significant projects. I am currently freelancing for 'Tesserart', rebuilding their e-commerce site from Shopify to Next.js. My projects, like 'casecode' and 'visvotsav', also demonstrate my hands-on, full-stack skills.",
  },
  {
    intent: "help",
    keywords: ["help", "what can you do", "what can i ask", "menu"],
    answer:
      "You can ask me anything about Yasovardhan's resume! For example: 'What projects used Next.js?', 'Tell me about your education', or 'What are your backend skills?'.",
  },
  {
    intent: "bot_identity",
    keywords: ["are you a bot", "are you human", "how are you"],
    answer:
      "I am an AI chatbot. My purpose is to answer questions based on Masani Yasovardhan's resume.",
  },

  // --- Specific Project: Casecode ---
  {
    intent: "projects_casecode",
    keywords: ["casecode"],
    answer:
      "Casecode is an e-commerce website I developed for customizing and purchasing phone cases. It uses Next.js v14 server actions, Stripe for payments, and shadcn/ui. You can see it at casecode.vercel.app.",
  },
  // --- Specific Project: Portfolio ---
  {
    intent: "projects_portfolio",
    keywords: ["portfolio"],
    answer:
      "I designed and developed my personal portfolio at www.codecomfort.vercel.app to showcase my projects and skills. It's built with Next.js (for SSG and SSR), GSAP for animations, and Kinde for authentication.",
  },
  // --- Specific Project: Visvotsav ---
  {
    intent: "projects_visvotsav",
    keywords: ["visvotsav"],
    answer:
      "Visvotsav is a full-stack registration platform I built for a college fest. The frontend uses React and shadcn/ui, the backend API is built with Node.js, and it creatively uses Google Spreadsheets as a lightweight database.",
  },
  // --- General Projects ---
  {
    intent: "projects_general",
    keywords: ["project", "work", "build", "made"],
    answer:
      "I have built three main projects: 'casecode' (an e-commerce site), 'portfolio' (my personal website), and 'visvotsav' (a college fest registration platform). You can ask me about a specific one!",
  },

  // --- Specific Experience: Tesserart ---
  {
    intent: "experience_freelance",
    keywords: ["freelance", "tesserart", "shopify"],
    answer:
      "I am currently freelancing for Tesserart, an MSME clothing brand. I'm rebuilding their e-commerce site using Next.js, migrating them from Shopify to a more custom and scalable solution.",
  },
  // --- General Achievements ---
  {
    intent: "achievements",
    keywords: ["achievements", "workshops", "award", "prize"],
    answer:
      "My achievements include: 1) Freelancing for 'Tesserart' to rebuild their e-commerce site. 2) Completing workshops on IoT and AI. 3) Winning 2nd Prize in a school-level Science Fair.",
  },

  // --- Specific Skills: Frontend (must be before 'skills_general') ---
  {
    intent: "skills_nextjs",
    keywords: ["next.js", "nextjs"],
    answer:
      "Yes, I specialize in modern frameworks like Next.js. I've used it in multiple projects, including 'casecode' and my 'portfolio'.",
  },
  {
    intent: "skills_react",
    keywords: ["react"],
    answer:
      "Yes, React.js is a key frontend skill of mine. I used it to build the 'visvotsav' project.",
  },
  {
    intent: "skills_gsap",
    keywords: ["gsap", "animation"],
    answer:
      "Yes, I have used GSAP (GreenSock Animation Platform) for animations, like in my portfolio project.",
  },
  {
    intent: "skills_shadcn",
    keywords: ["shadcn", "shadcn/ui"],
    answer:
      "Yes, I've used Shadcn/UI for building responsive UI components in my 'casecode' and 'visvotsav' projects.",
  },
  {
    intent: "skills_tailwind",
    keywords: ["tailwind"],
    answer:
      "Yes, Tailwind CSS is one of my main frontend skills for rapid UI development.",
  },
  {
    intent: "skills_frontend_general",
    keywords: [
      "frontend",
      "ui",
      "user interface",
      "state management",
      "routing",
      "form",
    ],
    answer:
      "My frontend skills are: HTML, CSS, JS, React.js, Next.js, Tanstack Query, Shadcn/UI, Tailwind CSS, React Hook Form, React Router DOM, Tanstack Router, DaisyUI, and GSAP.",
  },
  // --- Specific Skills: Backend (must be before 'skills_general') ---
  {
    intent: "skills_nest",
    keywords: ["nest.js", "nest"],
    answer:
      "Yes, I specialize in modern backend frameworks like NestJS, as listed in my 'About Me' section.",
  },
  {
    intent: "skills_node",
    keywords: ["node.js", "node"],
    answer:
      "Yes, Node.js is a core backend skill. I used it to build the API for the 'visvotsav' project.",
  },
  {
    intent: "skills_backend_general",
    keywords: ["backend", "api", "rest", "socket.io", "bullmq"],
    answer:
      "My backend skills include Node.js, Nest.js, express, Hono, Socket.io, REST API, and BullMQ.",
  },
  // --- Specific Skills: Database (must be before 'skills_general') ---
  {
    intent: "skills_database",
    keywords: [
      "database",
      "db",
      "mongo",
      "redis",
      "orm",
      "prisma",
      "drizzle",
      "mongoose",
    ],
    answer:
      "I use MongoDB and Redis. I also use ORMs like Mongoose, Prisma, and Drizzle ORM.",
  },
  // --- Specific Skills: Languages (must be before 'skills_general') ---
  {
    intent: "skills_languages_programming",
    keywords: [
      "programming language",
      "typescript",
      "go",
      "rust",
      "java",
      "javascript",
    ],
    answer:
      "I use JavaScript, TypeScript, Go, and Rust. I also know Java basics.",
  },
  // --- General Skills ---
  {
    intent: "skills_general",
    keywords: ["skill", "tech", "technology", "stack"],
    answer:
      "I have skills in Frontend (React, Next.js, TypeScript), Backend (Node.js, Nest.js, Go), Databases (MongoDB, Redis, Prisma, Drizzle), and Tools (Git, Stripe). Ask 'frontend skills', 'backend skills', etc. for more details!",
  },
  // --- General Tools ---
  {
    intent: "skills_tools",
    keywords: [
      "tool",
      "platform",
      "git",
      "github",
      "stripe",
      "payment",
      "kinde",
      "auth",
    ],
    answer:
      "I use Git, Github, the Stripe API (for payments in 'casecode'), and Kinde (for auth in my 'portfolio').",
  },

  // --- Education ---
  {
    intent: "education",
    keywords: [
      "education",
      "college",
      "degree",
      "graduate",
      "gpa",
      "b.tech",
      "ece",
      "intermediate",
      "ssc",
      "10th",
    ],
    answer:
      "I have a B.Tech in Electronics and Communication Engineering (ECE) from PBR Visvodaya institute of technology and science (2019-2023) with 63.4%.",
  },

  // --- Hobbies ---
  {
    intent: "hobbies",
    keywords: ["hobby", "interest", "fun", "cook", "music"],
    answer:
      "My hobbies include learning new technologies, experimenting with different recipes in cooking, and exploring music across various genres.",
  },
 
  // --- About Me / Personal Info ---
  {
    intent: "about_self",
    keywords: [
      "about you",
      "tell me about yourself",
      "who are you",
      "strengths",
      "weakness",
      "full-stack",
      "mern",
      "clean architecture",
    ],
    answer:
      "I'm a Full-Stack Developer specializing in the MERN stack, Next.js, and Nest.js. I have hands-on experience building scalable, production-ready web apps. I'm passionate about clean architecture and I'm a continuous learner.",
  },
  {
    intent: "personal_name",
    keywords: ["name", "full name"],
    answer: "My name is Masani Yasovardhan.",
  },
  {
    intent: "personal_age",
    keywords: ["age", "old", "birthday", "dob", "date of birth"],
    answer:
      "I was born on July 21st, 2001. As of late 2025, I am 24 years old.",
  },
  {
    intent: "personal_languages_spoken",
    keywords: ["speak", "fluent", "telugu", "english"],
    answer: "I speak Telugu (native) and English (fluent).",
  },

  // --- Contact & Links ---
  {
    intent: "contact_email",
    keywords: ["email"],
    answer: "My email is yasovardhanmasani@gmail.com.",
  },
  {
    intent: "contact_phone",
    keywords: ["phone", "number"],
    answer: "My phone number is +91 99896 19928.",
  },
  {
    intent: "contact_location",
    keywords: ["location", "located", "address", "city", "live", "hyderabad"],
    answer: "My address is in Nagole, Hyderabad - 500039.",
  },
  {
    intent: "contact_general",
    keywords: ["contact", "reach you"],
    answer:
      "You can reach me at yasovardhanmasani@gmail.com or +91 99896 19928.",
  },
  {
    intent: "links_github",
    keywords: ["github", "username"],
    answer:
      "My GitHub is at https://www.github.com/codecomfortcc (username: codecomfortcc).",
  },
  {
    intent: "links_linkedin",
    keywords: ["linkedin"],
    answer: "My LinkedIn is https://www.linkedin.com/in/yasovardhanmasani.",
  },

  // --- Acknowledgments & Politeness ---
  {
    intent: "thanks",
    keywords: [
      "thanks",
      "thank you",
      "nice",
      "cool",
      "good",
      "impressive",
      "great",
      "perfect",
    ],
    answer: "Thank you! What else can I help you with?",
  },
  {
    intent: "acknowledgment_ok",
    keywords: ["ok", "okay", "got it", "sounds good"],
    answer: "Great. What other questions do you have for me?",
  },

  // --- Farewell ---
  {
    intent: "farewell",
    keywords: ["bye", "goodbye"],
    answer: "Goodbye! Have a great day.",
  },
 
  // --- Confusion / Fallback (low-confidence) ---
  // These catch common confused phrases.
  // The main 'fallbackAnswer' will catch everything else.
  {
    intent: "confusion",
    keywords: ["what?", "huh?", "don't understand", "what do you mean?"],
    answer:
      "My apologies. My knowledge is limited to Yasovardhan's resume. You can ask me a specific question, like 'What are your backend skills?' or 'Tell me about the casecode project'.",
  },
  {
    intent: "dispute",
    keywords: ["wrong", "incorrect"],
    answer:
      "My apologies. All my answers are programmed from the resume. Please try rephrasing your question, or ask about skills, projects, or education.",
  },
];
