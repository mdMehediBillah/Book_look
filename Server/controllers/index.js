// authUserController imports
import createUser from "./authUserController/createUser.js";
import loginUser from "./authUserController/loginUser.js";
import updateUser from "./authUserController/updateUser.js";
import userLogout from "./authUserController/userLogout.js";
import changePassword from "./authUserController/changePassword.js";

// booksControllers imports
import newAddBook from "./booksControllers/newAddBook.js";
import newAddGenre from "./booksControllers/newAddGenre.js";
import newAddRatingBook from "./booksControllers/newAddRatingBook.js";
import newBorrowedBook from "./booksControllers/newBorrowedBook.js";
import newDonatedBook from "./booksControllers/newDonatedBook.js";

// bookshelfsController imports
import newAddBookshelf from "./bookshelfsController/newAddBookshelf.js";
import newAddRatingBookshelf from "./bookshelfsController/newAddRatingBookshelf.js";

// commentsController imports
import newAddComment from "./commentsController/newAddComment.js";

// Export all controllers
export const authUserController = {
  createUser,
  loginUser,
  updateUser,
  userLogout,
  changePassword,
};

export const booksControllers = {
  newAddBook,
  newAddGenre,
  newAddRatingBook,
  newBorrowedBook,
  newDonatedBook,
};

export const bookshelfsController = {
  newAddBookshelf,
  newAddRatingBookshelf,
};

export const commentsController = {
  newAddComment,
};


//we can import them like this:
// import {
//   authUserController,
//   booksControllers,
//   bookshelfsController,
//   commentsController,
// } from "./controllers";
