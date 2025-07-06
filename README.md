# 🌟 Smart AI Tasks – Context-Aware Task Planning with AI

Smart AI Tasks is an intelligent task planner built using **Next.js** and **Tailwind CSS**. It helps users turn unstructured inputs like notes, emails, or WhatsApp messages into **structured, prioritized tasks** with AI assistance.

🔮 Whether you're a busy professional or a student, this app uses context-aware summarization and smart filtering to keep you organized — beautifully!

---

## 📽 Preview Video

Watch it in action 👉 [Smart AI Tasks - Demo](https://drive.google.com/file/d/1tzWPgDr1_kMtZitP_WCB9lPA-Hlx3DB1/view?usp=sharing)

---

## 🚀 Features

- 🧠 AI-generated task suggestions from messy notes or chats  
- 🌗 Dark mode with Tailwind support  
- 🔍 Filter by status, priority, and category  
- 📝 Import/export tasks via CSV  
- 📆 Download `.ics` files for Google Calendar sync  
- 🔐 JWT-based authentication with protected routes  
- 📱 Mobile-first responsive design

---

## 🛠 Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS, Framer Motion, React Icons  
- **Backend**: Django + DRF with AI Task generation logic (see [API Docs](https://documenter.getpostman.com/view/38405494/2sB34cnhXn))  
- **Extras**: React Toastify, Typed.js, Axios, LocalStorage

---

## 🧑‍💻 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/your-username/smart-todo-app.git
cd smart-todo-app
npm install
````

Start the dev server:

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 📦 Project Structure

```bash
app/
 ├── dashboard/            # Task dashboard with filters & expand
 ├── contexts/             # Add and view content-based task contexts
 ├── suggested/            # AutoAI-suggested task management
 ├── utils/                # API and localStorage utils
 ├── components/           # UI components (DarkModeToggle, RequireAuth, etc.)
 └── globals.css           # Tailwind CSS entry
```

---

## ⚙️ Environment Setup

You may need to create a `.env.local` file with your API base URL or keys:

```env
NEXT_PUBLIC_API_BASE=https://your-api-url.com/
```

---

## 🔒 Authentication

This app uses **JWT-based auth** with protected routes via custom `RequireAuth` HOC. Access tokens are stored in `localStorage`.

---

## 🌐 Deployment

You can easily deploy this app on [Vercel](https://vercel.com) or any static host that supports Next.js:

```bash
npm run build
npm run start
```

---

## 🤝 Contributing

Pull requests are welcome! If you find a bug or have a feature request, please open an issue.

---


**Crafted with ❤️ by Madhu – Powered by AI + React + Tailwind**
