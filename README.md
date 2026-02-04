# Nexus Gateway 🚀

Nexus Gateway is a high-performance, modular API gateway built with Node.js and TypeScript. It serves as an orchestration layer that integrates various AI-driven features (like **FlowMinds**) and financial modules (like **LoveLedger**).

## ✨ Features

-   **🤖 FlowMinds AI Engine**: Generate production-ready Mermaid.js diagrams from natural language prompts using Google's Gemini 2.0 Flash.
-   **📚 Modular Architecture**: Clean, scalable directory structure with separate modules for distinct services.
-   **🛡️ Secure by Default**: Built-in security headers with Helmet, CORS protection, and type-safe validation using Zod.
-   **⚙️ Intelligent Configuration**: Strongly-typed environment variable management.
-   **🚀 CI/CD Ready**: Automated deployment via GitHub Actions (FTP-ready).

## 🛠️ Tech Stack

-   **Runtime**: Node.js (v20+)
-   **Language**: TypeScript
-   **Framework**: Express.js
-   **AI**: Google Generative AI (Gemini SDK)
-   **Validation**: Zod
-   **Security**: Helmet, CORS
-   **Dev Tools**: Nodemon, TS-Node

## 🚀 Getting Started

### Prerequisites

-   Node.js v20 or higher
-   npm or yarn
-   A Google Gemini API Key (Get it at [Google AI Studio](https://aistudio.google.com/))

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/nexus-gateway.git
    cd nexus-gateway
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory:
    ```env
    PORT=3000
    GLOBAL_GEMINI_KEY=your_gemini_api_key_here
    FLOWMINDS_GEMINI_KEY=your_gemini_api_key_here
    ```

### Running Locally

```bash
# Start development server (with hot-reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔌 API Reference

### FlowMinds (AI Diagrams)
-   **URL**: `/api/v1/flowminds/generate`
-   **Method**: `POST`
-   **Body**:
    ```json
    {
      "prompt": "Create a sequence diagram for a library checkout system"
    }
    ```
-   **Response**: Returns valid Mermaid.js syntax.

### LoveLedger (Finance Module)
-   **URL**: `/api/v1/loveledger/status`
-   **Method**: `GET`
-   **Response**: Module health status.

## 📂 Project Structure

```text
nexus-gateway/
├── .github/workflows/    # CI/CD Workflows
├── src/
│   ├── config/           # App configuration
│   ├── core/             # Shared logic (AI Providers, etc.)
│   ├── modules/          # Feature-based folders
│   │   ├── flowminds/    # AI Diagram module
│   │   └── loveledger/   # Finance module
│   ├── app.ts            # App initialization
│   └── server.ts         # Entry point
```

## 🚢 Deployment

The project includes a GitHub Action in `.github/workflows/deploy.yml` configured for FTP deployment. To use it:
1.  Push to `main` or `master`.
2.  Add `FTP_SERVER`, `FTP_USERNAME`, and `FTP_PASSWORD` to your GitHub Repository Secrets.

---

Built with ❤️ by [Your Name/Team]
