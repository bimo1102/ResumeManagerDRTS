import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React from 'react'
import { ICandidate } from '../../types/global.typing'
import { baseUrl } from '../../constants/url.constants'
import { PictureAsPdf } from '@mui/icons-material'

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "firstName", headerName: "First Name", width: 120 },
    { field: "lastName", headerName: "Last Name", width: 120 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "coverLetter", headerName: "Cover Letter", width: 400 },
    { field: "jobTitle", headerName: "Title", width: 150 },
    { field: "resumeUrl", headerName: "Download", width: 150, renderCell: (params) => <a href={`${baseUrl}/Candidate/download/${params.row.resumeUrl}`}><PictureAsPdf /></a> },
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