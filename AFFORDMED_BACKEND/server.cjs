const express = require ('express')
const app = express('path')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const {ObjectId} =require('mongodb')
const{connectToDb,getDb} = require('./dbConnection.cjs')

connectToDb(function(error){
    if(error){
        console.log("cant establish")
    }else{
        // const port = process.env.PORT || 8000
        app.listen(8000)
        db=getDb()
        console.log("listening port 8000")
    }
})
/*
app.post('/add-datas',function(request,response){
    var email = request.body.email;
    var password = request.body.password;
    // const signUp = async (req,res)=>
    db.collection('RecipeData').findOne({email}).then((result) => {
        console.log(result)
        if(result){
            response.status(200).json({
                'status':'user logged'
            })
          }  else{
            response.status(500).json({
                'status':'Invalid user'
            })
          }
    })
    
})
*/

// add data
app.post('/add-data',function(request,response){
    var email = request.body.email;
    var password = request.body.password;
    db.collection('RecipeData').findOne({email}).then((result) => {
        console.log(result)
        if(result){
            response.status(500).json({
                'status':'You already registered'
            })
        } else {
            db.collection('RecipeData').insertOne(request.body).then(function(){
                response.status(201).json({
                    'status':'data added'   
                })
            }).catch(function(){
                response.status(500).json({
                    'status':'data is not added'
                })
            })} 
 })
})

// get data 
/*
app.get('/get-data',function(request,response) {
    const datas = [] 
    db.collection('RecipeData')

    .find() 
    .forEach(entry => datas.push(entry)).then(function(){
        response.status(200).json(datas)
    }).catch(function(){ 
        response.status(500).json({
            "status" : "entry is not added"
        })
    })
 } )

 */

 //get recipe
 /*

app.post('/add-recipe', function(request, response) {
    db.collection('RecipeData').insertOne(request.body).then(function() {
        response.status(201).json({
            "status" : "Entry added successfully"
        })
    }).catch(function () {
        response.status(500).json({
            "status" : "Entry not added"
        })
    })
})
*/

// final -add recipe


// important..

app.post('/add-product',function(request,response){
    var food= request.body.food;
    var desc = request.body.desc;
    var ingredients = request.body.ingredients
    db.collection('RecipeData').findOne({food}).then((result) => {
        console.log(result)
        if(result){
            response.status(500).json({
                'status':'You already inserted'
            })
        } else {
            db.collection('RecipeData').insertOne(request.body).then(function(){
                response.status(201).json({
                    'status':'data added'   
                })
            }).catch(function(){
                response.status(500).json({
                    'status':'data is not added'
                })
            })} 
 })
})


// app.post('/add-product', function(request, response) {
//     db.collection('ExpensesData').insertOne(request.body).then(function() {
//         response.status(201).json({
//             "status" : "Entry added successfully"
//         })
//     }).catch(function () {
//         response.status(500).json({
//             "status" : "Entry not added"
//         })
//     })
// })

//final get recipe
app.get('/get-product',function(request,response) {
    const datas = [] 
    db.collection('RecipeData')

    .find() 
    .forEach(entry => datas.push(entry)).then(function(){
        response.status(200).json(datas)
    }).catch(function(){ 
        response.status(500).json({
            "status" : "entry is not added"
        })
    })
 } )

//final - update
 app.patch('/update-product/:id', function(request, response) {
    if(ObjectId.isValid(request.params.id)) {
        db.collection('RecipeData').updateOne(
            { _id : new ObjectId(request.params.id) }, 
            { $set : request.body } 
        ).then(function() {
            response.status(200).json({
                "status" : "Entry updated successfully"
            })
        }).catch(function() {
            response.status(500).json({
                "status" : "Unsuccessful on updating the entry"
            })
        })
    } else {
        response.status(500).json({
            "status" : "ObjectId not valid"
        })
    }
})



app.delete('/delete-product/:id', function(request, response) {
    console.log(request.params.id)
    if(ObjectId.isValid(request.params.id))
     {
        console.log(request.params.id)
        db.collection('RecipeData').deleteOne({
            _id : new ObjectId(request.params.id)
            
        }).then(function() {
            response.status(200).json({
                "status" : "Entry successfully deleted"
            })
        }).catch(function() {
            response.status(500).json({
                "status" : "Entry not deleted"
            })
        })
    } else {
        response.status(500).json({
            "status" : "ObjectId not valid"
        })
    }
})




 



