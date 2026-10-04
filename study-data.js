window.AKTU_SUBJECTS = [
  {
    id: "kcs501",
    code: "KCS501",
    name: "Database Management Systems",
    shortName: "DBMS",
    icon: "🗄️",
    lectures: [
      { unit: "Unit 1", title: "Introduction, ER Diagrams & Relational Model", url: "https://www.youtube.com/results?search_query=aktu+dbms+unit+1+one+shot", duration: "1h 45m" },
      { unit: "Unit 2", title: "SQL Queries, Joins & Relational Algebra", url: "https://www.youtube.com/results?search_query=aktu+dbms+unit+2+one+shot", duration: "2h 10m" },
      { unit: "Unit 3", title: "Normalization (1NF, 2NF, 3NF, BCNF)", url: "https://www.youtube.com/results?search_query=aktu+dbms+unit+3+one+shot", duration: "1h 30m" },
      { unit: "Unit 4", title: "Transaction Processing & ACID Properties", url: "https://www.youtube.com/results?search_query=aktu+dbms+unit+4+one+shot", duration: "1h 50m" },
      { unit: "Unit 5", title: "Concurrency Control & Recovery Techniques", url: "https://www.youtube.com/results?search_query=aktu+dbms+unit+5+one+shot", duration: "1h 25m" }
    ],
    pyqs: [
      { unit: 1, marks: 10, year: "2023-24", q: "Explain the three-tier schema architecture of DBMS with a neat diagram. Discuss physical and logical data independence." },
      { unit: 1, marks: 2, year: "2022-23", q: "Define candidate key, primary key, and super key with examples." },
      { unit: 2, marks: 10, year: "2023-24", q: "Explain various types of Outer Joins in SQL with suitable syntax and examples." },
      { unit: 3, marks: 10, year: "2023-24", q: "What is Normalization? Explain 1NF, 2NF, 3NF, and BCNF with functional dependency examples." },
      { unit: 4, marks: 10, year: "2022-23", q: "What is Serializability? Differentiate between conflict and view serializability with test algorithms." },
      { unit: 5, marks: 10, year: "2023-24", q: "Explain Two-Phase Locking (2PL) protocol and how it prevents deadlocks in concurrent execution." }
    ]
  },
  {
    id: "kcs502",
    code: "KCS502",
    name: "Compiler Design",
    shortName: "CD",
    icon: "⚙️",
    lectures: [
      { unit: "Unit 1", title: "Phases of Compiler & Lexical Analysis", url: "https://www.youtube.com/results?search_query=aktu+compiler+design+unit+1+one+shot", duration: "1h 40m" },
      { unit: "Unit 2", title: "Syntax Analysis & Bottom-Up / Top-Down Parsing", url: "https://www.youtube.com/results?search_query=aktu+compiler+design+unit+2+one+shot", duration: "2h 30m" },
      { unit: "Unit 3", title: "Syntax Directed Translation & 3-Address Code", url: "https://www.youtube.com/results?search_query=aktu+compiler+design+unit+3+one+shot", duration: "1h 45m" },
      { unit: "Unit 4", title: "Symbol Table Management & Runtime Environments", url: "https://www.youtube.com/results?search_query=aktu+compiler+design+unit+4+one+shot", duration: "1h 20m" },
      { unit: "Unit 5", title: "Code Optimization & Code Generation", url: "https://www.youtube.com/results?search_query=aktu+compiler+design+unit+5+one+shot", duration: "1h 35m" }
    ],
    pyqs: [
      { unit: 1, marks: 10, year: "2023-24", q: "Explain all phases of a compiler with an input statement example: position = initial + rate * 60." },
      { unit: 2, marks: 10, year: "2022-23", q: "Construct LR(0) and SLR(1) parsing table for the given grammar and verify strings." },
      { unit: 3, marks: 10, year: "2023-24", q: "What is Syntax Directed Translation? Differentiate between S-attributed and L-attributed definitions." },
      { unit: 5, marks: 10, year: "2022-23", q: "Explain principal sources of code optimization: Common subexpression elimination, loop unrolling, and dead code removal." }
    ]
  },
  {
    id: "kcs503",
    code: "KCS503",
    name: "Design & Analysis of Algorithms",
    shortName: "DAA",
    icon: "⚡",
    lectures: [
      { unit: "Unit 1", title: "Asymptotic Notations & Recurrence Relations", url: "https://www.youtube.com/results?search_query=aktu+daa+unit+1+one+shot", duration: "2h 00m" },
      { unit: "Unit 2", title: "Divide & Conquer, Greedy Method (Knapsack, Huffman)", url: "https://www.youtube.com/results?search_query=aktu+daa+unit+2+one+shot", duration: "2h 15m" },
      { unit: "Unit 3", title: "Dynamic Programming (LCS, 0/1 Knapsack, Bellman-Ford)", url: "https://www.youtube.com/results?search_query=aktu+daa+unit+3+one+shot", duration: "2h 20m" },
      { unit: "Unit 4", title: "Backtracking (N-Queen, Graph Coloring) & Branch-Bound", url: "https://www.youtube.com/results?search_query=aktu+daa+unit+4+one+shot", duration: "1h 50m" },
      { unit: "Unit 5", title: "NP-Completeness & Approximation Algorithms", url: "https://www.youtube.com/results?search_query=aktu+daa+unit+5+one+shot", duration: "1h 15m" }
    ],
    pyqs: [
      { unit: 1, marks: 10, year: "2023-24", q: "Solve recurrence relation T(n) = 2T(n/2) + n using Master Theorem and Recursion Tree method." },
      { unit: 2, marks: 10, year: "2022-23", q: "Solve Fractional Knapsack problem using Greedy Strategy with an item-weight-profit numerical." },
      { unit: 3, marks: 10, year: "2023-24", q: "Find the Longest Common Subsequence (LCS) for sequences X = <A,B,C,B,D,A,B> and Y = <B,D,C,A,B,A>." },
      { unit: 4, marks: 10, year: "2022-23", q: "Explain 8-Queens problem using Backtracking method. Draw state space tree for 4-Queens." },
      { unit: 5, marks: 2, year: "2023-24", q: "Define P, NP, NP-Complete, and NP-Hard classes with polynomial time reductions." }
    ]
  },
  {
    id: "bcs401",
    code: "BCS401",
    name: "Operating Systems",
    shortName: "OS",
    icon: "💻",
    lectures: [
      { unit: "Unit 1", title: "OS Types, System Calls & Process Management", url: "https://www.youtube.com/results?search_query=aktu+operating+system+unit+1+one+shot", duration: "1h 45m" },
      { unit: "Unit 2", title: "CPU Scheduling (FCFS, SJF, RR) & Process Synchronization", url: "https://www.youtube.com/results?search_query=aktu+operating+system+unit+2+one+shot", duration: "2h 10m" },
      { unit: "Unit 3", title: "Deadlocks (Banker's Algorithm & Prevention)", url: "https://www.youtube.com/results?search_query=aktu+operating+system+unit+3+one+shot", duration: "1h 30m" },
      { unit: "Unit 4", title: "Memory Management (Paging, Segmentation, Virtual Memory)", url: "https://www.youtube.com/results?search_query=aktu+operating+system+unit+4+one+shot", duration: "2h 00m" },
      { unit: "Unit 5", title: "File Systems & Disk Scheduling (SCAN, C-SCAN, SSTF)", url: "https://www.youtube.com/results?search_query=aktu+operating+system+unit+5+one+shot", duration: "1h 20m" }
    ],
    pyqs: [
      { unit: 2, marks: 10, year: "2023-24", q: "What is Critical Section Problem? Explain Peterson's solution and Semaphores implementation." },
      { unit: 3, marks: 10, year: "2023-24", q: "Explain Banker's Algorithm for Deadlock Avoidance with a 5-process allocation numerical." },
      { unit: 4, marks: 10, year: "2022-23", q: "Explain Page Fault handling and calculate page faults using FIFO, LRU, and Optimal Replacement algorithms." },
      { unit: 5, marks: 10, year: "2023-24", q: "Calculate total head movement for Disk Scheduling algorithms: FCFS, SSTF, SCAN for given request queue." }
    ]
  }
];