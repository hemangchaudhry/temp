import React from 'react'
import './LoginPage.css'

const LoginPage = () => {
  return (
    <div>
        <div className="container " style={{height: '100vh'}}>
    		<div className="row h-100">
				<div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
					<div className="d-table-cell align-middle">

						{/* <div className="text-center mt-4">
							<h1 className="h2">Welcome back, Dey</h1>
							<p className="lead">
								Sign in to your account to continue
							</p>
						</div> */}

						<div className="card">
							<div className="card-body">
								<div className="m-sm-4">
									<div className="text-center">
										<img src="../images/logo.jpg" alt="Andrew Jones" className="img-fluid rounded-circle" width="152" height="152" />
									</div>
									<form>
										<div className="form-group">
											<label>Email</label>
											<input className="form-control form-control-lg" type="email" name="email" placeholder="Enter your email" />
										</div>
										<div className="form-group">
											<label>Password</label>
											<input className="form-control form-control-lg" type="password" name="password" placeholder="Enter your password" />
											<small>
                                                <a href="pages-reset-password.html">Forgot password?</a>
                                            </small>
										</div>
										<div>
											<div className="custom-control custom-checkbox align-items-center">
												<input type="checkbox" className="custom-control-input" value="remember-me" name="remember-me" checked="" />
												<label className="custom-control-label text-small">Remember me next time</label>
											</div>
										</div>
										<div className="text-center mt-3">
											<a href="index.html" className="btn btn-lg btn-primary">Sign in</a>
											{/* <!-- <button type="submit" className="btn btn-lg btn-primary">Sign in</button> --> */}
										</div>
									</form>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
    </div>
  )
}

export default LoginPage