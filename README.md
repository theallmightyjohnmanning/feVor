# feVor  

feVor stands for `Front End Validator`. To use feVor, just include the file into your project and follow the format conventions.

### Quick Start
	
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>

		<!-- Load Bootstrap CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	</head>
	<body>
		<div class="container">
			<form action="" id="register-form" method="post" autocomplete="off">
				<div id="register-username-group" class="form-control">
					<label class="sr-only" for="register-username">Enter Your Username</label>
					<input id="register-username" class="form-control" type="text" placeholder="Enter Your Username" required="true" />
					<span id="register-username-message" class="help-block"></span>
				</div>
				<div id="register-email-group" class="form-control">
					<label class="sr-only" for="register-email">Enter Your Email Address</label>
					<input id="register-email" class="form-control" type="text" placeholder="Enter Your Email Address" required="true" />
					<span id="register-email-message" class="help-block"></span>
				</div>
				<div id="register-confirm-email-group" class="form-control">
					<label class="sr-only" for="register-confirm-email">Confirm Your Email Address</label>
					<input id="register-confirm-email" class="form-control" type="text" placeholder="Confirm Your Email Address" required="true" />
					<span id="register-confirm-email-message" class="help-block"></span>
				</div>
				<div id="register-password-group" class="form-control">
					<label class="sr-only" for="register-password">Enter Your Password</label>
					<input id="register-password" class="form-control" type="text" placeholder="Enter Your Password" required="true" />
					<span id="register-password-message" class="help-block"></span>
				</div>
				<div id="register-confirm-password-group" class="form-control">
					<label class="sr-only" for="register-confirm-password">Confirm Your Password</label>
					<input id="register-confirm-password" class="form-control" type="text" placeholder="Confirm Your Password" required="true" />
					<span id="register-confirm-password-message" class="help-block"></span>
				</div>
				<input type="submit" class="btn btn-block btn-primary" value="Register Now" />
			</form>
		</div>
	</body>
	<!-- Load jQuery -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	
	<!-- Load Bootstrap js -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

	<!-- Load feVor -->
	<script src="path/to/feVor.js"></script>

	<script>
		$(document).ready(function() {
			
			feVor.validate({
				
				"register-form": {
					
					"register-username": ['min:4', 'max:20'],
					"register-email": ['min:6', 'max:50', 'email'],
					"register-confirm-email": ['same:register-email'],
					"register-password": ['min:6', 'max:16', 'password'],
					"register-confirm-password": ['same:password']
				}
			});
		});
	</script>
	</html>
