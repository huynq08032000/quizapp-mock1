import React, { useState } from "react";
import 'antd/dist/antd.css';
import { Button, Space, Radio, Select, Input } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuestions, setOrder, setSortField } from "../../../redux/adminQuestionSlice";

const SearchQuestionsComponent = () => {
    const dispatch = useDispatch()

    const pageSize = useSelector(state => state.questionsAdminSlice.pageSize)
    const order = useSelector(state => state.questionsAdminSlice.order)
    const sortField = useSelector(state => state.questionsAdminSlice.sortField)
    const currentPage = useSelector(state => state.questionsAdminSlice.currentPage)
    const loading = useSelector(state => state.questionsAdminSlice.status)

    const handleOrder = (e) => {
        dispatch(setOrder(e.target.value))
    };

    const handleSortField = (value) => {
        dispatch(setSortField(value))
    };

    const handleOnSearch = () => {
        const paramSearch = {
            order: order,
            sortField: sortField,
            page: currentPage,
            size: pageSize,
        }
        dispatch(fetchAllQuestions(paramSearch))
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
                    <Select.Option value="title">Title</Select.Option>
                    <Select.Option value="thumbnail">Thumbnail</Select.Option>
                    <Select.Option value="createAt">Create At</Select.Option>
                </Select>
                <Input placeholder="Title" />
                <Radio.Group onChange={handleOrder} value={order}>
                    <Radio value={'ASC'}>Ascending</Radio>
                    <Radio value={'DESC'}>Descending</Radio>
                </Radio.Group>
                <Button type="primary" onClick={handleOnSearch} loading={loading}>Search</Button>
            </Space>
        </>
    )
}

export default SearchQuestionsComponent;