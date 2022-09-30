import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuestions } from "../../../redux/adminQuestionSlice";
import { Table, Space, Switch, Button, Modal, Input, Typography, Image } from 'antd';
import 'antd/dist/antd.css';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { defaultThumbnail } from "../../../config/regex";

const TableComponent = () => {
    const { Text } = Typography;
    const dispatch = useDispatch()
    const questions = useSelector(state => state.questionsAdminSlice.questions)
    const [data, setData] = useState([])
    useEffect(() => {
        const paramSearch = {
            order: 'ASC',
            sortField: 'id',
            page: 1,
            size: 10,
        }
        dispatch(fetchAllQuestions(paramSearch))
    }, [])

    useEffect(() => {
        if (questions) {
            const arrData = questions.map((el, index) => {
                return {
                    key : el.id, 
                    id: index + 1,
                    idQuestion: el.id,
                    title: el.title,
                    thumbnail_link: el.thumbnail_link,
                    createdAt: el.createdAt
                }
            })
            setData(arrData)
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
            title: 'title',
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
        },
        {
            title: 'Create Day',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '20%',
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
            Table Component
            <Table
                columns={columns}
                dataSource={data}
                scroll={{
                    y: 500,
                }}
            />
        </>
    )
}

export default TableComponent;