import React from "react";
import { useSelector } from "react-redux";

const PlayComponent = () => {
    const user = useSelector(state => state.user.user)
    console.log(user)
    return(
        <>
            This is PlayComponent
        </>
    )
}

export default PlayComponent