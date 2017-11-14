const path = require('path')
const fs = require('fs')

const getArg = () => {
  if (process.argv.length === 3) {
    return process.argv[2]
  } else {
    return error('Invalid args')
  }
}

const error = (message) => {
  console.log('error: ' + message)
  console.log('usage: node ' + path.basename(__filename) + " 'filepath'")
  return process.exit(0)
}

const readFile = (filepath, cb) => {
	fs.readFile(filepath, (err, ctn) => {
	  	  if (err || !ctn || !ctn.toString()) {
	  		  return cb(err || "Empty file", null)
	  	  } else {
	  		  command = ctn.toString().replace(/#.*\n/g, '\n')
	  		  return cb(null, command)
	  	  }
    })
}

const getElemList = (file) => {
	var queries = file.match(/\?(.*)\n/)

	if (queries && queries[1] && queries[1].match(/[A-Z]*/))
	console.log(file.match(/\?(.*)\n/));
}

const main = () => {

  readFile(getArg(), (err, content) => {
	  	if (err) {
			return error(err)
		}
		else {
			getElemList(content)
		}
  	})
}

main()
