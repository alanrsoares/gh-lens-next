import { NextApiHandler } from "next";

import { exchangeCodeForAccessToken } from "lib/github-oauth";

const login: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(404).end();
    return;
  }

  try {
    const { code } = req.body;

    if (!process.env.GH_CLIENT_SECRET) {
      throw new Error("Missing environment variable: GH_CLIENT_SECRET");
    }
    const response = await exchangeCodeForAccessToken(
      code,
      process.env.GH_CLIENT_SECRET
    );

    const { access_token } = response.data;

    if (access_token) {
      res.status(200).json({
        token: access_token,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default login;
