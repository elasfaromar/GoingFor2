import express, { Request, Response } from "express";
import { success } from "../utils";
import { ScheduledEventService } from "../../services";

const router = express.Router();

const index = async (request: Request, response: Response) => {
  console.log(request)
  // console.log(request.query)
  // console.log(request.query.program)
  const result = await ScheduledEventService.getFirst(10, String(request.query.program));

  return success(response, {
    data: result.val,
    statusCode: 200,
  });
};

router.get("/", index);

export default router;
