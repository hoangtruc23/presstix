
function OrganizerCard(props) {
    const { organizer } = props;

    return (
        <div className='shadow-md p-3 w-fit d-flex gap-3 items-center'>
            <img className='w-[150px] h-[150px] rounded-full' src={organizer?.image_url} alt="" />
            <div className="p-2">
                <h3 className='m-0'>{organizer?.name}</h3>
                <p>{organizer?.description}</p>
            </div>
        </div>
    )
}

export default OrganizerCard