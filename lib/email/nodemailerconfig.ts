import nodemailer, { Transporter } from "nodemailer";
import { EMAIL, PASSWORD } from "../appwrite.config";

export const transporter:Transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    port: 587,
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });