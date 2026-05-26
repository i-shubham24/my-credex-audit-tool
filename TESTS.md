# Testing Strategy & QA

### 1. Unit Testing (Logic)
- **Math Engine Tests:** Validated the `calculateSavings` function against 10+ edge cases (e.g., $0 spend, 500+ users, mix of API and seat licenses).
- **Formatters:** Verified currency and date formatting across different locales.

### 2. Integration Testing (API)
- **Supabase Connectivity:** Verified that failed database inserts trigger the correct UI error toasts and don't proceed to the "Success" state.
- **AI Proxy:** Tested the Vercel Serverless function to ensure it handles Anthropic API timeouts without crashing the frontend.

### 3. Manual UI/UX Testing
- **Responsive Design:** Tested on Chrome, Safari (iOS), and Android to ensure the PDF export remains pixel-perfect on mobile.
- **Passcode Security:** Verified the `/admin` route correctly rejects incorrect PINs and prevents unauthorized data fetching.