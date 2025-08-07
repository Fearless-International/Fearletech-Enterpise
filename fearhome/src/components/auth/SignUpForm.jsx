import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import StarImg from "../../assets/images/v1/star2.png";
import Field from "../common/Field";
import { registerUser } from "../../services/authApi";

function SignUpForm() {
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [submitError, setSubmitError] = useState(null);
	
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	
	const submitForm = async (formData) => {
		try {
			setIsSubmitting(true);
			setSubmitError(null);
			
			await registerUser({
				fullName: formData.fname,
				email: formData.email,
				password: formData.password
			});
			
			setSubmitSuccess(true);
			
			// Show success message for 3 seconds before redirecting
			setTimeout(() => {
				navigate('/verification-sent', { state: { email: formData.email } });
			}, 3000);
			
		} catch (error) {
			console.error("Registration error:", error);
			setSubmitError(error.response?.data?.error?.message || "Failed to register. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};
	
	return (
		<div className="section aximo-section-padding">
			<div className="container">
				<div className="aximo-account-title">
					<h2>
						<span className="aximo-title-animation">
							Create Account
							<span className="aximo-title-icon">
								<img src={StarImg} alt="Star" />
							</span>
						</span>
					</h2>
				</div>
				<div className="aximo-account-wrap">
					{submitSuccess && (
						<div className="alert alert-success">
							Registration successful! Please check your email to verify your account.
						</div>
					)}
					{submitError && (
						<div className="alert alert-danger">{submitError}</div>
					)}
					<form onSubmit={handleSubmit(submitForm)}>
						<div className="aximo-account-field">
							<Field label="Enter your full name" error={errors.fname}>
								<input
									{...register("fname", { required: "Full Name is required." })}
									type="text"
									name="fname"
									id="fname"
									placeholder="Adam Smith"
								/>
							</Field>
						</div>
						<div className="aximo-account-field">
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
									placeholder="example@gmail.com"
								/>
							</Field>
						</div>
						<div className="aximo-account-field">
							<Field label="Enter Password" error={errors.password}>
								<input
									{...register("password", {
										required: "Password is required.",
										minLength: {
											value: 8,
											message: "Your password must be at least 8 characters.",
										},
									})}
									type="password"
									name="password"
									id="password"
									placeholder="Enter password"
								/>
							</Field>
						</div>
						<div className="aximo-account-checkbox">
							<input type="checkbox" id="check" {...register("terms", { required: "You must accept the Terms & Conditions" })} />
							<label htmlFor="check">
								I have read and accept the <Link to="/">Terms & Conditions</Link> and
								<Link to="/"> Privacy Policy</Link>
							</label>
							{errors.terms && <div className="text-danger mt-1">{errors.terms.message}</div>}
						</div>
						<button id="aximo-account-btn" type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Creating Account..." : "Create account"}
						</button>
						<div className="aximo-or">
							<p>or</p>
						</div>
						<a href="https://google.com" target="_blank" className="aximo-connect-login">
							Sign up with Google
						</a>
						<a href="https://fb.com" target="_blank" className="aximo-connect-login">
							Sign up with Facebook
						</a>

						<div className="aximo-account-bottom">
							<p>
								Already have an account? <Link to="/sign-in">Log in here</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SignUpForm;