import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StarImg from "../../assets/images/v1/star2.png";
import Field from "../common/Field";
import { requestPasswordReset, resetPassword } from "../../services/authApi";

function ResetForm() {
	const location = useLocation();
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [submitError, setSubmitError] = useState(null);
	const [isResetMode, setIsResetMode] = useState(false);
	const [resetToken, setResetToken] = useState("");
	
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	
	// Check if we have a token in the URL
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const token = params.get('token');
		
		if (token) {
			setIsResetMode(true);
			setResetToken(token);
		}
	}, [location]);
	
	const submitForm = async (formData) => {
		try {
			setIsSubmitting(true);
			setSubmitError(null);
			
			if (!isResetMode) {
				// Request password reset email
				await requestPasswordReset(formData.email);
				setSubmitSuccess(true);
				// Show success message
			} else {
				// Reset password with token
				await resetPassword({
					email: formData.email,
					password: formData.password,
					token: resetToken
				});
				
				setSubmitSuccess(true);
				
				// Redirect to login after 3 seconds
				setTimeout(() => {
					navigate('/sign-in');
				}, 3000);
			}
			
		} catch (error) {
			console.error("Reset password error:", error);
			const errorMessage = error.response?.data?.error || 
				error.response?.data?.message || 
				"Error processing your request. Please try again.";
			setSubmitError(errorMessage);
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
							Reset Password
							<span className="aximo-title-icon">
								<img src={StarImg} alt="star" />
							</span>
						</span>
					</h2>
				</div>
				<div className="aximo-account-wrap">
					{submitSuccess && (
						<div className="alert alert-success">
							{!isResetMode 
								? "Password reset instructions have been sent to your email."
								: "Your password has been reset successfully! You can now log in with your new password."}
						</div>
					)}
					{submitError && (
						<div className="alert alert-danger">{submitError}</div>
					)}
					<form onSubmit={handleSubmit(submitForm)}>
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
						{isResetMode && (
							<div className="aximo-account-field">
								<Field label="Enter New Password" error={errors.password}>
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
										placeholder="Enter new password"
									/>
								</Field>
							</div>
						)}
						<button id="aximo-account-btn" type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Processing..." : (isResetMode ? "Reset Password" : "Send Reset Link")}
						</button>
						<div className="aximo-account-bottom m-0">
							<p>
								{isResetMode 
									? "If you didn't request a password recovery link, please ignore this." 
									: "Enter your email address to receive a password reset link."}
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ResetForm;