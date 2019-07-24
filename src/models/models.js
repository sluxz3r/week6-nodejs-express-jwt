const conn = require('../configs/db')
const jwt = require('jsonwebtoken')

module.exports = {
  // Get All Books
  getBooks: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT book.bookid, book.name, book.writer, book.des, book.image, book.status_borrow, cat.category, loc.location FROM book INNER JOIN cat ON book.fk_cat=cat.catid INNER JOIN loc ON book.fk_loc=loc.locid ', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // Get Borrow by id
  getBorrows: (bookid) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM status WHERE bookid=?', bookid, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // get borrow by user ktp
  userBorrows: (user_id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT book.name, status.tanggal_pinjam, status.tanggal_kembali, status.harus_kembali, status.denda FROM book INNER JOIN status ON book.bookid=status.bookid WHERE status.user_id=?', user_id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // Get by Name
  nameBook: (name) => {
    const likeName = '%' + name + '%'
    return new Promise((resolve, reject) => {
      conn.query('SELECT book.bookid, book.name, book.writer, book.des, book.image, cat.category, loc.location FROM book INNER JOIN cat ON book.fk_cat=cat.catid INNER JOIN loc ON book.fk_loc=loc.locid WHERE book.name LIKE ?', likeName, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // Get by Id
  bookId: (bookid) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT book.bookid, book.name, book.writer, book.des, book.image, book.status_borrow, cat.category, loc.location FROM book INNER JOIN cat ON book.fk_cat=cat.catid INNER JOIN loc ON book.fk_loc=loc.locid WHERE book.bookid = ?', bookid, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // Get By Category
  bookCategory: (category) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT book.bookid, book.name, book.writer, book.des, book.image, cat.category, loc.location FROM book INNER JOIN cat ON book.fk_cat=cat.catid INNER JOIN loc ON book.fk_loc=loc.locid WHERE cat.category = ?', category, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // Get By Location
  bookLocation: (location) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT book.bookid, book.name, book.writer, book.des, book.image, cat.category, loc.location FROM book INNER JOIN cat ON book.fk_cat=cat.catid INNER JOIN loc ON book.fk_loc=loc.locid WHERE loc.location = ?', location, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // Add Book 
  postBook: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO book SET ? ', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // Edit Book
  patchBook: (bookid, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE book SET ? WHERE bookid= ?', [data, bookid], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // Delete Book
  bookDelete: (bookid) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM book WHERE bookid = ?', bookid, (err) => {
        if (!err) {
          resolve(`Data dengan Id : ${bookid} berhasil di Hapus`)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
}
