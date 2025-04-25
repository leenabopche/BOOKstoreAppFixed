**Project Overview**
Stellar Bookstore Portal is a feature-rich web app built for both readers and administrators. It supports user registration, login/logout, cart management, book detail views, and a simple yet powerful backend for inventory control.

**Setup & Run Instructions **
**Local Setup**
Clone the repository:

bash:
git clone <repository-url>
cd stellar-bookstore-portal
Install dependencies:

bash:
npm install
Run the development server:

bash:
npm run dev
Access the app: Open http://localhost:8080 in your browser.

**Docker Setup**
Build and start containers:

bash:
docker-compose up -d
App will be available at: http://localhost:8080

**Tech Stack Used**

Category	Technology
Frontend	React + TypeScript
UI Styling	Tailwind CSS + Shadcn UI
Routing	React Router
Data Fetching	React Query
DevOps	Docker, Docker Compose
CI/CD	Jenkins

**Docker & Jenkins Usage Notes**
**Docker**
Multi-stage Docker build minimizes final image size.

docker-compose.yml is used for running containers in both dev and prod modes.

**Jenkins CI/CD Workflow**
Jenkins pulls code from the repository.

Installs dependencies with npm install.

Runs builds/tests (if applicable).

Builds a Docker image from the Dockerfile.

Deploys the container using docker-compose up -d.

Optional: Include a Jenkinsfile for pipeline-as-code automation.

![Screenshot 2025-04-25 170656](https://github.com/user-attachments/assets/57925a41-22c1-43e7-a6ce-9111e67b891e)
![Screenshot 2025-04-25 170714](https://github.com/user-attachments/assets/293e3522-0ed7-484e-9603-b3050da18a8a)
![Screenshot 2025-04-25 170729](https://github.com/user-attachments/assets/eeb179c0-b0aa-472c-956b-af458a4ad734)
![Screenshot 2025-04-25 170753](https://github.com/user-attachments/assets/fac86c8e-219d-4888-9ac3-91b8f7af7037)
![Screenshot 2025-04-25 170829](https://github.com/user-attachments/assets/4b51948e-9240-4ecb-a5f0-784869ba84c2)



