import { ArrowBack } from "@material-ui/icons";
import { Button, Icon, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddQuestionComponent = () => {
    const navigate = useNavigate()
    return (
        <>
            <div
                className="site-layout-background"
                style={{
                    padding: 24,
                    minHeight: 360
                }}
            >
                <div className="header">
                    <div className="header-title" style={{ display: 'flex' }}>
                        <Icon><ArrowBack onClick={()=>{navigate('/admin')}}/></Icon>
                        <Typography variant="h2" style={{ fontSize: '30px', margin : '0 10px' }}>
                            Create Question
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddQuestionComponent;