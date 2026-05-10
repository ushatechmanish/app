# Math Answer Platform

A modern React web application for students to submit mathematics answers with LaTeX formatting and receive AI-powered feedback.

## Features

✨ **Key Features:**
- 🔐 Google OAuth authentication
- 📝 LaTeX input with real-time rendering
- 🖼️ Image upload for handwritten solutions
- 🤖 Mock AI feedback system (ready for Spring AI backend integration)
- 📊 Score and improvement suggestions
- 🎨 Responsive, modern UI

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Google OAuth Client ID (get from [Google Cloud Console](https://console.cloud.google.com))

### Installation

1. **Clone the repository**
   ```bash
   cd /home/manish/prompt_engineering/app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your Google OAuth Client ID:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Auth/              # Google OAuth login component
│   ├── Editor/            # LaTeX input editor
│   ├── LatexPreview/      # Real-time LaTeX rendering
│   ├── ImageUpload/       # Image upload with drag-and-drop
│   └── Feedback/          # AI feedback display component
├── services/
│   ├── authService.ts     # Google OAuth handling
│   └── mockAIService.ts   # Mock AI feedback (ready for backend integration)
├── types/
│   └── index.ts           # TypeScript interfaces
├── App.tsx                # Main application component
└── index.tsx              # React entry point
```

## Usage

### 1. Authentication
- Click "Sign in with Google"
- Use your Google account to authenticate
- Your user profile will be displayed in the header

### 2. Write LaTeX Answer
- Enter mathematical expressions in the editor
- Format: `$$your_latex_content$$`
- Quick templates available for common expressions

### 3. Real-time Preview
- LaTeX preview updates automatically as you type
- Right panel shows rendered mathematics

### 4. Upload Image
- Drag and drop or click to upload an image
- Supports JPG, PNG, GIF, WebP (max 5MB)
- Shows preview of uploaded image

### 5. Get AI Feedback
- Click "Get Feedback" button
- Mock AI analyzes both LaTeX and image
- Receives score (0-100), feedback, and improvement suggestions

## Environment Setup

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add `http://localhost:3000` to authorized JavaScript origins
6. Copy the Client ID and add to `.env.local`

## Available Scripts

```bash
npm start       # Run development server
npm build       # Create production build
npm test        # Run tests
npm eject       # Eject from Create React App (irreversible)
```

## Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **LaTeX Rendering**: KaTeX
- **Authentication**: Google OAuth
- **Styling**: CSS with modern layout patterns
- **Build Tool**: Create React App

## Mock AI Service

The mock AI service provides realistic feedback patterns based on LaTeX content:

- **Quadratic equations**: Score ~85 with specific suggestions
- **Integrals**: Score ~80 with integration tips
- **Derivatives**: Score ~75 with chain rule reminders
- **Matrices**: Score ~82 with verification tips
- **Default**: Score ~70 for other content

### Ready for Backend Integration

Replace `mockAIService.ts` with actual API calls to your Spring AI backend:

```typescript
export const mockAIService = {
  async analyzeImage(imageUrl: string, latexContent: string): Promise<FeedbackResponse> {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ imageUrl, latexContent })
    });
    return response.json();
  }
};
```

## Component Overview

### Auth Component
- Displays current user info (name, email, avatar)
- Logout functionality
- Integration with Google OAuth

### Editor Component
- Textarea for LaTeX input
- Character counter
- Quick template buttons for common expressions
- LaTeX formatting guide

### LatexPreview Component
- Real-time rendering using KaTeX
- Handles $$ wrapped expressions as math block 
- Handles $ wrapped expressions as math inline 
- Error display for invalid LaTeX
- Auto-scrolling

### ImageUpload Component
- Drag-and-drop interface
- File type and size validation
- Image preview
- Remove option

### Feedback Component
- Displays score with color-coded badge
- Shows AI feedback text
- Lists improvement suggestions
- Loading state with spinner
- Error handling

## API Integration

To connect with a Spring AI backend:

1. Update `mockAIService.ts` endpoints
2. Add your backend URL to environment variables
3. Implement proper error handling
4. Add authentication headers

Example:
```typescript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const analyzeImage = async (imageUrl: string, latexContent: string) => {
  const response = await fetch(`${API_URL}/api/analyze`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ imageUrl, latexContent })
  });
  return response.json();
};
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Code splitting with React.lazy()
- Image optimization
- CSS-in-JS minification
- Bundle size monitoring

## Known Limitations

- Mock AI service returns simulated feedback
- Image upload stored as data URL (client-side)
- No persistent storage (data lost on refresh)
- LaTeX support limited to KaTeX capabilities

## Future Enhancements

- [ ] Backend Spring AI integration
- [ ] User authentication persistence
- [ ] Answer history and tracking
- [ ] Export to PDF
- [ ] Collaborative features
- [ ] Advanced LaTeX support (TikZ, PGFPlots)
- [ ] Mobile app version

## Troubleshooting

### "Google login not working"
- Verify Client ID in `.env.local`
- Check authorized origins in Google Cloud Console
- Clear browser cookies and retry

### "LaTeX not rendering"
- Ensure syntax is wrapped in `$$...$$`
- Check KaTeX documentation for supported commands
- Verify no special characters are breaking the parser

### "Image upload not working"
- Check file size (max 5MB)
- Verify file format (JPG, PNG, GIF, WebP)
- Check browser console for errors

## License

MIT License - feel free to use this project for educational purposes

## Support

For issues or questions, please open an issue in the repository or contact the development team.

---

Built with ❤️ for mathematics students
