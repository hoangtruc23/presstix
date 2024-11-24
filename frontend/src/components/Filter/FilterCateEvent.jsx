import { useEffect, useState } from "react"
import { getEventCate } from "../../services/apiService";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function FilterCateEvent() {
    const [cateList, setCateList] = useState();

    const fetchCateEvent = async () => {
        const res = await getEventCate();
        setCateList(res.data.data);
    }

    useEffect(() => {
        fetchCateEvent();
    }, [])

    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Loại sự kiện</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                >
                    {cateList && cateList.map((cate, index) => (
                        <MenuItem key={index} value={cate.name}>{cate.name}</MenuItem>
                    ))}
                </Select>

            </FormControl>
        </>
    )
}

export default FilterCateEvent