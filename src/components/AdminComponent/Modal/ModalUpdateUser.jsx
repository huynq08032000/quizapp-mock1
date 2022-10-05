import React, { useEffect, useRef, useState } from "react";
import { Cascader, Image, Input, Modal, Typography } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenUpdateUser } from "../../../redux/modalSilce";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
import { fetchUser, setName, setRoles } from "../../../redux/currentUserSlice";
import { optionsRole } from "../../../ultis/ultis";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { toastCss } from "../../StyleComponent/StyleCompoent";
import { updateUser } from "../../../redux/userAdminSlice";

const styleInput = {
    marginTop: '10px',
    width: '100%'
}

const ModalUpdateUser = () => {
    const convertRole = (arrRoles) => {
        return arrRoles?.map(el => [el])
    }
    const dispatch = useDispatch()
    const isOpenUpdateUser = useSelector(state => state.modal.isOpenUpdateUser)
    const idUser = useSelector(state => state.modal.idUser)
    const currentUser = useSelector(state => state.currentUser.currentUser)
    const status = useSelector(state => state.currentUser.status)
    const statusUpdateUser = useSelector(state => state.userAdminSlice.statusUpdateUser)
    const name = useSelector(state => state.currentUser.name)
    const [errors, setErrors] = useState({ name: '' })
    const handleOk = () => {
        setErrors({})
        if (name === '') {
            setErrors({ ...errors, name: 'Name is required' })
            return;
        }
        if (currentUser.roles.length === 0) {
            toast.warning('Roles must contain at least 1 elements', toastCss)
            return;
        }
        const data = {
            id : idUser,
            email : currentUser.email,
            name : currentUser.name,
            roles : currentUser.roles
        }
        dispatch(updateUser(data))
    }
    const handleCancel = () => {
        dispatch(setIsOpenUpdateUser(false))
    }
    const onChange = (value) => {
        let roleSubmit = []
        if (value.length === 1) {
            roleSubmit = [...value[0]]
        } else {
            value.forEach(el => {
                roleSubmit.push(el[0])
            })
        }
        console.log(roleSubmit)
        dispatch(setRoles(roleSubmit))
    };
    const myHandleChange = (e) => {
        dispatch(setName(e.target.value))
    }
    useEffect(() => {
        if (idUser > 0 && isOpenUpdateUser) {
            dispatch(fetchUser(idUser))
        }
    }, [isOpenUpdateUser])

    return (
        <>
            <Modal title="Update User Modal" open={isOpenUpdateUser} onOk={handleOk} onCancel={handleCancel} confirmLoading={statusUpdateUser}>
                {
                    status ? <LoadingComponent /> : <>
                        <Input
                            id="email"
                            name="email"
                            label="Email"
                            placeholder="Enter email"
                            style={styleInput}
                            value={currentUser.email}
                            disabled
                        />
                        <Input
                            id="name"
                            name="name"
                            label="Name"
                            placeholder="Enter name"
                            style={styleInput}
                            value={name}
                            onChange={myHandleChange}
                        />
                        {errors.name && <Typography style={{ color: 'red' }}>{errors.name}</Typography>}
                        <Cascader
                            name="roles"
                            placeholder='Roles'
                            options={optionsRole}
                            onChange={onChange}
                            multiple
                            maxTagCount="responsive"
                            defaultValue={convertRole(currentUser.roles)}
                            style={styleInput}
                        />
                    </>
                }
            </Modal>
        </>
    )
}

export default ModalUpdateUser;