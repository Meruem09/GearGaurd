# 🚀 GearGaurd
**Team Details**
         | Team Member Name    | Email                                |
| -------------- | ------------------------------------------- |
| **Varma Rahul(Team Leader)** | vrahul.engineer@gmail.com |
| **Ayush Singh**  |  ayushsingh.as987@gmail.com    |
| **Yashraj Patel** | patelyashraj1stfame@gmail.com   |

**Team Mentor**
  Divyesh Vyas(Discord_id = divyesh_vyas)
---
**GearGaurd** is a modern **Maintenance Management & Tracking System** designed to help organizations efficiently manage equipment, maintenance teams, and repair workflows — all from a clean, intuitive interface.

It provides a structured way to track **equipment health**, handle **corrective and preventive maintenance**, and visualize work using **Kanban boards and calendars**.

---

## 🛠️ Your Smart Maintenance Companion

Welcome to **GearGaurd**, a system built to simplify how maintenance operations are managed.
Whether it’s a sudden equipment breakdown or a scheduled routine checkup, GearGaurd helps teams stay organized, accountable, and efficient.

The project is built using **React + Vite**, offering a fast, scalable frontend foundation ready for feature expansion and backend integration.

---

## 📖 About GearGaurd

GearGaurd centralizes maintenance operations by connecting:

* 🏭 **Equipment** – What needs maintenance
* 👨‍🔧 **Teams & Technicians** – Who fixes it
* 📝 **Maintenance Requests** – What work is being done

The system supports real-world maintenance workflows, ensuring that the right team handles the right task at the right time.

---

## ❓ Why GearGaurd?

* **Structured Maintenance Flow** – Track jobs from *New* → *In Progress* → *Repaired* → *Scrap*
* **Preventive Planning** – Schedule routine maintenance in advance
* **Visual Tracking** – Kanban and calendar views for clarity
* **Scalable Frontend** – Built with React + Vite for performance
* **Clean UI** – Minimal, readable, and user-friendly design

---

## ✨ Features

* 🧰 **Equipment Management**
  Manage machines, devices, and assets with essential details.

* 📝 **Maintenance Requests**
  Create and track corrective (breakdown) and preventive (scheduled) maintenance jobs.

* 🗂 **Kanban Board**
  Drag-and-drop maintenance requests across workflow stages.

* 📅 **Calendar View**
  Visualize preventive maintenance schedules by date.

* 👥 **Team-Based Workflow**
  Requests are handled by assigned maintenance teams and technicians.

* 🚨 **Scrap Handling**
  Mark equipment as scrapped when it becomes unusable.

---

## 🧑‍💻 Technologies Used

| Technology     | Description                                 |
| -------------- | ------------------------------------------- |
| **React**      | Frontend library for building UI components |
| **Vite**       | Fast development server and build tool      |
| **JavaScript** | Core programming language                   |
| **CSS**        | Styling and layout                          |
| **npm**        | Dependency management                       |

---


## 📸 Screenshots

![Screenshot 2025-12-27 161645](https://github.com/user-attachments/assets/b824d396-04b1-4638-b50d-66f09a2e3041)  <img width="1354" height="634" alt="Screenshot 2025-12-27 161844" src="https://github.com/user-attachments/assets/a71e3a32-6a84-4e27-8985-b2c4c9d9b078" />
<img width="1063" height="589" alt="Screenshot 2025-12-27 161040" src="https://github.com/user-attachments/assets/9478c6aa-a92e-4195-ac3b-7d88a20016b4" />
<img width="1351" height="607" alt="Screenshot 2025-12-27 163726" src="https://github.com/user-attachments/assets/38e611dd-6630-4cb3-a603-6186ea22322e" />
<img width="1352" height="619" alt="Screenshot 2025-12-27 164139" src="https://github.com/user-attachments/assets/34717f13-29d5-4365-8ed9-c497e9ab3d66" />
<img width="1330" height="615" alt="Screenshot 2025-12-27 164710" src="https://github.com/user-attachments/assets/33554d17-2dce-47ef-9dd9-f164b1227503" />
<img width="1359" height="602" alt="Screenshot 2025-12-27 164927" src="https://github.com/user-attachments/assets/19f1a2ce-49d2-4fb5-b7d6-688301c9fffe" />
<img width="1334" height="692" alt="Screenshot 2025-12-27 165305" src="https://github.com/user-attachments/assets/3211f8be-2d6c-44e2-b1e1-610db629ab02" />
<img width="1076" height="528" alt="Screenshot 2025-12-27 165207" src="https://github.com/user-attachments/assets/8a3f89ff-b6f8-4ce3-b09c-53404e0e7b70" />





---

## 🚀 Getting Started

Follow these steps to run GearGaurd locally.

---

### 🔧 Prerequisites

Make sure you have installed:

* **Node.js** (v16 or higher)
* **npm**
* **Git**

---

### 📦 Installation

#### 1️⃣ Clone the repository

```bash
git clone https://github.com/Meruem09/GearGaurd.git
```

#### 2️⃣ Navigate to the project directory

```bash
cd GearGaurd
```

#### 3️⃣ Install dependencies

```bash
npm install
```

#### 4️⃣ Run the development server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## 🏗 Project Structure

```
GEARGAURD-MAIN/
│
├── node_modules/                 # Project dependencies (auto-generated)
│
├── public/                       # Public static files
│   └── vite.svg                  # Vite logo
│
├── src/
│   │
│   ├── assets/                   # Static assets
│   │   └── react.svg             # React logo
│   │
│   ├── components/               # Application components
│   │   ├── Calendar.jsx          # Preventive maintenance calendar view
│   │   ├── Equipment.jsx         # Equipment listing and management
│   │   ├── EquipmentForm.jsx     # Form to add/edit equipment
│   │   ├── ForgotPassword.jsx    # Forgot password UI
│   │   ├── Kanban.jsx            # Maintenance Kanban board
│   │   ├── Login.jsx             # User login page
│   │   ├── Requests.jsx          # Maintenance request management
│   │   ├── Signup.jsx            # User registration page
│   │   └── Team.jsx              # Maintenance team management
│   │
│   ├── App.css                   # App-level styling
│   ├── App.jsx                   # Root React component
│   ├── index.css                 # Global styles
│   ├── main.jsx                  # Application entry point
│   │
│   ├── db.js                     # Database / local data configuration
│   ├── seed.js                   # Initial seed data
│   └── test-db.js                # Database testing utilities
│
├── .gitignore                    # Git ignored files
├── eslint.config.js              # ESLint configuration
├── package.json                  # Project metadata and scripts
├── package-lock.json             # Dependency lock file
├── vite.config.js                # Vite configuration
└── README.md                     # Project documentation

```

---

## 📌 Project Status

✅ React + Vite frontend initialized
✅ Clean and scalable structure
🚧 Backend & advanced logic under development

### Planned Enhancements

* Backend API integration
* Role-based access (Admin / Technician)
* Equipment analytics & reports
* Authentication & authorization
* Persistent database storage

---

## 🤝 Contributing

Contributions are welcome to make GearGaurd better!

1. Fork the repository
2. Create a new branch

   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes

   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your branch

   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request

Please ensure your code follows project standards.

---

## 📬 Contact

Have questions or suggestions?

* **GitHub**: [https://github.com/Meruem09](https://github.com/Meruem09)
* **GitHub**: [https://github.com/Ayushax](https://github.com/Ayushax)
* * **GitHub**: [https://github.com/Yashraj-Patel](https://github.com/Yashraj-Patel)
* **Issues**: Use the GitHub Issues section to report bugs or ideas

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 💡 Final Note

GearGaurd is designed as a **real-world maintenance tracking solution**, not just a demo project.
The current frontend lays a strong foundation for future backend integration and enterprise-level features.

---
