const error = require('./srcs/error.js')
const initDatas = require('./srcs/initDatas.js')
const check = require('./srcs/check.js')

const main = () => {
	var info = null

  initDatas.readFile(initDatas.getArg(), (err, content) => {
	  	if (err) {
			return error(err)
		}
		else {
			info = initDatas.getElemList(content)
			while(!check.checkFillQueries(info)) {
				for (var x = 0; x < info.rules.length; x++) {
					check.checkConditions(info.rules[x].cond, info)
				}
			}
		}
  	})
}

main()
