import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js"
import {getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js"

const appSettings ={
    databaseURL :"https://mobileapp-cf22e-default-rtdb.firebaseio.com/"
}
const app =initializeApp(appSettings)
const database = getDatabase(app)
const shopping=ref(database,"shoppingList")

const inputEl=document.getElementById("input-field")
const saveBtn=document.getElementById("save-button")
let shoppingList=document.getElementById("shopping-l")


saveBtn.addEventListener("click",function(){
    if(inputEl.value==="")
        {
            alert("Enter something!")
        }
   
     else if(inputEl.value){       
        

    push(shopping,inputEl.value)
    let inputValue=inputEl.value
    clearInput()  }
})
function listMaker(inputValue){
let itemId=inputValue[0]
let itemV=inputValue[1]
let newEl=document.createElement("li")
newEl.textContent=itemV
shoppingList.append(newEl)
newEl.addEventListener("dblclick",function(){
let loc=ref(database,`shoppingList/${itemId}`)
remove(loc)

})

}
onValue(shopping,function(snapshot){
    if(snapshot.exists()){
    let sharr =Object.entries(snapshot.val())
clearShoppingList()

    for (let i=0;i<sharr.length;i++)
    {
        let curItem=sharr[i]
        listMaker(curItem)
    }
}
else{
    shoppingList.innerHTML="no Items"
}}
)
function clearInput(){
    inputEl.value=" "

}
function clearShoppingList(){
    shoppingList.innerHTML=" "

}
