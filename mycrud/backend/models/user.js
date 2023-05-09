"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.update = exports.create = exports.findOne = exports.findAll = void 0;
var db_1 = require("../db");
// Get all users
var findAll = function (callback) {
    var queryString = "SELECT * FROM jsusers";
    db_1.db.query(queryString, function (err, result) {
        if (err) {
            callback(err);
        }
        var rows = result;
        var users = [];
        rows.forEach(function (row) {
            var user = {
                id: row.id,
                nume: row.nume,
                prenume: row.prenume,
                email: row.email,
                datanastere: row.datanastere,
                telefon: row.telefon,
                dataadaugare: row.dataadaugare,
                actiune: "",
            };
            users.push(user);
        });
        callback(null, users);
    });
};
exports.findAll = findAll;
// Get one user
var findOne = function (userId, callback) {
    var queryString = "SELECT * FROM jsusers WHERE id=?";
    db_1.db.query(queryString, userId, function (err, result) {
        if (err) {
            callback(err);
        }
        var row = result[0];
        var user = {
            id: row.id,
            nume: row.nume,
            prenume: row.prenume,
            email: row.email,
            datanastere: row.datanastere,
            telefon: row.telefon,
            //dataadaugare: row.dataadaugare,
        };
        callback(null, user);
    });
};
exports.findOne = findOne;
// create user
var create = function (user, callback) {
    var queryString = "INSERT INTO jsusers (nume, prenume, email, datanastere, telefon) VALUES (?, ?, ?, ?, ?)";
    console.log(user);
    db_1.db.query(queryString, [user.nume, user.prenume, user.email, user.datanastere, user.telefon], function (err, result) {
        if (err) {
            callback(err);
        }
        var insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
// update user
var update = function (user, callback) {
    var queryString = "UPDATE jsusers SET nume=?, prenume=? WHERE id=?";
    db_1.db.query(queryString, [user.nume, user.prenume, user.id], function (err, result) {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.update = update;
// delete user
var deleteUser = function (user, callback) {
    var queryString = "DELETE FROM jsusers WHERE id=?";
    db_1.db.query(queryString, [user.id], function (err, result) {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.deleteUser = deleteUser;
