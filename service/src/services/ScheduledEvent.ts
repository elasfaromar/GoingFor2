import { prisma } from "../db";  // Import PrismaClient instance
import { Result, Ok } from "ts-results";

// Function to get a list of scheduled events
export const getFirst = async (
  count: number,
  program: string, // Add program parameter
  crn: string
  
): Promise<Result<any[], Error>> => {
  const events = await prisma.scheduledEvent.findMany({
    take: count,
    where: {
      term: {
        contains: "Winter 2025 (January-April)",
      },
      // course: {
      //   subjectCode: {
      //     contains: program, // Use program parameter here
      //   },
        
      // },
      crn: { contains: crn }
    },
    include: {
      course: true,
    },
    
  });

  return Ok(events);
};
