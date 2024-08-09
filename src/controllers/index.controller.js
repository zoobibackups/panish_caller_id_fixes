const express = require("express");
const router = express.Router();
// routes
router.post("/", checkServer);
router.get("/", checkServer);
router.put("/", checkServer);
router.delete("/", checkServer);
module.exports = router;

function checkServer(req, res, next) {
	res.json({
		status: true,
		successMessage: "Server is running",
	});
}
