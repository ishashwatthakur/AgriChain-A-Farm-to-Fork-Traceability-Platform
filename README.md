# AgriChain: A Farm-to-Fork Traceability Platform

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🌾 Transform Agricultural Supply Chain with Blockchain Technology

## 📖 About AgriChain

AgriChain is a blockchain-based supply chain system designed to track agricultural produce from farm to consumer. It ensures transparency, trust, and traceability in the food supply chain, enabling consumers to verify the journey of their food products while helping farmers, distributors, and retailers manage their operations efficiently.

> **"Know your food's journey from farm to fork."**

## 🎯 Key Features

|     | Feature                   | Description                                      |
| :-: | :------------------------ | :----------------------------------------------- |
| 🧑‍🌾  | **Farmer Dashboard**      | Register and track produce batches with QR codes |
| 🚚  | **Distributor Interface** | Manage pickup and delivery of produce batches    |
| 🏪  | **Retailer Portal**       | Track inventory and manage product reception     |
| 📱  | **QR Code System**        | Generate and scan QR codes for product tracking  |
| 📊  | **Traceability Timeline** | Visual representation of product journey         |
| 🔐  | **Secure Authentication** | Role-based access control system                 |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or bun
- Modern web browser with camera access (for QR scanning)

### Installation

```bash
# Clone the repository
git clone https://github.com/ishashwatthakur/AgriChain-A-Farm-to-Fork-Traceability-Platform.git

# Navigate to project directory
cd AgriChain-A-Farm-to-Fork-Traceability-Platform

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173) to view AgriChain in your browser.

## 📁 Project Structure

```
agrichain/
├── public/                # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── assets/           # Image assets
│   │   └── farm-hero.jpg
│   ├── components/       # React components
│   │   └── ui/          # UI components
│   │       ├── QrGenerator/
│   │       └── QrScanner/
│   ├── hooks/           # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   │   ├── FarmerDashboard.tsx
│   │   ├── DistributorDashboard.tsx
│   │   ├── RetailerDashboard.tsx
│   │   ├── ScanProduct.tsx
│   │   └── Traceability.tsx
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
├── tailwind.config.ts  # Tailwind configuration
└── package.json        # Dependencies and scripts
```

## 🎯 How It Works

1. **Farmers** register new produce batches and generate QR codes
2. **Distributors** confirm pickup and manage transportation
3. **Retailers** receive products and confirm arrival
4. **Consumers** scan QR codes to view product journey
5. All transactions are recorded for transparency

## 💡 Features Breakdown

### For Farmers

- Register new produce batches
- Generate unique QR codes
- Track batch status
- Manage pickup schedules

### For Distributors

- View available batches
- Confirm pickup and delivery
- Track transportation status
- Manage multiple orders

### For Retailers

- Receive and verify products
- Update inventory status
- Access product history
- Confirm product availability

### For Consumers

- Scan product QR codes
- View complete product journey
- Verify product authenticity
- Access farm information

## 🔧 Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **QR Code**: qrcode.react
- **Routing**: React Router
- **State Management**: React Query

## 🛡️ Security Features

- Role-based access control
- Secure authentication
- Data encryption
- Input validation
- XSS protection

## 📊 Supported Products

- ✅ Fresh Produce
- ✅ Organic Products
- ✅ Dairy Products
- ✅ Grains
- ✅ Processed Foods
- ✅ Specialty Items

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🆘 Support

- 📧 **Email**: [your-email@example.com]
- 🐛 **Issues**: [GitHub Issues](https://github.com/ishashwatthakur/AgriChain-A-Farm-to-Fork-Traceability-Platform/issues)

## 🙏 Acknowledgments

- shadcn/ui for beautiful UI components
- Tailwind CSS for styling
- React community for tools and libraries
- QR code libraries for traceability features

---

### **Track your food's journey from farm to fork!**

[![Star on GitHub](https://img.shields.io/badge/⭐_Star_on_GitHub-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ishashwatthakur/AgriChain-A-Farm-to-Fork-Traceability-Platform/stargazers)
[![Fork Repository](https://img.shields.io/badge/Fork_Repository-00AA00?style=for-the-badge&logo=git&logoColor=white)](https://github.com/ishashwatthakur/AgriChain-A-Farm-to-Fork-Traceability-Platform/fork)
