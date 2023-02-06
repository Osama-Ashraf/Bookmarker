var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('url');
var addBtn = document.getElementById('addMark');
var records = document.getElementById('records');
var confirmUptadeBtn = document.getElementById('confirmUptadeBtn');
var discardUptadeBtn = document.getElementById('discardUptadeBtn');
var buttons = document.getElementById('buttons');

var marksContainer=[];

if(JSON.parse(localStorage.getItem('Marks')) != null){
    marksContainer = JSON.parse(localStorage.getItem('Marks'));
    display(marksContainer);
}

var nameAlert = document.getElementById('nameAlert');
var urlAlert = document.getElementById('urlAlert');

var regex = /./;
function validateName(context){

    if(regex.test(siteName.value)){
        var bool = false;
        for(var i =0; i<marksContainer.length; i++){
            if(siteName.value == marksContainer[i].name){
                if(context == i){
                    continue;
                }
                else{
                    bool=true;
                    break;
                }
            }
        }
        if(bool){
            nameAlert.innerHTML = "This Bookmark already exists";
            nameAlert.classList.replace("d-none","d-block");
        }
        else{
            nameAlert.classList.replace("d-block","d-none");
            return true;
        }
    }
    else{
        nameAlert.innerHTML = "This field is required";
        nameAlert.classList.replace("d-none","d-block");
    }

}

function validateUrl(context){
        if(regex.test(siteUrl.value)){
            var bool = false;
            for(var i =0; i<marksContainer.length; i++){
                if(siteUrl.value == marksContainer[i].link){
                    if(context == i){
                        continue;
                    }
                    else{
                        bool=true;
                        break;
                    }
                    
                }
            }
            if(bool){
                urlAlert.innerHTML = "This URL already exists";
                urlAlert.classList.replace("d-none","d-block");
            }
            else{
                urlAlert.classList.replace("d-block","d-none");
                return true;
                
            }
        }
        else{
            urlAlert.innerHTML = "This field is required";
            urlAlert.classList.replace("d-none","d-block");
        }
    
}
 

function addMark(){
    if(validateName() & validateUrl()){

        var mark ={
            name: siteName.value,
            link: siteUrl.value
        }
        
        marksContainer.push(mark);
        localStorage.setItem('Marks' , JSON.stringify(marksContainer));
        clearForm();
        display(marksContainer);
    }

}

function display(arr){
    var cartona = ``;
    for(var i = 0; i < arr.length; i++){
        cartona+= `<div class="mt-5 form d-flex mb-3">
        <h4 class="w-50 m-2">${arr[i].name}</h4>
        <button class="btn btn-info col-1  m-2"><a href="${arr[i].link}" target="_blank">Visit</a></button>
        <button onclick="uptadeMark(${i});" class="btn btn-warning col-1 m-2">Uptade</button>
        <button onclick="deleteMark(${i});" class="btn btn-danger col-1 m-2">Delete</button>
    </div>`;
    }

    records.innerHTML =cartona;
}
switchLayout(true);

function switchLayout(bool,i){
    if(bool){
        nameAlert.classList.replace("d-block","d-none");
        urlAlert.classList.replace("d-block","d-none");
        buttons.innerHTML = `<button onclick="addMark();" class="btn btn-primary w-25 mx-auto mt-5" id="addMark">Add Bookmark</button>`;
        records.classList.add('d-block');
        records.classList.remove('d-none');
        display(marksContainer);
        
    }
    else{
        nameAlert.classList.replace("d-block","d-none");
        urlAlert.classList.replace("d-block","d-none");
        records.classList.remove('d-block');
        records.classList.add('d-none');
        buttons.innerHTML = `<button onclick="confirmUptade(${i});" class="btn btn-warning d-block w-25 mx-auto mt-5" id="confirmUptadeBtn">Confirm Uptade</button>
        <button onclick="disacrdUptade();" class="btn btn-danger w-25 mx-auto mt-5" id="discardUptadeBtn">Discard Uptade</button>`;
    }
}

function confirmUptade(i){
    if(validateName(i) & validateUrl(i)){
        marksContainer[i].name = siteName.value;
        marksContainer[i].link = siteUrl.value;
        localStorage.setItem('Marks' , JSON.stringify(marksContainer));
        switchLayout(true);
        clearForm();
    }
    

}

function uptadeMark(i){
    pullDataToForm(i);
    switchLayout(false,i);
}

function disacrdUptade(){
    switchLayout(true);
    clearForm();
}

function pullDataToForm(i){
    siteName.value = marksContainer[i].name;
    siteUrl.value = marksContainer[i].link;
}

function deleteMark(i){
    if(confirm('Confirm delete')){
        marksContainer.splice(i,1);
        localStorage.setItem('Marks' , JSON.stringify(marksContainer));
        display(marksContainer);    
    }
    
}

function clearForm(){
    siteName.value ='';
    url.value ='';
}