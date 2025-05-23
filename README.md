# BranchOut 🌳

**Track Your Impact, Tree by Tree**

BranchOut is a digital platform built to help people track and celebrate their tree planting efforts. Developed as a capstone project by a team of software engineering students, this app empowers individuals and communities to document their environmental contributions — one tree at a time.

## 🌟 Features

### Core Functionality
- **📍 Interactive Tree Mapping** - Pinpoint and track each planted tree on our user-friendly map
- **🌱 Tree Logging** - Record tree species, planting dates, locations, and photos
- **👤 User Profiles** - Personal dashboards showing your planting history and achievements
- **🏆 Badge System** - Earn badges for milestones like "Tree Pioneer" and "Nature Lover"
- **📊 Impact Tracking** - Monitor your environmental contribution over time

### User Management
- **🔐 Authentication** - Secure login with email/password or Google OAuth
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **👥 Community Features** - Share your impact and connect with other tree planters

### Admin Features
- **📋 Admin Dashboard** - Manage user submissions and donations
- **💰 Donation System** - Process and track donations to support the platform
- **📞 Contact Management** - Handle user inquiries and feedback

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.3.2, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Hosting**: Vercel-ready configuration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Firebase project with Firestore and Authentication enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/branchout.git
   cd branchout
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore Database
   - Enable Authentication (Email/Password and Google providers)
   - Copy your Firebase config to the environment variables

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
branchout/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── admin/             # Admin dashboard
│   │   ├── donate/            # Donation system
│   │   ├── login/             # Authentication
│   │   ├── plant-tree/        # Tree planting form
│   │   ├── profile/           # User profiles
│   │   └── signup/            # User registration
│   ├── components/            # Reusable React components
│   │   ├── ui/               # UI components (buttons, inputs, etc.)
│   │   ├── plant-form.tsx    # Tree planting form
│   │   ├── profile.tsx       # User profile component
│   │   └── navbar.tsx        # Navigation component
│   ├── context/              # React context providers
│   ├── firebase/             # Firebase configuration
│   └── lib/                  # Utility functions
├── public/                   # Static assets
├── dataconnect/             # Firebase Data Connect (optional)
└── package.json
```

## 🔥 Firebase Setup

### Firestore Collections

The app uses the following Firestore collections:

- `users` - User profiles and preferences
- `trees` - Individual tree records
- `contact_submissions` - Contact form submissions
- `donations` - Donation records

### Security Rules

Update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Trees are publicly readable, authenticated users can create
    match /trees/{treeId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && resource.data.plantedBy == request.auth.uid;
    }
    
    // Admin-only collections
    match /contact_submissions/{submissionId} {
      allow read, write: if request.auth != null; // Add admin check here
    }
    
    match /donations/{donationId} {
      allow read, write: if request.auth != null; // Add admin check here
    }
  }
}
```

## 🌱 Usage

### For Tree Planters

1. **Sign Up/Login** - Create an account or sign in
2. **Plant a Tree** - Use the "Plant a Tree" button to log new trees
3. **Select Location** - Choose from predefined locations on the interactive map
4. **Add Details** - Record tree type, planting date, and upload a photo
5. **Track Progress** - View your trees and earned badges on your profile

### For Administrators

1. **Access Admin Dashboard** - Navigate to `/admin` (requires authentication)
2. **View Submissions** - Check contact form submissions
3. **Monitor Donations** - Track donation records and statistics
4. **Manage Users** - (Feature can be extended as needed)

## 🤝 Contributing

We welcome contributions! This project was created as a capstone project, and we're excited to see how the community can help it grow.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add TypeScript types for new components
- Include error handling for database operations
- Test authentication flows before submitting
- Update documentation for new features

## 📜 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Firebase Hosting
- Any Node.js hosting provider

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | ✅ |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | ✅ |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | ✅ |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | ✅ |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | ✅ |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | ✅ |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Firebase measurement ID | ❌ |

## 🐛 Troubleshooting

### Common Issues

**Firebase not initializing**
- Check that all environment variables are properly set
- Ensure Firebase project has Firestore and Auth enabled

**Build errors**
- Run `npm run lint` to check for code issues
- Ensure all dependencies are installed with `npm install`

**Authentication not working**
- Verify Firebase Auth providers are enabled in console
- Check that redirect URLs are properly configured

## 📞 Support

For questions, issues, or suggestions:

- **Email**: branchout@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/yourusername/branchout/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Team**: Built by passionate software engineering students
- **Mission**: Combining sustainability with technology for environmental impact
- **Community**: Thanks to all tree planters making the world greener

---

**"It's the little things citizens do. That's what will make the difference. My little thing is planting trees."** — Wangari Maathai

---

Made with 💚 for a greener future