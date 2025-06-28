export const productRoute = (req ,res, next) => {
try {
const  accessToken = req.cookies.accessToken;
if (!accessToken) {
    return res.status(401).json({message:"Unauthorized - No access token provied"});
}

const decoded =
} catch (error) {
    
}}