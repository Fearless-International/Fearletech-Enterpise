import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import StarImg from "../../assets/images/v1/star2.png";
import Field from "../common/Field";
import { loginUser } from "../../services/authApi";

function SignInForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);
	const [showResetNotice, setShowResetNotice] = useState(true);
	
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	
	const submitForm = async (formData) => {
		try {
			setIsSubmitting(true);
			setSubmitError(null);
			
			const response = await loginUser({
				email: formData.email,
				password: formData.password
			});
			
			// Redirect to dashboard after successful login
			// Inside your submitForm function after successful login
if (response.token) {
  console.log('Login successful');
  
  // Method 1: Direct approach - might not work across different domains/ports
  localStorage.setItem('token', response.token);
  localStorage.setItem('user', JSON.stringify(response.user));
  
  // Method 2: Pass as URL parameters to a bridge page
  const encodedUserData = encodeURIComponent(JSON.stringify(response.user));
  const encodedToken = encodeURIComponent(response.token);
  const bridgeUrl = `http://localhost:4200/login-bridge?token=${encodedToken}&userData=${encodedUserData}`;
  
  console.log('Redirecting to bridge page');
  window.location.href = bridgeUrl;
  return;
}
			
		} catch (error) {
			console.error("Login error:", error);
			
			// Improved error extraction logic
			let errorMessage = "We couldn't log you in. Please use the 'Forgot password?' link below to reset your password.";
			
			if (error.response?.data) {
				const errorData = error.response.data;
				
				// Handle different error structures from Strapi
				if (typeof errorData === 'string') {
					errorMessage = errorData;
				} else if (errorData.error && typeof errorData.error === 'string') {
					errorMessage = errorData.error;
				} else if (errorData.message && typeof errorData.message === 'string') {
					errorMessage = errorData.message;
				} else if (errorData.error?.message) {
					errorMessage = errorData.error.message;
				} else if (errorData.data?.error?.message) {
					errorMessage = errorData.data.error.message;
				}
			}
			
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
							Welcome back
							<span className="aximo-title-icon">
								<img src={StarImg} alt="Star" />
							</span>
						</span>
					</h2>
				</div>
				<div className="aximo-account-wrap">
					{showResetNotice && (
						<div className="alert alert-info" style={{marginBottom: '20px', position: 'relative', padding: '12px 15px'}}>
							<button 
								type="button" 
								className="close" 
								onClick={() => setShowResetNotice(false)}
								style={{position: 'absolute', right: '10px', top: '10px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer'}}
							>×</button>
							<strong>Account Update Notice:</strong> We've recently upgraded our security system. 
							Please use the "Forgot password?" link below to reset your password if you're having trouble logging in.
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
						<div className="aximo-account-checkbox-wrap">
							<div className="aximo-account-checkbox">
								<input type="checkbox" id="check" {...register("remember")} />
								<label htmlFor="check">Remember me</label>
							</div>
							<Link 
								className="forgot-password" 
								to="/reset-password"
								style={{
									fontWeight: 'bold',
									color: '#0066cc',
									textDecoration: 'underline'
								}}
							>
								Forgot password?
							</Link>
						</div>

						<button id="aximo-account-btn" type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Logging in..." : "Log in"}
						</button>
						<div className="aximo-or">
							<p>or</p>
						</div>

						<a href="https://google.com" target="_blank" className="aximo-connect-login">
							Sign in with Google
						</a>
						<a href="https://fb.com" target="_blank" className="aximo-connect-login">
							Sign in with Facebook
						</a>

						<div className="aximo-account-bottom">
							<p>
								Not a member yet? <Link to="/sign-up">Sign up here</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SignInForm;