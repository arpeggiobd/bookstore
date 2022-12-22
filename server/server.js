require("dotenv").config();
const express = require('express')
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const session = require("express-session");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)

const User = require('./Model/Users')
const Book = require('./Model/Book')
const Cart = require('./Model/Cart')
const Review = require('./Model/Review')
const auth = require('./Middleware/authorization')
const { cloudinary } = require('./utils/cloudinary')

const app = express();
const port = process.env.PORT ?? 3000

app.use(express.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(cors());

//seed
app.get("/api/seed", async (req, res) => {
  try {
    await User.deleteMany();
    const seed = await User.create(
      {
        username: "user",
        email: "user@user.com",
        password: bcrypt.hashSync("user", bcrypt.genSaltSync(10)),
        role: "buyer"
      },
      {
        username: "admin",
        email: "admin@admin.com",
        password: bcrypt.hashSync("admin", bcrypt.genSaltSync(10)),
        role: "seller"
      }
    );
    res.json(seed);
  } catch (error) {
    console.log(error);
  };
});

//view all user
app.get('/api/all', async (req, res) => {
  const all = await User.find({});
  res.status(200).json({ msg: all })
})

//view specific user
app.get("/api/all/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).exec();
    if (user === null) {
      res.status(404).json({ error: "Not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//signup
app.post("/api/signup", async (req, res) => {
  const { username, password, email } = req.body;
  const hashedString = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const findUser = await User.findOne({ username })
  const findEmail = await User.findOne({ email })
  const emailToValidate = email;
  const emailRegexp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  console.log(emailRegexp.test(emailToValidate));
  try {

    if (username === null || username.match(/^ *$/) !== null) {
      return res.send("invalid username");
    }

    if (!emailRegexp.test(emailToValidate)) {
      return res.send("invalid Email");
    }

    if (findUser) {
      res.status(204).json({ message: "Username has been used" });
    }

    if (findEmail) {
      res.status(204).json({ message: "Email has beren used" });
    }

    const user = await User.create(
      {
        username: username,
        email: email,
        password: hashedString,
      },
    )

    res.json(user);
  }
  catch (error) {
    console.log(error)
  };
})

//login
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send("All input is required")
    }
    const user = await User.findOne({ username });
    const details = await User.find({ username: username });
    let tokenid = details[0]._id;
    console.log(tokenid)

    if (username && (await bcrypt.compare(password, user.password))) {
      req.session.userid = user._id;
      const userToken = {
        username: user.username,
        email: user.email
      }

      const token = jwt.sign(
        userToken,
        process.env.ACCESS_TOKEN_SECRET,
      );
      user.token = token
      User.findOneAndUpdate(
        { username },
        { token: token })

      return res
        .status(200)
        .header('token', token)
        .json({ msg: 'Redirecting to /', token: token, tokenid: tokenid });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

// Update Password
app.put("/api/updatePassword/:id", async (req, res) => {
  const { oPassword, nPassword } = req.body;
  const { id } = req.params
  const hashedString = bcrypt.hashSync(nPassword, bcrypt.genSaltSync(10));
  const user = await User.findById(id)
  const check = await bcrypt.compare(oPassword, user.password)

  try {
    if (check) {
      User.findByIdAndUpdate(
        req.params.id,
        { password: hashedString },

        (err, updatedPassword) => {
          if (err) {
            res.status(400).json({ error: err.msg });
          }
          res.status(200).json(updatedPassword);
        })
      return;
    }
    res.status(401).json({ msg: "not working" })
  }
  catch {
    res.status(500).json({ msg: "not working" })
  }

})

//logout user and destroy session
app.post('/logout', async (req, res) => {
  // req.logout();
  req.session.destroy((err) => {
    res.clearCookie('connect.sid');
    res.send('Logged out');
  });
});


// Become seller
app.put("/api/updateRole/:id", async (req, res) => {
  const { password } = req.body;
  const { id } = req.params
  const user = await User.findById(id)
  const check = await bcrypt.compare(password, user.password)
  console.log(check)

  try {
    if (check) {
      User.findByIdAndUpdate(
        req.params.id,
        { role: 'seller' },

        (err, updatedRole) => {
          if (err) {
            res.status(400).json({ error: err.msg });
          }
          res.status(200).json(updatedRole);
        })
      return;
    }
    res.status(401).json({ msg: "not working" })
  }
  catch {
    res.status(500).json({ msg: "not working" })
  }

})

//Show all book
app.get(("/api/book"), async (req, res) => {
  const showAll = await Book.find({});
  res.status(200).json(showAll)
})

//Show specific book
app.get("/api/book/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const showAll = await Book.findById(id).exec();
    if (showAll === null) {
      res.status(404).json({ error: "No Book" });
    } else {
      res.status(200).json(showAll);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});


//Add book
app.post("/api/addbook", async (req, res) => {
  const { name, author, description, price, createdBy } = req.body;
  try {
    const newBook = await Book.create(
      {
        name: name,
        author: author,
        description: description,
        price: price,
        createdBy: createdBy,
      }
    )
    res.json(newBook);
  }
  catch (error) {
    console.log(error)
  }
});


//Get Image
app.get('/api/images', async (req, res) => {
  const { resources } = await cloudinary.search
    .expression('folder:bookstore')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

//Upload Image
app.post('/api/upload/:id', async (req, res) => {
  const { id } = req.params
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'bookstoreProject',
    });
    console.log(uploadResponse.url);
    console.log(id)

    Book.findByIdAndUpdate(
      id,
      { image: uploadResponse.url },

      (err, updatedPassword) => {
        if (err) {
          res.status(400).json({ error: err.msg });
        }
        res.status(200).json(updatedPassword);
      })

  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

// Show all Cart
app.get('/api/cart', async (req, res) => {
  const showAll = await Cart.find({});
  res.status(200).json(showAll)
})

//Show specific Cart
app.get('/api/cart/all/:id', async (req, res) => {
  const id = req.params.id;
  const allCart = await Cart.find({ userId: id }).populate('bookId').exec();
  res.status(200).json(allCart)
})

//Add book to Cart
app.post("/api/cart/add", async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    const newCart = await Cart.create(
      {
        userId: userId,
        bookId: bookId
      }
    )
    res.json(newCart);
  }
  catch (error) {
    console.log(error)
  }
});

//Delete Book from Cart
app.delete("/api/cart/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await Cart.findByIdAndDelete(id);

    if (deleteUser === null) {
      res.status(400).json({ msg: "Wrong ID" });
    } else {
      res.status(200).json(deleteUser);
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// Upload Review
app.post("/api/Review/:id", async (req, res) => {
  const { username, review, idToken, bookId } = req.body;
  const { id } = req.params

  try {
    const newReview = await Review.create(
      {
        username: username,
        review: review,
        idToken: idToken,
        bookId: bookId,
      }
    )
    res.json(newReview);
  }
  catch (error) {
    console.log(error)
  }
})

// View all Review
app.get("/api/review/:id", async (req, res) => {
  const id = req.params.id;
  const allReview = await Review.find({ bookId: id });
  res.status(200).json(allReview)
})

// Delete specific Review
app.delete("/api/review/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deleteReview = await Review.findByIdAndDelete(id)
    if (deleteReview === null) {
      res.status(400).json({ msg: "No Review" });
    } else {
      res.status(200).json(deleteReview);
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// Update Review
app.put("/api/review/:id", async (req, res) => {
  const { review } = req.body;
  const id = req.params.id

  try {
      Review.findOneAndUpdate(
        {bookId : id},
        {review: review},

        (err, updatedReview) => {
          if (err) {
            res.status(400).json({ error: err.msg });
          }
          res.status(200).json(updatedReview);
        })
  }
  catch {
    res.status(500).json({ msg: "not working" })
  }

})

mongoose.connection.on('connecting', () => {
  console.log('connecting')
  console.log(mongoose.connection.readyState); //logs 2
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})