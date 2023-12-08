import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

const columns: GridColDef[] = [

const CompaniesGrid = ({ data }) => {
    return (
        <Box className='companies-grid'>
            <DataGrid>
                rows ={data}
                columns=
            </DataGrid>
        </Box>
    )
}

export default CompaniesGrid