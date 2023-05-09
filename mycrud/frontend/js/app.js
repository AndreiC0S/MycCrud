// validare
// $("#btn-save").toggle('d-none');
let divBtn = document.getElementById('btnSoket');
let divBtnEdit = document.getElementById('btnSoketEdit');
let lastName = $('#lnameDiv');
let firstName = $('#fnameDiv');
let birthDate = $('#ageDiv');
let eMail = $('#mailDiv');
let phone = $('#phoneDiv');

console.log();

// ========================= FORM VALIDATION ==================================

// ---------------------------- EMAIL CHECK ------------------------------------
let emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const checkValidEmail = (form, mail) => {
    if (emailVal.test(mail.value)) {
        form.classList.remove("invalidForm")
        form.classList.add("validForm")
    } else {
        $(form).removeClass("validForm");
        $(form).addClass("invalidForm");
    }
}
//--------------------------- END EMAIL CHECK ----------------------------------

//--------------------------- ADD SUBMIT BUTTON --------------------------------
function addSubmitBtn() {
    if (lastName.hasClass('validForm') && firstName.hasClass('validForm')
        && birthDate.hasClass('validForm') && eMail.hasClass('validForm') 
        && phone.hasClass('validForm')) {
        let createBtn = document.createElement("button",);
        createBtn.setAttribute('type', 'submit');
        createBtn.classList.add('btn', 'btn-primary', 'trimite');
        createBtn.setAttribute('id', 'btn-save');
        createBtn.setAttribute('value', 'addNewUser')
        createBtn.innerText = 'Trimite'
        divBtn.appendChild(createBtn);
    } else {
        return
    }
}
//------------------------- END  ADD SUBMIT BUTTON -----------------------------

//--------------------------- ADD Edit BUTTON ----------------------------------
function addEditBtn() {
        let createBtn = document.createElement("button",);
        createBtn.setAttribute('type', 'submit');
        createBtn.classList.add('btn', 'btn-primary', 'Edit');
        createBtn.setAttribute('id', 'btn-edit');
        createBtn.setAttribute('value', 'EditUser')
        createBtn.innerText = 'Trimite'
        divBtnEdit.appendChild(createBtn);
}
//------------------------- END  ADD Edit BUTTON -----------------------------

// ----------- check if email / phone exist in db ------------------------------

let checkDb = (check, change) => {
    let a = $.ajax({
        url: "http://localhost:3002/users",
        method: "GET",
        headers: { "Access-Control-Allow-Origin": "*" },
        dataType: 'json',
        contentType: 'application/json'
    });
    a.done(function (data) {
        Object.keys(data).forEach(function (i) {
            data[i].forEach(function (j) {

                if (check.value === j.email || check.value === j.telefon) {

                    change.classList.remove("validForm");
                    change.classList.add("invalidForm");
                    window.alert(`${check.value} already exist`);

                } else {
                    if ($(change).is('#mailDiv')) {

                        checkValidEmail(change, check);


                    } else {
                        change.classList.remove("invalidForm");
                        change.classList.add("validForm");

                    }
                }
            })
        })
    })
};

// ---------------------------- END --------------------------------------------

// ------------------------ Manipulate Form Validity ---------------------------

let indexBtn = 0
function makeThemValid() {
    let formsValid = document.getElementsByClassName('form-group')
    console.log('indexbtn ', indexBtn)

    Array.prototype.slice.call(formsValid)
        .forEach(function (form) {

            $('.warn').addClass('d-none');
            form.classList.remove("invalidForm")
            form.classList.add("validForm")

        });
    if (indexBtn == 0) {
        addEditBtn();
        indexBtn++

    }
    return
};
function makeThemInvalid() {
    $('#btn-save').remove()
    $('.warn').removeClass('d-none');
    let formsInValid = document.getElementsByClassName('form-group')
    Array.prototype.slice.call(formsInValid)
        .forEach(function (form) {
            $(form).addClass("invalidForm");
            $(form).removeClass("validForm");
        });
}

//------------------- END Manipulate Form Validity -----------------------------

//------------------------ SOME KIND OF VALIDATION? ----------------------------
function validateInput(){
    // Fetch all the forms we want to apply custom Bootstrap validation styles to

    let forms = document.getElementsByClassName('form-group');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('change', function () {
                if ($(form).is('#mailDiv')) {
                    let email = document.getElementById('email');
                    checkDb(email, form);
                }
                else if ($(form).is('#phoneDiv')) {
                    let tele = document.getElementById('phone');
                    checkDb(tele, form);
                }
                form.classList.remove("invalidForm")
                form.classList.add("validForm")
                addSubmitBtn()
            })
        });
}
// (function () {
//     'use strict'

//     // Fetch all the forms we want to apply custom Bootstrap validation styles to

//     let forms = document.getElementsByClassName('form-group');

//     // Loop over them and prevent submission
//     Array.prototype.slice.call(forms)
//         .forEach(function (form) {
//             form.addEventListener('change', function () {
//                 if ($(form).is('#mailDiv')) {
//                     let email = document.getElementById('email');
//                     checkDb(email, form);
//                 }
//                 else if ($(form).is('#phoneDiv')) {
//                     let tele = document.getElementById('phone');
//                     checkDb(tele, form);
//                 }
//                 form.classList.remove("invalidForm")
//                 form.classList.add("validForm")
//                 addSubmitBtn()
//             })
//         });
// })()

// ================================ END VALIDARE ===============================


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

// =============================== SERVERSIDE REQUESTS =========================

//--------------------- 'POST' New User Function -------------------------------
let AddNewUser = () => {
    var nume = document.getElementById("lname").value;
    var prenume = document.getElementById("fname").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;
    var telephon = document.getElementById("phone").value;
    $.ajax({
        method: "POST",
        url: "http://localhost:3002/users/",
        // headers: { "Access-Control-Allow-Origin": "*" },
        data: {
            prenume: prenume,
            nume: nume,
            email: email,
            datanastere: age,
            telefon: telephon,
        },
        dataType: 'json',
        success: function (res) {
            console.log('am primit', res);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('am primit', XMLHttpRequest);
            console.log("Error: " + errorThrown + textStatus);
        },
        complete: function () {
            $('#user-model').modal('hide');
            window.location.reload();
        }
    })
}
//-------------------- End 'POST' New User Function ----------------------------

//---------------------------'PUT' Users ---------------------------------------
let editSelectedUser = () =>{
        var idValue = document.getElementById("idEdit").value;
        var nume = document.getElementById("lnameEdit").value;
        var prenume = document.getElementById("fnameEdit").value;
        var email = document.getElementById("emailEdit").value;
        var age = document.getElementById("ageEdit").value;
        var telephon = document.getElementById("phoneEdit").value;
        
        $.ajax({
            method: "PUT",
            url: `http://localhost:3002/users/${idValue}`,
            headers: { "Access-Control-Allow-Origin": "*" },
            data: {
                id: idValue,
                prenume: prenume,
                nume: nume,
                email: email,
                datanastere: age,
                telefon: telephon,
            },
            dataType: 'json',
            success: function (res) {
                console.log('am primit', res);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('am primit', XMLHttpRequest);
                console.log("Error: " + errorThrown + textStatus);
            },
            complete: function () {
                $('#user-model').modal('hide');
                window.location.reload();
            }
        })
    
}
//--------------------------End 'PUT' Users -----------------------------------

//https://datatables.net/examples/server_side/object_data.html
$(document).ready(function ($) {

    // Adauga utilizator nou -- Modal
    $('#addNewUser').click(function () {
        validateInput();
        $('#userInserUpdateForm').trigger("reset");
        $('#userModel').html("Adauga un user nou");
        $('#user-model').modal('show');
        makeThemInvalid()

    });
    // ---------------------------------

    // ------------------------------- 'GET' USERS FROM DB -----------------------
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: "http://localhost:3002/users",
        method: "GET",
        headers: { "Access-Control-Allow-Origin": "*" },
        dataType: 'json',
        contentType: 'application/json'

    }).done(function (data) {
        //console.log(data);
        $('#example').dataTable({
            "paging": true,
            "pageLength": 2,
            processing: true,
            serverSide: false,
            "data": data.data,
            "columns": [
                { "data": "id" },
                { "data": "nume" },
                { "data": "prenume" },
                { "data": "email" },
                { "data": "telefon" },
                {
                    "data": "datanastere",
                    render: $.fn.dataTable.render.moment('YYYY-MM-DDTHH:mm:ss.SSSSZ', 'YYYY-MM-DD')

                },
                {
                    "data": 'actiune',
                    render: function (data, type, row, meta) {
                        if (type === 'display') {
                            let link = 'http://localhost:3002/users/' + row.id;
                            return `<a href="javascript:void(0)" class="btn btn-info view" data-id="` + row.id + `">Vezi</a>
                            <a href="javascript:void(0)" class="btn btn-primary edit" data-id="`+ row.id + `">Editeaza</a>
                            <a href="javascript:void(0)" class="btn btn-danger delete" data-id="`+ row.id + `">Sterge</a>`;
                        }

                        return data;
                    },
                },

            ]
        })
    })
    //---------------------------- END 'GET' USER-------------------------------

    //--------------------- Modal Editeaza utilizator --------------------------
    $('body').on('click', '.edit', function () {
        addEditBtn();

        var id = $(this).data('id');
        $('#userModelEdit').html("Edit User");
        $('#btn-edit').val("editUser");
        $('#edit-model').modal('show');

        // ajax
        $.ajax({
            type: "GET",
            url: "http://localhost:3002/users/" + id,
            data: {
                id: id
            },
            dataType: 'json',
            success: function (res) {
                console.log("res.data.id", res.data.id);

                let datan = moment(res.data.datanastere).format('YYYY-MM-DD');

                $('#idEdit').val(res.data.id);
                $('#lnameEdit').val(res.data.nume);
                $('#fnameEdit').val(res.data.prenume);
                $('#emailEdit').val(res.data.email);
                $('#ageEdit').val(datan);
                $('#phoneEdit').val(res.data.telefon);

            }
        }, );

    });
    //--------------------- END  Modal Editeaza utilizator ---------------------

    //----------------------------- START DELETE -------------------------------
    $('body').on('click', '.delete', function () {
        if (confirm("Delete Record?") == true) {
            var id = $(this).data('id');
            // ajax
            $.ajax({
                type: "DELETE",
                url: "http://localhost:3002/users/" + id,
                data: {
                    id: id
                },
                dataType: 'json',
                success: function (res) {
                    window.location.reload();
                }
            });
        }
    });
    // ---------------------------- END Delete ---------------------------------

    // CALL

    $('#userInserUpdateForm').submit(function () {
        AddNewUser();
    });

    $('#userInserEditForm').submit(function () {
        editSelectedUser();
    });
}); 
