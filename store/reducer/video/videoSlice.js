import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRender } from "../../../config";
export const getAllVideo = createAsyncThunk('ok', async () => {
    const { data } = await axiosRender.get('http://localhost:5000/video')
    return data
})
export const getVideobyId = createAsyncThunk('okvideo', async (id) => {
    const { data } = await axiosRender.get(`http://localhost:5000/video/detail/${id}`)
    return data
})
export const getVideobyType = createAsyncThunk('okvideotype', async (type) => {

    const { data } = await axiosRender.get(`http://localhost:5000/video/${type}`)
    return data
})
export const updateViews = createAsyncThunk('okviewsupdate', async (id) => {
    console.log(id)
    const { data } = await axiosRender.put(`http://localhost:5000/video/updateview/video/${id}`)
    return data
})
export const getVideoChapter = createAsyncThunk('okvideochapter', async (list) => {
    const { id, chapter } = list
    const { data } = await axiosRender.get(`http://localhost:5000/video/videoId/${id}/${chapter}`)
    return data
})

export const searchVideo = createAsyncThunk('okname', async (name) => {

    try {
        const { data } = await axiosRender.get(
            `http://localhost:5000/video/search/video?name=${name}`
        );
        return data
    } catch (error) {
        return {}
    }
});
export const commentVideo = createAsyncThunk('okComment', async (list, { dispatch, getState }) => {
    try {
        const { comment, id } = list
        const { userInfo } = getState().userReducer

        const { data } = await axiosRender.post(
            `http://localhost:5000/video/comment/${id}`,
            comment, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        );
        return data
    } catch (error) {
        console.log(error)
    }
});
export const repCommentVideo = createAsyncThunk('okrepComment', async (list, { dispatch, getState }) => {
    try {
        const { comment, id } = list
        const { userInfo } = getState().userReducer

        const { data } = await axiosRender.post(
            `http://localhost:5000/video/rep/comment/${id}`,
            comment, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        );
        return data
    } catch (error) {
        console.log(error)
    }
});

export const deleteComment = createAsyncThunk('deletecmtUsers/deletecmtUsersFetched', async (items, { dispatch, getState
}) => {

    try {
        const { userInfo } = getState().userReducer
        const { data } = await axiosRender.patch(
            `http://localhost:5000/video/deletecmt/`, items, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        )
        return (
            data

        )
    } catch (error) {
        return null
    }
});
export const deleteRepComment = createAsyncThunk('deleterepcmtUsers/deleterepcmtUsersFetched', async (items, { dispatch, getState
}) => {

    try {
        // console.log(items)

        const { userInfo } = getState().userReducer
        const { data } = await axiosRender.patch(
            `http://localhost:5000/video/deleterepcmt/`, items, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        )
        return (
            data

        )
    } catch (error) {
        return null
    }
});
const videosSlice = createSlice({
    name: 'video',
    initialState: {
        allVideo: {},
        allVideoSearch: [],
        videoId: {},
        videoType: {

        },
        Key: {},
        videoList: [],
        videoChapter: []

    },
    reducers: {
        filterVideoKey(state, action) {
            return {
                ...state,
                Key: action.payload
            }
        },
        videoListget(state, action) {
            return console.log(action.payload)
        }
    },

    extraReducers: {
        [getAllVideo.fulfilled]: (state, action) => {

            state.allVideo = action.payload
        },
        [getVideobyId.fulfilled]: (state, action) => {
            state.videoId = action.payload
        },
        [getVideobyType.fulfilled]: (state, action) => {
            state.videoType = action.payload
        },
        [searchVideo.fulfilled]: (state, action) => {
            state.allVideoSearch = action.payload
        },
        [getVideoChapter.fulfilled]: (state, action) => {
            state.videoChapter = action.payload
        },
        [commentVideo.fulfilled]: (state, action) => {
            state.videoId = action.payload
        },
        [repCommentVideo.fulfilled]: (state, action) => {
            state.videoId = action.payload
        }, [deleteComment.fulfilled]: (state, action) => {
            state.videoId = action.payload

        }, [deleteRepComment.fulfilled]: (state, action) => {
            state.videoId = action.payload
        }

    },
})
//reducer
const videosReducer = videosSlice.reducer

// Selector
export const videosSelector = state => state.videoReducer.allVideo
export const videosSelectorId = state => state.videoReducer.videoId
export const videosSelectorType = state => state.videoReducer.videoType
export const videosSelectorSearch = state => state.videoReducer.allVideoSearch



// Action export
export const {
    filterVideoKey,
    videoListget
} = videosSlice.actions
export default videosReducer;