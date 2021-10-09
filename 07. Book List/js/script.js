//This File is not in use
//Local Storage is applied directly with no class
// Get the UI Element
let form = document.querySelector('#books_form');
let books_list = document.querySelector('#books_list');

//OOP: Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// show-Book: UI Class
class Show {
    static addToBookList(book) {
        let list = document.querySelector('#books_list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href= '#' class="delete">X</a></td>`
        list.appendChild(row);
        // console.log(row);
    }
    static clearFiled(book) { //clear prev field
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
    static showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#books_form');
        container.insertBefore(div, form);
        // setTimeout(function() {
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    static deleteFromBook(target) {
        if (target.hasAttribute('href')) {
            if (confirm("Are you sure to delete? ")) {
                target.parentElement.parentElement.remove();
                Show.showAlert(`Book is removed!`, 'success'); //can't print  book name here
                // console.log(target.parentElement.parentElement);
                remove4mLS(target);
            }
        }
    }
}

//Add New Books to list
form.addEventListener('submit', addNewBook);

function addNewBook(e) {
    let title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;
    // let show = new Show();
    if (title === '' || author === '' || isbn === '') {
        // alert('Fill all field');
        Show.showAlert("Please fill all the field!", "error");
    } else {
        let book = new Book(title, author, isbn);
        Show.addToBookList(book);
        Show.clearFiled(book);
        Show.showAlert("Book Added!", "success")
        storeInLS(book);
    }
    e.preventDefault();
}

//Delete a book
books_list.addEventListener('click', removeBook);

function removeBook(e) {
    // let ui = new Show();
    Show.deleteFromBook(e.target);
    e.preventDefault();
}

// Add to local storage
function storeInLS(book) {
    let Total_Books;
    if (localStorage.getItem('Total_Books') === null) {
        Total_Books = [];
    } else {
        Total_Books = JSON.parse(localStorage.getItem('Total_Books'));
    }
    Total_Books.push(book);
    localStorage.setItem('Total_Books', JSON.stringify(Total_Books));
}

//Fill with previously stored data
document.addEventListener('DOMContentLoaded', Load_Books);

function Load_Books() {
    let Total_Books;
    if (localStorage.getItem('Total_Books') === null) {
        Total_Books = [];
    } else {
        Total_Books = JSON.parse(localStorage.getItem('Total_Books'));
        // console.log(Total_Books[0].author);
    }
    Total_Books.forEach(item => {
        Show.addToBookList(item);
    })
}

// Delete From Local Storage
function remove4mLS(a_book) {
    let Total_Books;
    if (localStorage.getItem('Total_Books') === null) {
        Total_Books = [];
    } else {
        Total_Books = JSON.parse(localStorage.getItem('Total_Books'));
    }
    let isbn_num = a_book.parentElement.previousElementSibling.innerHTML;
    Total_Books.forEach((item, index) => {
        if (item.isbn == isbn_num) {
            Total_Books.splice(index, 1);
        }
    })
    localStorage.setItem('Total_Books', JSON.stringify(Total_Books));
}