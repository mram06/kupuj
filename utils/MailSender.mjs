import config from "../config/default.mjs"; // Імпортуємо конфігураційні параметри
import fs from "fs/promises"; // Імпортуємо fs для роботи з файловою системою
// import PdfCreator from "./PdfCreator.mjs"; // Імпортуємо клас PdfCreator для створення PDF-файлів
import path from "path"; // Імпортуємо path для роботи з шляхами файлів
import { fileURLToPath } from "url"; // Для __dirname

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class MailSender {
  static async sendMail(mailData) {
    // Налаштовуємо відправку через Brevo REST API
    try {
      let htmlContent = mailData.html;

      // Якщо передан тип шаблону, читаємо з файлу
      if (mailData.template === "reset-password" && mailData.token) {
        const templatePath = path.join(
          __dirname,
          "../public/reset-password.html"
        );
        htmlContent = await fs.readFile(templatePath, "utf-8");
        // Замінюємо {{resetToken}} на реальний токен
        htmlContent = htmlContent.replace(
          /\{\{resetToken\}\}/g,
          mailData.token
        );
        // Замінюємо {{userName}} на ім'я користувача
        if (mailData.userName) {
          htmlContent = htmlContent.replace(
            /\{\{userName\}\}/g,
            mailData.userName
          );
        }
      } else if (mailData.template === "password-changed") {
        const templatePath = path.join(
          __dirname,
          "../public/password-changed.html"
        );
        htmlContent = await fs.readFile(templatePath, "utf-8");
        // Замінюємо {{userName}} на ім'я користувача
        if (mailData.userName) {
          htmlContent = htmlContent.replace(
            /\{\{userName\}\}/g,
            mailData.userName
          );
        }
      }

      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": config.email.brevoApiKey,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          sender: {
            email: config.email.user,
            name: "Kupuj Support",
          },
          subject: mailData.subject,
          htmlContent: htmlContent || `<p>${mailData.text}</p>`,
          messageVersions: [
            {
              to: [
                {
                  email: mailData.recipientEmail,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Brevo Error: ${JSON.stringify(error)}`);
      }

      const result = await response.json();
      console.log("[Mail] Success! Email sent:", result.messageId);
      return result;
    } catch (error) {
      console.error("[Mail] Error:", error.message);
      throw error;
    }
  }
}
export default MailSender; // Експортуємо клас MailSender як модуль ES6
