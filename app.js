var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var MethodOverride = require('method-override');



mongoose.connect('mongodb://localhost/MyBlogSite', {useNewUrlParser: true ,useUnifiedTopology: true});

var app = express();

const port = 8080;
const hostname = '127.0.0.1';

var BlogSchema = new mongoose.Schema({

    title:String,
    ImageURL:String,
    body:String
})

var BlogObject = mongoose.model('MyBlogs',BlogSchema);

app.use(MethodOverride('_method'));
app.use('/static',express.static('static'));
app.use(express.urlencoded());

// template engine engine set 
app.set('views',path.join(__dirname,'views'));

app.set('view engine','pug');


app.get('/',function(req,res){

    res.redirect('/BlogPage'); // yet to be created
})
app.get('/BlogPage',function(req,res){

    // res.render('BlogPage');
    // res.send('BlogPage')
    // form will contain - Title , image and blogBody
    BlogObject.find({} , function(err , BlogPost){

        if(err)
        {
            console.log('error!');
            
        }
        else{

            res.render('BlogPage',{BlogItems : BlogPost});
            // res.render('BlogPage',{BlogItems : 'hi'});
        }


    });
})

// go to form for new blog
app.get('/BlogPage/new',function(req,res){

    res.render('Create');
    // form will contain - Title , image and blogBody
})




// create new BLog

app.post('/BlogPage',function(req,res){

    // res.render('form');
    // res.send('Something')

    BlogObject.create(req.body ,function(err,BlogPost){

        if(err)
        {
            console.log('ERROR!');

            
        }
        else{

            // res.render('BlogPage');
            res.redirect('/BlogPage');
            console.log(BlogPost);
            
        }
    })

    // form will contain - Title , image and blogBody
});

// shows page
app.get('/BlogPage/:id',function(req,res){

    // var id = req.params.id;

    BlogObject.findById(req.params.id , function(err , foundBlog){

        if(err)
        {
            console.log('error');
            res.send('ERROR!');
            
        }

        res.render('shows',{Blog:foundBlog});
    })
    
    
});

// edit form
app.get("/BlogPage/:id/edit",function(req,res){

    // res.render('edit');
    BlogObject.findById(req.params.id,function(err,foundBlog){

        if(err)
        {
            res.redirect('/BlogPage');
        }
        else{

            res.render('edit',{Blog:foundBlog});


        }
    })
});

app.put('/BlogPage/:id',function(req,res){

    // res.send('update route');
    // first parameter is the id
    // second is the object that needs to be updates in the database
    // third is the callback
    BlogObject.findByIdAndUpdate(req.params.id , req.body , function(err , UpdatedBlog){

        if(err)
        {
            res.redirect('/BlogPage');
        }
        else{

            // redirect to shows page
            res.redirect('/BlogPage/'+req.params.id);
        }
    })
})


// delete route

app.delete('/BlogPage/:id',function(req,res){



    // res.send('you have reached the delete page')

    //destroy blog and redirect somewhere

    BlogObject.findByIdAndRemove(req.params.id , function(err){

        if(err)
        {
            // console.log('cannot delete');
            res.redirect('/Blogpage');
            
        }

        else{

            res.redirect('/Blogpage');
        }
    })
})






// ROUTES









app.listen(port , function(){
    console.log(`Server started at ${port}`);
    
})