import axios from "axios";


export const axiosRender = axios.create({
    baseURL: "https://server-movie.onrender.com/"
})