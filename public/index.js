window.onload = function() {
  getData();
}
document.getElementById("form-value").oninput=function(){
  var maxLength = parseInt(this.getAttribute('maxlength'));
  var currentLength = this.value.length;
  var remainingLength = maxLength - currentLength;
  remainTextDOM(remainingLength);
  
}
document.getElementById("confirm").onclick=function() {
  if(checkElementIsNotNone()==true){
    var params='name='+document.getElementById("form-name").value+'&confirm='+document.getElementById("form-value").value+'&date='+formatOfDate();
    console.log(params)

    // 使用AJAX发送表单数据
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://yfd-server.run.goorm.site/insert"); // 替换为你的服务器端URL
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    xhr.send(params);
    xhr.onload = function() {
      getData();
      if (xhr.status === 200) {
        alert("成功！")
      }
    };
  }
  else{
    alert("昵称和内容不能为空！")
  }
}
window.addEventListener('DOMContentLoaded', function() {
  var inputs = document.getElementsByClassName('inner');

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
      document.addEventListener('click', handleOutsideClick);
    });
    
    inputs[i].addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
      document.removeEventListener('click', handleOutsideClick);
    });
  }

  function handleOutsideClick(event) {
    if (!event.target.closest('#label-text')) {
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].parentElement.classList.remove('focused');
      }
      document.removeEventListener('click', handleOutsideClick);
    }
  }
});
function checkElementIsNotNone(){
  if(document.getElementById("form-name").value==""){
    return false;
  }
  else if (document.getElementById("form-value").value==""){
    return false;
  }
  else{
    return true;
  }
}
function getData(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://yfd-server.run.goorm.site/get",false); 
    xhr.onload = function() {
      if (xhr.status === 200) {
        let result=xhr.responseText;
        let split_1=result.split("|");
        
        document.getElementById("getList").innerHTML=""
        for(let i = 0; i < split_1.length-1; i++){
            let split_2=split_1[i].split("_");
            let object=document.createElement("li")
            object.innerHTML="<label id='text-confirm'>"+split_2[0]+" · "+split_2[1]+"</label><div style='padding:2px 0px;'></div><label style='color:#aaaaaa'>"+split_2[2]+"</label><hr />";
            document.getElementById("getList").appendChild(object);
        }
        
      }
    };
    xhr.send();
    
}
function remainTextDOM(remainingLength){
  var charCountElement = document.getElementById('char-count');
  if(remainingLength>0){  
    charCountElement.textContent = '还可输入: ' + remainingLength;
    charCountElement.classList.remove("color-red")
  }
  else{
    charCountElement.textContent = '字数达到上限！';
    charCountElement.classList.add("color-red");
  }
}
function formatOfDate(){
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  month = month<10 ? '0'+ month : month;
  day = day<10 ? "0" + day: day;
  hour = hour < 10 ? "0" + hour: hour;
  minute = minute < 10 ? "0" + minute: minute;
  second = second < 10 ? "0" + second: second;

  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}