// DOM
class Show {
    static addToUserList(user) {

        let list = document.querySelector('#table-body'); //just a table
        let row = document.createElement('tr');
        row.innerHTML = `<td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.role}</td>
        <td class="text-center mx-auto"> <i class="fa fa-edit text-success btn editButt" data-bs-toggle="modal" data-bs-target="#edit"></i> </td>`;
        list.appendChild(row);
        let editElem = document.querySelectorAll('.editButt');
        console.log(editElem);
    }
}

//Fill with previously stored data
document.addEventListener('DOMContentLoaded', Load_Users);

function Load_Users() {
    let Total_Users;
    if (localStorage.getItem('Total_Users') === null) {
        Total_Users = [];
    } else {
        Total_Users = JSON.parse(localStorage.getItem('Total_Users'));
    }
    Total_Users.forEach(item => {
            Show.addToUserList(item);
        })
        // let editElem = document.querySelectorAll('.editButt');
        // console.log(editElem);
        // console.log(editElem.length)
}

// querySelector editButt
// find nothing here
// let editElem = document.querySelectorAll('.editButt');
// console.log(editElem);

if (document.readyState === "complete") {
    // document is already ready to go
    // your query selector here: 
    let editElem = document.querySelectorAll('.editButt');
    console.log(editElem.length);
    console.log("WTF");
}