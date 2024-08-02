import { createSlice } from '@reduxjs/toolkit'


const initialState={
  _id:"",
  fullname:"",
  email:"",
  profileimg:"",
  token:"",
  onlineUser:[],
  sokectConnection:null
}

export const useslice = createSlice({
 name:'user',
  initialState,
  reducers: {

    setUser: (state,actions)=>{
          state._id=actions.payload._id
          state.fullname=actions.payload.fullname
          state.email=actions.payload.email
          state.profileimg=actions.payload.profileimg
          
    },
    setToken:(state,actions)=>{
      state.token=actions.payload
    },
    logout:(state,actions)=>{
          state._id=''
          state.fullname=''
          state.email=''
          state.profileimg=''
          state.onlineUser=''
          state.sokectConnection=null
          
    }
    ,
    setOnlineUser:(state,actions)=>{
      state.onlineUser=actions.payload
    },
    setSocketConnection:(state,actions)=>{
      state.sokectConnection=actions.payload
    }
    
  }
})

// Action creators are generated for each case reducer function
export const { setUser,setToken,logout,setOnlineUser ,setSocketConnection} = useslice.actions

export default useslice.reducer