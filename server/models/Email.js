import sgMail from "@sendgrid/mail";
import { config } from "../config/index.js";
import { getEmailVerification } from "../utils/emailTemplate.js";

sgMail.setApiKey(config.SENDGRID_API_KEY);

const Email = {
  sendVerificationEmail: async function sendVerificationEmail(
    emailAddress,
    token
  ) {
    try {
      const email = {
        to: emailAddress,
        from: "pierrealexis.n.dev@gmail.com",
        subject: "Email verification",
        text: `Please verify your email by clicking on the following link: ${config.WEBSITE_DOMAIN}?token=${token}`,
        html: getEmailVerification(token),
      };

      await sgMail.send(email);
    } catch (e) {
      console.log(e);
    }
  },
};

export default Email;
