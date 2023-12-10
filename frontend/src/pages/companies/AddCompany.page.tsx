import React, { useState } from 'react'
import { ICreateCompanyDto } from '../../types/global.typing'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import httpModule from '../../helpers/http.module';
import './Companies.scss';
type Props = {}
const CompaniesArray: string[] = ["Small", "Medium", "large"]

const AddCompany = (props: Props) => {
    const [company, setCompany] = useState<ICreateCompanyDto>({ name: "", size: "" });
    const redirect = useNavigate()
    const handleClickSaveBtn = () => {
        if (company.name === "" || company.size === "") {
            alert("Fill all fields");
            return;
        }
        httpModule.post("/Company/Create", company).then(responst => redirect("/companies")).catch((error) => console.log(error))
    }
    const handleClickBackBtn = () => {
        redirect("/companies")
    }
    return (
        <div className="content">
            <div className="add-company">
                <h2>Add New Company</h2>
                <TextField
                    autoComplete='off'
                    label="company Name"
                    variant='outlined'
                    value={company.name}
                    onChange={e => setCompany({ ...company, name: e.target.value })}
                />
                <FormControl fullWidth>
                    <InputLabel>Company Size</InputLabel>
                    <Select
                        value={company.size}
                        label="Company Size"
                        onChange={(e) => setCompany({ ...company, size: e.target.value })}
                    >
                        {CompaniesArray.map(item => (
                            <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className="btn">
                    <Button variant='outlined' color='primary' onClick={handleClickSaveBtn}>
                        Save
                    </Button>
                    <Button variant='outlined' color='secondary' onClick={handleClickBackBtn}>
                        Back
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddCompany