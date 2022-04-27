const express = require("express");

const router = express.Router();
const CommentDB = require("../models/Comment");

// router.post("/", async (req, res) => {
//   try {
//     await CommentDB.create({
//       question_id: req.body.question_id,
//       comment: req.body.comment,
//       user: req.body.user,
//     })
//       .then((doc) => {
//         res.status(201).send({
//           status: true,
//           message: "comment added successfully",
//           data: doc
//         });
//       })
//       .catch(() => {
//         res.status(400).send({
//           status: false,
//           message: "Error while adding comment",
//         });
//       });
//   } catch (err) {
//       res.status(500).send({
//           status: false,
//           message: "error while adding comment",
//       })
//   }
// });

router.post("/", async(req, res) => {
  const commentData = new CommentDB({
    question_id: req.body.question_id,
    comment: req.body.comment,
    user: req.body.user,
  });

  await commentData.save().then((doc) => {
    res.status(201).send({
      status: true,
      data: doc
    });
  }).catch((err) => {
      res.status(400).send({
        message: "Comment not added"
      });
    });
  });
module.exports = router;