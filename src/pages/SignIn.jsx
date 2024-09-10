import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '../modules/components/Typography';
import TextField from '@mui/material/TextField';
import FormButton from '../modules/form/FormButton';
import AppForm from '../modules/views/AppForm';
import { useAuth } from '../context';
import { useForm, Controller } from 'react-hook-form';



const validate = (values) => {
  const errors = {};

  const requiredFields = ['email', 'password'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });

  if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is not valid';
  }

  if (values.password) {
    if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }
    if (!/[a-zA-Z]/.test(values.password)) {
      errors.password = 'Password must contain at least one letter';
    }
  }

  return errors;
};

export default function SignIn() {
  const { handleLogin, handleResendActivation } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: async (values) => {
      const validationErrors = validate(values);
      return { values: Object.keys(validationErrors).length ? {} : values, errors: validationErrors };
    }
  });

  const onSubmit = async (data) => {
    clearErrors();
    const result = await handleLogin(data);
    if (result.success){
      navigate('/');
    } else{
      console.log("flag")
      setError('submit', {
        type: 'manual',
        message: result.errorMessage
      });
      if (result.errorMessage == "Activation needed"){
        handleResendActivation(data.email)
        navigate('/activate', {
          state: { email: data.email }
        })
      }
    }
  };

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {'Not a member yet? '}
            <Link component={RouterLink} to="/signup" underline="always">
              Sign Up here
            </Link>
          </Typography>
        </React.Fragment>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 6 }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                autoComplete="email"
                autoFocus
                {...field}
                disabled={isSubmitting }
                fullWidth
                label="Email"
                margin="normal"
                required
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={isSubmitting }
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                required
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
              />
            )}
          />
          {errors.submit && (
            <Typography color="error" sx={{ mt: 2 }}>
              {errors.submit.message}
            </Typography>
          )}
          <FormButton
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting }
            size="large"
            color="secondary"
            fullWidth
          >
            {isSubmitting  ? 'In progress…' : 'Sign In'}
          </FormButton>
        </Box>
        <Typography align="center">
          <Link component={RouterLink} to="/forgotpassword">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
    </React.Fragment>
  );
}
