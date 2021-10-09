//Local Storage is applied using Class
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
                Store.remove4mLS(target.parentElement.previousElementSibling.textContent.trim());
                Show.showAlert(`Book is removed!`, 'error'); //can't print  book name here
                // console.log(target.parentElement.parentElement);
            }
        }
    }
}

// Local Storage Class
class Store {
    // getBooks from local storage
    static getBooks() {
        let Total_Books;
        if (localStorage.getItem('Total_Books') === null) {
            Total_Books = [];
        } else {
            Total_Books = JSON.parse(localStorage.getItem('Total_Books'));
        }
        return Total_Books;
    }

    //add a book to local storage
    static addBook2LS(a_book) {
        let Total_Books = Store.getBooks();
        Total_Books.push(a_book);
        localStorage.setItem('Total_Books', JSON.stringify(Total_Books));
    }

    // preloaded from local storage
    static displayBooks() {
        let Total_Books = Store.getBooks();
        Total_Books.forEach(item => {
            Show.addToBookList(item);
        });
    }

    // remove from local storage
    static remove4mLS(isbn) {
        let Total_Books = Store.getBooks();
        Total_Books.forEach((a_book, index) => {
            if (a_book.isbn == isbn) {
                Total_Books.splice(index, 1);
            }
        });
        localStorage.setItem('Total_Books', JSON.stringify(Total_Books));
    }
}
// Preloaded from LS
document.addEventListener('DOMContentLoaded', Store.displayBooks());

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
        Store.addBook2LS(book);
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