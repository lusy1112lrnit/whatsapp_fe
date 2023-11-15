import { useRef } from "react";
import { PhotoIcon } from "../../../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { addFiles } from "../../../../../features/chatSlice";
import { getFileType } from "../../../../../utils/file";

export default function PhotoAttachment() {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const imageHandler = (e) => {
        let files = Array.from(e.target.files);
        files.forEach((file)=> {
            console.log(file.type);
            if(
                file.type !== "audio/mpeg" &&
                file.type !== "audio/wav" &&
                file.type !== "video/mp4" &&
                file.type !== "video/mpeg" &&
                file.type !== "video/webm" &&
                file.type !== "video/mp2t" &&
                file.type !== "image/png" &&
                file.type !== "image/jpeg" &&
                file.type !== "image/gif" &&
                file.type !== "image/webp" 
            ) {
                files=files.filter((item) => item.name !== file.name);
                return;
            } else if (file.size > 1024 * 1024 * 10){
                files = files.filter((item) => item.name !== file.name);
                return;
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    dispatch(
                        addFiles({file: file, fileData: e.target.result, type: getFileType(file.type),})
                    );
                };
            }
        });
    };
    return (
    <li>
        <button type="button" className="bg-[#BF59CF] rounded-full" onClick={()=>inputRef.current.click()}>
            <PhotoIcon/>
        </button>
        <input type="file" hidden ref={inputRef} accept="audio/mpeg,audio/wav,video/mp4,video/mpeg,video/webm,video/mp2t,image/png,image/jpeg,image/gif,image/webp" onChange={imageHandler} />
    </li>
    )
}
