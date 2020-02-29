/*
  THIS IS THE SAME AS APP.JS, BUT USING ES6 CLASSES INSTEAD OF PROTOTYPE FUNCTIONS.
  THE ES5 APPLICATION IN THE app.js FILE IS CONVERTED INTO ES6 CLASSES.
*/


console.log("appes6 is loaded into index.html, program running...");

class Book
{
  constructor(title, author, isbn)
  {
    this.title  = title;
    this.author = author;
    this.isbn   = isbn;
  }
} // end of Book class

class UI
{
  addBookToList(b)
  {
    const list = document.getElementById('book-list');
    //create tr element with all the info for the Book, and adds it to the document
    const row = document.createElement('tr');
    // Template literals use the backtick when you write them.
    row.innerHTML = `
    <td>${b.title}</td>
    <td>${b.author}</td>
    <td>${b.isbn}</td>
    <td> <a href="#" class="delete">X</a> </td>
    `;
    list.appendChild(row);
  }

  showAlert(message, classname)
  {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${classname}`;
    alertDiv.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(alertDiv, form);

    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 2000);
  }

  deleteBook(target)
  {
    if(target.className === 'delete')
    {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields()
  {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
} // end of UI class

class Store
{
  static getBooks()
  {
    let books;
    if(localStorage.getItem('books') === null )
    {
      books = [];
    }
    else
    {
      books = JSON.parse(localStorage.getItem('books') );
    }
    return books;
  }
  static displayBooks()
  {
    const books = Store.getBooks();

    books.forEach(function(book)
    {
      const ui = new UI;
      ui.addBookToList(book);
    });
  }
  static addBook(book)
  {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn)
  {
     const books = Store.getBooks();
     books.forEach(function(book, index)
     {
       if(book.isbn === isbn)
       {
         books.splice(index, 1);
       }
     });
     localStorage.setItem('books', JSON.stringify(books));
  }
} //End of Store class

//Grab all the books in local storage on DOM load event:
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Add new books to the list and into local storage
document.getElementById("book-form").addEventListener('submit', function(event)
{
  console.log("submit button has been pressed");

  //get the values in the form
  const title  = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn   = document.getElementById('isbn').value;

  //instantiate new book object
  const book = new Book(title, author, isbn);

  //instantiate UI object
  const ui = new UI();
  if(title === "" || author === "" || isbn === "")
  {
    ui.showAlert("You need to write into all fields!", 'error');
  }
  else
  {
    ui.addBookToList(book);
    //Below adds the book to local Storage using the static method, which is a class-level method,
    //so there is no need to instantiate the class to get the method (like in Java)
    Store.addBook(book);

    ui.showAlert("Book added!", 'success');
    ui.clearFields();
  }

  event.preventDefault();
});

//Delete an individual book from the list
document.getElementById('book-list').addEventListener('click', function(event)
{
  const ui = new UI();
  //remove from DOM
  ui.deleteBook(event.target);
  //remove from local Storage
  Store.removeBook(event.target.parentElement.previousElementSibling.textContent);

  ui.showAlert('book deleted from the list', 'success');
  event.preventDefault();
});
