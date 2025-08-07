import { useState } from "react";
import { useForm } from "react-hook-form";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ContactThumb from "../../assets/images/contact/contact-thumb.png";
import Star2Img from "../../assets/images/v1/star2.png";
import Field from "../common/Field";
import { submitContactForm } from "../../services/api";

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitForm = async (formData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      // Submit the form data to Strapi
      await submitContactForm(formData);
      
      // If successful, show success message and reset form
      setSubmitSuccess(true);
      reset();
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("Failed to submit the form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section aximo-section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="aximo-section-title">
              <h2>
                <span className="aximo-title-animation">
                  Contact us for a
                  <span className="aximo-title-icon">
                    <img src={Star2Img} alt="Star" />
                  </span>
                </span>
                personal experience
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-5 order-lg-2">
            <div className="aximo-contact-thumb">
              <LazyLoadImage
                src={ContactThumb}
                width={397}
                height={635}
                alt="Contact Thumb"
                effect="blur"
              />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="aximo-main-form">
              {submitSuccess && (
                <div className="alert alert-success">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              {submitError && (
                <div className="alert alert-danger">{submitError}</div>
              )}
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="aximo-main-field">
                  <Field label="Your Name" error={errors.name}>
                    <input
                      {...register("name", { required: "Name is required." })}
                      type="text"
                      name="name"
                      id="name"
                    />
                  </Field>
                </div>
                <div className="aximo-main-field">
                  <Field label="Enter email address" error={errors.email}>
                    <input
                      {...register("email", {
                        required: "Email is required.",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      type="email"
                      name="email"
                      id="email"
                    />
                  </Field>
                </div>
                <div className="aximo-main-field">
                  <Field label="Enter Phone Number" error={errors.phone}>
                    <input
                      {...register("phone", { required: "Phone is required." })}
                      type="tel"
                      name="phone"
                      id="phone"
                    />
                  </Field>
                </div>
                <div className="aximo-main-field">
                  <Field label="Subject" error={errors.subject}>
                    <input
                      {...register("subject", { required: "Subject is required." })}
                      type="text"
                      name="subject"
                      id="subject"
                    />
                  </Field>
                </div>
                <div className="aximo-main-field">
                  <label>Write your message here...</label>
                  <textarea
                    {...register("message", { required: "Message is required." })}
                    name="message"
                    id="message"
                  />
                  {errors.message && (
                    <div className="text-danger mt-1">{errors.message.message}</div>
                  )}
                </div>
                <button
                  id="aximo-main-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;