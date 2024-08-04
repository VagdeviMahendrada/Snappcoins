import React, { useState } from "react";
import useFetch from '../../hooks/useFetch-merchant';
import Select from "react-select";

const MerchandiseForm = (props) => {
    const [fetchData] = useFetch();

    const initialFormData = {
        title: "",
        description: "",
        brand: "",
        price: "",
        count: "",
        image:null,
        category: [],
        country:[],
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleCategoryChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        setFormData({
          ...formData,
          category: selectedValues
        });
      };
      const handleCountryChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        setFormData({
          ...formData,
          country: selectedValues
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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('merchant-token')
        const formDataToSend = new FormData();

        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("brand", formData.brand);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("count", formData.count);
        //formDataToSend.append("country", formData.country);
        formData.category.forEach(category => {
            formDataToSend.append("category", category);
        });
        formData.category.forEach(country => {
            formDataToSend.append("country", country);
        });
        if(formData.image) formDataToSend.append("image", formData.image , formData.image.name);

        const config = { url: `/merchandise/add`, method: "post", data: formDataToSend, headers: { Authorization: token}, params: { id: props.userId } };
        await fetchData(config).then(() => {
            setFormData(initialFormData)
            props.onFormSubmit();
        })
            .catch(error => {
                // Handle the error here, e.g., log the error or display an error message
                console.error('Error adding merchandises:', error);
            });
    }

    const handleDismiss = ()=>{
        setFormData(initialFormData)
    }

    return (
        <div className="modal" id="product-upload" tabIndex="-1" aria-labelledby="productLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h3 className="modal-title fs-5" id="productLabel">Add your Merchandise Now!</h3>
                    </div>
                    <div className="modal-body">
                        <form encType="multipart/form-data">
                            <div className="mb-3">
                                <span className="form-label fs-6 text-white" id="basic-addon1">Title</span>
                                <input type="text" className="form-control" name='title' value={formData.title} aria-label="Username" aria-describedby="basic-addon1" autoFocus onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fs-6 text-white" htmlFor="inputGroupFile01">Image</label>
                                <input type="file" className="form-control" name="image"  id="inputGroupFile01" accept='.jpeg, .png, .jpg' onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <span htmlFor="exampleFormControlTextarea1" className="form-label fs-6 text-white">Description</span>
                                <textarea className="form-control" name='description' value={formData.description} id="exampleFormControlTextarea1" rows="3" onChange={handleChange}></textarea>
                            </div>
                            <div className="mb-3">
                                <span className="form-label fs-6 text-white" id="basic-addon1">Brand</span>
                                <input type="text" className="form-control" name='brand' value={formData.brand} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <span className="form-label fs-6 text-white" id="basic-addon1">Country</span>
                                <input type="text" className="form-control" name='country' value={formData.country} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="category" className="form-label fs-6 text-white" id="basic-addon1">Category</label>
                                <Select
                                    isMulti
                                    name="category"
                                    className="text-dark"
                                    value={formData.category.map(value => ({ value, label: value }))}
                                    options={[
                                      { value: "Art", label: "Art" },
                                      { value: "Electronics", label: "Electronics" },
                                      { value: "Stationary", label: "Stationary" },
                                      { value: "Music", label: "Music" },
                                      { value: "Wellness", label: "Wellness" },
                                    ]}
                                    onChange={handleCategoryChange}
                                    // closeMenuOnSelect={false}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="country" className="form-label fs-6 text-white" id="basic-addon1">Country</label>
                                <Select
                                    isMulti
                                    name="country"
                                    className="text-dark"
                                    value={formData.country.map(value => ({ value, label: value }))}
                                    options={[
                                      { value: "CANADA", label: "Canda" },
                                      { value: "INDIA", label: "India" },
                                      { value: "USA", label: "United States of America" },
                                     // { value: "Music", label: "Music" },
                                      //{ value: "Wellness", label: "Wellness" },
                                    ]}
                                    onChange={handleCountryChange}
                                    // closeMenuOnSelect={false}
                                />
                            </div>
                            <div className="mb-3">
                                <span className="form-label fs-6 text-white" id="basic-addon1">Price $</span>
                                <input type="number" className="form-control" name='price' value={formData.price} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <span className="form-label  fs-6 text-white" id="basic-addon1">Count</span>
                                <input type="number" className="form-control" name='count' value={formData.count} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} />
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="submit" className="btn btn-danger" id="merchandise-close" data-bs-dismiss="modal" onClick={handleSubmit}>Add merchandise</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDismiss}>Dismiss</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MerchandiseForm;