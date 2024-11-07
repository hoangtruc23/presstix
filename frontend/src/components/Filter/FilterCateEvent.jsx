import { useEffect, useState } from "react"
import { getEventCate } from "../../services/apiService";


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
            <select className="py-3 px-4 w-52 rounded-lg bg-warning appearance-none">
                {cateList && cateList.map((cate, index) => (
                    <option key={index} className="text-gray-700" selected>
                        {cate.name}
                    </option>
                ))}
            </select>
        </>
    )
}

export default FilterCateEvent