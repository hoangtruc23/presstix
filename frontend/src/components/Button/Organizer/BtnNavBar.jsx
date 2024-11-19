import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
function BtnNavBar(props) {
    const { nav } = props;
    return (
        <Link to={nav.path}>
            <li className=' text-[18px] p-2 rounded-lg d-flex items-center gap-2'>
                <i className={nav.icon}></i>
                <span className="align-middle">{nav.name}</span>
            </li>
        </Link>
    )
}

BtnNavBar.propTypes = {
    nav: PropTypes.object.isRequired
}

export default BtnNavBar