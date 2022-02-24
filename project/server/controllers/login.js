const Pricing = require("../models/pricing");

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  //TODO: Update after database
  //   db.query(
  //     "SELECT * FROM users WHERE username = ? AND password = ?)",
  //     [username, password],
  //   );
  //     .then((res) => {
  //       if (res) {
  //         res.send(res);
  //       } else {
  //         res.send({ message: "Incorrect username or password" });
  //       }
  //     })
  //     .catch((err) => {
  //       res.send({ err: err });
  //     });

  res.send({ message: "OK" });
};

exports.postRegister = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  //TODO: Update after database
  //   db.query("INSERT INTO users (username, password) VALUES (?, ?)", [
  //     username,
  //     password,
  //   ])
  //     .then((res) => {
  //       if (res) {
  //         res.send(res);
  //       } else {
  //         res.send({ message: "Error registering client" });
  //       }
  //     })
  //     .catch((err) => {
  //       res.send({ err: err });
  //     });

  //TODO: Delete after database
  res.send({ message: "OK" });
};
