# 🌐 **CodeSensor**

### *AI-Powered Code Quality Analysis Platform*

> *"Your code speaks. CodeSensor listens, analyzes, and guides."*

CodeSensor is a comprehensive web application that connects to your GitHub account, performs deep analysis of your repositories using advanced AI, and provides actionable insights to improve code quality, security, and structure. Built with a modern, intuitive interface that makes code improvement accessible to everyone.

---

## ✨ **Core Features**

### 🔍 **Intelligent Analysis**
- 🔐 **GitHub OAuth** integration for seamless authentication
- 📁 Automatic repository synchronization and management
- 🤖 **AI-powered analysis** using Groq (Llama 3.3 70B)
- 🧮 Multi-dimensional scoring: Quality, Security, Structure, Overall (0-100)
- 🔎 Detailed vulnerability detection with severity levels
- 💡 **Actionable recommendations** with implementation steps and code examples

### 📊 **Analytics & Insights**
- 📈 **Trend charts** showing code quality evolution over time
- 🏆 **Top repositories** ranking with performance indicators
- 🗓️ **Activity heatmap** tracking your analysis patterns
- 📅 **Monthly metrics** with improvement tracking
- ⚖️ **Repository comparison** (up to 4 repos side-by-side)
- 📉 Visual charts (bar, line, radar, area) for better insights

### 🔔 **Automation & Integration**
- 🔗 **GitHub Webhooks** for automatic analysis on push/PR events
- ⚙️ Per-repository webhook configuration
- 🤖 Automatic analysis triggers on code changes
- 🏷️ **Dynamic badges** for README files

### 📄 **Reports & Export**
- 📑 **PDF export** with professional formatting
- 📝 **Markdown export** for GitHub-ready documentation
- 💾 **CSV export** for repository comparisons
- 📊 Complete analysis history with timeline view
- 🔄 Before/after comparisons showing improvements

### 🎨 **User Experience**
- 🌫️ Beautiful, minimalist UI with dark theme
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Fast performance with optimized rendering
- 🔍 Advanced search and filtering capabilities
- 📌 Direct navigation from history to specific analyses

---

## 🧠 **How It Works**

1. **Connect** your GitHub account via OAuth
2. **Sync** your repositories automatically
3. **Select** a repository to analyze
4. **AI Analysis**:
   - Extracts up to 20 most relevant files
   - Analyzes code quality, security, and structure
   - Detects vulnerabilities and issues
   - Generates detailed recommendations
5. **Receive** a comprehensive report with:
   - Numerical scores (0-100) for each dimension
   - List of specific issues found
   - Security vulnerabilities with severity levels
   - Actionable recommendations with examples
   - Links to external resources and documentation
6. **Track** improvements over time with comparison tools
7. **Export** and share your results

---

## 🎯 **Analysis Dimensions**

### 1. Quality Score (35% weight)
- Code smells and anti-patterns
- Naming conventions and readability
- Code complexity metrics
- Best practices adherence
- Documentation quality

### 2. Security Score (40% weight)
- Vulnerability detection (SQL injection, XSS, CSRF, etc.)
- Exposed secrets and credentials
- Insecure dependencies
- Input validation issues
- Authentication/authorization flaws

### 3. Structure Score (25% weight)
- Folder organization and architecture
- Modularity and separation of concerns
- Design patterns usage
- Layer separation (UI, business logic, data)
- File naming consistency

### Overall Score Calculation
```
Overall = (Quality × 0.35) + (Security × 0.40) + (Structure × 0.25)
```

---

## 🛠️ **Tech Stack**

**Frontend**
- **Next.js 16.1.1** (App Router, React 19, Turbopack)
- **TypeScript 5** for type safety
- **TailwindCSS v4** with CSS custom properties
- **Shadcn/UI** component library
- **Framer Motion 12** for animations
- **Recharts** for data visualization

**Backend & API**
- **Next.js API Routes** with server-side logic
- **GitHub REST API** for repository data
- **Groq API** with Llama 3.3 70B for AI analysis
- **NextAuth.js** for authentication
- **Webhooks** for GitHub event handling

**Database**
- **Supabase** (PostgreSQL with RLS)
- Tables: repositories, repository_analyses, webhook_logs
- Real-time subscriptions support

**Export & Generation**
- **jsPDF** for PDF generation
- **html2canvas** for canvas rendering
- **markdown-it** for Markdown processing

**Utilities**
- **date-fns** for date manipulation
- **Lucide React** for icons

---

## 🎨 **Features Showcase**

- ✅ **Dashboard Analytics**: Real-time trends and insights
- ✅ **Repository Comparison**: Side-by-side analysis up to 4 repos
- ✅ **Webhook Automation**: Auto-analysis on Git events
- ✅ **Report Export**: PDF, Markdown, and CSV formats
- ✅ **Dynamic Badges**: Show quality scores in README
- ✅ **Detailed Recommendations**: With code examples and resources
- ✅ **Activity Tracking**: Heatmap and history timeline
- ✅ **Score Evolution**: Track improvements over time

---

## 🤝 **Contributing**

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 **Contact & Support**

For questions or support, please open an issue on GitHub.

---

<p align="center">
  <strong>Made with ❤️ by CodeSensor Team</strong><br>
  <em>Elevating code quality, one analysis at a time.</em>
</p>
