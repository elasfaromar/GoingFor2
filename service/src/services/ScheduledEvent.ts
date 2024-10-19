import { prisma } from "../db";  // Import PrismaClient instance
import { Result, Ok } from "ts-results";

// Function to get a list of scheduled events
export const getFirst = async (
  count: number,
<<<<<<< HEAD
  program: string
): Promise<Result<ScheduledEvent[], Error>> => {
=======
): Promise<Result<any[], Error>> => {
>>>>>>> db05f198350b5e1b62208078c1637727d11d4053
  const events = await prisma.scheduledEvent.findMany({
    take: count,
    where: {
      term: {
        contains: "Winter 2025 (January-April)",
      },
      course: {
        subjectCode: {
          contains: program,
        },
      },
    },
    include: {
      course: true,
    },
  });

  return Ok(events);
};
