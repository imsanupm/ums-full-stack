


export const verifyAdmin = (req,res,next)=>{
    if(req.user && req.user.role=="admin"){
        next()
    }else{
        res.json({
            message:"Admin access only"
        })
    }
}