window.onload = function(){
    $("#name").focus();
    document.getElementById('submit').addEventListener('click', provera);
}
function provera(e) {
    e.preventDefault();
    var checksout = true;
    var ok = [];
    var name = document.getElementById('name');
    var email = document.getElementById('email');   
    var subject = document.getElementById('subject');
    var textarea = document.getElementById('message');
    var nameError = document.getElementById('name-error');
    var emailError = document.getElementById('email-error');
    var subjectError = document.getElementById('subject-error');
    var textareaError = document.getElementById('taError');
    var regName = /^[A-Z][a-z]{2,}(\s[A-Z][a-z]{2,})+$/;
    var regEmail = /^[a-z]+((\.|\+|\_)[a-z]+)*@(gmail\.com|ict\.edu\.rs|yahoo\.com)$/;
    var regSubject = /^[A-Z][a-z]{2,}(\s[A-Z][a-z]{2,})*$/;
    
    if (email.value == "") {
        email.style.borderBottomColor = "#a30203";
        emailError.innerHTML = "Email is required!";
        checksout = false;
    }
    else if (!regEmail.test(email.value.trim())) {
        emailError.innerHTML = "Email not in the right format!";
        checksout = false;
    }
    else {
        ok.push(email.value.trim());
        emailError.innerHTML = "";
        email.style.borderBottomColor = "#abaca7";
    }
    if (name.value == "") {
        name.style.borderBottomColor = "#a30203";
        nameError.innerHTML = "Name is required!";
        checksout = false;
    }
    else if (!regName.test(name.value.trim())) {
        nameError.innerHTML = "Name not in the right format!";
        checksout = false;
    }
    else {
        ok.push(name.value.trim());
        nameError.innerHTML = "";
        name.style.borderBottomColor = "#abaca7";
    }
    if (subject.value == "") {
        subject.style.borderBottomColor = "#a30203";
        subjectError.textContent = "subject is required!";
        checksout = false;
    }
    else if (!regSubject.test(subject.value.trim())) {
        subjectError.innerHTML = "City not in the right format!";
        checksout = false;
    }
    else {
        ok.push(subject.value.trim());
        subjectError.innerHTML = "";
        subject.style.borderBottomColor = "#abaca7";
    }
    if (textarea.value == "") {
        textarea.style.borderBottomColor = "#a30203";
        textareaError.textContent = "subject is required!";
        checksout = false;
    }
    if (checksout) {
        document.getElementById('feedback').innerHTML = "<h2>Got it!</h2><h3> We'll keep you posted!</h3>";
        document.getElementById('formaSignup').reset();
    }
    else {
        document.getElementById('feedback').innerHTML = "";
    }
}