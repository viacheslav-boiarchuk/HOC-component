/**
 * Created by user on 19.11.2016.
 */
import jsonp from 'jsonp';

function getTranslates(word){
	return new Promise(function(resolve, reject) {
		jsonp(`https://glosbe.com/gapi/translate?from=eng&dest=rus&format=json&phrase=${word}&pretty=true&pageSize=1`,fn);
		function fn(error, data){
			resolve(data);
		}
	});

}

export default getTranslates;

// npm jsonp