import React, { useEffect } from "react";
import { Image, Modal, Typography } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenDelete } from "../../../redux/modalSilce";
import { fetchQuestion } from "../../../redux/currentQuestionSlice";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
import { deleteQuestion } from "../../../redux/adminQuestionSlice";

const ModalDeleteQuestion = () => {
    const dispatch = useDispatch()
    const isOpenDelete = useSelector(state => state.modal.isOpenDelete)
    const idQuestion = useSelector(state => state.modal.idQuestion)
    const currentQuestion = useSelector(state => state.currentQuestion.currentQuestion)
    const status = useSelector(state => state.currentQuestion.status)
    const statusDeleteQuestion = useSelector(state => state.questionsAdminSlice.statusDeleteQuestion)
    const handleOk = () => {
        handleDelete(idQuestion)
        setTimeout(()=>{dispatch(setIsOpenDelete(false))},1000)
    }
    const handleCancel = () => {
        dispatch(setIsOpenDelete(false))
    }
    const handleDelete = (idQuestion) =>{
        dispatch(deleteQuestion(idQuestion))
    }
    useEffect(() => {
        if (idQuestion > 0 && isOpenDelete) {
            dispatch(fetchQuestion(idQuestion))
        }
    }, [isOpenDelete])

    return (
        <>
            <Modal title="Delete Question Modal" open={isOpenDelete} onOk={handleOk} onCancel={handleCancel} confirmLoading={statusDeleteQuestion}>
                {
                    status ? <LoadingComponent /> : <>
                        <Typography style={{ color: 'red' }}>Do you really want to delete this question?</Typography>
                        <Typography >{currentQuestion.title}</Typography>
                        <Image
                            width={400}
                            src={currentQuestion.thumbnail_link}
                        />
                    </>
                }

            </Modal>
        </>
    )
}

export default ModalDeleteQuestion;