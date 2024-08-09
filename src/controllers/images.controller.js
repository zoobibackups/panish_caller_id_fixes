const express = require("express");
const router = express.Router();
const multer = require("multer");
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
var upload = multer({ storage: storage });

router.post("/", upload.single("file"), uploadImage);
function uploadImage(req, res, next) {
	return res.send({
		status: true,
		path: `${req.file.path}`,
	});
}
module.exports = router;
