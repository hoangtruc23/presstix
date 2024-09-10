import cate from '../../assets/img/cate.png'

function ListCate() {
    const list_cates = [
        {
            path: '/',
            img: cate,
            title: 'Entertainment',
        },
        {
            path: '/',
            img: cate,
            title: 'Cultural & Arts',
        },
        {
            path: '/',
            img: cate,
            title: 'Educational & Business',
        },
        {
            path: '/',
            img: cate,
            title: 'Technology & Innovation',
        },
        {
            path: '/',
            img: cate,
            title: 'Travel & Adventure',
        },
        {
            path: '/',
            img: cate,
            title: 'Educational & Business',
        },

    ]
    return (
        <div className="d-flex justify-between text-center">
            {list_cates.map((cate, index) => (
                <div key={index}>
                    <img src={cate.img} className="w-[150px]" />
                    <p className="my-4">{cate.title}</p>
                </div>
            ))}
        </div>
    )
}

export default ListCate