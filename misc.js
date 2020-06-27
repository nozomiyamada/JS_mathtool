// convert base m into n
// return value is String e.g. "1ac"
function convert_base(num, base_from, base_to){
	let temp = parseInt(num, base_from) // m -> 10
  return temp.toString(base_to) // m -> n
}

