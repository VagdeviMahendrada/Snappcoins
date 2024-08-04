import React, { useState } from 'react';
import Header from './Header';
import Hero from '../gaming-vendor-components/Hero';
import Footer from '../general-components/Footer';
import useFetch from '../../hooks/useFetch-merchant';
import Select from 'react-select';
import FullpageLoader from '../general-components/FullpageLoader';
import { useSelector } from 'react-redux';

const MerchandiseUpload = () => {
  const [fetchData, { loading }] = useFetch();
  const merchantState = useSelector((state) => state.merchantReducer);
  const merchant = merchantState.merchant;

  const initialFormData = {
    title: '',
    description: '',
    brand: '',
    price: '',
    count: '',
    image: null,
    category: [],
    country: null, // Change to null for single country selection
  };

  const [formData, setFormData] = useState(initialFormData);
  const [checked, setChecked] = useState(false);

  const handleCountryChange = (selectedOption) => {
    setFormData({
      ...formData,
      country: selectedOption ? selectedOption.value : null,
    });
  };

  const handleCategoryChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData({
      ...formData,
      category: selectedValues,
    });
  };

  const handleChange = async (e) => {
    if (e.target.name === 'image') {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('merchant-token');
    const formDataToSend = new FormData();

    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('brand', formData.brand);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('count', formData.count);
    formDataToSend.append('country',formData.country)

    formData.category.forEach((category) => {
      formDataToSend.append('category', category);
    });

    formDataToSend.append('featured', checked);

    if (formData.image) formDataToSend.append('image', formData.image, formData.image.name);

    const config = {
      url: `/merchandise/add`,
      method: 'post',
      data: formDataToSend,
      headers: { Authorization: token },
      params: { id: merchant._id },
    };
    await fetchData(config)
      .then(() => {
        setFormData(initialFormData);
        // props.onFormSubmit();
      })
      .catch((error) => {
        // Handle the error here, e.g., log the error or display an error message
        console.error('Error adding merchandises:', error);
      });
  };

  const handleFeatured = () => {
    setChecked((prev) => !prev);
  };

  return (
    <>
      <Header />
      <Hero />
      {loading ? (
        <FullpageLoader />
      ) : (
        <>
          <div className="filters_full version_2 mt-3">
            <div className="container clearfix">
              <div className="pb-3 clearfix">
                <a href="/merchant-dashboard" className="btn_1">
                  <i className="bi bi-cart-check-fill"></i> Back to Product List
                </a>
              </div>
            </div>
            <div className="collapse" id="collapseSearch">
              <div className="search_bar_list">
                <input type="text" className="form-control" placeholder="Search" />
              </div>
            </div>
            <div className="container margin_30_40">
              <div className="row">
                <div className="ps-lg-5">
                  <div className="main_title version_2">
                    <span>
                      <em></em>
                    </span>
                    <h2>Upload Product</h2>
                  </div>
  
                  <div className="row">
                    <div className="form-group">
                      <label>Upload file</label>
                      <div className="file_upload">
                        <input type="file" name="image" onChange={handleChange} />
                        <i className="bi bi-file-earmark-arrow-up"></i>
                        <div>{formData.image ? formData.image.name : 'PNG, JPEG, JPG Max 1Gb'}</div>
                      </div>
                    </div>
                  </div>
  
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <label>Item title</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          className="form-control"
                          placeholder="e.g. Item Name"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
  
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Choose a Category</label>
                        <Select
                          isMulti
                          name="category"
                          className="text-dark"
                          value={formData.category.map((value) => ({ value, label: value }))}
                          options={[
                            { value: 'Art', label: 'Art' },
                            { value: 'Electronics', label: 'Electronics' },
                            { value: 'Stationary', label: 'Stationary' },
                            { value: 'Music', label: 'Music' },
                            { value: 'Wellness', label: 'Wellness' },
                          ]}
                          onChange={handleCategoryChange}
                        />
                      </div>
                    </div>
  
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Description</label>
                        <input
                          type="text"
                          className="form-control"
                          name="description"
                          value={formData.description}
                          placeholder="e.g. Abstract modern art"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
  
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Brand</label>
                        <input
                          type="text"
                          className="form-control"
                          name="brand"
                          value={formData.brand}
                          placeholder="e.g. Brand Name"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
  
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Stock</label>
                        <input
                          type="text"
                          className="form-control"
                          name="count"
                          value={formData.count}
                          placeholder="12"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
  
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Price</label>
                        <input
                          type="text"
                          className="form-control"
                          name="price"
                          value={formData.price}
                          placeholder="Enter price"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
  
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Choose Country</label>
                        <Select
                          name="country"
                          isSearchable
                          className="text-dark"
                          value={formData.country ? { value: formData.country, label: formData.country } : null}
                          options={[
                            { value: 'CANADA', label: 'Canada' },
                            { value: 'INDIA', label: 'India' },
                            { value: 'USA', label: 'United States of America' },
                          ]}
                          onChange={handleCountryChange}
                        />
                      </div>
                    </div>
                  </div>
  
                  <hr className="mt-3 mb-5" />
  
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group switch_wrapper">
                        <label>Make it Featured Product</label>
                        <p className="mb-0">Sponsor to show your product as a featured product and be on top.</p>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onClick={handleFeatured}
                            checked={checked}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <p className="text-end mt-4">
                    <a type="button" href="merchant-inventory.html" className="btn_1" onClick={handleSubmit}>
                      Save changes
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
                        }  

export default MerchandiseUpload;

