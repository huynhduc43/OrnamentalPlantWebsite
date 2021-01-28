function setActiveForCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    const catID = urlParams.get('catID');
    const childCatID = urlParams.get('childCatID');
    
    if(childCatID) {
        var els = document.querySelectorAll("a[href^='http://domain.com']");
    } else if (catID) {

    } else {

    }
}

$(document).ready(function(){
    //alert("Hello");
    setActiveForCategory();
});