import { PropTypes } from 'prop-types'
import { Button, Form, InputGroup } from 'react-bootstrap';


function SearchEvent(props) {
    const { setSearch, handleBtnSearchEvents } = props;

    return (
        <div>
            <InputGroup className="mb-3  bg-white p-1">
                <Form.Control
                    placeholder="What kind of event you like?"
                    onChange={(e) => setSearch(e.target.value)}
                />
               
                <Button variant="outline-secondary" id="button-addon2" onClick={handleBtnSearchEvents}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
            </InputGroup>
        </div>
    )
}

SearchEvent.propTypes = {
    setSearch: PropTypes.string,
    handleBtnSearchEvents: PropTypes.func
}
export default SearchEvent