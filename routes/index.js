const routes = require('express').Router();

routes.get('/domain/:domain', (req, res, next) => {
  domain = req.params.domain;
  res.locals.connection.query(`CALL domainsearch('${domain}')`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
	});
})
routes.get('/search/:search', (req, res, next) => {
  search = req.params.search;
  res.locals.connection.query(`CALL urlSearch('%${search}%')`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
	});
})
routes.get('/lookup/:search', (req, res, next) => {
  search = req.params.search;
  res.locals.connection.query(`CALL urlLookup('${search}')`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
	});
})
routes.get('/groups', (req, res) => {
  res.locals.connection.query(`CALL groups()`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
	});
})
routes.get('/group/:groupid', (req, res) => {
  groupid = req.params.groupid;
  res.locals.connection.query(`CALL groupByID(${groupid})`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
	});
})
routes.get('/categories', (req, res) => {
  var query = 'CALL categories()';
  if (req.query.groupid) query = `CALL categoriesByGroupID(${req.query.groupid})`
  res.locals.connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
	});
})
routes.get('/category/:categoryid', (req, res) => {
  categoryid = req.params.categoryid;
  res.locals.connection.query(`CALL categoryByID(${categoryid})`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
	});
})
routes.get('/companies', (req, res) => {
  var query = 'CALL companies()';
  if (req.query.categoryid) query = `CALL companiesByCategoryID(${req.query.categoryid})`
  else if (req.query.groupid) query = `CALL companiesByGroupID(${req.query.groupid})`
  res.locals.connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
	});
})
routes.get('/company/:companyid', (req, res) => {
  companyid = req.params.companyid;
  res.locals.connection.query(`CALL companyByID(${companyid})`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
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
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
	});
})
routes.get('/product/:productid', (req, res) => {
  productid = req.params.productid;
  res.locals.connection.query(`CALL productByID(${productid})`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
	});
})
routes.all('/vote/:matchid/up', (req, res) => {
  matchid = req.params.matchid;
  res.locals.connection.query(`CALL voteup('${matchid}')`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
	});
})
routes.all('/vote/:matchid/down', (req, res) => {
  matchid = req.params.matchid;
  res.locals.connection.query(`CALL votedown('${matchid}')`, function (error, results, fields) {
    if (error) throw error;
    res.set({'content-type':'application/json'})
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
	});
})

module.exports = routes;
