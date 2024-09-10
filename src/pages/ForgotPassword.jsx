import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Typography from '../modules/components/Typography';
import TextField from '@mui/material/TextField';
import FormButton from '../modules/form/FormButton';
import AppForm from '../modules/views/AppForm';
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



export default function ForgotPassword() {
  const [resetCode, setResetCode] = useState(False);
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
    const result = await handleGetForgottenPasswordCode(data.email);
    if (result.success) {
      setResetCode(data.email);
    } else {
      setError('submit', {
        type: 'manual',
        message: result.errorMessage
      });
    }
    }

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Forgot your password?
          </Typography>
          <Typography variant="body2" align="center">
            {"Enter your email address below and we'll " +
              'send you a link to reset your password.'}
          </Typography>

            {resetCode && (
              <Typography color="primary" align="center" sx={{ mt: 2 }}>
                Code was sent!
              </Typography>
            )}
        </React.Fragment>

        {!resetCode &&
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
                size="large"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
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
            {isSubmitting  ? 'In progress…' : 'Send reset link'}
          </FormButton>
        </Box>
      }


      </AppForm>
    </React.Fragment>
  );
}
