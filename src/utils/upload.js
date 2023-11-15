import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import { Await, resolvePath } from "react-router-dom";

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;
export const uploadFiles = async(files) => {
    let formData = new FormData();
    formData.append("upload_preset", cloud_secret);
    let uploaded = [];
    for ( const f of files ) {
        const {file, type} = f;
        formData.append("file", file);
        let res = await uploadToCloudinary(formData);
        uploaded.push({
            file: res,
            type: type,
        });
    }
    return uploaded;
};
const uploadToCloudinary = async(formData, type) => {
    return new Promise (async ( resolve )=>{
        return await axios
        .post(`https://api.cloudinary.com/v1_1/${cloud_name}/raw/upload`,formData)
        .then(({data}) => {
            resolve(data);
        })
        .catch((err) =>{
            console.log(err);
        });
    });
};
