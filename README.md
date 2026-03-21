# 🛡️ Sentinel

Sentinel is a high-frequency real-time monitoring dashboard built with SolidJS and Firebase.

## 📖 The Story

This project started with a random YouTube recommendation about SolidJS. I wanted to test its "fine-grained reactivity"
by building a dashboard that handles more than just a few updates per second. I asked Gemini for a challenge, and it led
me to build a system that monitors high-frequency login events.

## 🚀 The $\gamma = 10,000$ Challenge

The original "v1" was a simple POST request to generate 300 documents. But to truly test the system, I pushed the limit
to 10,000 documents (the "Wallet Protection Limit"). This immediately broke the entire stack and forced a complete
re-architecture.

### 🔴 Problem 1: Backend & Database Meltdown

Firing 10k writes in a single synchronous request destroyed the backend and hit Firestore limits too aggressively.

- **The Evolution**: I decoupled the architecture. The backend now offloads data to **Google Cloud Pub/Sub**. A
  dedicated
  **Ingestor Service** consumes these messages and throttles the writes to Firestore to stay within free-tier quotas
  while
  maintaining high throughput.

### 🔴 Problem 2: Frontend "Jank" & Main Thread Locking

Even with the data flowing, the browser couldn't keep up. Processing 10,000 onSnapshot changes locked the UI thread,
making the dashboard unresponsive and frozen.

- **The Evolution**: I implemented **Web Workers**. By moving the entire Firestore subscription and data parsing logic
  into a
  background thread, the "Main Thread" stays 100% free for the UI
- **The Result**: The dashboard stays silky-smooth even while processing thousands of logs per second.

# 🛠️ Tech Stack

- **Frontend**: SolidJS (for fine-grained reactivity)
- **Concurrency**: Web Workers (Multithreading in the browser)
- **Styling**: Tailwind CSS (Dark Mode optimized)
- **Backend**: Java Spring Boot
    - https://github.com/Abhiroop25902/sentinel-backend
    - https://github.com/Abhiroop25902/sentinel-ingestor

- **Infrastructure**: Google Cloud Pub/Sub, Cloud Run, Firestore Server Configs (for controlling saveToDb, printLog and
  recordCount)
- **Database**: Cloud Firestore

![img.png](img.png)
