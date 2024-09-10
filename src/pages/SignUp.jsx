import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '../modules/components/Typography';
import AppForm from '../modules/views/AppForm';
import TextField from '@mui/material/TextField';
import FormButton from '../modules/form/FormButton';
import { useAuth } from '../context';
import { useForm, Controller } from 'react-hook-form';

const validate = (values) => {
  const errors = {};

  const requiredFields = ['email', 'password', 'confirm_password'];
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

  if (values.password && values.password !== values.confirm_password) {
    errors.confirm_password = "Passwords don't match";
  }

  return errors;
};


export default function SignUp() {
  const { handleSignUp } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
      first_name: '',
      last_name: ''
    },
    mode: 'onBlur',
    resolver: async (values) => {
      const validationErrors = validate(values);
      return { values: Object.keys(validationErrors).length ? {} : values, errors: validationErrors };
    }
  });

  const onSubmit = async (data) => {
    clearErrors();
    const result = await handleSignUp(data);
    if (result.success){
      navigate('/activate');
    } else{
      console.log("flag")
      setError('submit', {
        type: 'manual',
        message: result.errorMessage
      });
    }
  };

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link component={RouterLink} to="/signin" underline="always">
              Already have an account?
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
                autoFocus
                autoComplete="email"
                {...field}
                disabled={isSubmitting }
                fullWidth
                label="Email"
                margin="normal"
                required
                error={!!errors.email}
                helperText={errors.email ? errors.email : ''}
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
                helperText={errors.password ? errors.password : ''}
              />
            )}
          />
          <Controller
            name="confirm_password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={isSubmitting }
                fullWidth
                label="Confirm Password"
                type="password"
                margin="normal"
                required
                error={!!errors.confirm_password}
                helperText={errors.confirm_password ? errors.confirm_password : ''}
              />
            )}
          />
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={2}
            mb={2}
          >
            <Box flex={1}>
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={isSubmitting }
                    fullWidth
                    label="First name"
                    margin="normal"
                    error={!!errors.first_name}
                    helperText={errors.first_name ? errors.first_name : ''}
                  />
                )}
              />
            </Box>
            <Box flex={1}>
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={isSubmitting }
                    fullWidth
                    label="Last name"
                    margin="normal"
                    error={!!errors.last_name}
                    helperText={errors.last_name ? errors.last_name : ''}
                  />
                )}
              />
            </Box>
          </Box>
          {errors.submit && (
            <Typography color="error" sx={{textAlign:'center', mt: 2 }}>
              {errors.submit.message}
            </Typography>
          )}
          <FormButton
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting }
            color="secondary"
            fullWidth
          >
            {isSubmitting  ? 'In progress…' : 'Sign Up'}
          </FormButton>
        </Box>
      </AppForm>
    </React.Fragment>
  );
}
