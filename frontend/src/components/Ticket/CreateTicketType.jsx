import { useState } from "react"


function CreateTicketType(props) {
    const { setListTicketType } = props;
    const [quantity, setQuantity] = useState(1);

    const [ticketType, setTicketType] = useState({
        name: null,
        price: null,
        quantity: null
    });


    const quantityArray = Array.from({ length: quantity }, (_, i) => i + 1);

    const handleChange = (e, index) => {
        const { name, value } = e.target;

        setListTicketType((prev) => {
            const newList = [...prev];
            const updatedTicketType = {
                ...newList[index],
                [name]: name === "price" ? parseFloat(value) || 0 : name === "quantity" ? parseInt(value) || 1 : value,
            };

            newList[index] = updatedTicketType;
            return newList;
        });
    };


    const handleAddEventType = (e) => {
        e.preventDefault();
        setQuantity(quantity + 1);

        setTicketType(
            {
                name: null,
                price: null,
                quantity: null
            }
        )


    }

    return (
        <>
            {quantityArray.map((_, index) => (
                <div key={index} className='d-flex gap-5'>
                    <div className="form-group">
                        <label>Loại vé: </label>
                        <input
                            type="text"
                            className="form-control rounded-xl"
                            onChange={(e) => handleChange(e, index)}
                            name="name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Giá vé: </label>
                        <input
                            type="text"
                            className="form-control rounded-xl"
                            onChange={(e) => handleChange(e, index)}
                            name="price"
                        />
                    </div>
                    <div className="form-group">
                        <label>Số lượng: </label>
                        <input
                            type="number"
                            className="form-control rounded-xl"
                            onChange={(e) => handleChange(e, index)}
                            name="quantity"
                        />
                    </div>
                </div>
            ))}
            <button className='btn btn-warning my-2 rounded-full' onClick={(e) => handleAddEventType(e)}>Thêm loại</button>
        </>
    )
}

export default CreateTicketType