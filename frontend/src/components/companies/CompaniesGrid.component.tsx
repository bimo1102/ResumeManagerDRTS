import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import moment from 'moment'
import React from 'react'
import { ICompany } from '../../types/global.typing'
import './Companies-grid.scss'

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "size", headerName: "Size", width: 150 },
    { field: "createAt", headerName: "Creation Time", width: 200, renderCell: (params) => moment(params.row.createAt).format("YYYY-MM-DD") },
]

interface ICompaniesGridProps {
    data: ICompany[];
}

const CompaniesGrid = ({ data }: ICompaniesGridProps) => {
    return (
        <Box sx={{ width: "100%", height: 450 }} className='companies-grid'>
            <DataGrid rows={data} columns={columns} getRowId={(row) => row.id} rowHeight={50} />
        </Box>
    )
}

export default CompaniesGrid