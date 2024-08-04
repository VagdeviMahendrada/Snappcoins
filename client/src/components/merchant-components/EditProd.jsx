import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch-merchant";
import Select from "react-select";

const EditProd = (props)  =>{
    const [fetchData] = useFetch();
    const merchandise = useSelector(state => state.merchantReducer)
    const product = merchandise.merchandise

    const initialFormData = {
        title: product.title,
        description: product.description,
        brand: product.brand,
        price: product.price,
        count: product.count,
        image:product.image,
        category: product.category,
        country:product.country,
    };
    
    const [formData, setFormData] = useState(initialFormData);
    const [checked, setChecked] = useState(product.featured);

    useEffect(()=>{
        setFormData({
            title: product.title,
            description: product.description,
            brand: product.brand,
            price: product.price,
            count: product.count,
            image:product.image,
            category: product.category,
            country:product.country,
        })
        setChecked(product.featured)
    },[product,setFormData])


    const handleCategoryChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        setFormData({
          ...formData,
          category: selectedValues
        });
      };

    const handleChange = async(e) => {
        if (e.target.name === "image") {

            console.log(e.target.files[0])
            setFormData({
              ...formData,
              [e.target.name]: e.target.files[0],
            });
          } else {
            setFormData({
              ...formData,
              [e.target.name]: e.target.value,
            });
          }
    }

    const handleUpdate = async (e) =>{
        e.preventDefault();
        const token = localStorage.getItem('merchant-token');
        const formDataToSend = new FormData();

        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("brand", formData.brand);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("count", formData.count);
        formDataToSend.append("country",formData.country)
        formData.category.forEach(category => {
            formDataToSend.append("category", category);
          });
        if(typeof(formData.image) !== 'string') formDataToSend.append("image", formData.image , formData.image.name);
        formDataToSend.append("featured",checked);

        const config = { url: `/merchandise/update`, method: "put", data: formDataToSend, headers: { Authorization: token }, params: { id: product._id ,prevImgId: product.image} };
        await fetchData(config).then(() => {
            setFormData(initialFormData)
            props.onEditForm();
        })
        .catch(error => {
                console.error('Error fetching merchandises:', error);
        });
    }

    const handleClose = () =>{
        setFormData(initialFormData)
        props.onEditForm();
    }

    const handleFeatured = () =>{
        setChecked(prev => !prev)
    }

    return (
        <>
    {formData?<div className="modal fade" id="editPro" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit your merchandise</h1>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Title</span>
                            <input type="text" className="form-control" name='title' value={formData.title} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fs-6 text-white" htmlFor="inputGroupFile01">Image</label>
                            <input type="file" className="form-control" name="image"  id="inputGroupFile01" accept='.jpeg, .png, .jpg' onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label fs-6 text-white">Description</label>
                            <textarea type="text" className="form-control" name='description' value={formData.description} id="exampleFormControlTextarea1" rows="3" onChange={handleChange}></textarea>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Brand</span>
                            <input type="text" className="form-control" name='brand' value={formData.brand} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="category" className="form-label fs-6 text-white" id="basic-addon1">Category</label>
                            <Select
                                isMulti
                                name="category"
                                className="text-dark"
                                value={formData.category ? formData.category.map(value => ({ value, label: value })) : []}
                                options={[
                                    { value: "Art", label: "Art" },
                                    { value: "Electronics", label: "Electronics" },
                                    { value: "Stationary", label: "Stationary" },
                                    { value: "Music", label: "Music" },
                                    { value: "Wellness", label: "Wellness" },
                                  ]}
                                onChange={handleCategoryChange}
                                closeMenuOnSelect={false}
                                defaultValue={product.category ? product.category.map(value => ({ value, label: value })) : []}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="baic-saddon1">Price $</span>
                            <input type="text" className="form-control" name='price' value={formData.price} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Count</span>
                            <input type="number" className="form-control" name='count' value={formData.count} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Country</span>
                            <input type="text" className="form-control" name='country' value={formData.country} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} />
                        </div>
                        <div className="row">
                        <div className="col-md-12">
                            <div className="form-group switch_wrapper">
                                {/* <label>Put on sale</label>
                                <p className="mb-0">Check if you want to put this product on sale.</p> */}
                                <label>Make it Featured Product</label>
                                <p className="mb-0">Sponser to show your product as a featured product and be on top.</p>
                                <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" onClick={handleFeatured} checked={checked}/>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                    </form>
                </div>
                <div className="modal-footer justify-content-center">
                    <button type="submit" className="btn btn-danger" id="merchandise-close" data-bs-dismiss="modal" onClick={handleUpdate}>Save</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClose}>Dismiss</button>
                </div>
            </div>
        </div>
    </div>:setFormData(initialFormData)}
    </>
    )
}

export default EditProd;