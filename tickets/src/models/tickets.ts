import mongoose, { MongooseDocumentMiddleware } from "mongoose";

// properties needed to build a new ticket
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

// the actual document thats going to be saved
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

// Output Type interface of mongoose User model
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

// Mongoose schema for storage
const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String, // Mongoose "String"
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
