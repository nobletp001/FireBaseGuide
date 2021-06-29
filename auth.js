auth
  .onAuthStateChanged((user) => {
    // console.log(user)
    if (user) {
      db.collection("Guide").onSnapshot((snapshot) => {
        setGuide(snapshot.docs);
        setUI(user);
      }, err=>{console.log(err.message)});
   
    } else {
      setGuide([]);
      setUI();
    }
  })


const signupForm = document.querySelector("#CreateSubmit");
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    // get user information
    const email = signupForm["defaultForm-email"].value;
    const password = signupForm["defaultForm-pass"].value;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        // console.log(user.uid)
         db.collection("users").doc(user.uid).set({
          FirstName: signupForm["defaultForm-fm"].value,
          LastName: signupForm["defaultForm-ln"].value,
          Bio: signupForm["defaultForm-Bio"].value
        });
         if(user){

signupForm.reset();
  $(".modal").modal("hide");
  window.setTimeout(
    'alert("Account have successful created");window.close();',
    1000
  );
  
        }

        console.log("log in successful");

        // alert("Account Created Successful");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        document.getElementById("errorMsg").innerHTML = errorMessage;
      });

})


const logOut = document.getElementById("LogOut-Me");
logOut.addEventListener('click', (e)=>{
    e.preventDefault();

    var txt;
    if (confirm("Are you sure you want to logout")) {
    auth.signOut().then(() => {
      // console.log("sign Out");
       window.setTimeout(
         'alert("You Have successfully Log Out");window.close();',
         1000
       );
    }).catch((error)=>{
      console.log(error)
    });
    } else {
      txt = "You pressed Cancel!";
    }
    
})



const logInform = document.getElementById("CreateLogin");
 logInform.addEventListener('submit',(e)=>{
   e.preventDefault();
   const emailLogin = document.getElementById("Loginemail").value;
   const passwordLogin = document.getElementById("Loginpass").value;
   auth
     .signInWithEmailAndPassword(emailLogin, passwordLogin)
     .then((userCredential) => {
       var user = userCredential.user;
       if (user){
logInform.reset();
  $(".modal").modal("hide");
  window.setTimeout(
    'alert("You Have successfully Login into your Account");window.close();',
    1000
  );
       } 
     })
     .catch((error) => {
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log(errorCode, errorMessage);
        document.getElementById("errorMsgLogin").innerHTML = errorMessage;

     });
 }) 

  // Create Guide section

  const Guide = document.getElementById("GuideForm");

  Guide.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = Guide["formName"].value;
    const title = Guide["formTitle"].value;
    const content = Guide["formContent"].value;
if(name==''){
document.getElementById('form1').innerHTML= 'Name is required'
}
else if(title==''){
document.getElementById("form2").innerHTML = "title is required";

}
else if (content==''){
document.getElementById("form3").innerHTML = "Content is required";

}else{
 db.collection('Guide').add({
   Name:name,
   Title:title,
   Content:content
 }).then((e)=>{
      Guide.reset();
      $(".modal").modal("hide");
window.setTimeout(
          'alert("Guide submited successfully");window.close();',
          10
        );
 }).catch((err)=>{
   console.log(err.message)
 })
}
  })

