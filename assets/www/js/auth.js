function auth(institution){
	switch (institution){
		case "Newcastle University" :
			shibIsAuthed()
			break;
		case "Hogwarts School of Witchcraft and Wizardry" :
			alert("No muggles allowed, thank you very much.")
			break;
		case "Police Academy 3" :
			alert("Come on, choose a university...")
			break;
	}
}
