exports.wrapAsync = (fn) => {
  return (req, res) => {
    return fn(req, res)
      .then((r) => {
        res.status(200).send(r);
      })
      .catch((err) => {
        console.log("custom error", err);
        res.status(400).send({ errorMessage: err.message });
      });
  };
};
