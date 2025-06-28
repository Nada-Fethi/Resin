// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import Sidebar from '../admin-view/sidebar'
import Header from '../admin-view/header'
import { useDispatch ,useSelector} from 'react-redux'
import { deleteProduct, fetchAdminProducts } from '../redux/slices/adminProduct'

const ManageProduct = () => {

const dispatch = useDispatch();
const { products, loading, error } = useSelector(
  (state) => state.adminProducts
);

useEffect(() => {
  dispatch(fetchAdminProducts());
}, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the Product?")) {
      dispatch(deleteProduct(id));
    }
  };
if (loading) return <p>Loading ...</p>
if (error) return <p>Error ...</p>

  return (
    <div className="flex min-h-screen w-full">
    <Sidebar />
    <div className="flex flex-1 flex-col min-h-screen w-full">
      <Header />
      <main>
        <div className="conner">
          <h2 className="sectiontitle">Product Management</h2>
          <div className="tablewrer">
            <table className="producttable">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Old Price</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ?(
                products.map(product => (
                  <tr key={product._id}>
                    <td><img src={product.image} alt={product.name} className='w object-cover mr-4 productimage' width="40" /></td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>MAD {product.price}</td>
                    <td>{product.oldPrice ? `MAD ${product.oldPrice}` : '—'}</td>
                    <td>{product.rating}</td>
                    <td>
                      {/* <Link to={`/dashboard/${product._id}/add-new-post`} className="text-blue-600">Edit</Link> |{" "} */}
                      <button onClick={() => handleDelete(product._id)} className="text-red-600">Delete</button>
                    </td>
                  </tr>
                ))) : ( <tr></tr> )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
  );
}

export default ManageProduct;
