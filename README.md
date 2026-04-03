# Finance Dashboard

A modern, responsive finance dashboard web application built with Next.js, TypeScript, and Tailwind CSS. This application provides users with comprehensive financial insights, transaction management, and data visualization tools to track income, expenses, and spending patterns.

## Overview

The Finance Dashboard is designed to help users manage their personal finances effectively. It offers a clean, intuitive interface with role-based access control, allowing different user types to interact with the application based on their permissions. The app includes real-time data visualization, transaction tracking, and insightful analytics to support informed financial decision-making.

## Features

### Core Functionality
- **Dashboard Overview**: Comprehensive financial summary with balance, income, and expense metrics
- **Transaction Management**: View, filter, search, and sort transactions with a modern table interface
- **Financial Insights**: Advanced analytics including spending breakdowns, monthly comparisons, and category analysis
- **Interactive Charts**: Visual data representation using line charts, pie charts, and bar charts powered by Recharts

### User Experience
- **Responsive Design**: Fully responsive layout that works seamlessly across desktop, tablet, and mobile devices
- **Modern UI Components**: Consistent design system with rounded corners, shadows, and smooth transitions
- **Role-Based Access**: Different user roles (Admin/Viewer) with appropriate permissions and UI elements
- **Add Transactions**: Modal form for admins to add new transactions with validation
- **Advanced Filtering**: Search by category, filter by type, and sort by amount
- **Empty States**: User-friendly messages when no data is available

### Technical Features
- **State Management**: Centralized state using React Context for transactions and user data
- **Type Safety**: Full TypeScript implementation for robust development
- **Performance Optimized**: Memoized calculations and efficient re-renders
- **Modular Architecture**: Clean separation of concerns with reusable components

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Context
- **Build Tool**: Next.js built-in bundler
- **Package Manager**: npm

## Setup Instructions

### Prerequisites
- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd finance-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

### Project Structure

```
finance-dashboard/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard page
│   ├── transactions/      # Transactions management
│   ├── insights/          # Financial insights and analytics
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── layout/           # Layout components (Sidebar, Navbar)
│   └── ui/               # Basic UI components (Card, Button)
├── context/              # React Context for state management
├── lib/                  # Utilities and data
│   ├── mockData.ts       # Sample transaction data
│   └── types.ts          # TypeScript type definitions
└── README.md             # Project documentation
```

## Role-Based UI Explanation

The application implements a role-based user interface system to provide appropriate access levels and functionality based on user permissions:

### User Roles

1. **Admin Role**
   - Full access to all features
   - Can add new transactions via the modal form
   - Access to all dashboard insights and analytics
   - Complete transaction management capabilities

2. **Viewer Role**
   - Read-only access to financial data
   - Can view all transactions, charts, and insights
   - Cannot modify or add new transactions
   - Limited to data consumption and analysis

### Implementation Details

- **Role Selection**: Users can switch between Admin and Viewer roles using a dropdown in the navigation bar
- **Conditional Rendering**: UI elements are conditionally displayed based on the current role
- **Permission Checks**: Actions like adding transactions are restricted to admin users only
- **Consistent Experience**: Both roles maintain the same visual design and navigation structure

### Security Considerations

While this implementation uses client-side role checking for UI purposes, production applications should implement server-side authentication and authorization to ensure proper security controls.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Charts powered by [Recharts](https://recharts.org/)
- Icons from [Lucide React](https://lucide.dev/)

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` - Next.js App Router pages
- `components/` - Reusable UI components
- `lib/` - Context and mock data

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```