import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the Book Schema
const bookSchema = new Schema(
  {
    ISBN: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    genre: { type: mongoose.Types.ObjectId, ref: "Genre", required: true },
    publishedDate: { type: Date },
    language: { type: String, required: true },
    publisher: { type: String, required: true },
    coverImageUrl: { type: String },
    summary: { type: String },

    authors: [
      {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        birthDate: { type: Date },
        deathDate: { type: Date },
      },
    ],

    pages: { type: Number },

    borrowedTimes: [
      {
        _id: { type: mongoose.Types.ObjectId, ref: "BorrowedBook" },
      },
    ],

    status: {
      type: String,
      default: "available",
      enum: ["available", "borrowed"],
    },

    ratings: { type: Number },

    reviews: [
      {
        user: { type: Object },
        rating: { type: Number },
        comment: { type: String },
        shelfId: { type: String },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
