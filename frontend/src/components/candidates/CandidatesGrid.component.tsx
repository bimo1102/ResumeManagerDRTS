import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import moment from 'moment'
import React from 'react'
import { ICandidate } from '../../types/global.typing'

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "firstName", headerName: "Name", width: 200 },
    { field: "lastName", headerName: "First Name", width: 150 },
    { field: "email", headerName: "Last Name", width: 150 },
    { field: "phone", headerName: "Email", width: 150 },
    { field: "corverLetter", headerName: "Phone", width: 150 },
    { field: "jobTitle", headerName: "C V", width: 150 },
    { field: "resumeUrl", headerName: "Download", width: 200, renderCell: (params) => moment(params.row.createAt).format("YYYY-MM-DD") },
]

interface ICandidatesGridProps {
    data: ICandidate[];
}

const CandidatesGrid = ({ data }: ICandidatesGridProps) => {
    return (
        <Box sx={{ width: "100%", height: 450 }} className='candidates-grid'>
            <DataGrid rows={data} columns={columns} getRowId={(row) => row.id} rowHeight={50} />
        </Box>
    )
}

export default CandidatesGrid