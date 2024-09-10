import * as React from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '../modules/components/Button';
import Link from '@mui/material/Link';
import Typography from '../modules/components/Typography';
import TextField from '@mui/material/TextField';
import FormButton from '../modules/form/FormButton';
import AppForm from '../modules/views/AppForm';
import { useAuth } from '../context';
import { useForm, Controller } from 'react-hook-form';

const validate = (values) => {
  const errors = {};
  return errors;
};

export default function ActivateAccount() {
  const [resentMessage, setResentMessage] = React.useState(false);
  const [activationEmail, setActivationEmail] = React.useState(null);
  const [activated, setActivated] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if (location.state?.email && !activationEmail) {
      setActivationEmail(location.state.email);
    }
  }, [location.state, activationEmail]);

  const { tempNewSignupData, handleSendActivation, handleResendActivation } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
    resolver: async (values) => {
      const validationErrors = validate(values);
      return { values: Object.keys(validationErrors).length ? {} : values, errors: validationErrors };
    }
  });

  const onSubmit = async (data) => {
    clearErrors();
    if (!activationEmail && !tempNewSignupData) {
      const result = await handleResendActivation(data.email);
      if (result.success) {
        setActivationEmail(data.email);
      } else {
        setError('submit', {
          type: 'manual',
          message: result.errorMessage
        });
      }
    } else {
      const payload = activationEmail ? { ...data, email: activationEmail } : { ...data, email: tempNewSignupData };
      const result = await handleSendActivation(payload);
      if (result.success) {
        setActivated(true)

      } else {
        setError('submit', {
          type: 'manual',
          message: result.errorMessage
        });
      }
    }
  };

  const handleResendCode = async () => {
    const email = activationEmail ? activationEmail : tempNewSignupData;
    setResentMessage(false);
    const result = await handleResendActivation(email);
    if (result.success) {
      setResentMessage(true);
    } else {
      setError('submit', {
        type: 'manual',
        message: result.errorMessage
      });
    }
  };

  return (
    <React.Fragment>
      <AppForm>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          {activated? "Account Activated": activationEmail || tempNewSignupData  ? 'Enter Activation Code': 'Enter Activation Email'}
        </Typography>
        {activated && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </Button>
          </Box>
        )}


        {(!activationEmail && !tempNewSignupData && !activated) && (
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 6 }}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Enter a valid email address',
                }
              }}
              render={({ field }) => (
                <TextField
                  autoFocus
                  {...field}
                  disabled={isSubmitting}
                  fullWidth
                  label="Email"
                  margin="normal"
                  required
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              )}
            />

            {errors.submit && (
              <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>
                {errors.submit.message}
              </Typography>
            )}

            <FormButton
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
              size="large"
              color="secondary"
              fullWidth
            >
              {isSubmitting ? 'In progress…' : 'Submit'}
            </FormButton>
          </Box>
        )}

        {((activationEmail || tempNewSignupData) && !activated) && (
          <React.Fragment>
            <Typography variant="body2" align="center">
              {'We sent an activation code to your email.'}
              <Link
                component="button"
                onClick={handleResendCode}
                underline="always"
                sx={{ cursor: 'pointer' }}
              >
                Resend
              </Link>
            </Typography>
            {resentMessage && (
              <Typography color="primary" align="center" sx={{ mt: 2 }}>
                Code was sent!
              </Typography>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 6 }}
            >
              <Controller
                name="activationCode"
                control={control}
                rules={{
                  required: 'Code is required',
                }}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    {...field}
                    disabled={isSubmitting}
                    fullWidth
                    label="Verification Code"
                    margin="normal"
                    required
                    error={!!errors.activationCode}
                    helperText={errors.activationCode ? errors.activationCode.message : ''}
                  />
                )}
              />

              {errors.submit && (
                <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>
                  {errors.submit.message}
                </Typography>
              )}

              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
                size="large"
                color="secondary"
                fullWidth
              >
                {isSubmitting ? 'In progress…' : 'Activate Account'}
              </FormButton>
            </Box>
          </React.Fragment>
        )}

      </AppForm>
    </React.Fragment>
  );
}
