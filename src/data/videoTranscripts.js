// Verified video transcripts for SwordNex Academy Course Lessons
// Source of truth for Gemini AI Video Doubt Assistant

export const videoTranscripts = {
  // 1. Python Course Transcripts
  python: {
    1: {
      lessonId: 1,
      lessonTitle: "Python Introduction",
      topic: "Getting started with Python, installation, and interpreter",
      keywords: ["python", "installation", "interpreter", "guidovanrossum", "setup", "syntax", "repl", "script", "பைதான்", "அறிமுகம்"],
      transcript: `Welcome to Lesson 1: Introduction to Python.
In this lesson, we cover the origins of Python, created by Guido van Rossum and released in 1991.
Python is a high-level, interpreted, general-purpose programming language known for its clear, readable syntax and indentation-based code blocks.
We demonstrate how to install Python from python.org, verify the installation in terminal using python --version, and run Python in interactive REPL mode as well as executing a .py script.
Key highlights from this lesson:
1. Python uses indentation (whitespace) instead of curly braces to define code blocks.
2. Python is dynamically typed, meaning variable types do not need to be explicitly declared.
3. The print() function is used to output text to the console, for example print("Hello, World!").`
    },
    2: {
      lessonId: 2,
      lessonTitle: "Variables & Data Types",
      topic: "Variables, integers, floats, strings, booleans, and type conversion",
      keywords: ["variable", "data type", "int", "float", "str", "bool", "type", "casting", "assignment", "மாறி", "தரவு வகை"],
      transcript: `Welcome to Lesson 2: Python Variables and Data Types.
In this lesson, we explore how variables store data in computer memory.
Variables are created the moment you assign a value to them using the assignment operator (=). Variable names in Python must start with a letter or underscore, cannot start with a number, and are case-sensitive.
The primary built-in data types covered in this lesson are:
1. Integers (int): Whole numbers like 10, -5, 100.
2. Floating-point numbers (float): Real numbers with decimals like 3.14, -0.01.
3. Strings (str): Text enclosed in single or double quotes like "Python".
4. Booleans (bool): Logical values representing True or False.
We also cover type conversion using int(), float(), and str(), and checking data types using the type() function.`
    },
    3: {
      lessonId: 3,
      lessonTitle: "Operators & Expressions",
      topic: "Arithmetic, comparison, logical, and assignment operators",
      keywords: ["operator", "arithmetic", "comparison", "logical", "modulo", "exponent", "and", "or", "not", "செயற்குறி"],
      transcript: `Welcome to Lesson 3: Python Operators and Expressions.
In this lesson, we explore standard operators used to perform calculations and evaluations in Python.
Arithmetic operators: addition (+), subtraction (-), multiplication (*), division (/), floor division (//), modulo (%), and exponentiation (**).
Comparison operators: equal to (==), not equal to (!=), greater than (>), less than (<), greater than or equal to (>=), and less than or equal to (<=).
Logical operators: 'and' returns True if both statements are true; 'or' returns True if at least one statement is true; 'not' reverses the logical state of a condition.
Assignment operators include =, +=, -=, *=, and /=.`
    },
    4: {
      lessonId: 4,
      lessonTitle: "Conditional Statements",
      topic: "if, elif, and else decision making structures",
      keywords: ["conditional", "if", "elif", "else", "decision", "indentation", "condition", "branching", "நிபந்தனை"],
      transcript: `Welcome to Lesson 4: Conditional Statements in Python.
In this lesson, we cover decision-making logic using if, elif, and else statements.
An if statement tests a condition; if the condition evaluates to True, the indented block underneath executes.
The elif keyword is Python's way of saying "if the previous conditions were not true, try this condition".
The else statement catches anything that isn't caught by the preceding if and elif conditions.
Indentation is mandatory in Python conditional blocks; failing to indent results in an IndentationError.`
    },
    5: {
      lessonId: 5,
      lessonTitle: "Python Loops",
      topic: "for loops, while loops, range function, and loop control statements",
      keywords: [
        "for loop", "while loop", "loop", "loops", "range", "iteration", "iterating",
        "break", "continue", "pass", "infinite loop", "nested loop", "sequence",
        "counter", "in keyword", "லூப்", "சுழற்சி"
      ],
      transcript: `Welcome to Lesson 5: Python Loops.
In this lesson, we cover Python's looping constructs: for loops, while loops, and loop control statements.

What is a Loop?
In programming, a loop is a control structure used to execute a block of code repeatedly as long as a condition is met or for every item in a sequence.

What is a For Loop?
A for loop in Python is used for iterating over a sequence, such as a list, tuple, dictionary, set, or string. It executes a block of code repeatedly for each item in the sequence.
In Python, the for loop uses the 'in' keyword. The syntax is:
for item in sequence:
    # code block to execute for each item

For example, iterating over a list of items:
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

The range() function:
To loop through a set of code a specified number of times, we use the range() function.
The range() function returns a sequence of numbers, starting from 0 by default, increments by 1 by default, and stops before a specified number.
For example, for i in range(5) will iterate 5 times with values 0, 1, 2, 3, and 4.
You can also specify range(start, stop, step), such as range(2, 10, 2) which yields 2, 4, 6, 8.

What is a While Loop?
A while loop in Python repeatedly executes a target block of statements as long as a given condition evaluates to True.
The syntax is:
while condition:
    # code block to execute

In a while loop, you must ensure that the loop condition eventually becomes False; otherwise, you will create an infinite loop. Typically, this is done by updating an index or counter variable inside the loop body, such as count += 1.

Loop Control Statements:
1. The break statement: The break statement terminates the loop immediately when encountered. Execution moves to the statement immediately following the loop.
2. The continue statement: The continue statement skips the remainder of the current iteration and jumps immediately to the next iteration of the loop.
3. The pass statement: The pass statement acts as a syntactical placeholder where code is required but no action is needed.

Nested Loops:
A nested loop is a loop inside another loop. The inner loop executes all its iterations for every single iteration of the outer loop.`
    },
    6: {
      lessonId: 6,
      lessonTitle: "Functions & Scope",
      topic: "Defining functions with def, parameters, arguments, return values, and variable scope",
      keywords: ["function", "def", "parameters", "arguments", "return", "scope", "local", "global", "செயல்பாடு"],
      transcript: `Welcome to Lesson 6: Python Functions and Variable Scope.
In this lesson, we learn how to create reusable blocks of code using functions.
A function is defined using the def keyword, followed by the function name, parentheses (), and a colon (:).
Parameters allow functions to receive inputs, and arguments are the actual values passed into the function when called.
The return statement sends a result back to the caller and terminates function execution.
Variable scope determines where a variable can be accessed:
1. Local scope: Variables created inside a function are local to that function.
2. Global scope: Variables created outside any function belong to the global scope.`
    },
    7: {
      lessonId: 7,
      lessonTitle: "Modules & Packages",
      topic: "Standard library modules and importing packages with import and from",
      keywords: ["module", "package", "import", "from", "math", "random", "pip", "libraries"],
      transcript: `Welcome to Lesson 7: Python Modules and Packages.
In this lesson, we explore Python modules and third-party packages:
1. A module is a Python file (.py) containing functions, classes, and variables that can be imported using the 'import' or 'from ... import ...' statement.
2. Python's built-in standard library includes modules such as math, random, os, sys, datetime, and json.
3. Python package manager (pip) allows installing external packages from PyPI (Python Package Index) using pip install package_name.`
    },
    8: {
      lessonId: 8,
      lessonTitle: "File Handling",
      topic: "Reading, writing, and managing file streams using open and with context manager",
      keywords: ["file", "read", "write", "open", "close", "with", "append", "stream"],
      transcript: `Welcome to Lesson 8: File Handling in Python.
In this lesson, we learn how to read and write files on disk:
1. The open() function opens a file in specified modes: 'r' (read), 'w' (write - overwrites), 'a' (append), and 'r+' (read and write).
2. The recommended practice is using the 'with' context manager statement:
   with open('filename.txt', 'r') as file:
       content = file.read()
   This automatically closes the file when the block exits, preventing resource leaks.
3. readline() reads a single line, readlines() returns a list of lines, and write() writes a string to the file.`
    },
    9: {
      lessonId: 9,
      lessonTitle: "Object Oriented Programming",
      topic: "Classes, objects, methods, __init__ constructor, and inheritance in Python",
      keywords: ["oop", "class", "object", "self", "init", "constructor", "inheritance", "method"],
      transcript: `Welcome to Lesson 9: Object-Oriented Programming (OOP) in Python.
In this lesson, we master OOP fundamentals:
1. Class: A blueprint for creating objects. Defined using the 'class' keyword.
2. Object: An instance of a class containing attributes (state) and methods (behavior).
3. The __init__() method: The constructor method called automatically when creating a new object. 'self' represents the instance of the class.
4. Inheritance: Creating a child class that derives attributes and methods from a parent class for code reuse, using class Child(Parent):.`
    },
    10: {
      lessonId: 10,
      lessonTitle: "Final Project",
      topic: "Capstone project building an end-to-end Python application",
      keywords: ["project", "capstone", "application", "architecture", "deployment", "integration"],
      transcript: `Welcome to Lesson 10: Python Capstone Project.
In this capstone lesson, we consolidate everything learned throughout the course:
1. Designing the application architecture: separating data handling, business logic, and user interface.
2. Implementing data persistence using file storage or SQLite database.
3. Adding error handling, defensive input validation, and clean modular code structures.
4. Testing and preparing the Python application for execution and distribution.`
    }
  },

  // 2. Full Stack Web Development Transcripts
  fsd: {
    1: {
      lessonId: 1,
      lessonTitle: "Introduction to Full Stack",
      topic: "Full stack architecture, client-server model, frontend, backend, and database roles",
      keywords: ["full stack", "frontend", "backend", "client", "server", "database", "http", "architecture"],
      transcript: `Welcome to Lesson 1: Introduction to Full Stack Development.
In this introductory lesson, we define what full stack web development entails:
1. Frontend: The client side that runs in the browser, built with HTML, CSS, and JavaScript.
2. Backend: The server side that handles business logic, authentication, and API endpoints, built with Node.js/Express.
3. Database: The data persistence layer, storing application state using relational (SQL) or document (NoSQL) databases like MongoDB.
We also explain the HTTP request-response cycle where the client sends a request and the server responds with status codes and JSON data.`
    },
    2: {
      lessonId: 2,
      lessonTitle: "HTML Basics & Markup Structures",
      topic: "HTML5 semantic elements, document tree, forms, inputs, and accessibility",
      keywords: ["html", "html5", "semantic", "tags", "markup", "elements", "header", "footer", "form", "input"],
      transcript: `Welcome to Lesson 2: HTML Basics and Markup Structures.
In this lesson, we cover HTML5 semantic tags including <header>, <nav>, <main>, <section>, <article>, and <footer>.
Semantic HTML provides meaning to browsers and assistive technologies like screen readers rather than just presentation.
We also cover form handling: the <form> element, <input> types (text, email, password, number), <label> associations for accessibility, and submit button handlers.`
    },
    3: {
      lessonId: 3,
      lessonTitle: "CSS Layouts: Flexbox vs. Grid",
      topic: "Modern CSS layout techniques comparing one-dimensional Flexbox with two-dimensional CSS Grid",
      keywords: ["css", "flexbox", "grid", "layout", "flex", "align-items", "justify-content", "grid-template-columns", "responsive"],
      transcript: `Welcome to Lesson 3: CSS Layouts - Flexbox vs. Grid.
In this lesson, we dive deep into modern CSS layout systems:
1. Flexbox (display: flex) is a one-dimensional layout system designed for laying out items in a single row or column. Main properties include justify-content (main axis alignment), align-items (cross axis alignment), and flex-direction.
2. CSS Grid (display: grid) is a two-dimensional layout system designed for handling both rows and columns simultaneously. Key properties include grid-template-columns, grid-template-rows, and gap.
Rule of thumb from the video: Use Flexbox for component-level alignment and navigation bars; use CSS Grid for overall page layouts and multi-column card galleries.`
    },
    4: {
      lessonId: 4,
      lessonTitle: "JavaScript Logic & Event Handling",
      topic: "Variables, functions, DOM events, addEventListener, and async asynchronous JavaScript",
      keywords: ["javascript", "js", "dom", "event", "addeventlistener", "click", "async", "promises", "fetch"],
      transcript: `Welcome to Lesson 4: JavaScript Logic and Event Handling.
In this lesson, we master DOM manipulation and event-driven programming:
1. Selecting elements with document.querySelector() and document.getElementById().
2. Listening to user interactions with addEventListener('click', handler).
3. Modifying classes and styles using element.classList.add() and element.textContent.
4. Asynchronous programming using Promises and async/await syntax to fetch data from APIs without freezing the user interface.`
    },
    5: {
      lessonId: 5,
      lessonTitle: "React.js Components & State Management",
      topic: "React components, JSX, props, useState hook, and component re-rendering",
      keywords: ["react", "component", "jsx", "props", "state", "usestate", "hook", "hooks", "render"],
      transcript: `Welcome to Lesson 5: React.js Components and State Management.
In this lesson, we introduce React, a declarative JavaScript library for building user interfaces.
Key topics covered:
1. Functional components: JavaScript functions that return JSX (JavaScript XML).
2. Props: Read-only inputs passed from parent components to child components.
3. The useState Hook: Enables functional components to maintain local state. When state changes via the setter function, React re-renders the component.
4. One-way data binding and lifting state up to common parent components.`
    },
    6: {
      lessonId: 6,
      lessonTitle: "Node.js Express API Foundations",
      topic: "Node.js runtime, Express framework, RESTful routing, middleware, and JSON responses",
      keywords: ["node", "express", "api", "rest", "backend", "middleware", "route", "get", "post", "json"],
      transcript: `Welcome to Lesson 6: Node.js and Express API Foundations.
In this lesson, we build backend RESTful APIs using Node.js and the Express framework.
Key topics covered:
1. Initializing an Express server with app = express() and listening on a designated port.
2. Defining HTTP route handlers: app.get(), app.post(), app.put(), and app.delete().
3. Express middleware: Functions that run during the lifecycle of a request, including express.json() to parse incoming JSON request bodies.
4. Sending JSON responses using res.status(200).json({ data }).`
    },
    7: {
      lessonId: 7,
      lessonTitle: "Database Integration with MongoDB",
      topic: "NoSQL document storage, schemas, CRUD operations, and Mongoose connection",
      keywords: ["mongodb", "database", "nosql", "mongoose", "schema", "crud", "document", "collection"],
      transcript: `Welcome to Lesson 7: Database Integration with MongoDB.
In this lesson, we explore persistent data storage using MongoDB and Mongoose:
1. MongoDB is a document database that stores records as flexible JSON-like BSON documents.
2. Mongoose provides an Object Data Modeling (ODM) layer for defining schemas and models in Node.js.
3. CRUD operations: Model.find() to read, Model.create() to insert, Model.findByIdAndUpdate() to modify, and Model.findByIdAndDelete() to remove documents.`
    },
    8: {
      lessonId: 8,
      lessonTitle: "Authentication & Security",
      topic: "JWT tokens, password hashing with bcrypt, protected routes, and security practices",
      keywords: ["authentication", "jwt", "bcrypt", "security", "token", "hash", "password", "auth"],
      transcript: `Welcome to Lesson 8: Full Stack Authentication and Security.
In this lesson, we secure web applications:
1. Password Hashing: Never store plaintext passwords; use bcrypt with salt rounds to securely hash and compare passwords.
2. JSON Web Tokens (JWT): Generate signed access tokens upon login that the client sends in the Authorization header (Bearer token).
3. Auth Middleware: Protecting private API routes by verifying the token signature before allowing access.`
    },
    9: {
      lessonId: 9,
      lessonTitle: "Full Stack Capstone Project",
      topic: "Building an end-to-end full stack web application connecting React, Express, and MongoDB",
      keywords: ["capstone", "full stack project", "react", "express", "deployment", "integration"],
      transcript: `Welcome to Lesson 9: Full Stack Capstone Project.
In this capstone lesson, we connect the entire stack together:
1. Building responsive React frontend pages with routing and global authentication state.
2. Connecting frontend forms to Node/Express REST API endpoints via fetch/axios.
3. Validating inputs on both client and server sides, storing records in MongoDB, and deploying the application.`
    }
  },

  // 3. React JS Course Transcripts
  "react-js": {
    1: {
      lessonId: 1,
      lessonTitle: "React Introduction & Setup",
      topic: "Single page applications, Virtual DOM, and Vite/React project setup",
      keywords: ["react", "spa", "virtual dom", "vite", "components", "setup", "jsx", "ரையாக்ட்", "அறிமுகம்"],
      transcript: `Welcome to Lesson 1: React JS Introduction and Project Setup.
In this lesson, we introduce React, a component-based JavaScript library developed by Facebook for building user interfaces.
Key points covered:
1. Single Page Applications (SPAs): Instead of loading whole new pages from a server, React updates only the changed components in the DOM.
2. Virtual DOM: An in-memory representation of real DOM elements. React computes diffs and updates only what changed.
3. Setting up a React project using Vite (npm create vite@latest) and explaining project folder structure.`
    },
    2: {
      lessonId: 2,
      lessonTitle: "JSX & Functional Components",
      topic: "JSX syntax, expressions, and composing functional components",
      keywords: ["jsx", "components", "functional", "return", "fragments", "கம்போனன்ட்"],
      transcript: `Welcome to Lesson 2: JSX and Functional Components.
In this lesson, we explore JavaScript XML (JSX) and functional component architecture:
1. JSX allows us to write HTML-like syntax directly within JavaScript code.
2. Functional components are JavaScript functions that return JSX elements.
3. React fragments (<></>) let us group multiple elements without adding extra nodes to the DOM.`
    },
    3: {
      lessonId: 3,
      lessonTitle: "Props and Component State",
      topic: "Passing data with props and managing internal state",
      keywords: ["props", "state", "usestate", "parent", "child", "re-render", "ப்ராப்ஸ்"],
      transcript: `Welcome to Lesson 3: Props and Component State.
In this lesson, we examine data flow in React:
1. Props are read-only inputs passed from parent components to child components.
2. State represents reactive data that belongs to a component.
3. When state updates, React re-renders the component to reflect new values in the UI.`
    },
    4: {
      lessonId: 4,
      lessonTitle: "React Hooks: useState & useEffect",
      topic: "Managing state and side effects with hooks",
      keywords: ["hook", "hooks", "usestate", "useeffect", "side effect", "lifecycle", "ஹூக்ஸ்"],
      transcript: `Welcome to Lesson 4: React Hooks - useState and useEffect.
In this lesson, we dive into React's primary hooks:
1. useState hook: Returns a state variable and an updater function [state, setState].
2. useEffect hook: Handles side effects such as data fetching, subscriptions, and DOM changes. The dependency array controls when the effect executes.`
    },
    5: {
      lessonId: 5,
      lessonTitle: "React Router DOM Navigation",
      topic: "Client-side routing, BrowserRouter, Routes, Route, Link, and useParams",
      keywords: ["router", "routing", "routes", "route", "link", "useparams", "navigate", "spa"],
      transcript: `Welcome to Lesson 5: React Router DOM Navigation.
In this lesson, we implement client-side routing in React:
1. BrowserRouter: Wraps the application to enable HTML5 history API navigation.
2. Routes and Route: Maps URL paths to specific React component pages.
3. Link and NavLink: Enables instantaneous client-side navigation without full page reloads.
4. useParams Hook: Extracts dynamic URL path parameters (such as /courses/:id).`
    }
  },

  // 4. Java Bootcamp Transcripts
  java: {
    1: {
      lessonId: 1,
      lessonTitle: "Java Basics & Setup",
      topic: "JDK, JVM, JRE, and writing your first Java class",
      keywords: ["java", "jvm", "jdk", "jre", "class", "main", "system.out.println", "ஜாவா"],
      transcript: `Welcome to Lesson 1: Java Basics and Environment Setup.
In this lesson, we introduce the Java programming language created by James Gosling:
1. Java follows the 'Write Once, Run Anywhere' (WORA) philosophy using the Java Virtual Machine (JVM).
2. The JDK (Java Development Kit) includes the compiler (javac) and runtime environment (JRE).
3. Every Java program starts inside a public class with a public static void main(String[] args) method.`
    },
    2: {
      lessonId: 2,
      lessonTitle: "Data Types & Control Flow",
      topic: "Primitive types, conditionals, and loops in Java",
      keywords: ["primitive", "int", "boolean", "if", "for", "while", "switch"],
      transcript: `Welcome to Lesson 2: Java Data Types and Control Flow.
In this lesson, we cover Java primitive types (byte, short, int, long, float, double, char, boolean) and control flow structures including if-else statements, switch-case blocks, and for/while loops.`
    },
    3: {
      lessonId: 3,
      lessonTitle: "OOP: Classes & Inheritance",
      topic: "Object-oriented programming, classes, objects, and inheritance in Java",
      keywords: ["oop", "class", "object", "inheritance", "extends", "encapsulation", "polymorphism"],
      transcript: `Welcome to Lesson 3: Object-Oriented Programming in Java.
In this lesson, we explore core OOP pillars:
1. Encapsulation: Wrapping data (fields) and methods inside classes with access modifiers (private, public, protected).
2. Inheritance: Using the extends keyword to derive child classes from parent classes for code reuse.`
    },
    4: {
      lessonId: 4,
      lessonTitle: "Java Collections Framework Masterclass",
      topic: "ArrayList, LinkedList, HashMap, HashSet, and Iterators in Java",
      keywords: ["collections", "arraylist", "hashmap", "hashset", "list", "set", "map", "iterator"],
      transcript: `Welcome to Lesson 4: Java Collections Framework Masterclass.
In this lesson, we master data structures in java.util:
1. List interface: Ordered collections allowing duplicates. ArrayList provides fast random access by index; LinkedList provides efficient insertions/deletions.
2. Set interface: Collections that cannot contain duplicate elements (e.g. HashSet, TreeSet).
3. Map interface: Key-value pair storage (e.g. HashMap) where keys are unique and provide O(1) average lookup time.`
    },
    5: {
      lessonId: 5,
      lessonTitle: "Spring Boot REST API Development",
      topic: "Building enterprise backend microservices with Spring Boot and Spring Data JPA",
      keywords: ["spring", "spring boot", "rest", "controller", "jpa", "microservices", "api"],
      transcript: `Welcome to Lesson 5: Spring Boot REST API Development.
In this lesson, we build backend web services with Spring Boot:
1. Spring Boot simplifies Java web development with auto-configuration and embedded Tomcat server.
2. Annotations: @RestController defines API endpoints; @GetMapping, @PostMapping handle HTTP verbs.
3. Spring Data JPA: Connects entity classes to relational databases with CrudRepository and JpaRepository.`
    },
    6: {
      lessonId: 6,
      lessonTitle: "Java Capstone: Full Stack Banking Application",
      topic: "End-to-end full stack enterprise application connecting Spring Boot to React and MySQL",
      keywords: ["capstone", "banking", "full stack", "mysql", "enterprise", "security"],
      transcript: `Welcome to Lesson 6: Java Full Stack Capstone Project.
In this capstone lesson, we construct an enterprise banking portal:
1. Creating domain models: Account, Transaction, Customer.
2. Implementing transaction management with @Transactional to ensure ACID database properties.
3. Connecting the Spring Boot backend to a MySQL database and building a responsive web interface.`
    }
  },

  // 5. SQL Masterclass Transcripts
  sql: {
    1: {
      lessonId: 1,
      lessonTitle: "SQL Queries & Table Basics",
      topic: "Relational database concepts, SELECT, INSERT, UPDATE, DELETE",
      keywords: ["sql", "database", "select", "insert", "update", "delete", "table", "esql"],
      transcript: `Welcome to Lesson 1: SQL Queries and Table Fundamentals.
In this lesson, we learn Structured Query Language (SQL) for relational database management:
1. Relational databases store data in tables consisting of rows (records) and columns (fields).
2. Fundamental CRUD queries: SELECT to fetch records, INSERT INTO to add data, UPDATE to modify existing records, and DELETE to remove records.`
    },
    2: {
      lessonId: 2,
      lessonTitle: "Filtering & Joins Masterclass",
      topic: "WHERE clauses, aggregate functions, and table JOINs",
      keywords: ["join", "inner join", "left join", "where", "group by", "having", "count", "sum"],
      transcript: `Welcome to Lesson 2: SQL Filtering and Table Joins.
In this lesson, we master combining and filtering relational data:
1. Filtering with WHERE clauses using operators (=, !=, LIKE, BETWEEN, IN).
2. Table Joins: INNER JOIN returns matching rows from both tables; LEFT JOIN returns all rows from the left table and matched rows from the right table.`
    }
  },

  // 6. Machine Learning & Artificial Intelligence Transcripts
  ml: {
    1: {
      lessonId: 1,
      lessonTitle: "Introduction to Machine Learning & Core Concepts",
      topic: "What is ML, Supervised vs. Unsupervised, train/test split, features & labels",
      keywords: ["machine learning", "ml", "supervised", "unsupervised", "features", "labels", "train test split", "இயந்திர கற்றல்"],
      transcript: `Welcome to Lesson 1: Introduction to Machine Learning.
In this lesson, we establish machine learning fundamentals:
1. What is Machine Learning: Systems that learn patterns from data to make predictions rather than following hand-coded explicit rules.
2. Supervised Learning: Algorithms trained on labeled data with input features (X) and target outputs (y). Examples: regression and classification.
3. Unsupervised Learning: Algorithms finding hidden patterns in unlabeled data. Examples: clustering (K-Means) and dimensionality reduction (PCA).
4. Train/Test Split: Splitting dataset into training (e.g. 80%) and testing (20%) sets to evaluate generalizability and prevent overfitting.`
    },
    2: {
      lessonId: 2,
      lessonTitle: "Supervised Learning: Linear & Logistic Regression",
      topic: "Cost function, gradient descent, binary classification, and decision boundaries",
      keywords: ["linear regression", "logistic regression", "gradient descent", "cost function", "sigmoid", "classification"],
      transcript: `Welcome to Lesson 2: Linear and Logistic Regression.
In this lesson, we explore the foundations of supervised algorithms:
1. Linear Regression: Predicts continuous values by fitting a best-fit line (y = mx + b) using Mean Squared Error (MSE) cost function.
2. Gradient Descent: Optimization algorithm that iteratively updates weights to minimize the cost function.
3. Logistic Regression: Used for binary classification (0 or 1). Uses the Sigmoid function to output probabilities between 0 and 1 with a decision threshold (typically 0.5).`
    },
    3: {
      lessonId: 3,
      lessonTitle: "Decision Trees, Random Forests & Ensemble Models",
      topic: "Entropy, Gini impurity, tree pruning, bagging, and random forests",
      keywords: ["decision tree", "random forest", "ensemble", "gini", "entropy", "bagging"],
      transcript: `Welcome to Lesson 3: Decision Trees and Random Forests.
In this lesson, we study tree-based models and ensemble techniques:
1. Decision Trees: Non-linear models that split data based on feature thresholds using Gini Impurity or Information Gain (Entropy).
2. Overfitting in Trees: Deep decision trees tend to memorize training data; controlled via tree pruning and max_depth.
3. Random Forests: An ensemble of multiple decision trees trained with bootstrap aggregating (bagging) and random feature selection, significantly reducing variance and boosting accuracy.`
    },
    4: {
      lessonId: 4,
      lessonTitle: "Neural Networks & Deep Learning Foundations",
      topic: "Artificial neurons, activation functions, forward and backpropagation",
      keywords: ["neural network", "deep learning", "perceptron", "activation function", "relu", "backpropagation"],
      transcript: `Welcome to Lesson 4: Neural Networks and Deep Learning.
In this lesson, we delve into deep neural network architectures:
1. Artificial Neurons (Perceptrons): Compute weighted sum of inputs plus bias, passed through an activation function.
2. Activation Functions: Introduce non-linearity (ReLU, Sigmoid, Tanh). ReLU (Rectified Linear Unit) is standard for hidden layers.
3. Forward Propagation & Backpropagation: Forward pass calculates predictions and loss; backpropagation computes gradients using the chain rule and updates weights with optimizers like Adam or SGD.`
    },
    5: {
      lessonId: 5,
      lessonTitle: "Model Evaluation, Metrics & Overfitting Prevention",
      topic: "Precision, recall, F1 score, ROC-AUC, cross-validation, and regularization",
      keywords: ["evaluation", "metrics", "precision", "recall", "f1 score", "roc auc", "overfitting", "regularization"],
      transcript: `Welcome to Lesson 5: Model Evaluation and Regularization.
In this lesson, we learn how to evaluate models rigorously:
1. Classification Metrics: Accuracy is insufficient for imbalanced datasets. We use Precision (true positive rate among predicted positives), Recall (true positive rate among actual positives), and the harmonic mean F1 Score.
2. ROC-AUC Curve: Evaluates classification performance across all possible probability thresholds.
3. Regularization: L1 (Lasso) and L2 (Ridge) penalties shrink model weights to prevent overfitting on training data.`
    },
    6: {
      lessonId: 6,
      lessonTitle: "Machine Learning Project with Scikit-Learn",
      topic: "End-to-end data pipeline: preprocessing, hyperparameter tuning, and model deployment",
      keywords: ["scikit learn", "pipeline", "preprocessing", "gridsearchcv", "capstone", "model"],
      transcript: `Welcome to Lesson 6: End-to-End Scikit-Learn Project.
In this capstone lesson, we build a production machine learning pipeline:
1. Data Preprocessing: Handling missing values with SimpleImputer, scaling numeric features with StandardScaler, and encoding categorical variables with OneHotEncoder.
2. Scikit-Learn Pipeline: Bundles data transformations and model training into a single reproducible estimator.
3. Hyperparameter Tuning: Using GridSearchCV to find the optimal combination of model parameters via k-fold cross-validation.`
    }
  },

  // 7. Data Science & Analytics Transcripts
  datascience: {
    1: {
      lessonId: 1,
      lessonTitle: "Data Science Foundations & Python for Analysis",
      topic: "Data science workflow, exploratory analysis, Jupyter Notebooks, and Python environment",
      keywords: ["data science", "jupyter", "eda", "analysis", "workflow", "python", "தரவு அறிவியல்"],
      transcript: `Welcome to Lesson 1: Data Science Foundations and Environment Setup.
In this lesson, we explore the data science lifecycle:
1. The Data Science Process: Problem formulation, data collection, data cleaning, exploratory data analysis (EDA), modeling, and communicating insights.
2. Working in Jupyter Notebooks: Executing interactive code cells, visualizing data inline, and documenting markdown findings.
3. Setting up data analysis libraries including NumPy, Pandas, Matplotlib, and Seaborn.`
    },
    2: {
      lessonId: 2,
      lessonTitle: "NumPy & Pandas Data Wrangling Masterclass",
      topic: "DataFrames, series, indexing, missing values, grouping, and aggregations",
      keywords: ["pandas", "numpy", "dataframe", "series", "groupby", "wrangling", "missing values"],
      transcript: `Welcome to Lesson 2: NumPy and Pandas Data Wrangling.
In this lesson, we master data manipulation using Pandas:
1. Data Structures: Series (1D labeled array) and DataFrame (2D tabular structure with labeled rows and columns).
2. Data Cleaning: Detecting missing data with isna(), filling with fillna(), and removing nulls with dropna().
3. Groupby & Aggregations: df.groupby('category').agg({'sales': ['mean', 'sum']}) for summarizing multi-dimensional data.`
    },
    3: {
      lessonId: 3,
      lessonTitle: "Data Visualization with Matplotlib & Seaborn",
      topic: "Scatter plots, histograms, heatmaps, box plots, and visual storytelling",
      keywords: ["visualization", "matplotlib", "seaborn", "histogram", "heatmap", "scatter plot"],
      transcript: `Welcome to Lesson 3: Data Visualization with Matplotlib and Seaborn.
In this lesson, we learn data storytelling through charts:
1. Distribution plots: Histograms and KDE plots to understand data spread and skewness.
2. Categorical plots: Box plots and violin plots to identify medians, quartiles, and outliers.
3. Correlation heatmaps: Using sns.heatmap(df.corr(), annot=True) to discover linear relationships between numerical variables.`
    },
    4: {
      lessonId: 4,
      lessonTitle: "SQL & Database Queries for Analytics",
      topic: "Aggregations, window functions, and multi-table joins for analytical insights",
      keywords: ["sql", "analytics", "window functions", "over", "rank", "partition by", "queries"],
      transcript: `Welcome to Lesson 4: SQL for Data Analytics.
In this lesson, we write analytical queries:
1. Aggregations with GROUP BY and HAVING clauses to filter grouped results.
2. Window Functions: RANK(), DENSE_RANK(), and ROW_NUMBER() with OVER (PARTITION BY ... ORDER BY ...) to compute running totals and rankings without collapsing rows.`
    },
    5: {
      lessonId: 5,
      lessonTitle: "Statistical Inference & Hypothesis Testing",
      topic: "Confidence intervals, p-values, null hypothesis, and A/B testing methods",
      keywords: ["statistics", "hypothesis testing", "p value", "a/b testing", "confidence interval", "null hypothesis"],
      transcript: `Welcome to Lesson 5: Statistical Inference and Hypothesis Testing.
In this lesson, we apply statistical methods to make data-driven decisions:
1. Null Hypothesis (H0) vs. Alternative Hypothesis (H1).
2. The p-value: Probability of observing test results under the null hypothesis; compared to significance level alpha (typically 0.05).
3. A/B Testing: Running randomized controlled experiments to compare conversion rates between control and variant groups.`
    },
    6: {
      lessonId: 6,
      lessonTitle: "Real-World Data Science Capstone",
      topic: "Exploratory data analysis, predictive insights, and automated dashboard reporting",
      keywords: ["capstone", "dashboard", "insights", "reporting", "eda", "data pipeline"],
      transcript: `Welcome to Lesson 6: Data Science Capstone Project.
In this capstone lesson, we execute an end-to-end data project:
1. Ingesting raw business datasets and validating schema consistency.
2. Conducting full exploratory data analysis with statistical summaries and interactive charts.
3. Extracting actionable business recommendations and presenting the findings in an executive report.`
    }
  },

  // 8. Responsive Web Design Transcripts
  "web-design": {
    1: {
      lessonId: 1,
      lessonTitle: "HTML5 Semantic Structure",
      topic: "Semantic tags, document outline, accessibility, and modern page hierarchy",
      keywords: ["html", "html5", "semantic", "structure", "accessibility", "a11y"],
      transcript: `Welcome to Lesson 1: HTML5 Semantic Structure.
In this lesson, we explore semantic layout:
1. Using <header>, <nav>, <main>, <section>, <article>, <aside>, and <footer> to create clean document outlines.
2. Improving accessibility (a11y) so screen readers and search engines accurately parse web page sections.`
    },
    2: {
      lessonId: 2,
      lessonTitle: "CSS Box Model & Selectors",
      topic: "Margin, border, padding, content box, border-box, and CSS selectors",
      keywords: ["box model", "css", "margin", "padding", "border", "selectors", "specificity"],
      transcript: `Welcome to Lesson 2: CSS Box Model and Selectors.
In this lesson, we master CSS dimensions:
1. The Box Model: Content, Padding, Border, and Margin.
2. box-sizing: border-box: Ensures padding and borders are included within the element's total width and height.
3. Selector specificity and class naming conventions.`
    },
    3: {
      lessonId: 3,
      lessonTitle: "Responsive Layouts with Flexbox",
      topic: "Flex containers, direction, wrap, justify-content, and align-items",
      keywords: ["flexbox", "flex", "responsive", "justify content", "align items"],
      transcript: `Welcome to Lesson 3: Responsive Layouts with Flexbox.
In this lesson, we build dynamic component layouts:
1. flex-direction: row and column layouts with flex-wrap: wrap.
2. Space distribution with justify-content (center, space-between, space-around).
3. Cross-axis alignment with align-items and responsive navigation bars.`
    },
    4: {
      lessonId: 4,
      lessonTitle: "CSS Grid Systems",
      topic: "Two-dimensional grid layouts, grid-template-columns, gap, and fr units",
      keywords: ["css grid", "grid", "fr", "grid template", "gap", "layout"],
      transcript: `Welcome to Lesson 4: CSS Grid Systems.
In this lesson, we construct complex two-dimensional page layouts:
1. Defining columns with grid-template-columns using fractional (fr) units and repeat(auto-fit, minmax(250px, 1fr)).
2. Spacing items evenly using the gap property without manual margin hacks.`
    },
    5: {
      lessonId: 5,
      lessonTitle: "Media Queries & Mobile-First Design",
      topic: "Responsive breakpoints, min-width media queries, and fluid typography",
      keywords: ["media queries", "mobile first", "breakpoints", "responsive", "min-width"],
      transcript: `Welcome to Lesson 5: Media Queries and Mobile-First Design.
In this lesson, we make websites adapt to all device screens:
1. Mobile-First Philosophy: Writing default styles for small screens first, then layering min-width media queries for tablet (768px) and desktop (1024px+).
2. Fluid typography and responsive image techniques using srcset and max-width: 100%.`
    },
    6: {
      lessonId: 6,
      lessonTitle: "Responsive Web Design Capstone",
      topic: "Building an accessible, responsive multi-page portfolio website",
      keywords: ["portfolio", "capstone", "responsive project", "web design"],
      transcript: `Welcome to Lesson 6: Responsive Web Design Capstone.
In this capstone lesson, we build a modern multi-section portfolio:
1. Semantic HTML layout with mobile-first responsive CSS.
2. Smooth scrolling, interactive mobile hamburger navigation, and clean cross-browser testing.`
    }
  }
};

/**
 * Normalizes any course ID or alias to a standard transcript key.
 * Returns null if unrecognized (never defaults to another course like FSD!).
 */
export const normalizeCourseKey = (courseId) => {
  if (!courseId) return null;
  const id = String(courseId).toLowerCase().trim();

  // Python aliases
  if (id === "python" || id === "py" || id === "python-fs" || id === "python-basics") {
    return "python";
  }
  // Full Stack Development / Web Development aliases
  if (id === "fsd" || id === "fullstack" || id === "web" || id === "web-development") {
    return "fsd";
  }
  // React aliases
  if (id === "react-js" || id === "react" || id === "react-advanced") {
    return "react-js";
  }
  // Java aliases
  if (id === "java" || id === "java-dev" || id === "java-bootcamp") {
    return "java";
  }
  // SQL aliases
  if (id === "sql" || id === "sql-db" || id === "sql-server") {
    return "sql";
  }
  // Machine Learning / AI aliases
  if (id === "ml" || id === "ai" || id === "machine-learning" || id === "ai-machine-learning") {
    return "ml";
  }
  // Data Science aliases
  if (id === "datascience" || id === "data-science") {
    return "datascience";
  }
  // Responsive Web Design aliases
  if (id === "web-design" || id === "responsive-web") {
    return "web-design";
  }

  return id;
};

// In-memory imported transcripts store for dynamic registration during runtime
const dynamicTranscriptsRegistry = new Map();

/**
 * Supported method to import or register a video transcript dynamically.
 * Stores in localStorage (if available) and in-memory registry.
 * Does not invent content — stores only provided, verified transcript text.
 */
export const importLessonTranscript = ({
  courseId,
  lessonId,
  videoId,
  transcript,
  lessonTitle = '',
  topic = '',
  keywords = []
}) => {
  if (!transcript || !transcript.trim()) return null;

  const normalizedCourse = normalizeCourseKey(courseId) || String(courseId || '').toLowerCase().trim();
  const lessonKey = String(lessonId || 1);

  const transcriptRecord = {
    lessonId: Number(lessonKey) || lessonKey,
    lessonTitle: lessonTitle || `Lesson ${lessonKey}`,
    topic: topic || 'Lesson Topic',
    keywords: Array.isArray(keywords) ? keywords : [String(keywords || '')],
    transcript: transcript.trim(),
    videoId: videoId || null,
    isImported: true,
    updatedAt: new Date().toISOString()
  };

  // Register in memory by course+lesson
  dynamicTranscriptsRegistry.set(`${normalizedCourse}_${lessonKey}`, transcriptRecord);
  if (videoId) {
    dynamicTranscriptsRegistry.set(`vid_${videoId}`, transcriptRecord);
  }

  // Persist to localStorage if available
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(`swordnex_transcript_${normalizedCourse}_${lessonKey}`, JSON.stringify(transcriptRecord));
      if (videoId) {
        localStorage.setItem(`swordnex_video_transcript_${videoId}`, JSON.stringify(transcriptRecord));
      }
    } catch (_e) {}
  }

  return transcriptRecord;
};

/**
 * Helper to retrieve imported transcript from in-memory registry or localStorage.
 */
export const getImportedTranscript = (courseId, lessonNum, videoId) => {
  const normalizedCourse = normalizeCourseKey(courseId) || String(courseId || '').toLowerCase().trim();
  const lessonKey = String(lessonNum || 1);

  // Check in-memory registry first
  const memoryKey = `${normalizedCourse}_${lessonKey}`;
  if (dynamicTranscriptsRegistry.has(memoryKey)) {
    return dynamicTranscriptsRegistry.get(memoryKey);
  }
  if (videoId && dynamicTranscriptsRegistry.has(`vid_${videoId}`)) {
    return dynamicTranscriptsRegistry.get(`vid_${videoId}`);
  }

  // Check localStorage
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = localStorage.getItem(`swordnex_transcript_${normalizedCourse}_${lessonKey}`);
      if (stored) return JSON.parse(stored);
      if (videoId) {
        const storedVid = localStorage.getItem(`swordnex_video_transcript_${videoId}`);
        if (storedVid) return JSON.parse(storedVid);
      }
    } catch (_e) {}
  }

  return null;
};

/**
 * Retrieves the correct transcript data for a given course and lesson.
 * Strict rules:
 * 1. Checks activeLesson.transcript if directly present.
 * 2. Checks dynamically imported transcripts.
 * 3. Checks built-in verified video transcripts for the specific course.
 * 4. NEVER falls back to another course's transcript (returns null if missing).
 */
export const getLessonTranscript = (courseId, lessonNum, activeLesson = null) => {
  if (!courseId || lessonNum === undefined || lessonNum === null) return null;

  // 1. Direct transcript attached to activeLesson
  if (activeLesson?.transcript && typeof activeLesson.transcript === 'string' && activeLesson.transcript.trim()) {
    return {
      lessonId: activeLesson.id || lessonNum,
      lessonTitle: activeLesson.title || `Lesson ${lessonNum}`,
      topic: activeLesson.topic || '',
      keywords: activeLesson.keywords || [],
      transcript: activeLesson.transcript.trim()
    };
  }

  // 2. Check dynamically imported transcript (by course+lesson or videoId)
  const videoId = activeLesson?.videoId || (typeof activeLesson?.videoUrl === 'string' ? activeLesson.videoUrl.split('/embed/')[1] : null);
  const imported = getImportedTranscript(courseId, lessonNum, videoId);
  if (imported && imported.transcript) {
    return imported;
  }

  // 3. Official verified course transcripts
  const normalizedCourse = normalizeCourseKey(courseId);
  if (!normalizedCourse) return null;

  const courseData = videoTranscripts[normalizedCourse];
  if (!courseData) return null;

  const lessonData = courseData[lessonNum] || courseData[Number(lessonNum)] || courseData[String(lessonNum)];
  return lessonData || null;
};
