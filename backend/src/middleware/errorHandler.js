module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'Error',
    message: err.message || 'Terjadi kesalahan internal pada server'
  });
};