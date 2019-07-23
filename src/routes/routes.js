const express = require('express')
const Route = express.Router()

const BookController = require('../controllers/controllers')
const BorrowController = require('../controllers/borrow');

const Auth = require('../helpers/auth')

Route
  .get('/cek', Auth.authInfo, Auth.accesstoken, BookController.getIndex)
  .get('/', BookController.getBooks)
  .get('/lah/:bookid',Auth.authInfo, Auth.accesstoken, BookController.getBorrows)
  .get('/name', BookController.nameBook)
  .get('/:bookid', BookController.bookId)
  .get('/category/:category', BookController.bookCategory)
  .get('/location/:location', BookController.bookLocation)
  .post('/', BookController.postBook)
  .patch('/:bookid', BookController.patchBook)
  .delete('/:bookid', BookController.bookDelete)

	.post('/borrow/', Auth.authInfo, Auth.accesstoken, BorrowController.postBorrow)
  .patch('/borrow/:bookid', Auth.authInfo, Auth.accesstoken, BorrowController.patchBorrow)
  
  .post('/register', BookController.register)
  .post('/login',BookController.login)

module.exports = Route
