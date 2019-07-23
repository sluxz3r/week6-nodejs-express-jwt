const bookModels = require('../models/models')
const BookHelper = require('../helpers/helpers')
const jwt = require('jsonwebtoken')

module.exports = {
  getIndex: (req, res) => {
    return res.json({ message: 'Hello!!! Welcome to Arkademy' })
  },

  // Get ALl Books
  getBooks: (req, res) => {
    bookModels.getBooks()
      .then((resultBook) => {
        const result = resultBook
        BookHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  getBorrows: (req, res) => {
    const bookid = req.params.bookid
    bookModels.getBorrows(bookid)
      .then((resultBook) => {
        const result = resultBook
        BookHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  // Get Books By Name
  nameBook: (req, res) => {
    const name = req.query.name
    bookModels.nameBook(name)
      .then((resultBook) => {
        const result = resultBook
        BookHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  // Get Book By Id
  bookId: (req, res) => {
    const bookid = req.params.bookid
    bookModels.bookId(bookid)
    .then((resultBook) => {
      const result = resultBook[0]
      BookHelper.response(res, result, 200)
    })
    .catch((error) => {
      console.log(error)
    })
  },

  // Get By Category
  bookCategory: (req, res) => {
    const category = req.params.category
  
    bookModels.bookCategory(category)
      .then((resultBook) => {
          const result = resultBook
          BookHelper.response(res, result, 200)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // Get By Location
    bookLocation: (req, res) => {
      const location = req.params.location
  
      bookModels.bookLocation(location)
        .then((resultBook) => {
          const result = resultBook
          BookHelper.response(res, result, 200)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // POST User
    postBook: (req, res) => {
      const data = {
        name: req.body.name,
        writer: req.body.writer,
        des: req.body.des,
        fk_loc: req.body.fk_loc,
        fk_cat: req.body.fk_cat,
        image: req.body.image,
        created_at: new Date(),
        status_borrow: 0

      }
  
      bookModels.postBook(data)
        .then((resultBook) => {
          const result = resultBook[0]
          BookHelper.response(res, data, 200)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // Update Book
    patchBook: (req, res) => {
      const data = {
        name: req.body.name,
        writer: req.body.writer,
        fk_loc: req.body.fk_loc,
        fk_cat: req.body.fk_cat,
        image: req.body.image,
        updated_at: new Date(),
      }
      const bookid = req.params.bookid

      bookModels.patchBook(bookid, data)
        .then((resultBook) => {
          const result = resultBook[0]
          BookHelper.response(res, data, 200)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // Delete User By Id
    bookDelete: (req, res) => {
      const bookid = req.params.bookid
  
      bookModels.bookDelete(bookid)
        .then((resultBook) => {
          const result = resultBook
          BookHelper.response(res, result, 200)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    register: (req, res) => {
      const salt = BookHelper.generateSalt(18)
      const passwordHash = BookHelper.setPassword(req.body.password, salt)
  
      const data = {
        email: req.body.email,
        fullname: req.body.fullname,
        password: passwordHash.passwordHash,
        salt: passwordHash.salt,
        token: 'Test',
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
  
      bookModels.register(data)
        .then((resultRegister) => {
          BookHelper.response(res, resultRegister, 200)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  
    login: (req, res) => {
      const email = req.body.email
      const password = req.body.password
  
      bookModels.getByEmail(email)
        .then((result) => {
          const dataUser = result[0]
          const usePassword = BookHelper.setPassword(password, dataUser.salt).passwordHash
  
          if (usePassword === dataUser.password) {
            dataUser.token = jwt.sign({
              userid: dataUser.userid
            }, process.env.SECRET_KEY, { expiresIn: '1h' })
  
            delete dataUser.salt
            delete dataUser.password
  
            return BookHelper.response(res, dataUser, 200)
          } else {
            return BookHelper.response(res, null, 403, 'Wrong password!')
          }
         
        })
        .catch((error) => {
          console.log(error)
        })
       
    }
}
