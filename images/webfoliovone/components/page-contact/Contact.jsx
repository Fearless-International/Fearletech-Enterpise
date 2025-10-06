'use client';

import React, { useState } from 'react';
import { submitContactForm } from '../../services/api';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required.';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      await submitContactForm(formData);
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to submit the form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 valign">
            <div className="sec-head info-box full-width md-mb80">
              <div className="phone fz-30 fw-600 underline main-color">
                <a href="#0">+1 840 841 25 69</a>
              </div>
              <div className="morinfo mt-50 pb-30 bord-thin-bottom">
                <h6 className="mb-15">Address</h6>
                <p>Besòs 1, 08174 Sant Cugat del Vallès, Barcelona</p>
              </div>
              <div className="morinfo mt-30 pb-30 bord-thin-bottom">
                <h6 className="mb-15">Email</h6>
                <p>Support@UiCamp.com</p>
              </div>

              <div className="social-icon mt-50">
                <a href="#0">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#0">
                  <i className="fab fa-dribbble"></i>
                </a>
                <a href="#0">
                  <i className="fab fa-behance"></i>
                </a>
                <a href="#0">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-7 offset-lg-1 valign">
            <div className="full-width">
              <div className="sec-head mb-50">
                <h6 className="sub-title main-color mb-15">Let&lsquo;s Chat</h6>
                <h3 className="text-u ls1">
                  Send a <span className="fw-200">message</span>
                </h3>
              </div>

              {submitSuccess && (
                <div className="alert alert-success mb-30" style={{
                  padding: '15px',
                  backgroundColor: '#d4edda',
                  color: '#155724',
                  borderRadius: '5px',
                  marginBottom: '20px'
                }}>
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              
              {submitError && (
                <div className="alert alert-danger mb-30" style={{
                  padding: '15px',
                  backgroundColor: '#f8d7da',
                  color: '#721c24',
                  borderRadius: '5px',
                  marginBottom: '20px'
                }}>
                  {submitError}
                </div>
              )}

              <form
                id="contact-form"
                className="form2"
                onSubmit={handleSubmit}
              >
                <div className="messages"></div>

                <div className="controls row">
                  <div className="col-lg-6">
                    <div className="form-group mb-30">
                      <input
                        id="form_name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                          {errors.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group mb-30">
                      <input
                        id="form_email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group mb-30">
                      <input
                        id="form_phone"
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && (
                        <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                          {errors.phone}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group mb-30">
                      <input
                        id="form_subject"
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                      {errors.subject && (
                        <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                          {errors.subject}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <textarea
                        id="form_message"
                        name="message"
                        placeholder="Message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                      {errors.message && (
                        <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                          {errors.message}
                        </div>
                      )}
                    </div>
                    <div className="mt-30">
                      <button
                        type="submit"
                        className="butn butn-full butn-bord radius-30"
                        disabled={isSubmitting}
                      >
                        <span className="text">
                          {isSubmitting ? 'Sending...' : 'Let\'s Talk'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;