import { useRef } from "react";
import { DocumentIcon } from "../../../../../svg";
import { addFiles } from "../../../../../features/chatSlice";
import { useDispatch } from "react-redux";
import { getFileType } from "../../../../../utils/file";


export default function DocumentAttachment() {
    const dispatch=useDispatch();
    const inputRef=useRef();
    const documentHandler = (e) => {
        let files = Array.from(e.target.files);
        files.forEach((file)=> {
            console.log(file.type);
            if(
                file.type !== "application/pdf" &&
                file.type !== "text/plain" &&
                file.type !== "application/msword" &&
                file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
                file.type !== "application/vnd.ms-powerpoint" &&
                file.type !== "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
                file.type !== "application/vnd.ms-excel" &&
                file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
                file.type !== "application/zip" &&
                file.type !== "application/x-zip-compressed" &&
                file.type !== "application/x-rar-compressed" &&
                file.type !== "application/vnd.rar" &&
                file.type !== "audio/mpeg" &&
                file.type !== "audio/wav" &&
                file.type !== "video/mp4" &&
                file.type !== "video/mpeg" &&
                file.type !== "video/webm" &&
                file.type !== "video/mp2t" 
            ) {
                files=files.filter((item) => item.name !== file.name);
                console.log(file.type);
                return;
            } else if (file.size > 1024 * 1024 * 10){
                files = files.filter((item) => item.name !== file.name);
                return;
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    dispatch(
                        addFiles({file: file, type: getFileType(file.type)})
                    );
                };
            }
        });
    };
  return (
    <li>
        <button type="button" className="bg-[#5F66CD] rounded-full" onClick={()=>inputRef.current.click()}>
            <DocumentIcon/>
        </button>
        <input type="file" hidden multiple ref={inputRef} accept="application/*,text/plain,audio/mpeg,audio/wav,video/mp4,video/mpeg,video/webm,video/mp2t,image/png,image/jpeg,image/gif,image/webp" onChange={documentHandler} />
    </li>
  )
}
