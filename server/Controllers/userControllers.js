const HttpError = require("../Middleware/http-error");
const data = require("./data");
const getDetails = (req, res, next) => {
  const id = req.params?.id;
  if (data.data.level2.filter((d) => d.id == id).length === 0) {
    return next(new HttpError("Not found", 404));
  }
  res.json({ details: data.data.level2.filter((d) => d.id == id) }).status(200);
};

const getInitialDetails = (req, res, next) => {
  res.json({ details: data.data.level1 }).status(200);
};

exports.getDetails = getDetails;
exports.getInitialDetails = getInitialDetails;
