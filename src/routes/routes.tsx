

import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Users from '../pages/Users'
import Products from '../pages/Products'
import WishList from '../pages/WishList'



function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={'/login'} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/wish-list" element={<WishList />} />
        </Routes>
    )
}

export default AppRoutes