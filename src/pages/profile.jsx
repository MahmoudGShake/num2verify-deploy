import * as React from 'react';
import { Box, Button, TextField, Avatar, IconButton, Typography, Paper } from '@mui/material';
import { useAuth } from '../context';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import { passwordReset } from '../services/UserAuth';
import { updateProfileData } from '../services/UserAuth';

export function Slot({ children }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}>
      {children}
    </Box>
  );
}

export default function Profile() {
  const { userData } = useAuth();

  const keys = ['first_name', 'last_name', 'email', 'picture', 'password'];
  const filteredUserData = (user, keys) => {
    console.log(user)
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => keys.includes(key))
    );
  };

  const filtereddata = filteredUserData(userData, keys);

  const [editable, setEditable] = React.useState(false);
  const [editingPassword, setEditingPassword] = React.useState(false);
  const [formData, setFormData] = React.useState(filtereddata);
  const [profilePic, setProfilePic] = React.useState(person.user.profile_picture);
  const [passwordData, setPasswordData] = React.useState({
    old_password: '',
    new_password: '',
    confirm_new_password: '',
  });

  const [passwordErrors, setPasswordErrors] = React.useState({
    old_password: false,
    new_password: false,
    confirm_new_password: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validatePasswords = () => {
    const errors = {
      old_password: false,
      new_password: false,
      confirm_new_password: false,
    };

    if (passwordData.new_password && passwordData.confirm_new_password && passwordData.new_password !== passwordData.confirm_new_password) {
      errors.new_password = true;
      errors.confirm_new_password = true;
    }

    setPasswordErrors(errors);

    return Object.values(errors).every(error => !error);
  };

  const handleSubmit = () => {
    if (editingPassword && !validatePasswords()) {
      return; 
    }

    try {
      if (editingPassword) {
        passwordReset(passwordData);
      }
      if (editable) {
        const allData = { ...formData, picture: profilePic };
        updateProfileData(allData);
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 8 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            maxWidth: 500,
            width: '100%',
            textAlign: 'center',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
            Profile
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar
                alt="Profile Picture"
                src={profilePic || '/default-profile.png'}
                sx={{ width: 100, height: 100, mb: 2, boxShadow: 2 }}
              />
              {editable && (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  sx={{ backgroundColor: '#e0e0e0', borderRadius: 1 }}
                >
                  <input hidden accept="image/*" type="file" onChange={handleProfilePicChange} />
                  <PhotoCamera />
                </IconButton>
              )}
            </Box>
          </Box>

          <Slot>
            <TextField
              label="Email"
              name="email"
              value={formData.email || ''}
              disabled={true}
              fullWidth
              variant="outlined"
            />
          </Slot>
          <Slot>
            <TextField
              label="First Name"
              name="first_name"
              value={formData.first_name || ''}
              onChange={handleInputChange}
              disabled={!editable}
              fullWidth
              variant="outlined"
            />
          </Slot>
          <Slot>
            <TextField
              label="Last Name"
              name="last_name"
              value={formData.last_name || ''}
              onChange={handleInputChange}
              disabled={!editable}
              fullWidth
              variant="outlined"
            />
          </Slot>

          {/* Password Section */}
          {!editingPassword ? (
            <Slot>
              <TextField
                label="Password"
                name="password"
                type="password"
                value="********"
                disabled
                fullWidth
                variant="outlined"
              />
              {editable && (
                <IconButton onClick={() => setEditingPassword(!editingPassword)} sx={{ width: 50, height: 50, ml: 2 }}>
                  <EditIcon />
                </IconButton>
              )}
            </Slot>
          ) : (
            <>
              <Slot>
                <TextField
                  label="Old Password"
                  name="old_password"
                  type="password"
                  value={passwordData.old_password}
                  onChange={handlePasswordChange}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                {editable && (
                <IconButton onClick={() => setEditingPassword(!editingPassword)} sx={{ width: 50, height: 50, ml: 2 }}>
                  <EditIcon />
                </IconButton>
              )}
              </Slot>

              <Slot>
                <TextField
                  label="New Password"
                  name="new_password"
                  type="password"
                  value={passwordData.new_password}
                  onChange={handlePasswordChange}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                  error={passwordErrors.new_password}
                  helperText={passwordErrors.new_password ? "Passwords do not match" : ""}
                />
              </Slot>

              <Slot>
                <TextField
                  label="Confirm New Password"
                  name="confirm_new_password"
                  type="password"
                  value={passwordData.confirm_new_password}
                  onChange={handlePasswordChange}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                  error={passwordErrors.confirm_new_password}
                  helperText={passwordErrors.confirm_new_password ? "Passwords do not match" : ""}
                />
              </Slot>
            </>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              onClick={() => {
                editable ? handleSubmit() : setEditable(!editable);
              }}
              sx={{
                width: '50%',
                paddingY: 1.5,
                backgroundColor: editable ? 'green' : 'primary.main',
                ':hover': {
                  backgroundColor: editable ? 'darkgreen' : 'primary.dark',
                },
              }}
            >
              {editable ? 'Save' : 'Edit'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </React.Fragment>
  );
}
