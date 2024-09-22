

function TicketTable() {
    return (
        <table className="table table-striped  bg-[#f0f0f0]">
            <thead>
                <tr>
                    <th colSpan='4'>Các loại vé</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th className="align-middle">1</th>
                    <td className="align-middle">Fan Zone</td>
                    <td className="align-middle">1900000</td>
                    <td className='w-[70px]'>
                        <input type='number' className='w-[100px] p-[10px]' />
                    </td>
                </tr>
                <tr>
                    <th className="align-middle">1</th>
                    <td className="align-middle">Fan Zone</td>
                    <td className="align-middle">1900000</td>
                    <td className='w-[70px]'>
                        <input type='number' className='w-[100px] p-[10px]' />
                    </td>
                </tr>

                <tr>
                    <th className="align-middle" colSpan='2'>Tổng tiền</th>
                    <th className="align-middle" colSpan='2'>200000</th>
                </tr>
            </tbody>
        </table>
    )
}

export default TicketTable