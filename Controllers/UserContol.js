const { json } = require("express")
const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')
const recipes = require("../Models/recipeschema")
const comments = require("../Models/commentSchema")
const likes = require("../Models/likeSchema")



// register
exports.register = async (req, res) => {
    const { userName, email, password } = req.body

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(400).json("User Already Exist !! Please Pogin.")
        }
        else {
            const newUser = new users({
                userName, email, password, bio: "", gender: "", dateOfBirth: ""
            })

            await newUser.save()
            res.status(200).json(newUser)

        }
    }
    catch (err) {
        res.status(401).json(`Register api faild ${err}`)
    }
}

// login
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const existUser = await users.findOne({ email, password })
        if (existUser) {
            // login success - token genrate
            const token = jwt.sign({ _id: existUser._id }, "supersecretkey123")
            // console.log(token);

            res.status(200).json({
                user: existUser,
                token
            })
        }
        else {
            res.status(404).json("incorrect email or password")
        }


    }
    catch (err) {
        res.status(401).json(`Register api failed ${err}`)
    }
}

// edit profile
exports.editProfile = async (req, res) => {
    const { userName, bio, gender, dateOfBirth, profile } = req.body
    const { _id } = req.params
    const profile1 = req.file ? req.file.filename : profile
    try {
        const selectedUser = await users.findOne({ _id })
        if (selectedUser) {
            selectedUser.userName = userName
            selectedUser.bio = bio
            selectedUser.gender = gender
            selectedUser.dateOfBirth = dateOfBirth
            selectedUser.profile = profile1

            await selectedUser.save()
            res.status(200).json(selectedUser)

        }
        else {
            res.status(404).json(`${userName} is not Present`)
        }

    }
    catch (err) {
        res.status(401).json(`Register Api Failed ${err}`)
    }

    // console.log(userName);
    // console.log(_id);
    // console.log(profile);
}

// add recipe
exports.addRecipe = async (req, res) => {
    const { id, recipeName, ingredients, instructions, category, cookingTime, difficultyLevel, cuisineORcategory, caption } = req.body
    const recipeImage = req.file?.filename
    const userId = req.payload
    try {
        const existingRecipe = await recipes.findOne({ id })
        if (existingRecipe) {
            res.status(400).json(`${existingRecipe.recipeName} already exist !`)
        }
        else {
            const newRecipe = new recipes({
                id, recipeName, ingredients, instructions, category, cookingTime, difficultyLevel, cuisineORcategory, caption, userId, recipeImage
            })
            newRecipe.save()
            res.status(200).json(newRecipe)

        }
    }
    catch (err) {
        res.status(401).json(`add recipe Api Failed ${err}`);
    }

}

// get user recipes
exports.getUserRecipes = async (req, res) => {
    const { id } = req.params;
    try {
        const recipieArray = await recipes.find({ userId: id })
        if (recipieArray) {
            res.status(200).json(recipieArray)

        }
        else {
            res.status(404).json("No Recipes Added")
        }
    }

    catch (err) {
        res.status(401).json(`Rcipes get Api Failed ${err}`);
    }
}

// delete recipe
exports.deleteRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await recipes.deleteOne({ id });
        if (response) {
            res.status(200).json("recipie deleted");
        }
    }
    catch (err) {
        res.status(401).json(`recipe delete api Failed ${err}`);
    }
}

// update recipe
exports.updateRecipe = async (req, res) => {

    const { recipeName, ingredients, instructions, category, cookingTime, difficultyLevel, cuisineORcategory, caption, recipeImage } = req.body

    const { _id } = req.params;
    const uploadImage = req.file ? req.file.filename : recipeImage;

    try {
        const updatedRecipe = await recipes.findByIdAndUpdate(
            { _id },

            {
                recipeName, ingredients, instructions, category, cookingTime, difficultyLevel, cuisineORcategory, caption, recipeImage: uploadImage
            },
            { new: true }
        );
        await updatedRecipe.save();
        res.status(200).json(updatedRecipe);
    }
    catch (err) {
        res.status(401).json(`recipe get Api Failed ${err}`);
    }

}

// get all recipes
exports.getAllRecipies = async (req, res) => {
    try {

        const allRecipiesArray = await recipes.find();
        if (allRecipiesArray) {
            res.status(200).json(allRecipiesArray);
        } else {
            res.status(404).json("no Recipies uploaded yet");
        }
    } catch (err) {
        res.status(401).json(`recipe get Api Failed ${err}`);
    }
}

// single recipe
exports.getSingleRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        const singleRecipe = await recipes.findOne({ id });
        if (singleRecipe) {
            res.status(200).json(singleRecipe);
        }
    } catch (err) {
        res.status(401).json(`single resipe api Failed ${err}`);
    }
};


// get all users
exports.getAllUsers = async (req, res) => {
    try {

        const allUsersArray = await users.find();
        if (allUsersArray) {
            res.status(200).json(allUsersArray);
        } else {
            res.status(404).json("no Recipies uploaded yet");
        }
    } catch (err) {
        res.status(401).json(`recipe get Api Failed ${err}`);
    }
}


// add comment
exports.addComment = async (req, res) => {
    const { commentText,userName } = req.body;
    const userId = req.payload;
    const { _id } = req.params;

    try {
        const existingRecipe = await recipes.findOne({ _id });
       
        if (existingRecipe) {
            const newComment = new comments({
                commentText,
                userName,
                userId,
                recipeId:_id
            });

            await newComment.save(); 

            res.status(200).json(newComment);
        } 
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// get comment
exports.getcomments = async (req, res) => {
    const { _id } = req.params;
    try {
        const commentArray = await comments.find({  })
        if (commentArray) {
            res.status(200).json(commentArray)
            // console.log(commentArray);

        }
       
    }

    catch (err) {
        res.status(401).json(` get Comment  Api Failed ${err}`);
    }
}

// delete comment 
exports.deleteComment = async (req, res) => {
    const { _id } = req.params;
    try {
        const response = await comments.deleteOne({ _id });
        if (response) {
            res.status(200).json("Comment Deleted");
        }
    }
    catch (err) {
        res.status(401).json(`comment delete api Failed ${err}`);
    }
}


// add like
exports.addLike = async (req, res) => {
    const { like } = req.body;
    const { _id } = req.params;
    const userId = req.payload; 

    try {        
        const recipee = await recipes.findOne({ _id });
        if (recipee) {
            const existingLike = await likes.findOne({ userId, recipeId: _id });

            if (existingLike) {
                await likes.deleteOne({ userId, recipeId: _id });

                recipee.likes = Math.max(0, recipee.likes - 1);
                await recipee.save();

                const updatedLikesCount = recipee.likes; 

                return res.status(200).json('Like removed', updatedLikesCount );
            }

            const newLike = new likes({
                like,
                userId: userId,
                recipeId: _id
            });

            await newLike.save();

            recipee.likes += 1;
            await recipee.save();

            const updatedLikesCount = recipee.likes; 

            res.status(200).json({ message: 'Like added', updatedLikesCount });
        }
      
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




// get comment
exports.getLike = async (req, res) => {
    const { _id } = req.params;
    try {
        
        const likeArray = await likes.find({recipeId:_id})
        if (likeArray) {
            res.status(200).json(likeArray)
            // console.log(likeArray);

        }
       
    }

    catch (err) {
        res.status(401).json(` get Like  Api Failed ${err}`);
    }
}

