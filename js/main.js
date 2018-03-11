//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

 
//Save bookmarks
function saveBookmark(e) {
    //Get values from form
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    //Check if valid input
    if (!validateForm(siteName, siteUrl)){
        return false;
    }

    //Create bookmark object
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    //Add to local storage if local storage empty
    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }
    else {
        //get bookmarks from local storage if they exist
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }
    //reset form after submit
    document.getElementById('myForm').reset();
    
    //refresh page with new bookmarks
    fetchBookmarks();

    //prevent form submitting
    e.preventDefault();

}

//Delete bookmarks
function deleteBookmark(url) {
    //Get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop through and find the one for deleting
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            //remove from array
            bookmarks.splice(i, 1);

        }
    }
    //reset local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    //refresh items on page
    fetchBookmarks();

}

//update bookmarks to the screen
function fetchBookmarks() {
    //get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var results = document.getElementById('bookmarkResults');
    //output to screen
    results.innerHTML = "";
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        results.innerHTML += '<div class="card card-body bg-light">' +
            '<h3>' + name +
            ' <a class = "btn btn-outline-primary" target="_blank" href="' + url + '">Visit</a> ' +
            ' <a class = "btn btn-outline-danger" onclick="deleteBookmark(\'' + url + '\')" href="#">Delete</a> ' +
            '</h3>'
            + '</div>';
    }
}

//Check for valid form inuts
function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert("Please enter all values");
        return false;
    }

    var expression = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert("Please use a valid URL");
        return false;
    }
    return true;
}