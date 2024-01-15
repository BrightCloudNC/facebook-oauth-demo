import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();
const APP_ID = "YOUR_APP_ID";
const APP_SECRET = "YOUR_APP_SECRET";
const REDIRECT_URI = "http://localhost:5555/api/auth/facebook/callback";

router.get("/auth/facebook", (req: Request, res: Response) => {
  const url = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email`;
  res.redirect(url);
});

router.get("/auth/facebook/callback", async (req: Request, res: Response) => {
  const { code } = req.query;

  try {
    // https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow/
    // Exchange authorization code for access token
    const { data } = await axios.get(
      `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`
    );

    const { access_token } = data;

    // Use access_token to fetch user profile
    const { data: profile } = await axios.get(
      `https://graph.facebook.com/v18.0/me?fields=name,email,picture&access_token=${access_token}`
    );

    // Code to handle user authentication and retrieval using the profile data
    console.log(profile);

    res.redirect("/");
  } catch (error) {
    console.error("Error:", error);
    res.redirect("/login");
  }
});

export default router;
