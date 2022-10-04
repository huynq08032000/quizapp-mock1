import { Button, Typography } from "@mui/material";
import React from "react";
import '../css/index.css'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import SearchUsersComponent from "./SearchUsersComponent";

const UserManagementComponent = () => {
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
                    <div className="header-title">
                        <Typography variant="h2" style={{ fontSize: '30px' }}>
                            Users
                        </Typography>
                    </div>
                    <div className="btn">
                        <Button type="primary" variant="contained"
                            onClick={() => {
                                navigate('/admin/addUser')
                            }}
                            endIcon={<AddIcon />
                            }>Add</Button>
                    </div>
                </div>
                <div className="main-component" style={{ paddingTop: '50px' }}>
                    <SearchUsersComponent/>
                </div>
            </div>
        </>
    )
}

export default UserManagementComponent;