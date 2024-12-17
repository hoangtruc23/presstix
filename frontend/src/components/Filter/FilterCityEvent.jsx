import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';

function FilterCityEvent() {
    // const { eventStatus } = props;
    // const [cateList, setCateList] = useState([]);

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tỉnh/ Thành phố</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={eventCate}
                // onChange={handleChange}
                label="Loại sự kiện"
            >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem >Test</MenuItem>
            </Select>
        </FormControl>
    )
}

export default FilterCityEvent
