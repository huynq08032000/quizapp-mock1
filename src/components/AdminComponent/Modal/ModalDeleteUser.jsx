import React, { useEffect } from "react";
import { Image, Modal, Typography } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenDeleteUser } from "../../../redux/modalSilce";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
import { fetchUser } from "../../../redux/currentUserSlice";
import { deleteUser } from "../../../redux/userAdminSlice";

const ModalDeleteUser = () => {
    const dispatch = useDispatch()
    const isOpenDeleteUser = useSelector(state => state.modal.isOpenDeleteUser)
    const idUser = useSelector(state => state.modal.idUser)
    const currentUser = useSelector(state => state.currentUser.currentUser)
    const status = useSelector(state => state.currentUser.status)
    const statusDeleteUser = useSelector(state => state.userAdminSlice.statusDeleteUser)
    const handleOk = () => {
        handleDelete(idUser)
        setTimeout(()=>{dispatch(setIsOpenDeleteUser(false))},1000)
    }
    const handleCancel = () => {
        dispatch(setIsOpenDeleteUser(false))
    }
    const handleDelete = (idUser) => {
        dispatch(deleteUser(idUser))
    }
    useEffect(() => {
        if (idUser > 0 && isOpenDeleteUser) {
            dispatch(fetchUser(idUser))
        }
    }, [isOpenDeleteUser])

    return (
        <>
            <Modal title="Delete User Modal" open={isOpenDeleteUser} onOk={handleOk} onCancel={handleCancel} confirmLoading={statusDeleteUser}>
                {
                    status ? <LoadingComponent /> : <>
                        <Typography style={{ color: 'red' }}>Do you really want to delete this User?</Typography>
                        <Typography >{currentUser.email}</Typography>
                        <Typography >{currentUser.name}</Typography>
                        <Image
                            width={200}
                            src={currentUser.avatar_link}
                        />
                    </>
                }

            </Modal>
        </>
    )
}

export default ModalDeleteUser;