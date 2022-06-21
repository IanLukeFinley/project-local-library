function findAuthorById(authors, id) {
  const selectedAuthor = authors.find((author) => author.id === id);
  return selectedAuthor;
}

function findBookById(books, id) {
  const selectedBook = books.find((book) => book.id === id);
  return selectedBook;
}

function partitionBooksByBorrowedStatus(books) {
  const returned = [];                                     //create the returned array
  const checkedOut =[];                                    //create the !returned array
  const arrayOfArrays = [checkedOut, returned,];           //create the array of arrays
  for (let index = 0; index<books.length; index++) {       //loop through the books
    if (books[index].borrows[0].returned) {                 //for each book, if book.borrows[0].returned
      returned.push(books[index]);                          //push into returned
    } else {
      checkedOut.push(books[index]);                        //otherwise, push into checkedOut (USE TERNARY HERE IF NEEDED)
    }
  }
 return arrayOfArrays;                                      //return the array of arrays
}


function getBorrowersForBook(book, accounts) {
  const accumulator = [];                        //create the accumulator array
  const borrowList = book.borrows;               //pull the borrows list from the book
  borrowList.forEach((borrow) => {               //for each in book.borrows...
    let matchingAccount = accounts.find((account) => account.id === borrow.id);    //find the element in accounts with the matching id
    const id = matchingAccount.id;               //pull all the matchingAccount pairs out as variables so you can...
    const returned = borrow.returned;            //Note: surely there's a better way to do this?
    const picture = matchingAccount.picture;     //But how to get the return in position 2? Index it?
    const age = matchingAccount.age;             //Ah well, gett it working first.
    const name = matchingAccount.name;
    const company = matchingAccount.company;
    const email = matchingAccount.email;
    const registered = matchingAccount.registered;
    let bookIncludingReturn = {id, returned, picture, age, name, company, email, registered};  //make a new object that is matching account plus the current return
    accumulator.push(bookIncludingReturn);       //push that item into accumulator
  });
  const truncatedArray = [                       //create the truncated array
    accumulator[0],                              // put accumulator items at indices 0-9 into truncated array
    accumulator[1],                       
    accumulator[2],                      
    accumulator[3],                          
    accumulator[4],
    accumulator[5],
    accumulator[6], 
    accumulator[7], 
    accumulator[8], 
    accumulator[9],
  ];
  return truncatedArray;                          //return the truncated array
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
