import { useEffect, useState } from 'react';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { getLocation } from '../../services/apiService';

function FilterCityEvent(props) {
    const { locationSelected, setLocationSelected } = props;
    const [citiesList, setCitiesList] = useState([]);
    const fecthDataLocations = async () => {
        const res = await getLocation();
        setCitiesList(res.data.location)
    }

    const handleChange = (event) => {
        setLocationSelected(event.target.value);
    };

    useEffect(() => {
        fecthDataLocations();
    }, [])

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tỉnh/ Thành phố</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={locationSelected}
                onChange={handleChange}
                label="Loại sự kiện"
            >
                <MenuItem value="">Tất cả</MenuItem>
                {citiesList?.map((city) => (
                    <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default FilterCityEvent
