var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var dataWrapper = document.getElementById("tBody");
var searchInput = document.getElementById("search")
var allbookMarks = [];
var bookMarkToBeUpdated ;

if(localStorage.allbookMarks !=null){
  allbookMarks=JSON.parse(localStorage.allbookMarks);
  displayData(allbookMarks)
}


function addBookMarks (){
    if(validateUrl() == true && siteNameInput.value !=""){
      console.log("addBookMarks");
      var newBookMark = {
        siteName:siteNameInput.value,
        siteUrl:siteUrlInput.value,
      }
      allbookMarks.push(newBookMark);
      localStorage.setItem('allbookMarks',JSON.stringify(allbookMarks));
      console.log(allbookMarks);
      displayData(allbookMarks);
      clearInputs()
    }else{
      Swal.fire({
        title: "Invalid Data?",
        text: `${siteNameInput.value =="" ?"Please Enter site Name":""} ${validateUrl() == true? "":"Please Enter Valid Url"}`,
        icon: "error"
      });
    }
   
}

function displayData(arr){
    var cartoona =""
    for(var i =0 ; i < arr.length ; i++){
      cartoona+= `
      <tr>
            <td>${i+1}</td>
            <td>${arr[i].siteName}</td>
            <td><a class="btn btn-primary" href="${arr[i].siteUrl}" target="blank">Visite</a></td>
            <td><button class="btn btn-success" onclick="preUpdate(${i})">Update</button></td>
            <td><button class="btn btn-danger" onclick="deleteBookMark(${i})">Delete</button></td>
          </tr>
          `;
    }
    dataWrapper.innerHTML=cartoona
}


function preUpdate(index){
  bookMarkToBeUpdated =index
  siteNameInput.value= allbookMarks[index].siteName;
  siteUrlInput.value= allbookMarks[index].siteUrl;
  displayUpdateBtn()
  console.log(bookMarkToBeUpdated);
}

function displayUpdateBtn(){
  document.getElementById('submitBtn').classList.replace('d-block','d-none');
  document.getElementById('updateBtn').classList.replace('d-none','d-block');

}


function displaysubmitBtn(){
  document.getElementById('submitBtn').classList.replace('d-none','d-block');
  document.getElementById('updateBtn').classList.replace('d-block','d-none');

}


function finalUpdate(){
  // allbookMarks
  var newBookMark ={
    siteName:siteNameInput.value,
    siteUrl:siteUrlInput.value,
  };
  allbookMarks.splice(bookMarkToBeUpdated , 1 , newBookMark)
  localStorage.setItem('allbookMarks',JSON.stringify(allbookMarks));
  displayData(allbookMarks);
  displaysubmitBtn()
  clearInputs()
}


function deleteBookMark (index){
    allbookMarks.splice(index,1)
    localStorage.setItem('allbookMarks',JSON.stringify(allbookMarks));
    displayData(allbookMarks)
}
function clearInputs(){
  siteNameInput.value=''
  siteUrlInput.value=''

}
searchInput.addEventListener('input',function(e){
  console.log(e.target.value);
  var resultOfSearch =[]
  for(var i = 0 ; i<allbookMarks.length ; i++ ){
    if(allbookMarks[i].siteName.toLowerCase().includes(e.target.value.toLowerCase())){
      resultOfSearch.push(allbookMarks[i])
    }
  }
  displayData(resultOfSearch)
})


function validateUrl(){
      var pattern = /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9@:%.\+#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.#?&//=]*)$/;
    return pattern.test(siteUrlInput.value);
}











