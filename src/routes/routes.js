const express = require('express')
const Route = express.Router()

const BookController = require('../controllers/controllers')
const BorrowController = require('../controllers/borrow');
const UserController = require('../controllers/user');

const Auth = require('../helpers/auth')

Route
  .get('/cek', Auth.authInfo, Auth.accesstoken, BookController.getIndex)
  .get('/user/', Auth.authInfo, Auth.accesstoken, UserController.member)
  .get('/user/:userid', Auth.authInfo, Auth.accesstoken, UserController.userid)
  .get('/', BookController.getBooks)
  .get('/lah/:bookid',Auth.authInfo, Auth.accesstoken, BookController.getBorrows)
  .get('/lah/user/:user_id', Auth.authInfo, Auth.accesstoken, BookController.userBorrows)

  .get('/name', BookController.nameBook)
  .get('/:bookid', BookController.bookId)
  .get('/category/:category', BookController.bookCategory)
  .get('/location/:location', BookController.bookLocation)
  .post('/', BookController.postBook)
  .patch('/:bookid', BookController.patchBook)
  .delete('/:bookid', BookController.bookDelete)

  .delete('/member/:userid', UserController.deleteMember)

	.post('/borrow/', Auth.authInfo, Auth.accesstoken, BorrowController.postBorrow)
  .patch('/borrow/:bookid', Auth.authInfo, Auth.accesstoken, BorrowController.patchBorrow)
  
  .post('/register/', UserController.register)
  .post('/login/',  Auth.authInfo, UserController.login)

module.exports = Route
