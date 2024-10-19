import { prisma } from "../db";  // Import PrismaClient instance
import { Result, Ok, Err } from "ts-results";
import { AccountService } from ".";
const nodemailer = require("nodemailer");
const cron = require('node-cron');

function logMessage() {
 console.log('Cron job executed at:', new Date().toLocaleString(),
 '\nStudents (',studentsWithTimetable.size,'): ', studentsWithTimetable);
}
// Schedule the cron job to run every minute
cron.schedule('* * * * *', () => {
 logMessage();
});

const studentsWithTimetable = new Set<string>();

// Create a new timetable for a given email
export const createTimetable = async (
  email: string,
  name: string,
  scheduledEventIds: string[],
): Promise<Result<any, Error>> => {
  const account = await AccountService.findByEmail(email);

  if (account === null) {
    return Err(new Error("Account not found"));
  }

  const timetable = await prisma.timetable.create({
    data: {
      name,
      account: {
        connect: {
          id: account.id,
        },
      },
      timetableEvents: {
        create: scheduledEventIds.map((id) => ({
          scheduledEvent: {
            connect: {
              id: parseInt(id),
            },
          },
        })),
      },
    },
  });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "",
      pass: "",
    },
  });

  const mailOptions = {
    from: "",
    to: email,
    subject: "Time Table Confirmation",
    text: `Below is your timetable information:\n\n
    Name: ${timetable.name}\n
    Table ID: ${timetable.id}\n
    Student ID: ${timetable.accountId}\n
    Created: ${timetable.createdAt}\n
    Updated: ${timetable.updatedAt}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });

  studentsWithTimetable.add(email);

  return Ok(timetable);
};

// Get a timetable by ID
export const getTimetableById = async (
  id: number,
): Promise<Result<any, Error>> => {
  const timetable = await prisma.timetable.findUnique({
    where: {
      id,
    },
    include: {
      timetableEvents: {
        include: {
          scheduledEvent: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });

  if (timetable === null) {
    return Err(new Error("Timetable not found"));
  }

  return Ok(timetable);
};

// Get all timetables associated with a specific account
export const getAccountTimetables = async (
  email: string,
): Promise<Result<any[], Error>> => {
  const account = await AccountService.findByEmail(email);

  if (account === null) {
    return Err(new Error("Account not found"));
  }

  const timetables = await prisma.timetable.findMany({
    where: {
      accountId: account.id,
    },
    include: {
      timetableEvents: {
        include: {
          scheduledEvent: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });

  return Ok(timetables);
};
