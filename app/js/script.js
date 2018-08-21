// function () {

	var fs = false;

	try {
		fs = require('fs');
	} catch (e) {
		alert(e);
	}


	fs.readFile('./grammar/grammar.txt', "utf8", function (err, data) {
		if (err) throw err;
		grammar(data);
	});



	function grammar(stringRules) {

		var buffer = '',
		curRule = '', 
		empty = "e",

		term = [],
		notTerm = [],
		rule = [
		{
			"left": '',
			"right": [],
			"start": [],
		}
		],
		start = '';

		var row = 0;

		(function loadRules () {
			for (var i=0; i<stringRules.length; i++) {
				var sym = stringRules[i];

				switch (sym) {
					case "\n":
						rule[row].right.push(buffer);
						buffer = '';
						curRule = '';
						row++;
					break;
					case "\r":
					break;
					case "|":
						row++;
						rule[row] = {};
						rule[row].start = [];
						rule[row].right = [];
						rule[row].left = curRule;
					break;
					case "\u0020":
						if (curRule != '') {
							if (buffer != '->' && buffer != '') {
								if (notTerm.indexOf(buffer) <= 0)
									if (term.indexOf(buffer) <= 0)
										term.push(buffer);

								rule[row].right.push(buffer);
							}
							buffer = '';
						} else {
							curRule = buffer;
							rule[row] = {};
							rule[row].start = [];
							rule[row].right = [];
							rule[row].left = buffer;

							do {
								var indxFindRule = term.indexOf(curRule);
								if (indxFindRule >= 0) {
									term.splice(indxFindRule,1);
									if (notTerm.indexOf(curRule) < 0) {
										notTerm.push(curRule);
									}
								} else {
									notTerm.push(curRule);
									break;
								}
							} while (term.indexOf(curRule) >= 0);

							buffer = '';
						}
					break;
					default:
						buffer = buffer + sym;

						if (stringRules.length == i+1) {
							rule[row].right.push(buffer);
							if (notTerm.indexOf(buffer) <= 0)
								if (term.indexOf(buffer) <= 0)
									term.push(buffer);
						}
					break;
				}
			}
		})();

		(function symPrev() {

			var check = false;

			do {
				check = true;
				for (var i=0; i<rule.length; i++) {
					if (term.indexOf(rule[i].right[0]) >= 0) {
						if (rule[i].start.length === 0) {
							rule[i].start.push(rule[i].right[0]);
							check = false;
						}
					} else {
						for (var j=0; j<rule.length; j++) {
							if (rule[j].left.indexOf(rule[i].right[0]) >= 0 && rule[j].start.length != 0) {
								for (var k=0; k<rule[j].start.length; k++) {
									if (rule[i].start.indexOf(rule[j].start[k]) < 0) {
										rule[i].start.push(rule[j].start[k]);
										check=false;
									}
								}
							}
						}
					}
				}
			}
			while (check === false);
		})();

		console.log(rule);
		console.log(term);
		console.log(notTerm);



	}

	// var LL1 = new grammar();



// } (); 

