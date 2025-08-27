const errorHandler = (app) => {
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      error: err.message,
      details: req.app.get("env") === "development" ? err : undefined,
    });
  });
};

export default errorHandler;
