import { useState } from "react";
import { useForm } from "react-hook-form";
import ArrowRight3Img from "../../../assets/images/icon/arrow-right3.svg";
import Field from "../../common/Field";
import { submitContactForm } from "../../../services/api"; // make sure path is correct

function MessageForm() {
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

      // Submit to backend (Strapi or your API)
      await submitContactForm(formData);

      setSubmitSuccess(true);
      reset();

      // Hide success after 5 sec
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {submitSuccess && (
        <div className="alert alert-success">
          ✅ Thank you! We’ve received your message.
        </div>
      )}
      {submitError && <div className="alert alert-danger">{submitError}</div>}

      <div className="aximo-form-field">
        <Field error={errors.name}>
          <input
            {...register("name", { required: "Name is required." })}
            type="text"
            id="name"
            placeholder="Your Name"
          />
        </Field>
      </div>

      <div className="aximo-form-field">
        <Field error={errors.email}>
          <input
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            id="email"
            placeholder="Your email address"
          />
        </Field>
      </div>

      <div className="aximo-form-field">
        <Field error={errors.phone}>
          <input
            {...register("phone", { required: "Phone number is required." })}
            type="tel"
            id="phone"
            placeholder="Your phone number"
          />
        </Field>
      </div>

      <div className="aximo-form-field">
        <Field error={errors.subject}>
          <input
            {...register("subject", { required: "Subject is required." })}
            type="text"
            id="subject"
            placeholder="Subject"
          />
        </Field>
      </div>

      <div className="aximo-form-field">
        <Field error={errors.message}>
          <textarea
            {...register("message", { required: "Message is required." })}
            id="message"
            placeholder="Write your message here..."
          ></textarea>
        </Field>
      </div>

      <button id="aximo-submit-btn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send message"}{" "}
        <span>
          <img src={ArrowRight3Img} alt="ArrowRight3Img" />
        </span>
      </button>
    </form>
  );
}

export default MessageForm;
