import { useSelector } from "react-redux";
import { CallIcon, DotsIcon, SearchLargeIcon, VideoCallIcon } from "../../../svg";
import { capitalize } from "../../../utils/string";
import SocketContext from "../../../context/SocketContext";
import { getConversationName, getConversationPicture } from "../../../utils/chat";


function ChatHeader({ online, callUser, socket }) {
    const { user } = useSelector((state) => state.user);
    const {activeConversation} = useSelector((state)=> state.chat);
    const { name, picture } = activeConversation;
    
    return (
        <div className="h-[50px] dark:bg-dark_bg_2 flex items-center p16 select-none">
            {/**Container */}
            <div className="w-full flex items-center justify-between">
                {/**Left */}
                <div className="flex items-center gap-x-4">
                    {/**Container img*/}
                    <button className="btn">
                        <img 
                            // src={picture}
                            src={getConversationPicture(user, activeConversation.users)} 
                            alt={`${name} picture`} 
                            // src={activeConversation}
                            // alt=""
                            className="w-full h-full rounded-full object-cover"
                        />
                    </button>
                    {/**Conversation name and online status*/}
                    <div className="flex flex-col">
                        <h1 className=" dark:text-white text-md font-bold">
                            {/*capitalize(name.split(" ")[1])*/}
                            {/* {capitalize(name)} */}
                            {capitalize(getConversationName(user, activeConversation.users)
                            )}
                        </h1>
                        <p className={` w-6 h-6 items-center rounded-full ${ online ? "bg-green-500" : "bg-red_1"} `}>
                            <span className=" p-1 text-xs dark:text-dark_text_1">
                                {online ? "onl" : "off"}
                            </span>
                        </p>                        
                    </div>
                </div>
                {/**Right*/}
                <ul className="flex items-center gap-x-2.5">
                    {/* Video call */}
                    {1 == 1 ? (
                        <li onClick={() => callUser()}>
                            <button className="btn">
                                <VideoCallIcon />
                            </button>
                        </li>
                    ) : null}

                    {/* Audio call */}
                    {1 == 1 ? (
                        <li>
                            <button className="btn">
                                <CallIcon />
                            </button>
                        </li>
                    ) : null}

                    <li>
                        <button className="btn">
                            <SearchLargeIcon className="dark:fill-dark_svg_1"/>
                        </button>
                    </li>
                    <li>
                        <button className="btn">
                            <DotsIcon className="dark:fill-dark_svg_1"/>
                        </button>
                    </li>
                </ul> 
            </div>
        </div>
    )
}

const ChatHeaderWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <ChatHeader { ...props} socket={socket} />}
    </SocketContext.Consumer>
);
export default ChatHeaderWithSocket;