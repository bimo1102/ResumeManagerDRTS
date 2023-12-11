import React, { useEffect, useState } from 'react'
import { ICreateCandidateDto, IJob } from '../../types/global.typing'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import httpModule from '../../helpers/http.module';
import './Candidates.scss';
type Props = {}

const AddCandidate = (props: Props) => {
    const [candidates, setCandidates] = useState<ICreateCandidateDto>({ firstName: "", lastName: "", email: "", phone: "", coverLetter: "", jobId: "" });
    const redirect = useNavigate()
    const [jobs, setJobs] = useState<IJob[]>([])
    const [pdfFile, setPdfFile] = useState<File | null>()
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
        if (candidates.firstName === "" || candidates.lastName === "" || candidates.email === "" || candidates.phone === "" || candidates.coverLetter === "" || candidates.jobId === "" || !pdfFile) {
            alert("Fill all fields");
            return;
        }
        const newCandidateFormData = new FormData();
        newCandidateFormData.append("firstName", candidates.firstName);
        newCandidateFormData.append("lastName", candidates.lastName);
        newCandidateFormData.append("email", candidates.email);
        newCandidateFormData.append("phone", candidates.phone);
        newCandidateFormData.append("coverLetter", candidates.coverLetter);
        newCandidateFormData.append("jobId", candidates.jobId);
        newCandidateFormData.append("pdfFile", pdfFile);
        httpModule
            .post("/Candidate/Create", newCandidateFormData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((responst) => redirect("/candidates"))
            .catch((error) => console.log(error));
    }
    const handleClickBackBtn = () => {
        redirect("/candidates")
    }
    return (
        <div className="content">
            <div className="add-candidate">
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
                <TextField
                    autoComplete='off'
                    label="Last Name"
                    variant='outlined'
                    value={candidates.lastName}
                    onChange={e => setCandidates({ ...candidates, lastName: e.target.value })}
                />
                <TextField
                    autoComplete='off'
                    label="Email"
                    variant='outlined'
                    value={candidates.email}
                    onChange={e => setCandidates({ ...candidates, email: e.target.value })}
                />
                <TextField
                    autoComplete='off'
                    label="Phone"
                    variant='outlined'
                    value={candidates.phone}
                    onChange={e => setCandidates({ ...candidates, phone: e.target.value })}
                />
                <TextField
                    autoComplete='off'
                    label="Cover Letter"
                    variant='outlined'
                    value={candidates.coverLetter}
                    onChange={e => setCandidates({ ...candidates, coverLetter: e.target.value })}
                    multiline
                />
                <input type="file" onChange={(e) => setPdfFile(e.target.files ? e.target.files[0] : null)} />
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