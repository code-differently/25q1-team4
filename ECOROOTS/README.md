# 🌲 Tree Tracker App ECOROOTS 

Tree Tracker is a lightweight web application that allows volunteers and users to log the trees they've planted. Users can input species, date, and location (via GPS), and view a history of their contributions. This app supports environmental awareness and helps people track their positive ecological impact over time.

## ✨ Features

- Add a planted tree with:
  - Tree species
  - Planting date
  - (Upcoming) GPS coordinates of the planting location
- View your planting history
- Simple navigation between logging and history views
- Firebase backend for storing tree data

## 📦 Tech Stack

- **Frontend**: React + TypeScript
- **Routing**: React Router
- **Backend**: Firebase Firestore
- **State**: React Hooks
- **Optional Features Planned**:
  - GPS location capture using browser geolocation API
  - User login/authentication with Firebase Auth
  - Map view of all logged trees

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- Firebase Project

### Installation

```bash
git clone https://github.com/your-org/tree-tracker.git
cd tree-tracker
npm install