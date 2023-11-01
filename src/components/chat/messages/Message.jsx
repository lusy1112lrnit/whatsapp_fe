import moment from "moment/moment";
import { TraingleIcon } from "../../../svg";

export default function Message({message, me}) {
  return (
    <div className={`w-full flex mt-2 space-x-3 max-w-xs ${
        me ? "ml-auto justify-end" : ""
    }`}>
        {/**Message Container */}
        <div>
            <div className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg
            ${me ? "bg-green_3" : "dark:bg-dark_bg_2"}`}>
                {/**Message */}
                <p className="float-left h-full text-sm pb-5">{message.message}</p>
                {/**Message Dare*/}
                <span className="float-right text-xs pt-6 text-dark_text_5">
                    {moment(message.createdAt).format("HH:mm")}
                </span>
                {/**Traingle */}
                {!me ? (
                    <span>
                        <TraingleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5"/>
                     </span>
                ) : null}
            </div>
        </div>
    </div>
  )
}
 