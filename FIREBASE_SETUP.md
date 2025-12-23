# Firebase Setup Instructions

To enable authentication functionality, you need to set up a Firebase project and add your configuration.

## Steps:

1. **Create a Firebase Project:**

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Follow the setup wizard

2. **Enable Authentication:**

   - In your Firebase project, go to "Authentication"
   - Click "Get Started"
   - Enable "Email/Password" sign-in method

3. **Get Your Firebase Config:**

   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps"
   - Click the web icon (</>)
   - Register your app
   - Copy the firebaseConfig object

4. **Update firebase.js:**

   - Open `src/firebase.js`
   - Replace the placeholder values with your Firebase config:

   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
   ```

5. **Start the app:**
   ```bash
   npm start
   ```

## Features:

- **Without Login:** Users can search movies and see the first 6 results
- **With Login:** Users can:
  - See all search results
  - Use pagination to navigate through results (6 per page)
  - Their session persists across page refreshes

## Authentication:

- Click "Login / Register" in the navbar
- Create an account with email and password
- Login to access pagination features
