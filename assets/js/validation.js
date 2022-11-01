
let form_login = document.getElementById('form-login');
let form_signup = document.getElementById('form-signup');

// console.log(typeof(form_signup.id));

const form_login_items = {
	'email' : document.getElementById('email'),
	'password' : document.getElementById('password'),
}
const form_signup_items = {
	'name' : document.getElementById('name'),
	'email' : document.getElementById('email2'),
	'company' : document.getElementById('company'),
	'phone' : document.getElementById('phone'),
	'address' : document.getElementById('address'),
}

// console.log(email, password, name, company, phone, address);

//error message;

const empty_field = "Không được bỏ trống trường này";
const invalid_email = "Email vừa nhập không hợp lệ";
const invalid_phone = "Số điện thoại vừa nhập không hợp lệ";



//validate functions
const isRequired = (value) => value === '' ? true : false;
const isEmail = (email) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
const isPhone= (phone) => /^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone);


const checkEmpty = (input) => {
	let new_value = input.value.trim();
	if(isRequired(new_value)){
		error_state(input, empty_field);
	}
	else{
		success_state(input);
	}
}

const checkPhoneNumber = (phone) => {
	let new_phone = phone.value.trim();
	if(isRequired(new_phone)){
		error_state(phone, empty_field);
	}else if(!isPhone(new_phone)){
		error_state(phone, invalid_phone);
	}else{
		success_state(phone);
	}
}

const checkEmail = (email) => {
	let new_email = email.value.trim();
	if(isRequired(new_email)){
		error_state(email, empty_field);
	}else if(!isEmail(new_email)){
		error_state(email, invalid_email);
	}else{
		success_state(email);
	}
}
//show message functions

const success_state = (input) => {
	let formControl = input.parentElement;
	formControl.style.margin = null;
	let error_message = formControl.querySelector('.form-error-message');
	let error_icon = formControl.querySelector('.fa-circle-exclamation');
	let success_icon = formControl.querySelector('.fa-circle-check');
	error_message.innerText = '';
	input.classList.remove('error');
	input.classList.add("success");
	success_icon.style.visibility = "visible";
	error_icon.style.visibility = "hidden";
}

const error_state = (input, message) => {
	let formControl = input.parentElement;
	formControl.style.margin = "0 0 36px 0";
	let error_message = formControl.querySelector('.form-error-message');
	let error_icon = formControl.querySelector('.fa-circle-exclamation');
	let success_icon = formControl.querySelector('.fa-circle-check');
	error_message.innerText = message;
	input.classList.remove('success');
	input.classList.add('error');
	error_icon.style.visibility = "visible";
	success_icon.style.visibility = "hidden";

}
//animation effect
const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

//form validate
const form_validate = (form_object) => {
	let form_keys = Object.keys(form_object);
	for(let i = 0; i < form_keys.length; i++) {
		if(form_keys[i] === 'email') {
			checkEmail(form_object['email']);
		}else if(form_keys[i] === 'phone'){
			checkPhoneNumber(form_object['phone']);
		}else{
			checkEmpty(form_object[form_keys[i]]);
		}
	}
}


//validate login form
function login_verify_data(){
	form_login.addEventListener('submit',function(e) {
		e.preventDefault();
		form_validate(form_login_items);
		
	})
}

function login_check_input(){
	form_login.addEventListener('input', debounce(function(e) {
		switch(e.target.id){
			case 'email':
				checkEmail(form_login_items['email']);
				break;
			case 'password':
				checkEmpty(form_login_items['password']);
				break;
		}	
	}));
}

//validate sign up form
function signup_verify_data(){
	form_signup.addEventListener('submit',function(e) {
		e.preventDefault();
		form_validate(form_signup_items);
		
	})
}

function signup_check_input(){
	form_signup.addEventListener('input', debounce(function(e) {
		switch(e.target.id){
			case 'email2':
				checkEmail(form_signup_items['email']);
				break;
			case 'name':
				checkEmpty(form_signup_items['name']);
				break;
			case 'company':
				checkEmpty(form_signup_items['company']);
				break;
			case 'phone':
				checkPhoneNumber(form_signup_items['phone']);
				break;
			case 'address':
				checkEmpty(form_signup_items['address']);
				break;
		}	
	}));
}


