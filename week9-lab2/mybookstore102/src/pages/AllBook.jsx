import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpenIcon, LogoutIcon, PencilAltIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/outline';

const AllBookPage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchBooks();
    }
  }, [navigate]);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/v1/books/');
      if (!response.ok) {
        throw new Error('ไม่สามารถดึงข้อมูลหนังสือได้');
      }
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('คุณแน่ใจหรือไม่ที่จะลบหนังสือเล่มนี้?')) return;

    try {
      const response = await fetch(`/api/v1/books/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('ลบหนังสือไม่สำเร็จ');
      }

      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      alert('เกิดข้อผิดพลาด: ' + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-sky-600 to-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <BookOpenIcon className="h-8 w-8" />
            <h1 className="text-2xl font-bold">BookStore - BackOffice</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30
              rounded-lg transition-colors"
          >
            <LogoutIcon className="h-5 w-5" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">รายการหนังสือทั้งหมด</h2>
          <Link
            to="/store-manager/add-book"
            className="inline-flex items-center px-4 py-2 bg-sky-600 hover:bg-viridian-700
              text-white rounded-lg shadow-md transition-colors"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            เพิ่มหนังสือใหม่
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-500 text-lg">กำลังโหลดข้อมูล...</p>
        ) : books.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">ยังไม่มีหนังสือในระบบ</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-viridian-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">#</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">ชื่อหนังสือ</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">ผู้แต่ง</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">ISBN</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">ปีที่ตีพิมพ์</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">ราคา (บาท)</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {books.map((book, index) => (
                  <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">{book.title}</td>
                    <td className="px-6 py-4 text-gray-700">{book.author}</td>
                    <td className="px-6 py-4 text-gray-700">{book.isbn}</td>
                    <td className="px-6 py-4 text-gray-700">{book.year}</td>
                    <td className="px-6 py-4 text-gray-700">{book.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => navigate(`/store-manager/edit-book/${book.id}`)}
                          className="flex items-center px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                        >
                          <PencilAltIcon className="h-4 w-4 mr-1" />
                          แก้ไข
                        </button>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="flex items-center px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                        >
                          <TrashIcon className="h-4 w-4 mr-1" />
                          ลบ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllBookPage;
