import React, { useEffect, useState } from 'react'
import { ICreateCandidateDto, IJob } from '../../types/global.typing'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import httpModule from '../../helpers/http.module';
import './Candidates.scss';
type Props = {}

const AddCandidate = (props: Props) => {
    const [candidates, setCandidates] = useState<ICreateCandidateDto>({ firstName: "", lastName: "", email: "", phone: "", corverLetter: "", jobId: "" });
    const redirect = useNavigate()
    const [jobs, setJobs] = useState<IJob[]>([])
    useEffect(() => {
        httpModule
            .get<IJob[]>("/Job/Get")
            .then((response) => {
                setJobs(response.data);
            })
            .catch((e) => {
                alert("Error");
                console.log(e);
            })
    }, [])
    const handleClickSaveBtn = () => {
        if (candidates.firstName === "" || candidates.lastName === "" || candidates.email === "" || candidates.phone === "" || candidates.corverLetter === "" || candidates.jobId === "") {
            alert("Fill all fields");
            return;
        }
        httpModule.post("/Candidate/Create", candidates).then(responst => redirect("/candidates")).catch((error) => console.log(error))
    }
    const handleClickBackBtn = () => {
        redirect("/candidates")
    }
    return (
        <div className="content">
            <div className="add-Candidate">
                <h2>Add New Candidate</h2>
                <FormControl fullWidth>
                    <InputLabel>Job</InputLabel>
                    <Select
                        value={candidates.jobId}
                        label="Job"
                        onChange={(e) => setCandidates({ ...candidates, jobId: e.target.value })}
                    >
                        {jobs.map(item => (
                            <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    autoComplete='off'
                    label="First Name"
                    variant='outlined'
                    value={candidates.firstName}
                    onChange={e => setCandidates({ ...candidates, firstName: e.target.value })}
                />

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

export default AddCandidate