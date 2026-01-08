import dotenv from "dotenv";
dotenv.config();

export default Object.freeze({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  secretKey: process.env.SECRET_KEY,
  email: {
    user: process.env.MAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    brevoApiKey: process.env.BREVO_API_KEY,
  },
  google: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  redirectURL: process.env.REDIRECT_URL,
});
