"use server";

import { ID, Models, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  EMAIL,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";
import {
  APPOINTMENT_CANCELLATION_TEMPLATE,
  APPOINTMENT_SCHEDULED_TEMPLATE,
} from "../email/emailTemplate";
import { transporter } from "../email/nodemailerconfig";

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    }

    const subjectS = `${
      type === "schedule" ? `Appointment Done` : `Appointment Cancelled`
    }`;
    const sending = await getDocumentById(
      DATABASE_ID,
      APPOINTMENT_COLLECTION_ID,
      appointmentId
    );

    const emailSender = type === "schedule" ? sendSuccessEmail : sendFailedEmail;
    await emailSender(sending, subjectS, appointment);

    // await sendSuccessEmail(sending, subjectS, smsMessage);
    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error(error);
  }
};

export const getDocumentById = async (
  databaseId: string,
  collectionId: string,
  documentId: string
): Promise<Models.Document> => {
  try {
    const response = await databases.getDocument(
      databaseId,
      collectionId,
      documentId
    );
    const email = response.patient.email;
    return email;
  } catch (error) {
    console.error("Error retrieving document:", error);
    throw error;
  }
};

export const sendSuccessEmail = async (
  to: string,
  subject: string,
  appointment: { schedule: Date; primaryPhysician: string }
): Promise<void> => {
  try {
    const mailOptions: MailOptions = {
      from: EMAIL, // Sender's email address
      to, // Recipient's email address
      subject, // Subject line
      html: APPOINTMENT_SCHEDULED_TEMPLATE(appointment), // Email body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
export const sendFailedEmail = async (
  to: string,
  subject: string,
  appointment: { cancellationReason: string }
): Promise<void> => {
  try {
    const mailOptions: MailOptions = {
      from: EMAIL, // Sender's email address
      to, // Recipient's email address
      subject, // Subject line
      html: APPOINTMENT_CANCELLATION_TEMPLATE(appointment), // Email body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};