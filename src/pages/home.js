import { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getConversations, updateMessagesAndConversations } from "../features/chatSlice";
import { ChatContainer, WhatsappHome } from "../components/chat";
import SocketContext from "../context/SocketContext";

 function Home({socket}){
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { activeConversation } = useSelector((state) => state.chat);
    const [onlineUsers, setOnlineUsers] = useState([]);
    //typing
    const [typing, setTyping] = useState(false);
    //join user into the socket io
    useEffect(() => {
        socket.emit("join", user._id);
        //get online user
        socket.on("get-online-users", (users) => {
          setOnlineUsers(users);
        })
    }, [user]);
    //get conversations
    useEffect(() => {
        if(user?.token) {
            dispatch(getConversations(user.token));
        }
    }, [user]);

    useEffect(() => {
    //listening to received messages
      socket.on("receive message", (message) => {
        dispatch(updateMessagesAndConversations(message));
      });
    //listening when a user is typing
      socket.on("typing", (conversation) => setTyping(conversation));
      socket.on("stop typing", () => setTyping(false));
    }, []);
    return(
        <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
            {/*container */}
            <div className="container h-screen flex py-[19px]">
                {/**sidebar */}
                <Sidebar onlineUsers = {onlineUsers} typing={typing}/>
                {activeConversation._id ? <ChatContainer onlineUsers = {onlineUsers} typing={typing}/> : <WhatsappHome />}
            </div>
        </div>
    )
}

const HomeWithSocket = (props) => (
    <SocketContext.Consumer>
      {(socket) => <Home {...props} socket={socket} />}
    </SocketContext.Consumer>
  )
  
  export default HomeWithSocket;