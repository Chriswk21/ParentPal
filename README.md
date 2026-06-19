# ParentPal 👪
> **Empowering Parents with Practical Tools & Heartfelt Guidance**

ParentPal is a responsive web application designed to support parents through their parenting journey. It provides a comprehensive library of resources, interactive peer-to-peer and expert communities, and an AI-driven chatbot companion to answer everyday parenting questions. 

This project was built as an **Assignment of Lecture (AOL)** for the **Human-Computer Interaction (HCI)** course.

---

## 🌟 Key Features

### 1. Resource & Content Library
* **Featured Articles**: Research-backed reads on topics such as *"From Tantrums to Talking"*, *"Discipline Without Drama"*, and *"The Power of Positive Parenting"*.
* **Video Resources**: High-quality video guides like *"The Most Important Parenting Strategy"* and *"How to Stay Calm When Your Child Isn't"*.
* **Bookmarking**: Save articles and video content for future reference.

### 2. Peer & Expert Communities
* **Parent Community Forum**: A space where parents can connect, share advice, ask questions, and support each other.
* **Expert Community**: Dedicated forums where users can ask questions to and get responses from certified child development experts.

### 3. Parent Companion Chatbot
* An interactive AI-simulated chatbot designed to provide instant answers and advice on general child development and parenting concerns.

### 4. Dual-Role Dashboards
* **User Dashboard**: Personalized dashboard for parents to track saved articles, community posts, watchlists, and profile details.
* **Expert Dashboard**: Specialized console for certified experts to manage discussions, publish expert-approved articles, and respond to parenting queries.

### 5. Local Authentication System
* Client-side login and signup simulator utilizing `localStorage` to persist session state, user details, and support role-based routing (Regular User vs. Certified Expert).

---

## 🛠️ Technology Stack

* **Core**: HTML5, Vanilla JavaScript (ES6)
* **Styling**: Vanilla CSS3 (Responsive Design)
* **Typography**: [Poppins](https://fonts.google.com/specimen/Poppins) (Google Fonts)
* **Icons**: [FontAwesome 6.0](https://fontawesome.com/)
* **Database**: Local Storage (Session storage simulation)

---

## 📁 Directory Structure

```text
ParentPal/
│
├── assets/              # SVG illustrations, logo, and graphic assets
├── css/                 # Page-specific styling stylesheets (e.g. login.css, dashboard.css)
├── html/                # Core sub-pages (login, profile, community, chatbot, etc.)
├── js/                  # Core logic scripts (auth checks, form validation, chatbot mock API)
├── layout/              # Shared styling and layout assets (navigation, headers, footers)
├── index.html           # Landing page / entrypoint
├── .gitignore           # Git exclusions
└── README.md            # Project documentation
```

---

## 🚀 How to Run Locally

### Option 1: Direct File Execution
1. Clone or download this repository:
   ```bash
   git clone https://github.com/Chriswk21/ParentPal.git
   ```
2. Navigate to the directory and double-click the **`index.html`** file in your file explorer to open the web app directly in any modern web browser.

### Option 2: Using VS Code Live Server (Recommended)
1. Open the folder in **VS Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Click **Go Live** in the bottom-right status bar to host it on a local development server (usually `http://127.0.0.1:5500/`).

### Option 3: Using Command Line Server (Python / Node.js)
If you have Python installed:
```bash
python -m http.server 8000
```
Or if you have Node.js installed:
```bash
npx serve .
```
Then, open `http://localhost:8000` or `http://localhost:3000` in your web browser.

---

## 🔐 Sample Credentials
The system simulates two roles. You can sign up using a new email address or use simulated test data:
* **User (Parent)**: Accesses general features and User Dashboard.
* **Expert**: Accesses Expert Community features and the Expert Dashboard console.
