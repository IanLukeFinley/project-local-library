function findAccountById(accounts, id) {
  const selectedAccount = accounts.find((account) => account.id === id);
  return selectedAccount;
}

function sortAccountsByLastName(accounts) {
  const sortedAccounts = accounts.sort((nameA, nameB) => (nameA.name.last > nameB.name.last ? 1 : -1));
  return sortedAccounts;
}

function getBorrowArray (books){                //HELPER: a function that makes an array of all borrow items from all books
  const allBorrows = books.map((name) => name.borrows);
  return allBorrows;
}

function getTotalNumberOfBorrows(account, books) {
  let totalBorrows = 0;
  const accountId = account.id;                  //pull the account's id into a varaible
  const allBorrows = getBorrowArray (books);
  allBorrows.forEach (innerArray => {
    const innerLength =  innerArray.filter((borrowedObject) => borrowedObject.id === accountId).length;
  totalBorrows = totalBorrows + innerLength;
  });
  return totalBorrows;                           //return the placeholder
}

function whatBooksCheckedOut (account, books) {                //a helper function that makes an array of all books checked out by account
  const booksCheckedOut = [];                                 //make the accumulator array
  books.forEach((book) => {                                   //cycle through the books
    if (borrowedChecker(account, book))  {                    //if borrowedChecker is true,
      booksCheckedOut.push(book);                             // put the book object into the accumulator
    }
  });
  return booksCheckedOut;
}

function borrowedChecker (account, book){                 //a helper function that checks if a certain account has a certain book
  const accountId = account.id;                           //pull the account id into a variable
  for (let index=0; index<book.borrows.length; index++){  //cycle through book borrows
    if (accountId === book.borrows[index].id && book.borrows[index].returned ===false) {                                  //if account.id === borrows[i].id && returned === false
      return true;                                        //return true (SIMPLIFY THIS STATMENT TO ARROW)
    }
  }
}

function authorizer (book, authors) {                                       //a helper function that makes a new book object, including the author
  const authorId = book.authorId;                                           //pull the Id from the book
  const id = book.id;
  const title = book.title;
  const genre = book.genre;
  const borrows = book.borrows;
  let booksAuthor = authors.find(author => author.id == authorId);         //find() to get the matching author from authors
  const authorizedBook = {id, title, genre, authorId, author: booksAuthor, borrows}//use shorthand to put book and the matching author into the newBook object
  return authorizedBook;                                                  //return newBook
}

function getBooksPossessedByAccount(account, books, authors) {
  const finalOutput = [];                                            //create the accumulator array
  const accountHasTheseBooks = whatBooksCheckedOut (account, books);//run whatBooksCheckedOut
  accountHasTheseBooks.forEach((book) => {                          //cycle through the books
    let authorizedBook = authorizer (book, authors);                //for each run the authorizer
    finalOutput.push(authorizedBook);                               //push the authorized object into the accumulator
  });
  return finalOutput;                                               //return the accumulator
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
