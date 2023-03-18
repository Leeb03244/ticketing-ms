import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  BadRequestError,
  currentUser,
  requireAuth,
  validateRequest,
} from "@blee-org/common";
import { Ticket } from "../models/tickets";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").trim().notEmpty().withMessage("Invalid title"),
    body("price").notEmpty().isFloat({ gt: 0 }).withMessage("Invalid price"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    try {
      const createdTicketDoc = await Ticket.build({
        title: title,
        price: price,
        userId: req.currentUser!.id, // requirAuth already checks if currentUser is populated
      });

      await createdTicketDoc.save();

      return res.status(201).send(createdTicketDoc);
    } catch {
      throw new BadRequestError("Cannot create a new ticket");
    }

    return res.send(200);
  }
);

export { router as CreateTicketRouter };
