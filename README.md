
# DepositCalc

## We are live at <https://depositcalc.com>

<!--toc:start-->
- [DepositCalc](#depositcalc)
  - [Repository Structure](#repository-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
    - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)
<!--toc:end-->

DepositCalc helps you manage multiple bank accounts, incomes, and expenses effectively. By calculating exactly where your paycheck needs to go, our tool ensures that your direct deposits are set up correctly and distributed according to your unique needs, whether you're sharing expenses with family members or roommates. Take control of your finances and avoid the hassle of manual calculations. DepositCalc offers an intuitive platform to organize, track, and automate your direct deposit allocations effortlessly.

## Repository Structure

This monorepo contains the following components:

- **frontend/**: A Vite + React application for the frontend, providing an interactive and user-friendly interface for managing your financial allocations.
- **restapi/**: An ASP.NET (WPF) backend serving as the REST API for DepositCalc. This backend handles all server-side logic, data processing, and communicates with the frontend.

## Getting Started

### Prerequisites

To run the application locally, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (for the frontend)
- [.NET SDK](https://dotnet.microsoft.com/download) (for the backend)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/DepositCalc.git
   cd DepositCalc
   ```

2. **Install frontend dependencies**:

   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**:

   ```bash
   cd ../restapi
   dotnet restore
   ```

### Running the Application

1. **Start the backend**:

   ```bash
   cd restapi
   dotnet restore
   dotnet run
   ```

2. **Start the frontend**:

   ```bash
   cd ../frontend
   npm run dev
   ```

### Project Structure

    DepositCalc/
    ├── frontend/            # Vite + React frontend application
    └── restapi/             # ASP.NET backend providing REST API

## Contributing

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## Contact

For any questions or feedback, please contact us at [support@depositcalc.com](mailto:support@depositcalc.com).
