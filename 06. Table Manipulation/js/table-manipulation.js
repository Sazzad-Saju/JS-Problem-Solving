// load modal
$(function() {
    $(".secondHTML").load("modal.html");
});

// All Class
class User {
    constructor(name, email, phone, role) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
    }
}

class Show {
    static addToUserList(user) {

        let list = document.querySelector('#table-body');
        let row = document.createElement('tr');
        row.innerHTML = `<td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.role}</td>
        <td class="text-center mx-auto"><i class="fa fa-trash text-danger me-2 btn deleteButt"></i> <i class="fa fa-edit text-success btn editButt" data-bs-toggle="modal" data-bs-target="#edit"></i> </td>`;
        list.appendChild(row);
    }
}

// Add another user
document.querySelector('#addUser').addEventListener('click', function() {
    document.querySelector('.modTitle').innerText = "Add Another User";
    let name = document.querySelector('#in_nam');
    let email = document.querySelector('#in_email');
    let phone = document.querySelector('#in_phone');
    let role = document.querySelector('#in_role');
    name.value = "";
    email.value = "";
    phone.value = "";
    role.value = "";
    name.focus();
    document.querySelector('#cancelButt').addEventListener('click', function() {
        hideModal();
    });
    document.querySelector('#saveButt').innerText = "Save";
    document.querySelector('#saveButt').addEventListener('click', function(e) {
        if (phone.value != "") {
            var newUser = new User(name.value, email.value, phone.value, role.value);
            Show.addToUserList(newUser);
            // console.log(newUser);
            storeInLS(newUser);
            e.preventDefault();
            e.stopImmediatePropagation();
            hideModal();
            location.reload(true / false);
        }
    });
});

// Add to local storage
function storeInLS(user) {
    let Total_Users;
    let existsUsers = false;
    if (localStorage.getItem('Total_Users') === null) {
        Total_Users = [];
    } else {
        Total_Users = JSON.parse(localStorage.getItem('Total_Users'));
    }
    Total_Users.forEach(item => {
        if (item.name == user.name) {
            alert(`User (${item.name}) Already Exists!`);
            existsUsers = true;
        }
    })
    if (existsUsers != true) {
        Total_Users.push(user);
        localStorage.setItem('Total_Users', JSON.stringify(Total_Users));
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
    editElements();
    deleteUser();
}

// edit User
function editElements() {
    let editElem = document.querySelectorAll('.editButt');
    // console.log(editElem);
    for (var i = 0; i < editElem.length; i++) {
        editElem[i].addEventListener('click', function(e) {
            document.querySelector('.modTitle').innerText = "Edit Users"
            let row = e.target.parentElement;
            let role = row.previousElementSibling;
            let phone = role.previousElementSibling;
            let email = phone.previousElementSibling;
            let name = email.previousElementSibling;
            document.querySelector('#in_nam').value = name.innerText;
            document.querySelector('#in_email').value = email.innerText;
            document.querySelector('#in_phone').value = phone.innerText;
            document.querySelector('#in_role').value = role.innerText;
            document.querySelector('#cancelButt').addEventListener('click', function() {
                hideModal();
            });
            document.querySelector('#saveButt').innerText = "Update";
            document.querySelector('#saveButt').addEventListener('click', function(e) {
                var name = document.querySelector('#in_nam').value;
                var email = document.querySelector('#in_email').value;
                var phone = document.querySelector('#in_phone').value;
                var role = document.querySelector('#in_role').value;
                if (phone != "") {
                    updateInLS(name, email, phone, role);
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    hideModal();
                    location.reload(true / false);
                }
            });
        })
    }
}
// Delete User
function deleteUser() {
    let deleteElem = document.querySelectorAll('.deleteButt');
    for (var i = 0; i < deleteElem.length; i++) {
        deleteElem[i].addEventListener('click', function(e) {
            let name = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
            if (confirm("Are you sure to remove? ")) {
                name.parentElement.remove();
                remove4mLS(name.innerText);
            }

        })
    }
}

// hide Modal (edit/add)
function hideModal() {
    $('#edit').modal('hide');
}

// Delete From Local Storage
function remove4mLS(name) {
    let Total_Users;
    if (localStorage.getItem('Total_Users') === null) {
        Total_Users = [];
    } else {
        Total_Users = JSON.parse(localStorage.getItem('Total_Users'));
    }
    Total_Users.forEach((item, index) => {
        if (item.name == name) {
            Total_Users.splice(index, 1);
        }
    })
    localStorage.setItem('Total_Users', JSON.stringify(Total_Users));
}

// Update In Local Storage
function updateInLS(name, email, phone, role) {
    let Total_Users;
    if (localStorage.getItem('Total_Users') === null) {
        Total_Users = [];
    } else {
        Total_Users = JSON.parse(localStorage.getItem('Total_Users'));
    }
    // name cannot be reset, prime key
    Total_Users.forEach((item, index) => {
        if (item.name == name) {
            item.email = email;
            item.phone = phone;
            item.role = role;
        }
    })
    localStorage.setItem('Total_Users', JSON.stringify(Total_Users));
}