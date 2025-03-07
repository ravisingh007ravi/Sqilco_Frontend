import * as Yup from "yup";

export const UserSchema = Yup.object().shape({
    name: Yup.string() .matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed').min(2).max(50).required('Name is required'),
    email: Yup.string().matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format').required('Email is required'),
    password: Yup.string().matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,'Invalid password format').required('Password is required').min(8, 'Password must be at least 8 characters'),
});