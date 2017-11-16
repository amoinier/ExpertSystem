exports.checkConditions = (cond, info) =>{
	if ((cond.length == 1 || (cond.length == 2 && cond.charAt(0) == '!'))) {
		if (cond.charAt(0) == '!') {
			if (info.facts[cond.chatAt(1)]) {
				return !info.facts.state
			}
			else {
				return []
			}
		}
		else {
			if (info.facts[cond]) {
				return info.facts.state
			}
			else {
				return []
			}
		}
	}
	else if (cond.match(/\(([A-Z+|^!()]+)\)/g)) {
		const regex = /\(([A-Z+|^!()]+)\)/g
		var tmp
		var conditions = []
		while ((tmp = regex.exec(cond)) !== null) {
			conditions.push(exports.returnCond(tmp[1], info))
		}
		return tmp
	}
	else {
		return []
	}
}

exports.returnCond = (cond, info) => {
	const match = cond.match(/([A-Z!])([+|^!()]+)([A-Z!])/)
	var value

	if (match) {
		if (typeof exports.isNeg(match[1], info) === 'boolean' && typeof exports.isNeg(match[3], info) === 'boolean') {
			switch(match[2]) {
				case "+":
					value = exports.isNeg(match[1], info) && exports.isNeg(match[3], info)
					break

				case "|":
					value = exports.isNeg(match[1], info) || exports.isNeg(match[3], info)
					break

				case "^":
					value = (exports.isNeg(match[1], info) && !exports.isNeg(match[3], info)) || (exports.isNeg(match[3], info) && !exports.isNeg(match[1], info))
					break

				default:
					value = []
					break
			}

			return value
		}
		else {
			return []
		}
	}
	else {
		return []
	}
}

exports.isNeg = (key, info) => {
	if (key.length == 1) {
		if (info.facts[key]) {
			return info.facts[key].state
		}
		else {
			return []
		}
	}
	else {
		if (info.facts[key.charAt(1)]) {
			return !info.facts[key.charAt(1)].state
		}
		else {
			return []
		}
	}
}

exports.checkFillQueries = (info) => {
	var check = []
	info.queries.forEach((quer) => {
		if (info.facts[quer]) {
			check.push(true)
		}
		else {
			return
		}
	})

	if (check.length == info.queries.length) {
		return true
	}
	else {
		return false
	}
}
