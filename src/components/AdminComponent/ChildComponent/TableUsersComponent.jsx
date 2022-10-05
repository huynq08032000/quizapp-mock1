import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Space, Button, Modal, Input, Typography, Image, Tag } from 'antd';
import 'antd/dist/antd.css';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { fetchAllUsers, setCurrentPageUsers } from "../../../redux/userAdminSlice";
import { colorTag } from "../../../ultis/ultis";
import { setIdUser, setIsOpenDeleteUser } from "../../../redux/modalSilce";
import ModalDeleteUser from "../Modal/ModalDeleteUser";

const TableUsersComponent = () => {
    const { Text } = Typography;
    const dispatch = useDispatch()
    const pageSize = useSelector(state => state.userAdminSlice.pageSize)
    const total = useSelector(state => state.userAdminSlice.total)
    const loading = useSelector(state => state.userAdminSlice.status)
    const order = useSelector(state => state.userAdminSlice.order)
    const sortField = useSelector(state => state.userAdminSlice.sortField)
    const currentPage = useSelector(state => state.userAdminSlice.currentPage)
    const users = useSelector(state => state.userAdminSlice.users)
    const role1 = useSelector(state => state.userAdminSlice.role1)
    const [data, setData] = useState([])
    const isDeleteUser = useSelector(state => state.userAdminSlice.isDeleteUser)
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: currentPage,
            pageSize: pageSize,
        },
    });
    const handleTableChange = (pagination) => {
        dispatch(setCurrentPageUsers(pagination.current))
        setTableParams({
            pagination,
        });
    };

    useEffect(() => {
        if (currentPage > 0 || isDeleteUser) {
            const paramSearch = {
                order: order,
                sortField: sortField,
                page: currentPage,
                size: pageSize,
            }
            if (role1 !== '') {
                paramSearch.role1 = role1
            }
            dispatch(fetchAllUsers(paramSearch))
        }
    }, [currentPage, isDeleteUser])

    useEffect(() => {
        if (users) {
            const arrData = users.map((el, index) => {
                return {
                    key: el.id,
                    id: index + 1,
                    idUser: el.id,
                    email: el.email,
                    name: el.name,
                    avatar_link: el.avatar_link,
                    roles: el.roles
                }
            })
            setData(arrData)
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: total,
                },
            });
        }
    }, [users])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'idUser',
            width: '3%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email) => <Text>{email}</Text>,
            align: 'left',
            width: '10%',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name) => <Text>{name}</Text>,
            width: '10%',
            align: 'left'
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar_link',
            key: 'avatar_link',
            render: (avatar_link) => <Image width={'100px'} src={avatar_link} />,
            width: '10%',
            align: 'center'
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            render: (roles) => (
                <Space size="middle">
                    {roles.map((el, index) => {
                        return (
                            <Tag key={index} color={colorTag[el]}>{el}</Tag>
                        )
                    })}
                </Space>
            ),
            width: '10%',
        },
        {
            title: 'Action',
            key: 'action',
            render: (dataIndex) => (
                <Space size="middle">
                    <Button type="primary" shape="circle" icon={<EditOutlined />} size={'large'} style={{ backgroundColor: 'green' }}
                        onClick={() => {
                            console.log(dataIndex.idUser)
                        }} />
                    {/* <Button type="primary" shape="circle" icon={<EyeOutlined />} size={'large'}
                        onClick={() => {
                            console.log(dataIndex.idQuestion)
                        }}
                    /> */}
                    <Button type="primary" shape="circle" icon={<DeleteOutlined />} size={'large'} danger
                        onClick={() => {
                            dispatch(setIsOpenDeleteUser(true))
                            dispatch(setIdUser(dataIndex.idUser))
                        }}
                    />

                </Space>
            ),
            align: 'center',
            width: '10%',
        }

    ];
    return (
        <>
            <Table
                pagination={tableParams.pagination}
                columns={columns}
                dataSource={data}
                scroll={{
                    y: 500,
                }}
                loading={loading}
                onChange={handleTableChange}
            />
            <ModalDeleteUser />
        </>
    )
}

export default TableUsersComponent;