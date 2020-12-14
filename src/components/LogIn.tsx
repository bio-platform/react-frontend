import React from "react"
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"

export const LogIn = () =>  {
    return (
    <>
        <Link to={'/dashboard'}><Button variant="contained" >LogIn</Button></Link>
    </>
    )
}