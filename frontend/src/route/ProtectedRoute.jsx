import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import PropTypes from 'prop-types'

function ProtectedRoute({ children, allowedRoles }) {
    const account = useSelector(state => state.auth.account);
    const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    const hasAccess = account && rolesArray.includes(account.role);
  
    if (hasAccess) {
        return children;
    }
    return <Navigate to="/" />;
}

ProtectedRoute.propTypes = {
    children: PropTypes.object.isRequired,
    allowedRoles: PropTypes.string,
}

export default ProtectedRoute