
[input]{
	# Questiion2
	whathever markdown you whan

	opt{name: quetion2, response:"two"}[
		{"value": "one",label: "this is box 1"},
		{"value": "two",label: "this is box 2"},
		{"value": "three",label: "this is box 2"}
	]
}

---

[input]{
	
	# somethinhg else
	whathever markdown you whan

	box{name: quetion1, response: ["one", "three"]}{
		[]{"value": "one",label: "this is box 1"}
		[]{"value": "two",label: "this is box 2"}
		[]{"value": "three",label: "this is box 2"}
	}


}
