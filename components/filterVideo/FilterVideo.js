import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { filterVideoKey } from '../../store/reducer/video/videoSlice';
import './FilterVideo.scss'
export default function FilterVideo() {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        dispatch(filterVideoKey(data))
    }
    useEffect(() => {
        dispatch(filterVideoKey({ Type: "Tất cả" }))
    }, [])
    return (
        <div className='filter'>
            <div className="filter--div">
                <form onSubmit={handleSubmit(onSubmit)} className='filter-form'>
                    <div>
                        <label htmlFor="filter-eptype">Tiến độ</label>
                        <select {...register("Status")}>
                            <option>Tất cả</option>
                            <option > Đã hoàn thành</option>
                            <option >Chưa xong</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="filter-category">Thể loại</label>
                        <select {...register("Type")}>
                            <option >Tất cả</option>
                            <option >2D</option>
                            <option >3D</option>
                            <option >anime</option>
                            <option >movie</option>


                        </select>
                    </div>
                    <div>
                        <label htmlFor="filter-category">Sắp xếp</label>
                        <select {...register("Sort")}>
                            <option >Lượt xem</option>
                            <option >Năm</option>
                            <option>Bình luận</option>

                        </select>
                    </div>


                    <div className='button'>
                        <button type="submit">
                            <span>Duyệt phim</span>
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}
