var deleteIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';

var addElement = document.querySelector('.addBtn');
var inputValue = document.getElementById("myInput");
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
};
renderList();
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.getElementById('btn').addEventListener('click', app.takephoto);

    },
    takephoto: function() {
        let opts = {
            quality: 80,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            targetWidth: 300,
            targetHeight: 400
        };

        navigator.camera.getPicture(app.ftw, app.wtf, opts);
    },
    ftw: function(imgURI) {
        document.getElementById('msg').textContent = imgURI;
        document.getElementById('photo').src = imgURI;

    },

    // deviceready Event Handle
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        document.addEventListener('resume', app.onResume);
    },
    onResume: function() {
        // alert("Welcome back");
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {}
};

app.initialize();

//Add item
addElement.addEventListener('click', function() {
    var value = document.getElementById("myInput").value;
    if (value)
        addList(value);
})


function addList(value) {
    newElement(value)
    document.getElementById('myInput').value = '';
    data.todo.push(value);
    dataObjectUpdated();
}

function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'myUL') {
        data.todo.splice(data.todo.indexOf(value), 1);
    }
    dataObjectUpdated();

    parent.removeChild(item);
}

function renderList() {
    //Return nothing if empty
    if (!data.todo.length) return;

    for (var i = 0; i < data.todo.length; i++) {
        var value = data.todo[i];
        newElement(value);
    }
}


function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
}


// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

function newElement(text) {
    var list = document.getElementById('myUL');

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = deleteIcon;

    // Add click event for removing the item
    remove.addEventListener('click', removeItem);

    buttons.appendChild(remove);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}