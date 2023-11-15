export default function FileImageVideo( {file, url, type} ) {
  return (
    <div>
        { type === "IMAGE" ? ( 
            <img src={url} alt="" className="cursor-pointer" />
        ) : type === "VIDEO" ? (
            <video src={url} controls className="cursor-pointer"></video>
        ) : type === "AUDIO" ? (
            <audio src={url} controls className="cursor-pointer"></audio>
        ) : (
            <p>Unsupported file type</p>
        )}
        {/* File infos */}
        {type === "VIDEO" || type === "AUDIO" ? (
            <div className="flex items-center gap-2">
                <img src={`../../../../images/file/${type}.png`} alt="" className="w-10 object-contain" />
                <div className="flex flex-col gap-2">
                    <h1>
                        {file.original_filename}.{file.public_id.split(".")[1]}
                    </h1>
                    <span className="text-sm">
                        {type} . {file.bytes} B
                    </span>
                </div>
            </div>
        ) : ( "" 
        )}
    </div>
  );
}
