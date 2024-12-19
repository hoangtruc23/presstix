import PropTypes from 'prop-types';
import { toast } from 'react-toastify'
import { postInfoOrganizerUpdate } from "../../services/apiService"

function OrganizerSetup(props) {
    const { imageLogo, setImageLogo, formData, setFormData } = props;

    const handleImageLogo = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImageLogo(reader.result);
            reader.readAsDataURL(file);
            setFormData(prev => ({ ...prev, image_url: file }));
        }
    };
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);

        if (formData.image_url) {
            formDataToSend.append('image_url', formData.image_url);
        }

        try {
            const res = await postInfoOrganizerUpdate(formDataToSend);
            toast.success(res.data.message);
        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu:', error);
        }

    };

    return (
        <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-white">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Logo</label>
                    <input
                        type="file"
                        id="logo"
                        name='image_url'
                        onChange={handleImageLogo}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {imageLogo && (
                        <img
                            src={imageLogo}
                            alt="Preview"
                            className='rounded-xl object-cover mt-4'
                            style={{ width: '500px', height: '300px' }}
                        />
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên ban tổ chức</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Thông tin</label>
                    <input
                        type="text"
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Lưu
                </button>
            </form>
        </div>
    )
}

OrganizerSetup.propTypres = {
    imageLogo: PropTypes.any.isRequired,
    setImageLogo: PropTypes.bool.isRequired,
    formData: PropTypes.any.isRequired,
    setFormData: PropTypes.func.isRequired,
};

export default OrganizerSetup
