// Update the element value and scroll to the bottom.
function setElementValueAndScrollDown(id, value){
    let element = document.getElementById(id)
    element.value = value;
    element.scrollTop = element.scrollHeight;
}
