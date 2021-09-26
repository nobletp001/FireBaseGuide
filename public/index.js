const LogOutLink = document.querySelectorAll(".LogOut");
const LogInLink = document.querySelectorAll(".LogIn");
const UserEmail = document.getElementById("UserEmail");
const setUI=(user)=>{
  if(user){


 db.collection("users")
   .doc(user.uid)
   .onSnapshot((doc) => {
    //  console.log(doc.data().userUrl);

     UserEmail.innerHTML = `<div style="color: black; font-size: 1rem; font-weight: bold;"> Login As ${
       user.email
     }


 
<div style="color: black; font-size: 1rem; font-weight: bold; padding-top: 0.5rem;"> First Name :${
       doc.data().FirstName
     }
</div >
<div style="color: black; font-size: 1rem; font-weight: bold; padding-top: 0.5rem;">Last Name: ${
       doc.data().LastName
     }</div>
<div style="color: black; font-size: 1rem; font-weight: bold; padding-top: 0.5rem;">Bio: ${
       doc.data().Bio
     }</div>

</div>


`;
   });
 
LogInLink.forEach((item) => (item.style.display = "block"));
LogOutLink.forEach((item) => (item.style.display = "none"));
  }else{
  
LogInLink.forEach((item) => (item.style.display = "none"));
LogOutLink.forEach((item) => (item.style.display = "block"));
UserEmail.innerHTML=''
  }
}


 const displayGuide = document.getElementById("showCard");

 const setGuide= (data)=>{
     if(data.length){
  let html = "";
  data.forEach((dat) => {
    const guide = dat.data();
    // console.log(dat.id)
  let li = `
    
<div class="accordion md-accordion accordion-1" id="accordionEx23" role="tablist">
  <div class="card">
    <div class="card-header  z-depth-1" role="tab" id="heading96">
      <h5 class="text-uppercase mb-0 py-1">
        <a class="white-text font-weight-bold " data-toggle="collapse" href="#ID${dat.id}" aria-expanded="true"
          aria-controls="collapse96">
          ${guide.Title}
        </a>
      </h5>
    </div>
    <div id="ID${dat.id}" class="collapse show " role="tabpanel" aria-labelledby="heading96"
      data-parent="#accordionEx23">
      <div class="card-body">
        <div class="row my-4">
          <div class="col-md-8">
            <h2 class="font-weight-bold mb-3 black-text">${guide.Name}</h2>
            <p class="">${guide.Content}</p>
           
          </div>
         
        </div>
      </div>
    </div>
  </div>
  `
  html +=li
  });
  displayGuide.innerHTML = html;
     }
else{
  displayGuide.innerHTML = `<div  style="font-size: 3rem; text-align: center;">Login to Read Movie Details</div>`;

}

 }
