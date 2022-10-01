import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpenUpdate } from '../../../redux/modalSilce';
import { fetchQuestion } from '../../../redux/currentQuestionSlice';

const ModalUpdate = () => {
    const dispatch = useDispatch()
    const isModalUpadte = useSelector(state => state.modal.isOpenUpdate)
    const idQuestion = useSelector(state => state.modal.idQuestion)
    const currentQuestion = useSelector(state => state.currentQuestion.currentQuestion)
    const handleOk = () => {
        dispatch(setIsOpenUpdate(false))
    };

    const handleCancel = () => {
        dispatch(setIsOpenUpdate(false))
    };

    useEffect(() => {
        if (idQuestion > 0) {
            console.log(idQuestion)
            dispatch(fetchQuestion(idQuestion))
        }
    }, [idQuestion])

    return (
        <>
            <Modal title="Update Modal" open={isModalUpadte} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default ModalUpdate;