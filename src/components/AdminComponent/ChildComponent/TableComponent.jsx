import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuestions, setCurrentPage } from "../../../redux/adminQuestionSlice";
import { Table, Space, Switch, Button, Modal, Input, Typography, Image } from 'antd';
import 'antd/dist/antd.css';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { defaultThumbnail } from "../../../config/regex";

const TableComponent = () => {
    const moment = require("moment");
    const { Text } = Typography;
    const dispatch = useDispatch()
    const questions = useSelector(state => state.questionsAdminSlice.questions)
    const total = useSelector(state => state.questionsAdminSlice.total)
    const loading = useSelector(state => state.questionsAdminSlice.status)
    const pageSize = useSelector(state => state.questionsAdminSlice.pageSize)
    const order = useSelector(state => state.questionsAdminSlice.order)
    const sortField = useSelector(state => state.questionsAdminSlice.sortField)
    const currentPage = useSelector(state => state.questionsAdminSlice.currentPage)

    const [data, setData] = useState([])
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: currentPage,
            pageSize: pageSize,
        },
    });
    const handleTableChange = (pagination) => {
        dispatch(setCurrentPage(pagination.current))
        setTableParams({
            pagination,
        });
    };

    useEffect(() => {
        const paramSearch = {
            order: order,
            sortField: sortField,
            page: currentPage,
            size: pageSize,
        }
        dispatch(fetchAllQuestions(paramSearch))
    }, [currentPage])

    useEffect(() => {
        if (questions) {
            const arrData = questions.map((el, index) => {
                return {
                    key: el.id,
                    id: index + 1,
                    idQuestion: el.id,
                    title: el.title,
                    thumbnail_link: el.thumbnail_link,
                    createdAt: moment(el.createdAt).format('MMMM Do YYYY, h:mm:ss a')
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
    }, [questions])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'idQuestion',
            width: '3%',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (title) => <Text>{title}</Text>,
            align: 'left',
            width: '10%',
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail_link',
            key: 'thumbnail_link',
            render: (key) => <Image
                width={200}
                src={key ? key : defaultThumbnail}
            />,
            width: '10%',
            align: 'center'
        },
        {
            title: 'Create Day',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '10%',
        },
        {
            title: 'Action',
            key: 'action',
            render: (dataIndex) => (
                <Space size="middle">
                    <Button type="primary" shape="circle" icon={<EditOutlined />} size={'large'} style={{ backgroundColor: 'green' }}
                        onClick={() => {
                            console.log(dataIndex.idQuestion)
                        }} />
                    <Button type="primary" shape="circle" icon={<EyeOutlined />} size={'large'}
                        onClick={() => {
                            console.log(dataIndex.idQuestion)
                        }}
                    />
                    <Button type="primary" shape="circle" icon={<DeleteOutlined />} size={'large'} danger
                        onClick={() => {
                            console.log(dataIndex.idQuestion)
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
        </>
    )
}

export default TableComponent;