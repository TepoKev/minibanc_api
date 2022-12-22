export const tokenVerify = (req, res, next) => {
  const token = req.headers["authorization"];
  if (typeof token !== "undefined") {
    req.token = token;
    console.log(token);
    next();
  } else {
    return res.status(403);
  }
};
