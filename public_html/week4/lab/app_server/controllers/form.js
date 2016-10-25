
function formView(req, res) {
    
     res.render('form', { title: 'Add a Contact Form' });
}

function formPost(req, res) {
    
    if (req.method === 'POST') {
       res.render('results', { 
            title : 'Contacts',
            name: req.body.name,
            email: req.body.email,
            comments: req.body.comments
        });       
    } else {
         res.render('results', { 
            title : 'Contacts',
            name: 'No name found',
            email: 'No email found',
            comments: 'No comments found'
        });
    }   
}

/* Set the module class to have functions available for other files. */
module.exports.formView = formView;
module.exports.formPost = formPost;

