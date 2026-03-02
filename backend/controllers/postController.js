const Post= require("../models/post");

exports.createPost = async (req, res)=> {
    try{
        const post= await Post.create({
            user: req.user.id,
            content: req.body.content
        });
        res.status(201).json(post);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.getPosts = async (req, res) => {
    try {
    const posts = await Post.find()
      .populate("user", "name email") // user details bhi milenge
      .sort({ createdAt: -1 });

      res.json(posts);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.toggleLike= async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message:"post not found"});
        }
        const userId = req.user.id;
        const alreadyLiked= post.likes.includes(userId);

        if(alreadyLiked){
            post.likes= post.likes.filter(
            (id) => id.toString() !== userId
        );
        }
        else{
            post.likes.push(userId);
        }
        
        await post.save();
        res.json(post);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }

};

// comment
exports.addComments= async(req, res) => {
    try{
        const post= await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message:"post not found"});

        }
        post.comments.push({
            user: req.user.id,
            text: req.body.text
        });
        await post.save();
        const updatedPost= await Post.findById(req.params.id).populate("comments.user", "name profilePic");
        res.json(updatedPost);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.getUserPosts= async (req, res)=> {
    try{
        const posts= await Post.find({user: req.params.id}).sort({createdAt: -1});
        res.json(posts);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

