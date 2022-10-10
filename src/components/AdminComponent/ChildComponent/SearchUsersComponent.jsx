import React, { useState } from "react";
import 'antd/dist/antd.css';
import { Button, Space, Radio, Select, Input } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, setKeyWord, setOrderUsers, setRole1, setSortFieldUsers } from "../../../redux/userAdminSlice";

const SearchUsersComponent = () => {
    const dispatch = useDispatch()

    const pageSize = useSelector(state => state.userAdminSlice.pageSize)
    const order = useSelector(state => state.userAdminSlice.order)
    const sortField = useSelector(state => state.userAdminSlice.sortField)
    const currentPage = useSelector(state => state.userAdminSlice.currentPage)
    const loading = useSelector(state => state.userAdminSlice.status)
    const role1 = useSelector(state => state.userAdminSlice.role1)
    const keyWord = useSelector(state => state.userAdminSlice.keyWord)

    const handleOrder = (e) => {
        dispatch(setOrderUsers(e.target.value))
    };

    const handleSortField = (value) => {
        dispatch(setSortFieldUsers(value))
    };
    const handleRole1 = (value) => {
        dispatch(setRole1(value))
    };
    const handleKeyWorld = (value) => {
        dispatch(setKeyWord(value))
    }
    const handleOnSearch = () => {
        const paramSearch = {
            order: order,
            sortField: sortField,
            page: 1,
            size: pageSize,
        }
        if (role1 !== '') {
            paramSearch.role1 = role1
        }
        if (keyWord !== "") {
            paramSearch.keyWord = keyWord
        }
        dispatch(fetchAllUsers(paramSearch))
    }

    return (
        <>
            <Space size={15} style={{ marginBottom: '10px' }}>
                <Select
                    defaultValue={sortField}
                    style={{
                        width: 120,
                    }}
                    onChange={handleSortField}
                >
                    <Select.Option value="id">ID</Select.Option>
                    <Select.Option value="name">Name</Select.Option>
                    <Select.Option value="email">Email</Select.Option>
                    <Select.Option value="created_at">Created At</Select.Option>
                    <Select.Option value="updated_at">Updated At</Select.Option>
                </Select>
                <Select
                    defaultValue={role1}
                    style={{
                        width: 120,
                    }}
                    onChange={handleRole1}
                >
                    <Select.Option value="">All</Select.Option>
                    <Select.Option value="user">User</Select.Option>
                    <Select.Option value="admin">Admin</Select.Option>
                </Select>
                <Input value={keyWord} placeholder='Input key word' onChange={(e)=>handleKeyWorld(e.target.value)}/>
                <Radio.Group onChange={handleOrder} value={order}>
                    <Radio value={'ASC'}>Ascending</Radio>
                    <Radio value={'DESC'}>Descending</Radio>
                </Radio.Group>
                <Button type="primary" onClick={handleOnSearch} loading={loading}>Search</Button>
            </Space>
        </>
    )
}

export default SearchUsersComponent;