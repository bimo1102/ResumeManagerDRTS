import { useEffect, useState } from 'react'
import './Companies.scss'
import { ICompany } from '../../types/global.typing';
import httpModule from '../../helpers/http.module';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';

const Companies = () => {

    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const redirect = useNavigate()
    useEffect(() => {
        setLoading(true);
        httpModule
            .get<ICompany[]>("/Company/Get")
            .then((response) => {
                setCompanies(response.data);
                setLoading(false);
            })
            .catch((error) => {
                alert("Error");
                console.log(error);
                setLoading(false);
            });
    }, []);

    console.log(companies)
    return (
        <div className='content companies'>
            <div className="heading">
                <h2>Companies</h2>
                <Button variant='outlined' onClick={() => redirect("/companies/add")}>
                    <Add />
                </Button>
            </div>
        </div>
    )
}

export default Companies