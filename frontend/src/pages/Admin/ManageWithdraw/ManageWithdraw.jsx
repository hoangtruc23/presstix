import { useEffect, useState } from "react"
import ManageWithdrawTable from "../../../components/Tables/ManageWithdrawTable"
import { getWithdrawal } from '../../../services/Admin/apiServiceAdmin'
function ManageWithdraw() {
    const [withdrawList, setWithdrawList] = useState();

    const fetchDataWithdrawal = async () => {
        const res = await getWithdrawal();
        setWithdrawList(res.data.withdrawal)
    }

    useEffect(() => {
        fetchDataWithdrawal()
    }, [])

    return (
        <div>
            <h2>Yêu cầu thanh toán</h2>
            <ManageWithdrawTable withdrawList={withdrawList} />
        </div>
    )
}

export default ManageWithdraw
