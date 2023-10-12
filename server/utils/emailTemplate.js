import { config } from "../config/index.js";

const domain =
  // config.WEBSITE_DOMAIN ||
  "http://localhost:3000/account-validation/";

export function getEmailVerification(token) {
  return `<main>
        <p>
          Please verify your email by clicking on the following link:
          <a href="${domain}?token=${token}"
            >Verify Email</a
          >
        </p>
        <p>If you did not sign up for Tales of Tatooine, please ignore this email.</p>
        <p>This is an automated message. Please do NOT reply to this email.</p>
      </main>`;
}

{
  /* <a href="${domain}/auth/verify-email?token=${token}" */
}
