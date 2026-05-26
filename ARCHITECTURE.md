# System Architecture & Design Choices

### 1. Client-Side PDF Rendering
Instead of using heavy server-side libraries (like Puppeteer), we use **html2canvas** and **jsPDF**. This ensures the PDF generation is instant, lowers server costs, and prevents timeout errors during peak traffic.

### 2. Secure Serverless Proxy
To keep our **Anthropic API Keys** and **Resend Keys** secure, the frontend never calls these services directly. We implemented **Vercel Serverless Functions** in the `/api` directory to act as a secure proxy, ensuring zero exposure of secrets in the client-side bundle.

### 3. Data Integrity & Lead Capture
- **Supabase RLS:** Utilizes Row Level Security to ensure the public can only "Insert" leads but never "Read" them.
- **Transactional Flow:** A lead is only marked as "Success" in the UI once the Supabase record is created, followed by an asynchronous call to Resend for the email dispatch.

### 4. Component Modularity
The UI is refactored into single-responsibility components (`HeroSavings`, `AuditBreakdown`, `LeadCaptureForm`), making the application highly maintainable and easy to unit test.