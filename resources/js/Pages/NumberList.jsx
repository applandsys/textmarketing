import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/react';

export default function NumberList({ list }) {
    const { flash } = usePage().props;

    const { data, setData, post, errors } = useForm({
        file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/user/upload-csv', {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Phone Number
                </h2>
            }
        >
            <Head title="Phone Number" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Upload CSV</label>
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={(e) => setData('file', e.target.files[0])}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.file && (
                                        <div className="text-red-500 text-sm mt-2">{errors.file}</div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Upload
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
