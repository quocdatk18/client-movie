import { configureStore } from "@reduxjs/toolkit";
import videoReducer from '../store/reducer/video/videoSlice'
import userReducer from '../store/reducer/users/userSlice'
import loadingSlice from './reducer/global/loading';


const store = configureStore({
    reducer: {
        videoReducer,
        loading: loadingSlice,
        userReducer,
    }
})
export default store;