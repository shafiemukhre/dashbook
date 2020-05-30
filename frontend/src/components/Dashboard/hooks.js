import React, { useState, useEffect } from 'react';

export default function useDashboardData(){

    const [dashboardData, setDashboardData] = useState([])

    useEffect(() => {
        const localhost = 'http://localhost'
        const endpoint = '/rutuja/dashboard'
        const url = `${localhost}:5000${endpoint}`
        fetch(url)
        .then(response => response.json())
        .then(data => setDashboardData(data))
    },[])

    return dashboardData
}