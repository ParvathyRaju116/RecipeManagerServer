const express=require('express')
const router=new express.Router()
const user=require('../Controllers/UserContol')
const {jwtMiddleWare}=require('../MiddleWares/jwtMiddleware')
const upload=require('../MiddleWares/multerMiddleware')

// register
router.post('/user/register',user.register)

// login
router.post('/user/login',user.login)

// update  profile
router.put('/user/update-profile/:_id',jwtMiddleWare,upload.single('profile'),user.editProfile)

// add recipe
router.post('/user/add-recipe',jwtMiddleWare,upload.single('recipeImage'),user.addRecipe)

// get user recipes
router.get('/user/get-user-recipes/:id',jwtMiddleWare,user.getUserRecipes)

// delete recipe
router.delete('/user/delete-recipe/:id',jwtMiddleWare,user.deleteRecipe)

// update recipe
router.put('/user/update-recipe/:_id',jwtMiddleWare,upload.single('recipeImage'),user.updateRecipe)

// get all recipes
router.get('/user/get-all-recipe',user.getAllRecipies)

// get single recipe
router.get('/user/single-recipe/:id',user.getSingleRecipe);

// add comment
router.post('/users/add-comment/:_id',jwtMiddleWare,user.addComment)

// get all users
router.get('/user/get-all-users',user.getAllUsers)

// get comments
router.get('/user/get-recipies-comments/:_id',user.getcomments)

// delete recipe
router.delete('/user/delete-comment/:id',user.deleteComment)

// add like
router.post('/user/add-like/:_id',user.addLike)

// get like
router.get('/user/get-recipies-likes/:_id',user.getLike)









module.exports=router