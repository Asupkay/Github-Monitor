const constructorMethod = (app) => {
  app.use('/', (req, res) => {
    res.json({message: 'Not yet implemented'});
  });
  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not a valid route'
    });
  });
}

module.exports = constructorMethod;
