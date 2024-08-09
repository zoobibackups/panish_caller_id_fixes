const express = require("express");
const router = express.Router();
const networkService = require("../services/network.service");
// routes
router.post("/", getNetworkData);
router.get("/", checkServer);
router.put("/", checkServer);
router.delete("/", checkServer);
module.exports = router;

function getNetworkData(req, res, next) {
	networkService
		.getNetwork(req.body)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => [res.status(404).json(err)]);
}

function checkServer(req, res, next) {
	res.status(404).json({
		status: false,
		message: "THIS METHOD IS NOT ALLOWED",
	});
}
