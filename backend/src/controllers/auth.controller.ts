import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { ApiResponse } from "../types/response.types";
import { sendEmail } from "../utils/email.util";
import { validationResult } from "express-validator";
import {
  generateAccessToken,
  generatePasswordResetToken,
  generateRefreshToken,
  generateVerificationToken,
  verifyToken,
} from "../utils/token.util";

export const register = async (
  req: Request,
  res: Response<ApiResponse<string>>
) => {
  const { email, password, username, fullName, phone, address, role } =
    req.body;
  // Validate the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array(),
      data: null,
    });
  }
  try {
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "Email already in use.",
        data: null,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user: IUser = new User({
      email,
      passwordHash: hashedPassword,
      username: username || undefined,
      fullName: fullName || undefined,
      phone: phone || undefined,
      address: address || undefined,
      role: role || "job_seeker",
      isVerified: false,
    });

    await user.save();

    const verificationToken = generateVerificationToken(user._id as string);

    const verificationLink = `${process.env.FRONTEND_URL}/auth/verify/${verificationToken}`;

    await sendEmail(
      email,
      "Verify Your Email",
      `Click the link to verify your email: ${verificationLink}`
    );

    res.status(201).json({
      error: null,
      data: "User registered. Please check your email for verification.",
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message, data: null });
  }
};

export const resendVerificationEmail = async (
  req: Request,
  res: Response<ApiResponse<string>>
) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found", data: null });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ error: "Email is already verified.", data: null });
    }

    const verificationToken = generateVerificationToken(user._id as string);
    const verificationLink = `${process.env.FRONTEND_URL}/auth/verify/${verificationToken}`;

    await sendEmail(
      email,
      "Verify Your Email",
      `Click the link to verify your email: ${verificationLink}`
    );

    res.status(200).json({ error: null, data: "Verification email resent." });
  } catch (error: any) {
    res.status(500).json({ error: error.message, data: null });
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response<ApiResponse<string>>
) => {
  const { token } = req.params;
  try {
    const decoded = verifyToken(token, process.env.ACCESS_TOKEN_SECRET!) as {
      userId: string;
    };
    const user = await User.findById(decoded.userId);

    if (!user)
      return res.status(404).json({ error: "User not found", data: null });

    user.isVerified = true;
    await user.save();
    res.status(200).json({ error: null, data: "Email verified successfully." });
  } catch {
    res.status(400).json({ error: "Invalid or expired token", data: null });
  }
};

export const login = async (
  req: Request,
  res: Response<ApiResponse<{ accessToken: string; refreshToken: string }>>
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Invalid credentials", data: null });
    }

    if (!user.isVerified) {
      return res.status(400).json({ error: "Email not verified", data: null });
    }

    const accessToken = generateAccessToken(user._id as string, user.role); // Use the token generator function
    const refreshToken = generateRefreshToken(user._id as string);

    res.status(200).json({ error: null, data: { accessToken, refreshToken } });
  } catch (error: any) {
    res.status(500).json({ error: error.message, data: null });
  }
};

export const refreshToken = async (
  req: Request,
  res: Response<ApiResponse<{ accessToken: string }>>
) => {
  const { token } = req.body;
  try {
    const decoded = verifyToken(token, process.env.REFRESH_TOKEN_SECRET!) as {
      userId: string;
    };
    const accessToken = jwt.sign(
      { userId: decoded.userId, role: "user" },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" }
    );
    res.status(200).json({ error: null, data: { accessToken } });
  } catch {
    res.status(400).json({ error: "Invalid or expired token", data: null });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response<ApiResponse<string>>
) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ error: "User not found", data: null });

    const resetToken = generatePasswordResetToken(user._id as string);
    const resetLink = `${process.env.BASE_URL}/auth/reset-password/${resetToken}`;

    await sendEmail(
      email,
      "Reset Your Password",
      `Click the link to reset your password: ${resetLink}`
    );
    res.status(200).json({ error: null, data: "Password reset email sent." });
  } catch (error: any) {
    res.status(500).json({ error: error.message, data: null });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response<ApiResponse<string>>
) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = verifyToken(token, process.env.ACCESS_TOKEN_SECRET!) as {
      userId: string;
    };
    const user = await User.findById(decoded.userId);

    if (!user)
      return res.status(404).json({ error: "User not found", data: null });

    user.passwordHash = await bcrypt.hash(newPassword, 12);
    await user.save();
    res.status(200).json({ error: null, data: "Password reset successfully." });
  } catch {
    res.status(400).json({ error: "Invalid or expired token", data: null });
  }
};
export const googleCallback = (
  req: Request,
  res: Response<ApiResponse<{ accessToken: string }>>
) => {
  const { accessToken } = req.user as any;
  res.status(200).json({ error: null, data: { accessToken } });
};
