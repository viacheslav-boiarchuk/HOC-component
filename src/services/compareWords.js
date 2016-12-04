/**
 * Created by user on 19.11.2016.
 */
function compare(word, translation){

	function checkValidValue(elem){
		if (elem.phrase) {
			return elem.phrase.text === word;
		}
	}

	return translation.tuc.some(checkValidValue);
}

export default compare;