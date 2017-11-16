const path = require('path')
const fs = require('fs')

exports.getArg = () => {
  if (process.argv.length === 3) {
    return process.argv[2]
  } else {
    return error('Invalid args')
  }
}

exports.readFile = (filepath, cb) => {
	fs.readFile(filepath, (err, ctn) => {
	  	  if (err || !ctn || !ctn.toString()) {
	  		  return cb(err || "Empty file", null)
	  	  } else {
	  		  command = ctn.toString().replace(/#.*\n/g, '\n')
	  		  return cb(null, command)
	  	  }
    })
}

exports.getElemList = (file) => {
	file = file.replace(/ /g, '')
	file = file.replace(/\n\n/g, '\n')
	var queries = file.match(/\?([A-Z]*)\n/)
	var facts = file.match(/\=([A-Z]*)\n/)
	var regex = /[A-Z+|^!()]+[=><]+[A-Z+|^!()]+/g
	var rules = []
	var text
	var array = {
		rules: [],
		queries: [],
		facts: {}
	}

	while ((text = regex.exec(file)) !== null) {
	  rules.push(text[0])
	}

	rules.forEach((rule) => {
		var symbol = rule.match(/[A-Z+|^!()]+([=><]+)[A-Z+|^!()]+/)[1]
		var part1 = rule.split(/[=<>]+/)[0]
		var part2 = rule.split(/[=<>]+/)[1]

		array.rules.push({
			cond: part1,
			symbol: symbol,
			result: part2
		})
	})

	if (queries && queries[1] && queries[1].match(/[A-Z]*/)) {
		queries = queries[1].trim()
		for (var x = 0; x < queries.length; x++) {
			array.queries.push(queries.charAt(x))
		}
	}
	else
		return error('No query')

	if (facts && facts[1] && facts[1].match(/[A-Z]*/)) {
		facts = facts[1].trim()
		for (var x = 0; x < facts.length; x++) {
			array.facts[facts.charAt(x)] = {state: true}
		}
	}

	return array
}
