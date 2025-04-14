import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Chats from "./Chats";
import Conversation from "../../components/Conversation";
import { useTheme } from "@emotion/react";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";
import NoChatSVG from "../../assets/Illustration/NoChat";

const GeneralApp = () => {
  const theme=useTheme();
  const {sidebar,chat_type,room_id}=useSelector((store) =>store.app);
  
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>

      <Chats />
    
      <Box sx={{ 
        height: "100%", 
     
        // width:"100%",
        width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
        backgroundColor:theme.palette.mode==="light"
        ? "#F0F4FA" : theme.palette.background.default,   
        }}
        >
            {chat_type === "individual" &&
          room_id !== null ? (
            <Conversation />
          ) : (
            <Stack
              spacing={2}
              sx={{ height: "100%", width: "100%" }}
              alignItems="center"
              justifyContent={"center"}
            >
              <NoChatSVG />
              <Typography variant="subtitle2">
                Select a conversation or start a {""}
                {/* <Link
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                  }}
                  to="/"
                >
                  new one
                </Link> */}
              </Typography>
            </Stack>
          )}
        
        
          
        </Box>
        {/* <Contact/> */}
        {sidebar.open &&
        (() =>{
          switch (sidebar.type){
            case "CONTACT":
              return <Contact/>;
            case "STARRED":
              return <StarredMessages/> 
            case "SHARED":
              return <SharedMessages/>;
              default:
                break;
          }
          })()}
        
    </Stack>
  );
};

export default GeneralApp;
 