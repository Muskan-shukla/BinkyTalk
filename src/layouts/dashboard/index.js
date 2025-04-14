import React,{useEffect} from "react";
import {Select, Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import {useDispatch,useSelector} from "react-redux";
import { connectSocket,socket } from "../../socket"
import { SelectConversation } from "../../redux/slices/app";
// import useResponsive from "../../hooks/useResponsive";

import {
  UpdateDirectConversation,
  AddDirectConversation,
  AddDirectMessage,
} from "../../redux/slices/conversation";
// const isAuthenticated = false;

const DashboardLayout = () => {
  // const isDesktop = useResponsive("up", "md");
  const {isLoggedIn}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const user_id=window.localStorage.getItem("user_id");
  const {conversations,current_conversation }=useSelector((state)=>state.conversation.direct_chat)
  
  useEffect(()=>{
    if(isLoggedIn){
      window.onload=function(){
        if(!window.location.hash){
          window.location=window.location +'#loaded';
          window.location.reload();
        }
      }
      // window.location.reload();

      if(!socket){
        connectSocket(user_id);
      }


      socket.on("new_message", (data) => {
        const message = data.message;
        console.log(current_conversation, data);
        // check if msg we got is from currently selected conversation
        if (current_conversation?.id === data.conversation_id) {
          dispatch(
            AddDirectMessage({
              id: message._id,
              type: "msg",
              subtype: message.type,
              message: message.text,
              incoming: message.to === user_id,
              outgoing: message.from === user_id,
            })
          );
        }
      });

      socket.on("start_chat", (data) => {
        console.log(data);
        // add / update to conversation list
        const existing_conversation = conversations.find(
          (el) => el?.id === data._id
        );
        if (existing_conversation) {
          // update direct conversation
          dispatch(UpdateDirectConversation({ conversation: data }));
        } else {
          // add direct conversation
          dispatch(AddDirectConversation({ conversation: data }));
        }
        dispatch(SelectConversation({ room_id: data._id }));
      });

      socket.on("new_friend_request",(data)=>{
        // dispatch(showSnackbar({severity:"success",message:data.message}))
        alert(data.message);
      })
      socket.on("request_accepted",(data)=>{
        // dispatch(showSnackbar({severity:"success",message:data.message}))
        alert(data.message);
      })
      socket.on("request_sent",(data)=>{
        // dispatch(showSnackbar({severity:"success",message:data.message}))
        alert(data.message);
      })
      socket.on("start_chat",(data)=>{
        console.log(data);
        const existing_conversation=conversations.find((el)=>el.id===data._id);
        if(existing_conversation){
          dispatch(UpdateDirectConversation({conversation:data}));
        }else{
          //add direct conversation
          dispatch(AddDirectConversation({conversaton:data}));

        }
        dispatch(SelectConversation({room_id:data._id}))

      })
    }

    return ()=>{
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
      socket?.off("start_chat");
      socket?.off("new_message");

    }
  },[isLoggedIn,socket]);
  
  if(!isLoggedIn){
    return <Navigate to="/auth/login"/>
  }
  
  return (
    
    <Stack direction="row">
       {/* SideBar */}
       <SideBar/>
      <Outlet /> 
      </Stack>
    
  );
};

export default DashboardLayout;
