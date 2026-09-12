const aktuMasterDatabase = {
  // Semester 1 (Physics Group - Common for all branches)
  "COMMON_1": [
    {
      id: "BAS103",
      name: "Engineering Mathematics-I",
      shortName: "Maths-I",
      icon: "📐",
      units: [
        { unit: 1, title: "Unit 1: Matrices & Linear Algebra", query: "AKTU Engineering Mathematics 1 Unit 1 one shot" },
        { unit: 2, title: "Unit 2: Differential Calculus-I", query: "AKTU Engineering Mathematics 1 Unit 2 one shot" },
        { unit: 3, title: "Unit 3: Differential Calculus-II", query: "AKTU Engineering Mathematics 1 Unit 3 one shot" },
        { unit: 4, title: "Unit 4: Multivariable Calculus-I", query: "AKTU Engineering Mathematics 1 Unit 4 one shot" },
        { unit: 5, title: "Unit 5: Vector Calculus", query: "AKTU Engineering Mathematics 1 Unit 5 one shot" }
      ]
    },
    {
      id: "BAS101",
      name: "Engineering Physics",
      shortName: "Physics",
      icon: "⚛️",
      units: [
        { unit: 1, title: "Unit 1: Relativistic Mechanics", query: "AKTU Engineering Physics Unit 1 one shot" },
        { unit: 2, title: "Unit 2: Electromagnetic Field Theory", query: "AKTU Engineering Physics Unit 2 one shot" },
        { unit: 3, title: "Unit 3: Quantum Mechanics", query: "AKTU Engineering Physics Unit 3 one shot" },
        { unit: 4, title: "Unit 4: Wave Optics (Interference & Diffraction)", query: "AKTU Engineering Physics Unit 4 one shot" },
        { unit: 5, title: "Unit 5: Fiber Optics & Laser", query: "AKTU Engineering Physics Unit 5 one shot" }
      ]
    },
    {
      id: "BCS101",
      name: "Programming for Problem Solving (C)",
      shortName: "PPS (C)",
      icon: "💻",
      units: [
        { unit: 1, title: "Unit 1: Basics of Computer & C Syntax", query: "AKTU PPS Unit 1 one shot" },
        { unit: 2, title: "Unit 2: Control Statements & Loops", query: "AKTU PPS Unit 2 one shot" },
        { unit: 3, title: "Unit 3: Arrays & Functions", query: "AKTU PPS Unit 3 one shot" },
        { unit: 4, title: "Unit 4: Pointers & Structures", query: "AKTU PPS Unit 4 one shot" },
        { unit: 5, title: "Unit 5: File Handling & Preprocessors", query: "AKTU PPS Unit 5 one shot" }
      ]
    },
    {
      id: "BEE101",
      name: "Basic Electrical Engineering",
      shortName: "BEE",
      icon: "⚡",
      units: [
        { unit: 1, title: "Unit 1: DC Circuits Analysis & Theorems", query: "AKTU Basic Electrical Engineering Unit 1 one shot" },
        { unit: 2, title: "Unit 2: Single Phase AC Circuits & Resonance", query: "AKTU Basic Electrical Engineering Unit 2 one shot" },
        { unit: 3, title: "Unit 3: Three Phase AC Systems", query: "AKTU Basic Electrical Engineering Unit 3 one shot" },
        { unit: 4, title: "Unit 4: Magnetic Circuits & Transformers", query: "AKTU Basic Electrical Engineering Unit 4 one shot" },
        { unit: 5, title: "Unit 5: Electrical Machines (DC & AC)", query: "AKTU Basic Electrical Engineering Unit 5 one shot" }
      ]
    },
    {
      id: "BAS105",
      name: "Soft Skills-I",
      shortName: "Soft Skills",
      icon: "🗣️",
      units: [
        { unit: 1, title: "Unit 1: Basics of Grammar & Usage", query: "AKTU Soft Skills Unit 1 one shot" },
        { unit: 2, title: "Unit 2: Technical Writing & Composition", query: "AKTU Soft Skills Unit 2 one shot" },
        { unit: 3, title: "Unit 3: Reading Comprehension & Vocabulary", query: "AKTU Soft Skills Unit 3 one shot" },
        { unit: 4, title: "Unit 4: Professional Communication", query: "AKTU Soft Skills Unit 4 one shot" },
        { unit: 5, title: "Unit 5: Presentation & Interpersonal Skills", query: "AKTU Soft Skills Unit 5 one shot" }
      ]
    }
  ],

  // Semester 2 (Chemistry Group - Common for all branches)
  "COMMON_2": [
    {
      id: "BAS203",
      name: "Engineering Mathematics-II",
      shortName: "Maths-II",
      icon: "📐",
      units: [
        { unit: 1, title: "Unit 1: Ordinary Differential Equations (Higher Order)", query: "AKTU Engineering Mathematics 2 Unit 1 one shot" },
        { unit: 2, title: "Unit 2: Multivariable Calculus-II", query: "AKTU Engineering Mathematics 2 Unit 2 one shot" },
        { unit: 3, title: "Unit 3: Complex Variable - Differentiation", query: "AKTU Engineering Mathematics 2 Unit 3 one shot" },
        { unit: 4, title: "Unit 4: Complex Variable - Integration", query: "AKTU Engineering Mathematics 2 Unit 4 one shot" },
        { unit: 5, title: "Unit 5: Laplace Transforms & Applications", query: "AKTU Engineering Mathematics 2 Unit 5 one shot" }
      ]
    },
    {
      id: "BAS202",
      name: "Engineering Chemistry",
      shortName: "Chemistry",
      icon: "🧪",
      units: [
        { unit: 1, title: "Unit 1: Atomic & Molecular Structure, MOT", query: "AKTU Engineering Chemistry Unit 1 one shot" },
        { unit: 2, title: "Unit 2: Spectroscopic Techniques (UV, IR, NMR)", query: "AKTU Engineering Chemistry Unit 2 one shot" },
        { unit: 3, title: "Unit 3: Electrochemistry & Corrosion", query: "AKTU Engineering Chemistry Unit 3 one shot" },
        { unit: 4, title: "Unit 4: Water Technology & Treatment", query: "AKTU Engineering Chemistry Unit 4 one shot" },
        { unit: 5, title: "Unit 5: Polymers, Nanomaterials & Green Chemistry", query: "AKTU Engineering Chemistry Unit 5 one shot" }
      ]
    },
    {
      id: "BEC201",
      name: "Basic Electronics Engineering",
      shortName: "Electronics",
      icon: "📻",
      units: [
        { unit: 1, title: "Unit 1: Semiconductor Diodes & Diode Circuits", query: "AKTU Basic Electronics Engineering Unit 1 one shot" },
        { unit: 2, title: "Unit 2: BJT Configurations & Biasing", query: "AKTU Basic Electronics Engineering Unit 2 one shot" },
        { unit: 3, title: "Unit 3: FET, JFET & MOSFETs", query: "AKTU Basic Electronics Engineering Unit 3 one shot" },
        { unit: 4, title: "Unit 4: Operational Amplifiers (Op-Amps)", query: "AKTU Basic Electronics Engineering Unit 4 one shot" },
        { unit: 5, title: "Unit 5: Digital Basics & Logic Gates", query: "AKTU Basic Electronics Engineering Unit 5 one shot" }
      ]
    },
    {
      id: "BME201",
      name: "Fundamentals of Mechanical Engineering",
      shortName: "FME",
      icon: "⚙️",
      units: [
        { unit: 1, title: "Unit 1: Force Systems & Mechanics", query: "AKTU Fundamentals of Mechanical Engineering Unit 1" },
        { unit: 2, title: "Unit 2: Stress, Strain & Beams", query: "AKTU Fundamentals of Mechanical Engineering Unit 2" },
        { unit: 3, title: "Unit 3: Thermodynamics & IC Engines", query: "AKTU Fundamentals of Mechanical Engineering Unit 3" },
        { unit: 4, title: "Unit 4: Fluid Mechanics & Turbines", query: "AKTU Fundamentals of Mechanical Engineering Unit 4" },
        { unit: 5, title: "Unit 5: Power Transmission (Belts, Gears)", query: "AKTU Fundamentals of Mechanical Engineering Unit 5" }
      ]
    },
    {
      id: "BAS204",
      name: "Environment & Ecology",
      shortName: "EVS",
      icon: "🌱",
      units: [
        { unit: 1, title: "Unit 1: Ecosystem & Biodiversity", query: "AKTU Environment and Ecology Unit 1 one shot" },
        { unit: 2, title: "Unit 2: Natural Resources & Conservation", query: "AKTU Environment and Ecology Unit 2 one shot" },
        { unit: 3, title: "Unit 3: Environmental Pollution & Control", query: "AKTU Environment and Ecology Unit 3 one shot" },
        { unit: 4, title: "Unit 4: Global Warming & Environmental Laws", query: "AKTU Environment and Ecology Unit 4 one shot" },
        { unit: 5, title: "Unit 5: Sustainable Development & Ethics", query: "AKTU Environment and Ecology Unit 5 one shot" }
      ]
    }
  ],

  // Computer Science & Engineering (AI & ML)
  "CSE_AIML": {
    "3": [
      {
        id: "BCS301",
        name: "Data Structures",
        shortName: "DS",
        icon: "🌲",
        units: [
          { unit: 1, title: "Unit 1: Arrays, Searching & Sorting", query: "AKTU Data Structures Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Stacks & Queues", query: "AKTU Data Structures Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Linked Lists", query: "AKTU Data Structures Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Trees & BST", query: "AKTU Data Structures Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Graphs & File Structures", query: "AKTU Data Structures Unit 5 one shot" }
        ]
      },
      {
        id: "BCS302",
        name: "Computer Organization and Architecture",
        shortName: "COA",
        icon: "🖥️",
        units: [
          { unit: 1, title: "Unit 1: Data Representation & Instructions", query: "AKTU COA Unit 1 one shot" },
          { unit: 2, title: "Unit 2: ALU & Arithmetic Processing", query: "AKTU COA Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Control Unit Design", query: "AKTU COA Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Memory Hierarchy & Cache", query: "AKTU COA Unit 4 one shot" },
          { unit: 5, title: "Unit 5: I/O Interface & Pipelining", query: "AKTU COA Unit 5 one shot" }
        ]
      },
      {
        id: "BCS303",
        name: "Discrete Mathematics",
        shortName: "Discrete Maths",
        icon: "🔢",
        units: [
          { unit: 1, title: "Unit 1: Sets, Relations & Functions", query: "AKTU Discrete Mathematics Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Algebraic Structures & Groups", query: "AKTU Discrete Mathematics Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Lattices & Boolean Algebra", query: "AKTU Discrete Mathematics Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Propositional & Predicate Logic", query: "AKTU Discrete Mathematics Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Recurrence Relations & Graph Theory", query: "AKTU Discrete Mathematics Unit 5 one shot" }
        ]
      },
      {
        id: "BAS301",
        name: "Technical Communication",
        shortName: "Tech Comm",
        icon: "📝",
        units: [
          { unit: 1, title: "Unit 1: Communication Process & Types", query: "AKTU Technical Communication Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Technical Writing & Reports", query: "AKTU Technical Communication Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Proposals & Research Papers", query: "AKTU Technical Communication Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Presentation Skills", query: "AKTU Technical Communication Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Interviews & Group Discussions", query: "AKTU Technical Communication Unit 5 one shot" }
        ]
      }
    ],
    "4": [
      {
        id: "BCS401",
        name: "Operating Systems",
        shortName: "OS",
        icon: "💻",
        units: [
          { unit: 1, title: "Unit 1: System Calls & Process Management", query: "AKTU Operating Systems Unit 1 one shot" },
          { unit: 2, title: "Unit 2: CPU Scheduling & Synchronization", query: "AKTU Operating Systems Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Deadlocks Prevention & Avoidance", query: "AKTU Operating Systems Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Memory Management & Paging", query: "AKTU Operating Systems Unit 4 one shot" },
          { unit: 5, title: "Unit 5: File Systems & Disk Scheduling", query: "AKTU Operating Systems Unit 5 one shot" }
        ]
      },
      {
        id: "BCS402",
        name: "Theory of Computation (TAFL)",
        shortName: "TAFL",
        icon: "⚙️",
        units: [
          { unit: 1, title: "Unit 1: Finite Automata (DFA, NFA)", query: "AKTU TAFL Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Regular Expressions & Pumping Lemma", query: "AKTU TAFL Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Context-Free Grammars (CFG)", query: "AKTU TAFL Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Pushdown Automata (PDA)", query: "AKTU TAFL Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Turing Machines & Halting Problem", query: "AKTU TAFL Unit 5 one shot" }
        ]
      },
      {
        id: "BCAI401",
        name: "Foundations of AI & ML",
        shortName: "AI Foundations",
        icon: "🧠",
        units: [
          { unit: 1, title: "Unit 1: AI Agents & Problem Solving", query: "AKTU Foundations of AI Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Heuristic Search & Games", query: "AKTU Foundations of AI Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Supervised Learning & Regression", query: "AKTU Machine Learning Unit 1 one shot" },
          { unit: 4, title: "Unit 4: Classification & Clustering", query: "AKTU Machine Learning Unit 2 one shot" },
          { unit: 5, title: "Unit 5: Model Validation & Overfitting", query: "AKTU Machine Learning Unit 3 one shot" }
        ]
      },
      {
        id: "BAS401",
        name: "Universal Human Values (UHV)",
        shortName: "UHV",
        icon: "🕊️",
        units: [
          { unit: 1, title: "Unit 1: Value Education & Self-Exploration", query: "AKTU UHV Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Harmony in the Human Being", query: "AKTU UHV Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Harmony in Family & Society", query: "AKTU UHV Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Harmony in Nature", query: "AKTU UHV Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Holistic Understanding & Ethics", query: "AKTU UHV Unit 5 one shot" }
        ]
      }
    ],
    "5": [
      {
        id: "BCS503",
        name: "Design & Analysis of Algorithms",
        shortName: "DAA",
        icon: "⚡",
        units: [
          { unit: 1, title: "Unit 1: Asymptotic Notations & Recurrences", query: "AKTU DAA Unit 1 one shot Gate Smashers" },
          { unit: 2, title: "Unit 2: Divide & Conquer, Sorting Algorithms", query: "AKTU DAA Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Greedy Technique & Dynamic Programming", query: "AKTU DAA Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Backtracking, Branch & Bound", query: "AKTU DAA Unit 4 one shot" },
          { unit: 5, title: "Unit 5: String Matching & NP-Completeness", query: "AKTU DAA Unit 5 one shot" }
        ]
      },
      {
        id: "BCAI501",
        name: "Artificial Intelligence",
        shortName: "AI",
        icon: "🤖",
        units: [
          { unit: 1, title: "Unit 1: AI Search Strategies (BFS, DFS, A*)", query: "AKTU Artificial Intelligence Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Knowledge Representation & Predicate Logic", query: "AKTU Artificial Intelligence Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Reasoning Under Uncertainty & Bayes Rule", query: "AKTU Artificial Intelligence Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Planning & Minimax Game Playing", query: "AKTU Artificial Intelligence Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Expert Systems & Natural Language Basics", query: "AKTU Artificial Intelligence Unit 5 one shot" }
        ]
      },
      {
        id: "BCS052",
        name: "Data Analytics",
        shortName: "Data Analytics",
        icon: "📊",
        units: [
          { unit: 1, title: "Unit 1: Data Analytics Life Cycle & Prep", query: "AKTU Data Analytics Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Exploratory Data Analysis & Stats", query: "AKTU Data Analytics Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Regression & Classification Models", query: "AKTU Data Analytics Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Clustering & Pattern Mining", query: "AKTU Data Analytics Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Time Series & Visualizations", query: "AKTU Data Analytics Unit 5 one shot" }
        ]
      },
      {
        id: "BCAM051",
        name: "Cloud Computing",
        shortName: "Cloud Computing",
        icon: "☁️",
        units: [
          { unit: 1, title: "Unit 1: Cloud Architecture & Service Models", query: "AKTU Cloud Computing Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Virtualization & Hypervisors", query: "AKTU Cloud Computing Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Cloud Infrastructure & Storage", query: "AKTU Cloud Computing Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Cloud Security & IAM", query: "AKTU Cloud Computing Unit 4 one shot" },
          { unit: 5, title: "Unit 5: SOA & Modern Cloud Tools", query: "AKTU Cloud Computing Unit 5 one shot" }
        ]
      },
      {
        id: "BCS501",
        name: "Database Management Systems",
        shortName: "DBMS",
        icon: "🗄️",
        units: [
          { unit: 1, title: "Unit 1: ER Diagrams & Relational Model", query: "AKTU DBMS Unit 1 one shot Gate Smashers" },
          { unit: 2, title: "Unit 2: Relational Algebra & SQL", query: "AKTU DBMS Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Normalization & Functional Dependencies", query: "AKTU DBMS Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Transactions & Concurrency Control", query: "AKTU DBMS Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Recovery Systems & Deadlocks", query: "AKTU DBMS Unit 5 one shot" }
        ]
      },
      {
        id: "BNC501",
        name: "Constitution of India, Law & Engineering",
        shortName: "Constitution of India",
        icon: "📜",
        units: [
          { unit: 1, title: "Unit 1: Constitution Background & Preamble", query: "AKTU Constitution of India Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Fundamental Rights & Duties, DPSP", query: "AKTU Constitution of India Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Union Executive, President & Parliament", query: "AKTU Constitution of India Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Judiciary & Constitutional Amendments", query: "AKTU Constitution of India Unit 4 one shot" },
          { unit: 5, title: "Unit 5: IPR, Patents & Cyber Laws", query: "AKTU Constitution of India Unit 5 one shot" }
        ]
      }
    ],
    "6": [
      {
        id: "BCAI601",
        name: "Machine Learning Techniques",
        shortName: "ML",
        icon: "🤖",
        units: [
          { unit: 1, title: "Unit 1: Linear & Logistic Regression, Gradient Descent", query: "AKTU Machine Learning Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Decision Trees, Random Forest & SVM", query: "AKTU Machine Learning Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Neural Networks & Backpropagation", query: "AKTU Machine Learning Unit 3 one shot" },
          { unit: 4, title: "Unit 4: K-Means Clustering & PCA", query: "AKTU Machine Learning Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Reinforcement Learning & Validation", query: "AKTU Machine Learning Unit 5 one shot" }
        ]
      },
      {
        id: "BCS601",
        name: "Computer Networks",
        shortName: "CN",
        icon: "🌐",
        units: [
          { unit: 1, title: "Unit 1: OSI & TCP/IP Reference Models", query: "AKTU Computer Networks Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Data Link Layer & Error Control", query: "AKTU Computer Networks Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Network Layer & Routing Protocols", query: "AKTU Computer Networks Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Transport Layer Protocols (TCP/UDP)", query: "AKTU Computer Networks Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Application Layer Protocols & Security", query: "AKTU Computer Networks Unit 5 one shot" }
        ]
      },
      {
        id: "BCS602",
        name: "Software Engineering",
        shortName: "SE",
        icon: "🛠️",
        units: [
          { unit: 1, title: "Unit 1: SDLC Models (Waterfall, Agile) & SRS", query: "AKTU Software Engineering Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Software Architecture & Modular Design", query: "AKTU Software Engineering Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Object-Oriented Design & UML", query: "AKTU Software Engineering Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Testing Methodologies (Black/White Box)", query: "AKTU Software Engineering Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Maintenance & COCOMO Estimation", query: "AKTU Software Engineering Unit 5 one shot" }
        ]
      },
      {
        id: "BCAI061",
        name: "Deep Learning",
        shortName: "Deep Learning",
        icon: "🧠",
        units: [
          { unit: 1, title: "Unit 1: Multi-Layer Perceptrons & Optimizers", query: "AKTU Deep Learning Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Convolutional Neural Networks (CNN)", query: "AKTU Deep Learning Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Recurrent Neural Networks (RNN/LSTM)", query: "AKTU Deep Learning Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Autoencoders & GANs", query: "AKTU Deep Learning Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Transfer Learning & Pre-trained Nets", query: "AKTU Deep Learning Unit 5 one shot" }
        ]
      },
      {
        id: "BCAI062",
        name: "Computer Vision",
        shortName: "Computer Vision",
        icon: "👁️",
        units: [
          { unit: 1, title: "Unit 1: Image Processing & Geometric Filters", query: "AKTU Computer Vision Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Edge & Corner Detection (SIFT/Harris)", query: "AKTU Computer Vision Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Image Segmentation & Features", query: "AKTU Computer Vision Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Object Recognition & Tracking", query: "AKTU Computer Vision Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Deep Vision & 3D Reconstruction", query: "AKTU Computer Vision Unit 5 one shot" }
        ]
      },
      {
        id: "BNC601",
        name: "Essence of Indian Traditional Knowledge",
        shortName: "EITK",
        icon: "🪷",
        units: [
          { unit: 1, title: "Unit 1: Indian Knowledge Systems", query: "AKTU Essence of Indian Traditional Knowledge Unit 1" },
          { unit: 2, title: "Unit 2: Indian Philosophical Systems", query: "AKTU Essence of Indian Traditional Knowledge Unit 2" },
          { unit: 3, title: "Unit 3: Indian Literature, Vedas & Epics", query: "AKTU Essence of Indian Traditional Knowledge Unit 3" },
          { unit: 4, title: "Unit 4: Traditional Science & Ayurveda", query: "AKTU Essence of Indian Traditional Knowledge Unit 4" },
          { unit: 5, title: "Unit 5: Cultural Arts & Modern Relevance", query: "AKTU Essence of Indian Traditional Knowledge Unit 5" }
        ]
      }
    ],
    "7": [
      {
        id: "BCAI701",
        name: "Natural Language Processing",
        shortName: "NLP",
        icon: "💬",
        units: [
          { unit: 1, title: "Unit 1: Text Tokenization & Preprocessing", query: "AKTU NLP Unit 1 one shot" },
          { unit: 2, title: "Unit 2: N-gram Models & Smoothing", query: "AKTU NLP Unit 2 one shot" },
          { unit: 3, title: "Unit 3: POS Tagging & Dependency Parsing", query: "AKTU NLP Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Embeddings (Word2Vec, BERT)", query: "AKTU NLP Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Transformers & Seq2Seq", query: "AKTU NLP Unit 5 one shot" }
        ]
      },
      {
        id: "BCS701",
        name: "Information Security",
        shortName: "Info Security",
        icon: "🔒",
        units: [
          { unit: 1, title: "Unit 1: Cryptography Basics & Ciphers", query: "AKTU Information Security Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Public Key Crypto & RSA", query: "AKTU Information Security Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Hash Functions & Signatures", query: "AKTU Information Security Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Network Security (SSL/IPSec)", query: "AKTU Information Security Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Firewalls & Malwares", query: "AKTU Information Security Unit 5 one shot" }
        ]
      }
    ],
    "8": [
      {
        id: "BCAI801",
        name: "AI Ethics & Governance",
        shortName: "AI Ethics",
        icon: "⚖️",
        units: [
          { unit: 1, title: "Unit 1: Ethical AI Foundations", query: "AKTU AI Ethics Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Algorithmic Fairness & Bias", query: "AKTU AI Ethics Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Privacy & Federated Learning", query: "AKTU AI Ethics Unit 3 one shot" },
          { unit: 4, title: "Unit 4: AI Safety & Adversarial Robustness", query: "AKTU AI Ethics Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Legal Policies & Frameworks", query: "AKTU AI Ethics Unit 5 one shot" }
        ]
      }
    ]
  },

  // Computer Science & Engineering (Core)
  "CSE_CORE": {
    "3": [
      {
        id: "BCS301",
        name: "Data Structures",
        shortName: "DS",
        icon: "🌲",
        units: [
          { unit: 1, title: "Unit 1: Arrays, Searching & Sorting", query: "AKTU Data Structures Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Stacks & Queues", query: "AKTU Data Structures Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Linked Lists", query: "AKTU Data Structures Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Trees & BST", query: "AKTU Data Structures Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Graphs & Hashing", query: "AKTU Data Structures Unit 5 one shot" }
        ]
      },
      {
        id: "BCS302",
        name: "Computer Organization and Architecture",
        shortName: "COA",
        icon: "🖥️",
        units: [
          { unit: 1, title: "Unit 1: Data Representation & Instructions", query: "AKTU COA Unit 1 one shot" },
          { unit: 2, title: "Unit 2: ALU & Multiplication Algorithms", query: "AKTU COA Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Control Unit Design", query: "AKTU COA Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Memory Organization", query: "AKTU COA Unit 4 one shot" },
          { unit: 5, title: "Unit 5: I/O Interface & Pipelining", query: "AKTU COA Unit 5 one shot" }
        ]
      },
      {
        id: "BCS303",
        name: "Discrete Mathematics",
        shortName: "Discrete Maths",
        icon: "🔢",
        units: [
          { unit: 1, title: "Unit 1: Sets, Relations & Functions", query: "AKTU Discrete Mathematics Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Algebraic Structures & Groups", query: "AKTU Discrete Mathematics Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Lattices & Boolean Algebra", query: "AKTU Discrete Mathematics Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Propositional & Predicate Logic", query: "AKTU Discrete Mathematics Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Recurrence & Graph Theory", query: "AKTU Discrete Mathematics Unit 5 one shot" }
        ]
      }
    ],
    "4": [
      {
        id: "BCS401",
        name: "Operating Systems",
        shortName: "OS",
        icon: "💻",
        units: [
          { unit: 1, title: "Unit 1: Processes & System Calls", query: "AKTU Operating Systems Unit 1 one shot" },
          { unit: 2, title: "Unit 2: CPU Scheduling & Synchronization", query: "AKTU Operating Systems Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Deadlocks", query: "AKTU Operating Systems Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Memory Management", query: "AKTU Operating Systems Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Disk Scheduling & Files", query: "AKTU Operating Systems Unit 5 one shot" }
        ]
      },
      {
        id: "BCS402",
        name: "Theory of Computation (TAFL)",
        shortName: "TAFL",
        icon: "⚙️",
        units: [
          { unit: 1, title: "Unit 1: Finite Automata", query: "AKTU TAFL Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Regular Expressions", query: "AKTU TAFL Unit 2 one shot" },
          { unit: 3, title: "Unit 3: CFG & Languages", query: "AKTU TAFL Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Pushdown Automata", query: "AKTU TAFL Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Turing Machines", query: "AKTU TAFL Unit 5 one shot" }
        ]
      }
    ],
    "5": [
      {
        id: "BCS501",
        name: "Database Management Systems",
        shortName: "DBMS",
        icon: "🗄️",
        units: [
          { unit: 1, title: "Unit 1: ER Diagrams & Relational Model", query: "AKTU DBMS Unit 1 one shot Gate Smashers" },
          { unit: 2, title: "Unit 2: Relational Algebra & SQL", query: "AKTU DBMS Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Normalization & Functional Dependencies", query: "AKTU DBMS Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Transactions & Concurrency Control", query: "AKTU DBMS Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Recovery Systems & Deadlocks", query: "AKTU DBMS Unit 5 one shot" }
        ]
      },
      {
        id: "BCS502",
        name: "Compiler Design",
        shortName: "CD",
        icon: "⚙️",
        units: [
          { unit: 1, title: "Unit 1: Lexical Analysis & Syntax Analysis", query: "AKTU Compiler Design Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Parsing Techniques (LL, LR, LALR)", query: "AKTU Compiler Design Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Syntax Directed Translation & TAC", query: "AKTU Compiler Design Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Symbol Tables & Runtime Environments", query: "AKTU Compiler Design Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Code Optimization & Code Generation", query: "AKTU Compiler Design Unit 5 one shot" }
        ]
      },
      {
        id: "BCS503",
        name: "Design & Analysis of Algorithms",
        shortName: "DAA",
        icon: "⚡",
        units: [
          { unit: 1, title: "Unit 1: Asymptotic Notations & Recurrences", query: "AKTU DAA Unit 1 one shot Gate Smashers" },
          { unit: 2, title: "Unit 2: Divide & Conquer, Sorting", query: "AKTU DAA Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Greedy & Dynamic Programming", query: "AKTU DAA Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Backtracking & Branch and Bound", query: "AKTU DAA Unit 4 one shot" },
          { unit: 5, title: "Unit 5: NP-Completeness & String Matching", query: "AKTU DAA Unit 5 one shot" }
        ]
      },
      {
        id: "BCS051",
        name: "Web Technology",
        shortName: "Web Tech",
        icon: "🌐",
        units: [
          { unit: 1, title: "Unit 1: HTML5, CSS3 & Responsive Web Design", query: "AKTU Web Technology Unit 1 one shot" },
          { unit: 2, title: "Unit 2: JavaScript & DOM Manipulation", query: "AKTU Web Technology Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Server-Side Scripting & PHP / Node", query: "AKTU Web Technology Unit 3 one shot" },
          { unit: 4, title: "Unit 4: AJAX, XML & JSON Data Handling", query: "AKTU Web Technology Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Web Security, HTTPS & Deployments", query: "AKTU Web Technology Unit 5 one shot" }
        ]
      },
      {
        id: "BNC501",
        name: "Constitution of India, Law & Engineering",
        shortName: "Constitution of India",
        icon: "📜",
        units: [
          { unit: 1, title: "Unit 1: Indian Constitution & Preamble", query: "AKTU Constitution of India Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Fundamental Rights & DPSP", query: "AKTU Constitution of India Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Parliament & Executive Governance", query: "AKTU Constitution of India Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Judiciary & Constitutional Amendments", query: "AKTU Constitution of India Unit 4 one shot" },
          { unit: 5, title: "Unit 5: IPR, Patents & Cyber Laws", query: "AKTU Constitution of India Unit 5 one shot" }
        ]
      }
    ],
    "6": [
      {
        id: "BCS601",
        name: "Computer Networks",
        shortName: "CN",
        icon: "🌐",
        units: [
          { unit: 1, title: "Unit 1: OSI & TCP/IP Reference Models", query: "AKTU Computer Networks Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Data Link Layer & Error Control", query: "AKTU Computer Networks Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Network Layer & Routing Protocols", query: "AKTU Computer Networks Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Transport Layer Protocols (TCP/UDP)", query: "AKTU Computer Networks Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Application Layer (DNS, HTTP) & Security", query: "AKTU Computer Networks Unit 5 one shot" }
        ]
      },
      {
        id: "BCS602",
        name: "Software Engineering",
        shortName: "SE",
        icon: "🛠️",
        units: [
          { unit: 1, title: "Unit 1: SDLC Models (Waterfall, Agile) & SRS", query: "AKTU Software Engineering Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Architectural & Modular Design", query: "AKTU Software Engineering Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Object-Oriented Design & UML", query: "AKTU Software Engineering Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Testing Methodologies (Black/White Box)", query: "AKTU Software Engineering Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Maintenance & Cost Estimation", query: "AKTU Software Engineering Unit 5 one shot" }
        ]
      },
      {
        id: "BCS061",
        name: "Big Data & Hadoop",
        shortName: "Big Data",
        icon: "📦",
        units: [
          { unit: 1, title: "Unit 1: Big Data Overview & Ecosystem", query: "AKTU Big Data Unit 1 one shot" },
          { unit: 2, title: "Unit 2: HDFS & MapReduce Architecture", query: "AKTU Big Data Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Apache Hive & Pig Processing", query: "AKTU Big Data Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Apache Spark & Real-time Streams", query: "AKTU Big Data Unit 4 one shot" },
          { unit: 5, title: "Unit 5: NoSQL Databases (HBase, MongoDB)", query: "AKTU Big Data Unit 5 one shot" }
        ]
      },
      {
        id: "BNC601",
        name: "Essence of Indian Traditional Knowledge",
        shortName: "EITK",
        icon: "🪷",
        units: [
          { unit: 1, title: "Unit 1: Indian Knowledge Systems", query: "AKTU Essence of Indian Traditional Knowledge Unit 1" },
          { unit: 2, title: "Unit 2: Indian Philosophical Systems", query: "AKTU Essence of Indian Traditional Knowledge Unit 2" },
          { unit: 3, title: "Unit 3: Indian Literature, Vedas & Epics", query: "AKTU Essence of Indian Traditional Knowledge Unit 3" },
          { unit: 4, title: "Unit 4: Traditional Science & Ayurveda", query: "AKTU Essence of Indian Traditional Knowledge Unit 4" },
          { unit: 5, title: "Unit 5: Cultural Arts & Modern Relevance", query: "AKTU Essence of Indian Traditional Knowledge Unit 5" }
        ]
      }
    ],
    "7": [
      {
        id: "BCS701",
        name: "Distributed Systems",
        shortName: "DS Systems",
        icon: "⚡",
        units: [
          { unit: 1, title: "Unit 1: Distributed Models & Architectures", query: "AKTU Distributed Systems Unit 1 one shot" },
          { unit: 2, title: "Unit 2: RPC, RMI & Communication Protocols", query: "AKTU Distributed Systems Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Clock Sync & Distributed Mutual Exclusion", query: "AKTU Distributed Systems Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Distributed Deadlock & Election Algorithms", query: "AKTU Distributed Systems Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Distributed File Systems (NFS, AFS)", query: "AKTU Distributed Systems Unit 5 one shot" }
        ]
      }
    ],
    "8": [
      {
        id: "BOE801",
        name: "Non-Conventional Energy Resources",
        shortName: "NCER",
        icon: "🔋",
        units: [
          { unit: 1, title: "Unit 1: Solar Energy Systems", query: "AKTU NCER Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Wind Energy Conversion", query: "AKTU NCER Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Biomass & Biogas Systems", query: "AKTU NCER Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Geothermal & Ocean Energy", query: "AKTU NCER Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Fuel Cells & Magnetohydrodynamics", query: "AKTU NCER Unit 5 one shot" }
        ]
      }
    ]
  },

  // Electronics & Communication Engineering (ECE)
  "ECE": {
    "3": [
      {
        id: "BEC301",
        name: "Electronic Devices",
        shortName: "EDC",
        icon: "⚡",
        units: [
          { unit: 1, title: "Unit 1: Semiconductor Physics & Junctions", query: "AKTU Electronic Devices Unit 1 one shot" },
          { unit: 2, title: "Unit 2: BJT Physics & Small Signal Models", query: "AKTU Electronic Devices Unit 2 one shot" },
          { unit: 3, title: "Unit 3: MOSFET Structure & Characteristics", query: "AKTU Electronic Devices Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Special Semiconductor Diodes", query: "AKTU Electronic Devices Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Power Devices (SCR, TRIAC, DIAC)", query: "AKTU Electronic Devices Unit 5 one shot" }
        ]
      },
      {
        id: "BEC302",
        name: "Digital System Design",
        shortName: "DSD",
        icon: "🎛️",
        units: [
          { unit: 1, title: "Unit 1: Boolean Algebra & K-Maps", query: "AKTU Digital System Design Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Combinational Logic Circuits", query: "AKTU Digital System Design Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Sequential Logic & Flip-Flops", query: "AKTU Digital System Design Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Registers & Counters", query: "AKTU Digital System Design Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Semiconductor Memories & PLDs", query: "AKTU Digital System Design Unit 5 one shot" }
        ]
      },
      {
        id: "BEC303",
        name: "Network Analysis & Synthesis",
        shortName: "NAS",
        icon: "🔌",
        units: [
          { unit: 1, title: "Unit 1: Mesh & Nodal Analysis, Graph Theory", query: "AKTU Network Analysis Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Network Theorems (Thevenin, Norton)", query: "AKTU Network Analysis Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Transient Response & Laplace Analysis", query: "AKTU Network Analysis Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Two Port Network Parameters", query: "AKTU Network Analysis Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Positive Real Functions & Synthesis", query: "AKTU Network Analysis Unit 5 one shot" }
        ]
      }
    ],
    "4": [
      {
        id: "BEC401",
        name: "Analog Circuits",
        shortName: "Analog Circuits",
        icon: "📻",
        units: [
          { unit: 1, title: "Unit 1: Multi-stage Amplifiers", query: "AKTU Analog Circuits Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Feedback Amplifiers", query: "AKTU Analog Circuits Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Oscillators & Wave Shaping", query: "AKTU Analog Circuits Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Power Amplifiers (Class A, B, AB)", query: "AKTU Analog Circuits Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Op-Amp Applications & Active Filters", query: "AKTU Analog Circuits Unit 5 one shot" }
        ]
      },
      {
        id: "BEC402",
        name: "Signals & Systems",
        shortName: "Signals & Systems",
        icon: "📊",
        units: [
          { unit: 1, title: "Unit 1: Continuous & Discrete Signals", query: "AKTU Signals and Systems Unit 1 one shot" },
          { unit: 2, title: "Unit 2: LTI Systems & Convolution", query: "AKTU Signals and Systems Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Fourier Series & Fourier Transform", query: "AKTU Signals and Systems Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Laplace Transform Analysis", query: "AKTU Signals and Systems Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Z-Transforms & DTFT", query: "AKTU Signals and Systems Unit 5 one shot" }
        ]
      }
    ],
    "5": [
      {
        id: "BEC501",
        name: "Digital Signal Processing",
        shortName: "DSP",
        icon: "📶",
        units: [
          { unit: 1, title: "Unit 1: DFT & FFT Algorithms", query: "AKTU DSP Unit 1 one shot" },
          { unit: 2, title: "Unit 2: IIR Filter Design (Butterworth, Chebyshev)", query: "AKTU DSP Unit 2 one shot" },
          { unit: 3, title: "Unit 3: FIR Filter Design (Windowing)", query: "AKTU DSP Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Finite Word Length Effects", query: "AKTU DSP Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Multirate Signal Processing", query: "AKTU DSP Unit 5 one shot" }
        ]
      },
      {
        id: "BEC502",
        name: "VLSI Design",
        shortName: "VLSI",
        icon: "🖲️",
        units: [
          { unit: 1, title: "Unit 1: MOS Inverter Circuits & Layouts", query: "AKTU VLSI Design Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Combinational MOS Logic Circuits", query: "AKTU VLSI Design Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Sequential MOS Logic & Registers", query: "AKTU VLSI Design Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Semiconductor Memories (SRAM, DRAM)", query: "AKTU VLSI Design Unit 4 one shot" },
          { unit: 5, title: "Unit 5: VHDL / Verilog Fundamentals", query: "AKTU VLSI Design Unit 5 one shot" }
        ]
      },
      {
        id: "BEC503",
        name: "Control Systems",
        shortName: "Control Systems",
        icon: "🎛️",
        units: [
          { unit: 1, title: "Unit 1: Transfer Functions & Block Diagrams", query: "AKTU Control Systems Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Time Response Analysis & Errors", query: "AKTU Control Systems Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Root Locus & Routh Hurwitz", query: "AKTU Control Systems Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Frequency Response & Bode Plots", query: "AKTU Control Systems Unit 4 one shot" },
          { unit: 5, title: "Unit 5: State Space Analysis & Compensators", query: "AKTU Control Systems Unit 5 one shot" }
        ]
      },
      {
        id: "BNC501",
        name: "Constitution of India, Law & Engineering",
        shortName: "Constitution of India",
        icon: "📜",
        units: [
          { unit: 1, title: "Unit 1: Indian Constitution & Preamble", query: "AKTU Constitution of India Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Fundamental Rights & DPSP", query: "AKTU Constitution of India Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Parliament & Executive Governance", query: "AKTU Constitution of India Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Judiciary & Constitutional Amendments", query: "AKTU Constitution of India Unit 4 one shot" },
          { unit: 5, title: "Unit 5: IPR, Patents & Cyber Laws", query: "AKTU Constitution of India Unit 5 one shot" }
        ]
      }
    ],
    "6": [
      {
        id: "BEC601",
        name: "Antenna and Wave Propagation",
        shortName: "AWP",
        icon: "📡",
        units: [
          { unit: 1, title: "Unit 1: Antenna Radiation & Directivity", query: "AKTU Antenna and Wave Propagation Unit 1 one shot" },
          { unit: 2, title: "Unit 2: Antenna Arrays & Beamforming", query: "AKTU Antenna and Wave Propagation Unit 2 one shot" },
          { unit: 3, title: "Unit 3: Practical Antennas (Horn, Yagi, Microstrip)", query: "AKTU Antenna and Wave Propagation Unit 3 one shot" },
          { unit: 4, title: "Unit 4: Ground Wave & Space Wave Propagation", query: "AKTU Antenna and Wave Propagation Unit 4 one shot" },
          { unit: 5, title: "Unit 5: Sky Wave & Ionospheric Propagation", query: "AKTU Antenna and Wave Propagation Unit 5 one shot" }
        ]
      },
      {
        id: "BNC601",
        name: "Essence of Indian Traditional Knowledge",
        shortName: "EITK",
        icon: "🪷",
        units: [
          { unit: 1, title: "Unit 1: Indian Knowledge Systems", query: "AKTU Essence of Indian Traditional Knowledge Unit 1" },
          { unit: 2, title: "Unit 2: Indian Philosophical Systems", query: "AKTU Essence of Indian Traditional Knowledge Unit 2" },
          { unit: 3, title: "Unit 3: Indian Literature, Vedas & Epics", query: "AKTU Essence of Indian Traditional Knowledge Unit 3" },
          { unit: 4, title: "Unit 4: Traditional Science & Ayurveda", query: "AKTU Essence of Indian Traditional Knowledge Unit 4" },
          { unit: 5, title: "Unit 5: Cultural Arts & Modern Relevance", query: "AKTU Essence of Indian Traditional Knowledge Unit 5" }
        ]
      }
    ]
  }
};

// Aliases for IT and CSE_AIDS to point to their matching core syllabus
aktuMasterDatabase["IT"] = aktuMasterDatabase["CSE_CORE"];
aktuMasterDatabase["CSE_AIDS"] = aktuMasterDatabase["CSE_AIML"];