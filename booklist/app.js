console.log("app.js is connected to index.html, program running...");

//book constructor
function Book(title, author, isbn)
{
  this.title  = title;
  this.author = author;
  this.isbn   = isbn;
}

//UI constructor
function UI()
{

}
//add book to list using UI object
UI.prototype.addBookToList = function(b)
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
//Alerts the user when they do not fill out the form properly.
UI.prototype.showAlert = function(message, classname)
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

UI.prototype.deleteBook = function(target)
{
  if(target.className === 'delete')
  {
    target.parentElement.parentElement.remove();
  }
}

// clears all the input fields in the form after submitting
UI.prototype.clearFields = function ()
{
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

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
    ui.showAlert("Book added!", 'success');
    ui.clearFields();
  }

  event.preventDefault();
});

//Delete an individual book from the list
document.getElementById('book-list').addEventListener('click', function(event)
{
  const ui = new UI();
  ui.deleteBook(event.target);
  ui.showAlert('book deleted from the list', 'success');
  event.preventDefault();
});
