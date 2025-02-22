import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { backend_url } from "../App";
import upload_area from "../assets/upload_area.svg";

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        category: "women",
        new_price: "",
        old_price: "",
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        try {
            let responseData;
            let product = { ...productDetails };

            if (!product.name || !product.new_price || !product.old_price) {
                alert("Please fill all fields");
                return;
            }

            // 1️⃣ Upload Image First
            if (image) {
                let formData = new FormData();
                formData.append("my_file", image);

                const response = await fetch(`${backend_url}/api/admin/products/upload-image`, {
                    method: "POST",
                    body: formData,
                });

                responseData = await response.json();
                if (!responseData.imageUrl) {
                    alert("Image Upload Failed");
                    return;
                }
                product.image = responseData.imageUrl;
            } else {
                alert("Please upload an image");
                return;
            }

            // 2️⃣ Add Product
            const addProductResponse = await fetch(`${backend_url}/api/admin/products/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            const addProductData = await addProductResponse.json();
            if (addProductData.success) {
                alert("Product Added Successfully");
                setProductDetails({ name: "", category: "women", new_price: "", old_price: "" });
                setImage(null);
            } else {
                alert("Failed to Add Product");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className='p-8 box-border bg-white w-full rounded-sm mt-5 lg:ml-5'>
            <div className='mb-3'>
                <h4 className='bold-18 pb-2'>Product title:</h4>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here..' className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md' />
            </div>
            <div className='mb-3'>
                <h4 className='bold-18 pb-2'>Price:</h4>
                <input value={productDetails.old_price} onChange={changeHandler} type="number" name='old_price' placeholder='Type here..' className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md' />
            </div>
            <div className='mb-3'>
                <h4 className='bold-18 pb-2'>Offer Price:</h4>
                <input value={productDetails.new_price} onChange={changeHandler} type="number" name='new_price' placeholder='Type here..' className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md' />
            </div>
            <div className="mb-3 flex items-center gap-x-4">
                <h4 className="bold-18 pb-2">Product Category:</h4>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='bg-primary ring-1 ring-slate-900/20 medium-16 rounded-sm outline-none'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div>
                <label htmlFor="file-input">
                    <img src={image?URL.createObjectURL(image):upload_area} alt="" className="w-20 rounded-sm inline-block" />
                </label>
                <input onChange={imageHandler} type="file" id="file-input" hidden />
            </div>
            <button onClick={Add_Product} className="btn_dark_rounded mt-4 flexCenter gap-x-1">
                <MdAdd /> Add Product
            </button>
        </div>
    );
};

export default AddProduct;
