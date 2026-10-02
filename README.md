# Business OS (Inventory Management System)

A modern, fast, and responsive enterprise workspace platform built to manage product inventory, sales data, workflows, and staff management seamlessly. The frontend is styled using custom **Tailwind CSS** configurations matched with dynamic **Glassmorphic** interface surfaces.

---

## ✨ Features
* **Crystalline UI Engine:** Built with high-end glossy layouts leveraging `backdrop-blur` and soft ambient lighting depths.
* **Fluid Sidebar Architecture:** Adapts smoothly across screens—collapsing cleanly into an icon-only strip on mobile windows and expanding to a comprehensive 1/6th row layout on desktops.
* **Smart Navigation Matrix:** Powered by `react-router-dom` with auto-updating page headers and dynamic contextual notification indicator badges.
* **Threshold Alert Integration:** Live badge pipelines directly embedded into sidebar link views to catch low-stock warnings instantly without layout jumps.

---

## 🚀 Tech Stack
* **Framework:** React (Vite)
* **Styling Engine:** Tailwind CSS & Custom Native CSS Layers
* **Routing Structure:** React Router DOM
* **Icon Suite:** React Icons

---

## 🛠️ Project Structure
```text
src/
├── components/
│   ├── SideNav.tsx      # Multi-stage responsive navigation matrix
│   └── TopNav.tsx       # Glossy absolute-anchored header container
├── App.tsx              # Main layout grid orchestration layer
├── main.tsx             # Application entry point & router context injection
└── App.css              # Custom native transition animations & states
```

---

## 🏁 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v22 or newer recommended) installed on your system.

### 2. Installation
Clone the repository and run a clean dependency execution sequence to clear package configurations:
```bash
# Clean install sequence
rmdir /s /q node_modules package-lock.json
npm install
```
*(If utilizing a Bash shell system environment, replace `rmdir /s /q` with `rm -rf`)*

### 3. Launch Development Server
Boot up the local Vite engine to track component modifications in real time:
```bash
npm run dev
```

---

## ⚙️ Configuration Notes
* **Sidebar Scale:** Desktop layouts target a precise `1/6` footprint constraint with minimum thresholds set at `200px` to maintain data visibility.
* **Hover Micro-Animations:** Transition interpolations for navigation item paths are declared natively via `App.css` utilizing a `0.2s ease-in-out` ease vector to optimize thread rendering performance.
