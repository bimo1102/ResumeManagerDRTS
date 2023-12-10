import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import moment from 'moment'
import React from 'react'
import { IJob } from '../../types/global.typing'

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "level", headerName: "Level", width: 150 },
    { field: "companyName", headerName: "Company Name", width: 150 },
    { field: "createAt", headerName: "Creation Time", width: 200, renderCell: (params) => moment(params.row.createAt).format("YYYY-MM-DD") },
]

interface IJobGridProps {
    data: IJob[];
}

const JobsGrid = ({ data }: IJobGridProps) => {
    return (
        <Box sx={{ width: "100%", height: 450 }} className='jobs-grid'>
            <DataGrid rows={data} columns={columns} getRowId={(row) => row.id} rowHeight={50} />
        </Box>
    )
}

export default JobsGrid