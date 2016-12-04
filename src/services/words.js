/**
 * Created by user on 19.11.2016.
 */
function getWords(){
	return fetch('http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=idiom&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5')
		.then(data => data.json()).then(
		data => {
			return (data)
		},
		data => {
			throw new Error(data);
		}
	)
}

export default getWords;