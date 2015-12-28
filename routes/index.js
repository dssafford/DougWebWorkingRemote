/*
 * GET home page.
 */

var journalSchema = require('../schemas/journal');

module.exports = function (journals) {
	var journal = require('../journal');

	for(var number in journals) {
		journals[number] = journal(journals[number]);
	}

	var functions = {};

	functions.journal = function(req, res){
		var number = req.param('number');

		if (typeof journals[number] === 'undefined') {
			res.status(404).json({status: 'error in functions.journal'});
		} else {
			res.json(journals[number].getInformation());
		}
	};

	functions.saveJournal = function (req, res) {
		var timestamp = req.param('timestamp');

//		if (typeof journals[number] === 'undefined') {
//			res.status(404).json({status: 'error in saveJournal'});
//		} else {
			// journals[number].triggerArrive();
			// var record = new journalSchema(
			// 	journals[number].getInformation()
			// );

			console.log("directory=" + req.body.directory);

			var record = new journalSchema;
			record.timestamp = Date.now();
			record.machine = req.body.machine;
			record.directory = req.body.directory;
			record.project = req.body.project;
			record.comments = req.body.comments;

			record.save(function(err) {
				if (err) {
					console.log(err);
					res.status(500).json({status: 'failure'});
				} else {
					res.json({status: 'success'});
				}
			});

			res.json({status: 'done'});
//		}
	};




	// functions.saveJournal = function (req, res) {
	// 	var timestamp = req.param('timestamp');

	// 	if (typeof journals[number] === 'undefined') {
	// 		res.status(404).json({status: 'error in saveJournal'});
	// 	} else {
	// 		journals[number].triggerArrive();
	// 		var record = new journalSchema(
	// 			journals[number].getInformation()
	// 		);

	// 		record.save(function(err) {
	// 			if (err) {
	// 				console.log(err);
	// 				res.status(500).json({status: 'failure'});
	// 			} else {
	// 				res.json({status: 'success'});
	// 			}
	// 		});

	// 		res.json({status: 'done'});
	// 	}
	// };

functions.shit = function (req, res) {
	res.render('journalinput', {
		title: "Eat fuck"
	});

};
	functions.list = function (req, res) {
		res.render('list', {
			title: 'All Doug journals', 
			journals: journals});
	};

	functions.entriesByDate = function(req, res) {
		journalSchema.find()
		.setOptions({sort: 'timestamp'})
		.exec(function(err, journals) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {
				res.render('journals', {
					title: 'Journals',
					journals: journals
				});
			}
		});
	};

	return functions;
};