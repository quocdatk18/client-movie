import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRender } from "../../../config";
import { notify } from "../../unitil/unitil";


export const LoginAcc = createAsyncThunk('login/loginFetched', async (user) => {
    console.log(user)
    try {
        const { data } = await axiosRender.post(
            `http://localhost:5000/user/login`, user
        )
        localStorage.setItem('accessToken', data.token);
        notify({
            message: "Success !",
            description: "Login successfully !",
            type: "success"
        })

        return data
    } catch (error) {
        localStorage.removeItem('accessToken');

        notify({
            message: "Error !",
            description: error.response.data.message,
            type: "error"
        })
        return null

    }
});
export const updateProfile = createAsyncThunk('profile/profileFetched', async (user, { dispatch, getState }) => {
    console.log(user)
    try {
        const { userInfo } = getState().userReducer
        const { data } = await axiosRender.put(
            `http://localhost:5000/user/update`, user, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        )
        notify({
            message: "Success !",
            description: "Đổi thông tin thành công !",
            type: "success"
        })
        return data
    } catch (error) {
        return (
            console.log(error)
        )

    }
});
export const RegisterAcc = createAsyncThunk('register/registerFetched', async (user) => {
    // console.log(user)
    try {
        const { data } = await axiosRender.post(
            `http://localhost:5000/user/register`, user
        )
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('userInfo', JSON.stringify(data));

        return data
    } catch (error) {
        notify({
            message: "Error !",
            description: "Email trùng lặp,xin vui lòng nhập email khác",
            type: "error"
        })
        return null

    }
});

export const getMyvideoUser = createAsyncThunk('videoUsers/videoUsersFetched', async (user,) => {

    try {
        const { data } = await axiosRender.get(
            `http://localhost:5000/user/myvideo`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        }
        )
        return data
    } catch (error) {
        return null
    }
});
export const saveMyvideoUser = createAsyncThunk('savevideoUsers/savevideoUsersFetched', async (videoId, { dispatch, getState }) => {

    try {
        const { userInfo } = getState().userReducer


        const response = await axiosRender.patch(
            `http://localhost:5000/user/saveVideo/`, videoId, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        )

        return (
            response.data,
            alert('đã thêm vào tủ phim của bạn')
        )
    } catch (error) {
        return (
            error,
            alert('phim này đã có trong tủ phim bạn rồi')
        )
    }
});
export const unSaveMyvideoUser = createAsyncThunk('deletevideoUsers/deletevideoUsersFetched', async (item, { dispatch, getState
}) => {

    try {
        console.log(item)
        const { userInfo } = getState().userReducer
        const { data } = await axiosRender.patch(
            `http://localhost:5000/user/unsaveVideo/`, item, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        )
        return (
            data,
            alert('đã xóa khỏi tủ phim của bạn')
        )
    } catch (error) {
        return null
    }
});

export const loadUser = createAsyncThunk('user/loadUser', async () => {
    try {
        const token = localStorage.getItem('accessToken')
        if (!token) return null
        const response = await axiosRender.get("http://localhost:5000/user/load-user", {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
        return response.data.user
    } catch (error) {
        return null
            ;
    }
})
const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: localStorage.getItem("acessToken")
            ? JSON.parse(localStorage.getItem("acessToken"))
            : null,
        myVideoUser: [],


    },
    reducers: {
        Logout: (state, action) => {
            localStorage.removeItem("accessToken")
            return { userInfo: null }
        },
        saveMyvideoUser: (state, action) => {
            return console.log(action.payload)
        }
    },
    extraReducers: {

        [LoginAcc.fulfilled]: (state, action) => {
            state.userInfo = action.payload
        },
        [RegisterAcc.fulfilled]: (state, action) => {
            return { ...state, userInfo: action.payload }
        },
        [RegisterAcc.rejected]: (state, action) => {
            return {
                ...state,
                userInfo: null,
                error: action.payload
            }
        },
        [loadUser.fulfilled]: (state, action) => {
            return { ...state, userInfo: action.payload };
        },
        [loadUser.rejected]: (state, action) => {
            return { ...state, userInfo: null };
        },
        [getMyvideoUser.fulfilled]: (state, action) => {
            return {
                ...state,
                myVideoUser: action.payload
            }
        }, [getMyvideoUser.rejected]: (state, action) => {
            return {
                ...state,
                error: action.payload
            }
        }, [saveMyvideoUser.fulfilled]: (state, action) => {
            return {
                ...state,
                user: action.payload

            }
        }
    },

})

const userReducer = userSlice.reducer

export const userSelector = state => state.userReducer.userInfo
export const userMyvideoSelector = state => state.userReducer.myVideoUser


export const { Logout } = userSlice.actions

export default userReducer