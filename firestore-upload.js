// Paste this in your browser console (on your site after login as admin) or run in a Node.js script with Firebase Admin SDK.
// This will add your experience, projects, and certifications to Firestore.

// --- EXPERIENCE ---
const experiences = [
  {
    company: "SkillCraft Technology",
    role: "Machine Learning Intern",
    duration: "June 2024 - July 2024",
    order: 1,
    certificateLink: "https://drive.google.com/file/d/1xyz7EW8BIMn2RdeGziThoGWOq9hL9sdC/view",
    lorLink: "https://drive.google.com/file/d/1GvPg_VToEkXfTjsrdHf73r5c0nwCt3Jm/view",
    details: [
      "Developed a deep learning model to classify 10 unique hand gestures, enabling intuitive human-computer interaction",
      "Engineered a full-stack application using Flask API for back-end and HTML, CSS, JavaScript for front-end",
      "Integrated live camera feed with trained model for real-time gesture predictions with dark/light mode toggle"
    ]
  },
  {
    company: "Deloitte",
    role: "Virtual Internship and Job Simulation",
    duration: "2024",
    order: 2,
    certificateLink: "https://drive.google.com/file/d/1ihxPzLeEi0qbhB2683AptFOvejQmiHrB/view",
    lorLink: "",
    details: [
      "Completed Deloitte Australia's Data Analytics Job Simulation, gaining practical experience in data analysis and forensic technology",
      "Applied skills to real-world tasks using Excel to classify datasets and derive business conclusions",
      "Developed an interactive Tableau dashboard to visualize insights and present data effectively"
    ]
  },
  {
    company: "Tata Group",
    role: "Tata Group Job Simulation",
    duration: "2024",
    order: 3,
    certificateLink: "https://drive.google.com/file/d/1dQtYPrwDKAb4A5IZCS9JNedQke160rnm/view",
    lorLink: "",
    details: [
      "Completed GenAI Powered Data Analytics Job Simulation, gaining practical experience in AI-powered data analytics",
      "Conducted exploratory data analysis (EDA) using GenAI tools to assess data quality and identify risk indicators",
      "Proposed and justified a no-code predictive modelling framework to assess customer delinquency risk",
      "Designed an AI-driven collections strategy leveraging agentic AI and automation"
    ]
  }
];

// --- PROJECTS ---
const projects = [
  {
    title: "Interactive DSA Course Recommender",
    date: "August 2025",
    order: 1,
    tech: ["Python", "Flask", "JavaScript", "Tailwind CSS", "Firebase"],
    description: "Full-stack web application helping students plan courses using DSA algorithms, with intelligent recommendations and semester planning.",
    features: [
      "Graph visualization for course dependencies",
      "Trie-based course search system",
      "BFS algorithm for eligibility checking",
      "Topological Sort for semester planning"
    ],
    codeLink: "https://github.com/medhajha810/DSA_Project",
    demoLink: ""
  },
  {
    title: "Gastrointestinal Cancer Detection Using CNN",
    date: "March 2025",
    order: 2,
    tech: ["Python", "TensorFlow", "Keras", "Computer Vision"],
    description: "CNN model for early detection and classification of gastrointestinal cancer from medical imaging data with 98% accuracy.",
    features: [
      "98% detection accuracy achieved",
      "Reduced false positives significantly",
      "Preprocessed and augmented datasets",
      "Results visualization for clinical interpretability"
    ],
    codeLink: "https://github.com/medhajha810/Cancer-detection",
    demoLink: "https://new-cancer.onrender.com/"
  },
  {
    title: "Health Management System",
    date: "February 2025",
    order: 3,
    tech: ["Blockchain", "Internet Computer", "AI", "Healthcare Tech"],
    description: "Blockchain-based platform on Internet Computer addressing scattered and vulnerable patient records in traditional healthcare systems.",
    features: [
      "Secure, immutable patient data storage",
      "Seamless data sharing between healthcare providers",
      "ABHA integration for India's national health ID",
      "AI assistant for disease prediction"
    ],
    codeLink: "https://github.com/medhajha810/Health-Management",
    demoLink: "https://p2x5t-yqaaa-aaaah-arcma-cai.icp0.io/%23/project-details"
  }
];

// --- CERTIFICATIONS ---
const certifications = [
  {
    title: "140 Hours DSA Training",
    issuer: "Hitbullseye",
    date: "July 2025",
    link: "https://drive.google.com/file/d/1yBpGcLpYkVGW14MYoofV8outtNT4s91m/view"
  },
  {
    title: "Digital Systems: From Logic Gates to Processors",
    issuer: "Coursera",
    date: "September 2024",
    link: "https://drive.google.com/file/d/1FzYEBmAM_bRKlVQDN16MAW009WimlkTR/view"
  },
  {
    title: "Fundamentals of Network Communication",
    issuer: "Coursera",
    date: "September 2024",
    link: "https://drive.google.com/file/d/1n5GPKsJ3BXfaiuNnH8C_ifsgDxDgfVZk/view"
  },
  {
    title: "DSA with C",
    issuer: "CSE Pathshala",
    date: "March 2024",
    link: "https://drive.google.com/file/d/1UE6qzVlKYB5vpizfUy1qvI7d98IKSfo2/view"
  },
  {
    title: "Python Programming",
    issuer: "Infosys Springboard",
    date: "October 2023",
    link: "https://drive.google.com/file/d/1JqcChcIL_rnJujtf-GPdioLgoe3HX-ay/view"
  },
  {
    title: "Data Science",
    issuer: "Board Infinity",
    date: "2024",
    link: "https://drive.google.com/file/d/131rH1eSKpyBX1H6oE6F8mOevs3gguGTB/view?usp=sharing"
  },
  {
    title: "Data Analytics",
    issuer: "Coursera",
    date: "2024",
    link: "https://drive.google.com/file/d/15fM0GvDqZPAcyBZG1CnBZmBSC0tp2APu/view?usp=drive_link"
  },
  {
    title: "Internet of Things",
    issuer: "Infosys Springboard",
    date: "2024",
    link: "https://drive.google.com/file/d/1fEecIaUqd8JEKO05AtyIZth7fEICWAqP/view?usp=drive_link"
  }
];

// --- UPLOAD TO FIRESTORE (browser console version) ---
async function uploadAll() {
  // Experience
  for (const exp of experiences) {
    await db.collection('experiences').add(exp);
  }
  // Projects
  for (const proj of projects) {
    await db.collection('projects').add(proj);
  }
  // Certifications
  for (const cert of certifications) {
    await db.collection('certifications').add(cert);
  }
  alert('All data uploaded! Refresh your site.');
}

// To run: paste this whole script in your browser console after logging in as admin, then call:
// uploadAll();
