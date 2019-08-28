const l2norm = require( 'compute-l2norm' );

function split_labels(categories){
	let _categories = new Map(); 
	for([name,confidence] of categories){
		//labels = name.split('/').map(d => `'${d}'`);
		labels = name.split('/');
		labels.forEach(label => {
			//console.log(label);\
			_categories.set(label,confidence);
		});
	}
	return _categories;
}

function similarity(categories1,categories2){
	//Cosine similarity of the categories treated as sparse vectors.
	categories1 = split_labels(categories1)
	categories2 = split_labels(categories2)

	let norm1 = l2norm(Array.from(categories1.values()));
	let norm2 = l2norm(Array.from(categories2.values()));

	if(norm1 == 0 || norm2 == 0){
		return 0.0;
	}

	let dot = 0.0;

	for([name, confidence] of categories1){
		dot += confidence * categories2.get(name)
	}

	return dot / (norm1 * norm2);

}

function query(all_labels,label,n_top=3){
	let similarities = [];
	

	
}

let dictionary = new Map();
dictionary.set('Computers/Electronics', 0.876);
dictionary.set('Computers/Harry', 0.76);
dictionary.set('Politics/Comic', 0.5);

let dictionary1 = new Map();
dictionary1.set('Computers/Electronics', 0.876);
dictionary1.set('Computers/Harry', 0.76);
dictionary1.set('Politics/Comic', 0.5);

console.log(similarity(dictionary1,dictionary))