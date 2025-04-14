import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT",
    },
   users:[],
   friends:[],
   friendRequests:[],
   chat_type:null,
   room_id:null,
}

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        //Toogle Sidebaar
        toggleSidebar(state, action) {
            state.sidebar.open = !state.sidebar.open;
        },
        updateSidebarType(state, action) {
            state.sidebar.type = action.payload.type;
        },
        updateUsers(state,action){
            state.users=action.payload.users;
        },
        updateFriends(state,action){
            state.friends=action.payload.friends;
        },
        updateFriendRequests(state,action){
            state.friendRequests=action.payload.request;
        },
        selectConversation(state,action){
            state.chat_type="individual";
            state.room_id=action.payload.room_id;
        }
        
    },
});

//Reducer
export default slice.reducer;


export function ToogleSidebar() {
    return async (dispatch,getState) => {
        dispatch(slice.actions.toggleSidebar());
    }
}

export function UpdateSidebarType(type) {
    return async (dispatch,getState) => {
        dispatch(slice.actions.updateSidebarType({
            type,
        }));
    };
}

export const FetchUsers=()=>{
    return async (dispatch,getState)=>{
        await axios.get("/user/get-users",{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${getState().auth.token}`,
            },
        })
        .then((response)=>{
            console.log(response);
            dispatch(slice.actions.updateUsers({users:response.data.data}));
        })
        .catch((error)=>{
            console.log(error);
        });
    };
};

export const FetchFriends=()=>{
    return async (dispatch,getState)=>{
        await axios.get("/user/get-friends",{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${getState().auth.token}`,
            },
        })
        .then((response)=>{
            console.log(response);
            dispatch(slice.actions.updateFriends({friends:response.data.data}));
        })
        .catch((error)=>{
            console.log(error);
        });
    };
};

export const FetchFriendRequests=()=>{
    return async (dispatch,getState)=>{
        await axios.get("/user/get-friend-requests",{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${getState().auth.token}`,
            },
        })
        .then((response)=>{
            console.log(response);
            dispatch(slice.actions.updateFriendRequests({requests:response.data.data}));
        })
        .catch((error)=>{
            console.log(error);
        });
    };
};

export const SelectConversation = ({ room_id }) => {
    return async (dispatch, getState) => {
      dispatch(slice.actions.selectConversation({ room_id }));
    };
  };