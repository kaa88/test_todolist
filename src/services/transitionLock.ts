let isLocked = false

export function transitionIsLocked(timeout = 0) {
	let result = isLocked
	if (isLocked === false) {
		isLocked = true
		setTimeout(function(){
			isLocked = false
		}, timeout)
	}
	return result
}
