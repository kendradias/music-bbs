const express = require("express");
const router = express.Router();
const threadController = require("../controllers/threadController");

router.get("/", threadController.getAllThreads);
router.post("/", threadController.createThread);
router.get("/:threadId", threadController.getThreadById);
router.put("/:threadId", threadController.updateThread);
router.delete("/:threadId", threadController.deleteThread);

router.get("/:threadId/comments", threadController.getComments);
router.post("/:threadId/comments", threadController.createComment);
router.put("/:threadId/comments/:commentId", threadController.updateComment);
router.delete("/:threadId/comments/:commentId", threadController.deleteComment);

module.exports = router;
