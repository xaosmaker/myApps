
# 📝 myApps – Personal Task Manager

**Built with Django, PostgreSQL, and React**

---

## 📌 About This Project

This project started as a personal tool — something I built for myself to manage tasks and time more efficiently. It helped me stay organized in daily life, track work hours, gym sessions, and personal to-dos.

It’s not a showcase piece. It’s a functional, backend-focused app I created before I fully found my direction as a developer.

The UI is minimal and the design is simple, but the app works — and most importantly, I learned a lot by building it.

---

## ⚙️ Tech Stack

**Backend:**

- Django 5.0.7
- Django REST Framework
- PostgreSQL
- Celery + Redis (for background tasks)
- JWT Auth (SimpleJWT + Djoser)
- Argon2 password hashing

**Frontend:**

- React with TypeScript
- Functional components and manual UI logic (no UI library)

---

## 🚀 Features

- 📋 ToDo App: CRUD for personal tasks
- 📊 Stats: Completed/total task tracking
- 🏋️ Gym Tracker: Simple tool to manually log sets and times
- ⏱️ Work Hours: Log work entry/exit times and sick leave days
- 🔐 JWT authentication + secure password hashing
- 📦 REST API for frontend integration
- 🔄 Celery tasks ready for async/periodic actions

---

## 🧠 Why I Built It

I didn’t start coding with the right mindset. Early on, I rushed through projects just to say I had them.

This app was part of me stepping back and learning to build with purpose. I made something *for me*, to actually use — not just to “complete a tutorial.”

It’s not perfect, but it’s real.

---

## 🪜 What I’d Improve Next

- Add password reset and email confirmation
- create user functionality
- Improve frontend design
- Refactor parts of the backend for modularity

---

## 📁 Project Structure

```
myApps/
│
├── api/                  # Django backend app
├── frontend/             # React code (manually built)
├── nginx/                # Nginx config with includes + static mounting
├── .envs/                # Environment variables
├── Makefile              # Dev and deploy scripts
├── local.yml             # Docker Compose (local)
└── README.md             # You're here
```

---

## ✌️ Final Words

This project is a snapshot of my progress. It helped me find clarity and direction as a backend-focused developer.

