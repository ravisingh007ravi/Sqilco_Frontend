import * as Yup from "yup";

export const UserSchema = Yup.object().shape({
    name: Yup.string().matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters')
        .required('Name is required'),

    email: Yup.string()
        .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format')
        .required('Email is required'),

    password: Yup.string()
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character')
        .required('Password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});



export const LoginSchema = Yup.object().shape({
  
    email: Yup.string()
        .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format')
        .required('Email is required'),

    password: Yup.string()
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character')
        .required('Password is required'),
});
