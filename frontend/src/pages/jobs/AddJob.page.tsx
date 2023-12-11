import React, { useEffect, useState } from 'react'
import { ICompany, ICreateJobDto } from '../../types/global.typing'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import httpModule from '../../helpers/http.module';
import './Jobs.scss';
type Props = {}

const levelsArray: string[] = ["Intern", "Junior", "MidLevel", "Senior", "Teamlead", "Cto", "Architect"]

const AddJob = (props: Props) => {
    const [jobs, setJobs] = useState<ICreateJobDto>({ title: "", level: "", companyId: "" });
    const [companies, setCompany] = useState<ICompany[]>([])
    const redirect = useNavigate()
    useEffect(() => {
        httpModule
            .get<ICompany[]>("/Company/Get")
            .then((response) => {
                setCompany(response.data);
            })
            .catch((e) => {
                alert("Error");
                console.log(e);
            })
    }, [])
    const handleClickSaveBtn = () => {
        if (jobs.title === "" || jobs.level === "") {
            alert("Fill all fields");
            return;
        }
        httpModule.post("/Job/Create", jobs).then(responst => redirect("/jobs")).catch((error) => console.log(error))
    }
    const handleClickBackBtn = () => {
        redirect("/jobs")
    }
    return (
        <div className="content">
            <div className="add-job">
                <h2>Add New Job</h2>
                <TextField
                    autoComplete='off'
                    label="Job Title"
                    variant='outlined'
                    value={jobs.title}
                    onChange={e => setJobs({ ...jobs, title: e.target.value })}
                />
                <FormControl fullWidth>
                    <InputLabel>Job Level</InputLabel>
                    <Select
                        value={jobs.level}
                        label="Job Level"
                        onChange={(e) => setJobs({ ...jobs, level: e.target.value })}
                    >
                        {
                            levelsArray.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Company</InputLabel>
                    <Select
                        value={jobs.companyId}
                        label="Job Level"
                        onChange={(e) => setJobs({ ...jobs, companyId: e.target.value })}
                    >
                        {
                            companies.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                        }
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

export default AddJob