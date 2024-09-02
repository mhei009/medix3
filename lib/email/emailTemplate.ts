import { formatDateTime } from "../utils";

export const APPOINTMENT_SCHEDULED_TEMPLATE = (appointment: {
  schedule: Date;
  primaryPhysician: string;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Scheduled</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-top: 8px solid #3BB273;
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h1 {
      font-size: 26px;
      margin: 0;
      color: #3BB273;
    }
    .content {
      text-align: center;
      border-top: 1px solid #ddd;
    }
    .content p {
      margin: 15px 0;
      font-size: 18px;
    }
    .appointment-details {
      font-weight: bold;
      color: #3BB273;
      font-size: 20px;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      color: #888;
      font-size: 14px;
      border-top: 1px solid #ddd;
      padding-top: 15px;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Appointment Scheduled</h1>
    </div>
    <div class="content">
      <p>Your appointment has been successfully scheduled for:</p>
      <p class="appointment-details">${formatDateTime(appointment.schedule).dateTime}</p>
      <p>with Dr. ${appointment.primaryPhysician}</p>
    </div>
    <div class="footer">
      <p>Thank you for choosing Medix for your healthcare needs.</p>
      <p style="padding-top: 3px;">This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const APPOINTMENT_CANCELLATION_TEMPLATE = (appointment: {
  cancellationReason: string;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Cancellation</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-top: 8px solid #ef4444;
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h1 {
      font-size: 26px;
      margin: 0;
      color: #ef4444;
    }
    .content {
      text-align: center;
      border-top: 1px solid #ddd;
    }
    .content p {
      margin: 15px 0;
      font-size: 18px;
    }
    .cancellation-reason {
      font-weight: bold;
      color: #ef4444;
      font-size: 20px;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      color: #888;
      font-size: 14px;
      border-top: 1px solid #ddd;
      padding-top: 15px;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Appointment Cancelled</h1>
    </div>
    <div class="content">
      <p>We regret to inform you that your appointment has been cancelled for the following reason:</p>
      <p class="cancellation-reason">${appointment.cancellationReason}</p>
    </div>
    <div class="footer">
      <p>We apologize for any inconvenience this may have caused.</p>
      <p>If you have any questions, please contact our support team.</p>
      <p style="padding-top: 3px;">This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;
