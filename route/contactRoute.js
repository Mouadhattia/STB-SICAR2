const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/contact", (req, res) => {
  let data = req.body;
  if (
    data.name.length === 0 ||
    data.email.length === 0 ||
    data.message.length === 0
  ) {
    return res.json({ msg: "Please Fill All The Fields!" });
  }

  let smtpTransporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: "stbmailertest@gmail.com",
      pass: "Stb123456",
    },
  });
  let mailOptions = {
    from: data.email,
    to: "attiamou3adh@gmail.com",
    subject: `message from ${data.name}`,
    html: `

            <h3 >Informations<h3/>
            <div>
            <h4>Name: ${data.name}<h4/>
            <h4>Email: ${data.email}<h4/>
            </div>
            <h3>Message</h3>
            <p>${data.message}<p/>
            `,
  };

  smtpTransporter.sendMail(mailOptions, (error) => {
    try {
      if (error)
        return res.status(400).json({ msg: "Please fill all the fields!" });
      res.status(200).json({ msg: "Thank You For Contacting STB SICAR." });
    } catch (error) {
      if (error) return res.status(500).json({ msg: "There is server error" });
    }
  });
});
module.exports = router;
