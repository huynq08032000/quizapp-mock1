import React, { useState } from "react";
import 'antd/dist/antd.css';
import { Button, Space, Radio, Select, Input } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuestions, setOrder, setSortField, setTitleSearch } from "../../../redux/adminQuestionSlice";

const SearchQuestionsComponent = () => {
    const dispatch = useDispatch()

    const pageSize = useSelector(state => state.questionsAdminSlice.pageSize)
    const order = useSelector(state => state.questionsAdminSlice.order)
    const sortField = useSelector(state => state.questionsAdminSlice.sortField)
    const loading = useSelector(state => state.questionsAdminSlice.status)
    const title = useSelector(state => state.questionsAdminSlice.title)
    const handleOrder = (e) => {
        dispatch(setOrder(e.target.value))
    };
    const handleSortField = (value) => {
        dispatch(setSortField(value))
    };
    const handleTitleSearch = (e) => {
        dispatch(setTitleSearch(e.target.value))
    }
    const handleOnSearch = () => {
        const paramSearch = {
            order: order,
            sortField: sortField,
            page: 1,
            size: pageSize,
        }
        if (title !== '') {
            paramSearch['keyWord'] = title
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
                    <Select.Option value="createdAt">Created At</Select.Option>
                    <Select.Option value="updatedAt">Updated At</Select.Option>
                </Select>
                <Input placeholder="Title" onChange={handleTitleSearch} value={title}/>
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