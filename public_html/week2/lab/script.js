'use strict';

function makeRequest(url) {
    var promise = new Promise(httpPromise);

    function httpPromise(resolve, reject) {
        var httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            reject('Giving up :( Cannot create an XMLHTTP instance');
        }

        httpRequest.open('GET', url);
        httpRequest.send();

        httpRequest.addEventListener('load', httpResolve.bind(httpRequest));
        httpRequest.addEventListener('error', httpReject.bind(httpRequest));
        //httpRequest.addEventListener('finish', displayList.bind(null, 'ul.users', JSON.parse(this.response)));

        function httpResolve() {
            if (this.status >= 200 && this.status < 300) {
                // Performs the function "resolve" when this.status is equal to 2xx
                //JSONOb = JSON.parse(this.response);
                //console.log(JSONOb);
                resolve(JSON.parse(this.response));

            } else {
                // Performs the function "reject" when this.status is different than 2xx
                reject(this.statusText);
            }
        }

        function httpReject() {
            reject(this.statusText);
        }

    }

    //console.log(promise);
    // Return the promise
    return promise;
}

var userJSON;

var callbackUsers = {
    'success': function (data) {
        console.log(1, 'success', data);
        userJSON = data["users"];
        displayList('ul.users', userJSON);
    },
    'error': function (data) {
        console.log(2, 'error', data);
    }
};

makeRequest('../lab/data/users.json').then(callbackUsers.success, callbackUsers.error);


function displayList(selector, list) {
    var dom = document.querySelector(selector);
    /* this document fragment is just for performance 
     * We create all the elements to add to the page
     * add them to the fragment, then add the fragment to
     * the page.  Much faster than just adding all the
     * elements to the page one at a time
     * 
     */
    var docfrag = document.createDocumentFragment();

    /* JavaScript now has built in foreach loops for arrays */
    list.forEach(function (value) {
        /* you can use the creaeElement tag to create any HTML element you want */
        var li = document.createElement("li");
        li.textContent = value.name.first + " " + value.name.last;
        /* you can set any attribute using the function below for any Created element */
        li.setAttribute('class', 'link');
        /*you can even attach events to the element */
        //li.addEventListener('click', displayContent.bind(null, 'section.featured', value));
        li.addEventListener('click', callNewFile.bind(null, value._id));
        docfrag.appendChild(li);
    });

    /* after the fragment is completed we can add it to the page */
    dom.appendChild(docfrag);
}

function callNewFile(id){
    makeRequest('../lab/data/' + id + '.json').then(callbackFile.success, callbackFile.error);
}

var callbackFile = {
    'success': function (data) {
        console.log(1, 'success', data);
        //displayPicture('section.figure', data);
        displayContent('article', data);
    },
    'error': function (data) {
        console.log(2, 'error', data);
    }
};


function displayContent(selector, item) {
    var figure = document.querySelector('figure');
    var figfrag = document.createDocumentFragment();
    
    /* remove any child elements */
    while (figure.firstChild) {
        figure.removeChild(figure.firstChild);
    }
    figfrag.appendChild(createImageElement(item.picture));
    figure.appendChild(figfrag);
    
    var article = document.querySelector(selector);
    var docfrag = document.createDocumentFragment();
    
    /* remove any child elements */
    while (article.firstChild) {
        article.removeChild(article.firstChild);
    }

    if(item.isActive){
        article.setAttribute('class', 'active');
    }
    else{
        article.setAttribute('class', 'inactive');
    }

    docfrag.appendChild(createParagraphElement('Full Name: ', item.name.first + " " + item.name.last));
    docfrag.appendChild(createParagraphElement('Company: ', item.company));
    docfrag.appendChild(createParagraphElement('Email: ', item.email));
    docfrag.appendChild(createParagraphElement('Phone: ', item.phone));
    docfrag.appendChild(createParagraphElement('Address: ', item.address));
    docfrag.appendChild(createParagraphElement('Registered: ', item.registered));
    docfrag.appendChild(createParagraphElement('Age: ', item.age));
    docfrag.appendChild(createParagraphElement('Eye Color: ', item.eyeColor));
    docfrag.appendChild(createParagraphElement('Greeting: ', item.greeting));
    docfrag.appendChild(createParagraphElement('Favorite Fruit: ', item.favoriteFruit));
    docfrag.appendChild(createParagraphElement('Balance: ', item.balance));
    docfrag.appendChild(createParagraphElement('About: ', item.about));

    article.appendChild(docfrag);
}

function createImageElement(location){
    var imgTag = document.createElement('img');
    imgTag.setAttribute('src', '../lab/img/' + location);
    return imgTag;
}

/* custom function to generate a template for our view */
function createParagraphElement(label, text) {
    var pTag = document.createElement('p'),
            strongTag = document.createElement('strong'),
            strongText = document.createTextNode(label),
            pText = document.createTextNode(text);

    strongTag.appendChild(strongText);
    pTag.appendChild(strongTag);
    pTag.appendChild(pText);
    return pTag;
}

