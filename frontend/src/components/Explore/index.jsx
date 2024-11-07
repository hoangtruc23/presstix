import { PropTypes } from 'prop-types'

function SearchEvent(props) {
    const { setSearch } = props;

    return (
        <>
            <input type="text" className="form-control p-4 text-[18px] rounded-xl" onChange={(e) => setSearch(e.target.value)} placeholder="Tìm kiếm sự kiện bạn thích" />
        </>
    )
}

SearchEvent.propTypes = {
    setSearch: PropTypes.string,
    handleBtnSearchEvents: PropTypes.func
}
export default SearchEvent