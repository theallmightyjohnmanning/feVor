var feVor = feVor ||
{
	/* BEGIN GLOBAL VARS */ 
	validFields: [],
	input: {},
	options: {},
	form: '',
	container: {},
	field: '',
	rules: {},
	ruleIndex: 1,
	rule: '',
	error: true,
	/* END GLOBAL VARS */

	validate: function(options)
	{

		setInterval(feVor.success(feVor.field), 1000);
		$.each(options, function(form, container) {

			$('#' + form).bind('submit', function() {

				return false;
			});

			$.each(container, function(field, rules) {

				var input = $('#' + field);
				
				input.bind('keyup', function() {
					
					feVor.input = input;
					feVor.options = options;
					feVor.form = form;
					feVor.container = container;
					feVor.field = field;
					feVor.rules = rules;

					feVor.success(field);
					
					$.each(rules, function(index, rule) {
						switch(rule)
						{
							case feVor.utility.validation.contains(rule, 'min'):
								var value = rule.split(':');

								if(input.val().length < value[1])
								{
									feVor.utility.system.removeInput(field);
									feVor.error = true;
									feVor.utility.control.clearControlState(field);
									feVor.utility.control.setControlState({

										field: field,
										style: 'error',
										message: field + ' must exceed ' + value[1] + ' characters in length.'
									});
								}
								else
								{
									feVor.utility.system.addInput(field);
									feVor.error = false;
								}
							break;

							case feVor.utility.validation.contains(rule, 'max'):
								var value = rule.split(':');

								if(input.val().length > value[1])
								{
									feVor.utility.system.removeInput(field);
									feVor.error = true;
									feVor.utility.control.clearControlState(field);
									feVor.utility.control.setControlState({

										field: field,
										style: 'error',
										message: field + ' cannot exceed ' + value[1] + ' characters in length.'
									});
								}
								else
								{
									feVor.utility.system.addInput(field);
									feVor.error = false;
								}
							break;

							case feVor.utility.validation.contains(rule, 'same'):
								var value = rule.split(':');
								if(input.val() != $('#' + value[1]).val())
								{
									feVor.utility.system.removeInput(field);
									feVor.error = true;
									feVor.utility.control.clearControlState(field);
									feVor.utility.control.setControlState({

										field: field,
										style: 'error',
										message: field + ' must match ' + value[1]
									});
								}
								else
								{
									feVor.utility.system.addInput(field);
									feVor.error = false;
								}
							break;

							case 'email':
								if(!feVor.utility.validation.isEmail(input.val()))
								{
									feVor.utility.system.removeInput(field);
									feVor.error = true;
									feVor.utility.control.clearControlState(field);
									feVor.utility.control.setControlState({

										field: field,
										style: 'error',
										message: field + ' must be a valid email address.'
									});
								}
								else
								{
									feVor.utility.system.addInput(field);
									feVor.error = false;
								}
							break;

							case 'password':
								if(!feVor.utility.validation.isPassword(input.val()))
								{
									feVor.utility.system.removeInput(field);
									feVor.error = true;
									feVor.utility.control.clearControlState(field);
									feVor.utility.control.setControlState({
										
										field: field,
										style: 'error',
										message: field + ' must be 6-16 characters and contain a special character'
									});
								}
								else
								{
									feVor.utility.system.addInput(field);
									feVor.error = false;
								}
							break;

							case feVor.utility.validation.isFunction(rule): break;
						}
					});

					if(input.val().length == 0)
					{
						feVor.utility.system.removeInput(field);
						feVor.error = true;
						feVor.utility.control.clearControlState(field);
					}
				});
			});

			$('#' + form).bind('submit', function() {
				if(feVor.validFields.length == Object.keys(container).length)
				{
					document.getElementById(form).submit();
					return true;
				}
			});
		});
	},

	success: function(field)
	{
 		feVor.error = false;

		if(!feVor.error)
		{
			feVor.utility.control.clearControlState(field);
			feVor.utility.control.setControlState({

				field: field,
				style: 'success',
				message: ''
			});
		}
	}
}

feVor.utility = 
{
	validation:
	{
		isEmail: function(email) 
		{
		    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		    return re.test(email);
		},

		isPassword: function(password)
		{
			var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
			return re.test(password);
		},

		isFunction: function(string)
		{
			if(typeof(string) === 'function')
				string();
			else
				return;
		},

		contains: function(string, key)
		{
			if(this.isFunction(string))
				return false;

			if(string.indexOf(key) != -1)
				return string;
			else
				return false;
		}
	},

	control:
	{
		setControlState: function(options)
		{
			$('#' + options.field + '-group').addClass('has-' + options.style);
			$('#' + options.field + '-message').html(options.message);
		},

		clearControlState: function(field)
		{
			$('#' + field + '-group').removeClass('has-error');
			$('#' + field + '-group').removeClass('has-success');
			$('#' + field + '-group').removeClass('has-warning');
			$('#' + field + '-message').html('');
		}
	},

	system:
	{
		removeInput: function(field) 
		{
			if(feVor.validFields.indexOf(field) > -1)
			{
				for(var i = feVor.validFields.length - 1; i >= 0; i--) 
				{
				    if (feVor.validFields[i] === field) 
				    {
				        feVor.validFields.splice(i, 1);
				    }
				}
			}
		},

		addInput: function(field)
		{
			if(feVor.validFields.indexOf(field) == -1)
				feVor.validFields.push(field);
		}
	}
}
