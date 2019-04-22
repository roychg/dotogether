const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/board", require("./board"));
router.use("/user", require("./user"));
router.use("/team", require("./team"));
router.use("/list", require("./list"));
router.use("/task", require("./task"));

module.exports = router;
