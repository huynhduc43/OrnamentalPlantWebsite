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

$(".custom-file-input").on("change", function() {
    var filename = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(filename);
});

function readOneURL(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            $('#previewMainImg').attr('src', e.target.result);
            $('#previewMainImg').show();
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        $('#previewMainImg').hide();
    }
}