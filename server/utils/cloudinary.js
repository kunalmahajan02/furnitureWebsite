import { v2 as cloudinary } from 'cloudinary'
import * as dotenv from 'dotenv'
dotenv.config()
// cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_NAME ,
//         api_key : process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET,
//         secure: true
//     })
cloudinary.config({
    cloud_name: "dmo0izije",
    api_key: "625483261311573",
    api_secret: "BjDlxEZy0fzy_wijYnTe59XFciI"
  });


export default {cloudinary};




