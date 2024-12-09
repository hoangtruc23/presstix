import { useEffect, useState } from "react"
import { getEventCate } from "../../services/apiService";
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import PropTypes from "prop-types";

function FilterCateEvent(props) {
    const { eventCate, setEventCate } = props;
    const [cateList, setCateList] = useState([]);
    const fetchCateEvent = async () => {
        const res = await getEventCate();
        setCateList(res.data.data);
    }

    useEffect(() => {
        fetchCateEvent();
    }, []);

    const handleChange = (event) => {
        setEventCate(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Loại sự kiện</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={eventCate}
                onChange={handleChange}
                label="Loại sự kiện"
            >
                <MenuItem value="">All</MenuItem>
                {cateList && cateList.map((cate, index) => (
                    <MenuItem key={index} value={cate.id}>{cate.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

FilterCateEvent.propTypes = {
    eventCate: PropTypes.any,
    setEventCate: PropTypes.func
};

export default FilterCateEvent;