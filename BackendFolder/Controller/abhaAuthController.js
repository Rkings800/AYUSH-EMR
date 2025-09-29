import axios from 'axios';
import jwt from 'jsonwebtoken';

// This will Redirect the user to the abha NDHM Auth Gateway.

export const abhaLogin = (req, res) => {
  const redirectUri = encodedURIComponent(process.env.ABHA_REDIRECT_URI);
  const clientId = process.env.ABHA_CLIENT_ID;

  const url = ``;

  res.redirect(url);
};

// ABHA CallBack (Exchange code for tokens)

export const abhaCallback = async (req, res) => {
  const { code } = req.query;

  try {
    const tokenRes = await axios.post("", {
      code,
      client_id: process.env.ABHA_CLIENT_ID,
      client_secret: process.env.ABHA_CLIENT_SECRET,
      redirect_uri: process.env.ABHA_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token, id_token } = tokenRes.data;

    // Decode ID token(JWT with user info)

    const abhaUser = jwt.decode(id_token);

    //Confirming whether the user exists

    let user = await User.findOne({ abhaId: abhaUser.sub });
    if (!user) {
      user = await User.create({
        abhaId: userInfo.sub,
        name: userInfo.name,
        email: userInfo.email || null,
        abhaToken: access_token,
        loginType: "abha",
      });
    }

    // Issuing my own jwt for frontEnd login

    const appToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Redirect back to the frontend with token

    return res.redirect(
      `${process.env.FRONTEND_URL}/dashboard?token=${appToken}`
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "ABHA AUTH FAILED",
    });
  }
};

// Protect Page

export const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "You are logged in ",
      });
    }

    // Verify token (own app JWT)
    try {
      let decoded;
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        message: "Invalid or expired Token",
      });
    }

    //Attaching the user to the request

    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).json({
        message: "User no longer exists",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }
};


export const logout = (req, res) => {
    // In jwt based auth -> logout is frontend-driven (delete token)
    res.status(200).json({
        message: 'Logged in successfully'
    })
};