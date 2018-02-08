const routes = require('express').Router();

routes.get('/domain/:domain', (req, res, next) => {
  domain = req.params.domain;
  res.locals.connection.query(`CALL domainsearch('${domain}')`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.json(results[0])
	});
})
routes.get('/search/:search', (req, res, next) => {
  search = req.params.search;
  res.locals.connection.query(`CALL urlSearch('%${search}%')`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.json(results[0])
	});
})
routes.get('/lookup/:search', (req, res, next) => {
  search = req.params.search;
  res.locals.connection.query(`CALL urlLookup('${search}')`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
    if (results[0].length == 0) {
      res.status(404);  
    }
		res.json(results[0])
	});
})
routes.get('/groups', (req, res) => {
  res.locals.connection.query(`CALL groups()`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.json(results[0])
	});
})
routes.get('/groups/:groupid', (req, res) => {
  groupid = req.params.groupid;
  res.locals.connection.query(`CALL groupByID(${groupid})`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.json(results[0])
	});
})
routes.get('/categories', (req, res) => {
  var query = 'CALL categories()';
  if (req.query.groupid) query = `CALL categoriesByGroupID(${req.query.groupid})`
  res.locals.connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.json(results[0])
	});
})
routes.get('/categories/:categoryid', (req, res) => {
  categoryid = req.params.categoryid;
  res.locals.connection.query(`CALL categoryByID(${categoryid})`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.json(results[0])
	});
})
routes.get('/companies', (req, res) => {
  var query = 'CALL companies()';
  if (req.query.categoryid) query = `CALL companiesByCategoryID(${req.query.categoryid})`
  else if (req.query.groupid) query = `CALL companiesByGroupID(${req.query.groupid})`
  res.locals.connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.json(results[0])
	});
})
routes.get('/companies/:companyid', (req, res) => {
  companyid = req.params.companyid;
  res.locals.connection.query(`CALL companyByID(${companyid})`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.json(results[0])
	});
})
routes.get('/products', (req, res) => {
  var query = 'CALL products()';
  if (req.query.companyid) query = `CALL productsByCompanyID(${req.query.companyid})`
  else if (req.query.categoryid) query = `CALL productsByCategoryID(${req.query.categoryid})`
  else if (req.query.groupid) query = `CALL productsByGroupID(${req.query.groupid})`
  res.locals.connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.json(results[0])
	});
})
routes.get('/products/:productid', (req, res) => {
  productid = req.params.productid;
  res.locals.connection.query(`CALL productByID(${productid})`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.json(results[0])
	});
})
routes.all('/vote/:matchid/up', (req, res) => {
  matchid = req.params.matchid;
  res.locals.connection.query(`CALL voteup('${matchid}')`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.json(results[0])
	});
})
routes.all('/vote/:matchid/down', (req, res) => {
  matchid = req.params.matchid;
  res.locals.connection.query(`CALL votedown('${matchid}')`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.json(results[0])
	});
})

module.exports = routes;
