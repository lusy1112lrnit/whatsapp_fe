export const getFileType = (memType) => {
  switch (memType) {
    case "text/plain":
        return "TXT";
    case "application/pdf":
        return "PDF";
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return "DOCX";
    case "application/vnd.ms-powerpoint":
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return "PPTX";
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return "XLSX";
    case "application/zip":
    case "application/x-zip-compressed":
        return "ZIP";
    case "application/x-rar-compressed":
    case "application/x-rar":
    case "application/vnd.rar":
        return "RAR";
    case "audio/mpeg":
    case "audio/wav":
        return "AUDIO";
    case "video/mp4":
    case "video/mpeg":
    case "video/mp2t":
        return "VIDEO";
    default:
        return "IMAGE";
  }
};