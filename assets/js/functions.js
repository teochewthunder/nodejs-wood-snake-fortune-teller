function bdChange() {
	var errorContainer = document.getElementById("errorContainer");
	var txtBd = document.getElementById("txtBd");	
	var formFortune = document.getElementById("formFortune");
	var fortuneContainer = document.getElementById("fortuneContainer");

	var d = new Date();
	var bd = new Date(txtBd.value);

	if (bd.getTime() > d.getTime()) {
		errorContainer.innerHTML = "Error! You can't possibly be born in the future.";
	} else {
		errorContainer.innerHTML = "";
		fortuneContainer.innerHTML = "Please wait..."
		formFortune.submit();
	}
}