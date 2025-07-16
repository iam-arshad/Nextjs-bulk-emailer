# NextJS Bulk Emailer

A bulk email sender app built with [Next.js](https://nextjs.org) that helps you manage recruiter outreach efficiently. Easily upload your resume, add recruiter contacts, and send personalized emails in bulk using your Gmail account via Google OAuth.

## Features

- Google OAuth login for secure authentication
- Add and manage recruiter contacts (email, name, organization)
- Upload your resume (PDF, DOC, DOCX)
- Store and edit your sender name
- Send personalized emails with your resume attached to all recruiters in one click
- Responsive dashboard UI

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/nextjs-bulk-emailer.git
   cd nextjs-bulk-emailer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add your Google OAuth credentials:
   ```
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   REDIRECT_URI=http://localhost:3000/auth/callback
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Usage

- **Login:** Click "Login with Google" to authenticate.
- **Dashboard:** 
  - Enter your name and upload your resume.
  - Add recruiter contacts.
  - View all recruiters in a table.
  - Click "Send Emails" to send your resume to all recruiters.

## Project Structure

- `src/app/` - Next.js app directory (pages, API routes, layout)
- `src/components/` - React components (forms, tables, uploader, etc.)
- `src/actions/` - Server actions for recruiters, resume, and email sending
- `src/lib/` - Utility libraries (Google OAuth, resume store)

## Deployment

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 🧑‍💻 Author

Made with ❤️ by Arshad

## 📄 License

MIT


**Note:** This project stores recruiter and resume data in memory (not persistent). For production, consider integrating a database and secure file storage.