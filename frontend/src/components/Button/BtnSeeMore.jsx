import { Link } from "react-router-dom"


function BtnSeeMore() {
    return (
        <div className="border-2 w-[30%] border-black rounded-md mx-auto">
            <Link to='/events'>
                <button className="w-full py-2"> See More</button>
            </Link>
        </div>
    )
}
export default BtnSeeMore