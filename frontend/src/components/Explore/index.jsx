import { Button, Form, InputGroup,DropdownButton,Dropdown } from 'react-bootstrap';


function SearchEvent() {
    return (
        <div>
            <InputGroup className="mb-3  bg-white p-1">
                <Form.Control
                    placeholder="What kind of event you like?"
                />
                <DropdownButton
                    variant="outline-secondary"
                    title="Dropdown"
                    id="input-group-dropdown-2"
                    align="end"
                    className='text-white'
                >
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#" >Another action</Dropdown.Item>
                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                    
                </DropdownButton>
                <Button variant="outline-secondary" id="button-addon2">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
            </InputGroup>
        </div>
    )
}

export default SearchEvent