# 🏥 Symptom Journal

A modern, intuitive web application for tracking daily symptoms, mood, and health patterns. Built with React, TypeScript, and a beautiful UI powered by shadcn/ui components.

![Symptom Journal Preview](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.1-purple)

## ✨ Features

### 📊 **Comprehensive Symptom Tracking**
- Track 6 key symptoms: Fever, Headache, Fatigue, Nausea, Cough, and Sore Throat
- 4-level intensity scale (None, Mild, Moderate, Severe) with intuitive emoji indicators
- Daily note-taking for additional context

### 😊 **Mood Monitoring**
- Simple 3-point mood scale: Happy, Neutral, Sad
- Visual emoji representations for easy selection
- Integrated with daily symptom entries

### 📈 **Data Visualization & Trends**
- Interactive 7-day trend charts using Recharts
- Color-coded symptom progression over time
- Easy identification of patterns and improvements

### 🔥 **Streak Counter**
- Track consecutive days of symptom logging
- Motivational badges and achievements
- Encourages consistent health monitoring

### 📱 **Mobile-First Design**
- Responsive design optimized for mobile devices
- Touch-friendly swipe navigation between dates
- Progressive Web App capabilities

### 💾 **Data Management**
- Local storage persistence (no cloud dependency)
- Export functionality for data backup
- Import/export in JSON format for portability

### 🎨 **Modern UI/UX**
- Beautiful gradient backgrounds and glassmorphism effects
- Dark/light theme support (via next-themes)
- Smooth animations and transitions
- Accessible design following modern standards

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aryasentry/Symptom-Log11.git
   cd Symptom-Log11
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.1** - Fast build tool and development server

### **UI & Styling**
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Consistent icon library

### **Data & State Management**
- **React Hook Form** - Performant form handling
- **TanStack Query** - Server state management
- **Zod** - Schema validation
- **Local Storage** - Client-side data persistence

### **Charts & Visualization**
- **Recharts 2.12.7** - Responsive chart library built on D3

### **Date Management**
- **date-fns 3.6.0** - Modern date utility library

### **Development Tools**
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── ExportData.tsx  # Data export functionality
│   ├── MoodTracker.tsx # Mood selection component
│   ├── StreakCounter.tsx # Streak tracking display
│   ├── SymptomLogger.tsx # Main symptom input form
│   └── TrendChart.tsx  # Data visualization charts
├── pages/              # Application pages
│   ├── Index.tsx       # Main dashboard page
│   └── NotFound.tsx    # 404 error page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── main.tsx           # Application entry point
```

## 🎯 Usage Guide

### **Daily Logging**
1. Navigate to the current date (automatically selected)
2. Rate each symptom on the 0-3 intensity scale
3. Select your current mood
4. Add any additional notes
5. Data saves automatically

### **Viewing Trends**
1. Switch to the "Trends" tab
2. View your 7-day symptom progression
3. Identify patterns and improvements
4. Use data to discuss with healthcare providers

### **Data Export**
1. Go to the "Export" tab
2. Download your data as JSON
3. Import data from previous exports
4. Keep backups for long-term tracking

### **Navigation**
- **Desktop**: Use arrow buttons to navigate dates
- **Mobile**: Swipe left/right to change dates
- **Calendar**: Click date header for calendar picker

## 🎨 Customization

### **Adding New Symptoms**
Edit the `symptomTypes` array in `src/components/SymptomLogger.tsx`:

```typescript
const symptomTypes = [
  { key: 'newSymptom', emoji: '🆕', label: 'New Symptom', color: 'from-teal-400 to-teal-600' },
  // ... existing symptoms
];
```

### **Theming**
The application uses Tailwind CSS with CSS variables for theming. Modify `src/index.css` for custom color schemes.

## 📱 Progressive Web App

This application is PWA-ready and can be installed on mobile devices for a native app experience. Users can:
- Install from browser (Add to Home Screen)
- Work offline with cached data
- Receive a native app experience

## 🔒 Privacy & Security

- **Local Storage Only**: All data remains on your device
- **No Cloud Sync**: No external servers or data transmission
- **Privacy First**: Your health data stays private
- **Offline Capable**: Works without internet connection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### **Development Setup**
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Recharts](https://recharts.org/) for data visualization
- [Lucide](https://lucide.dev/) for the icon set

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/aryasentry/Symptom-Log11/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

---

**Made with ❤️ for better health tracking**