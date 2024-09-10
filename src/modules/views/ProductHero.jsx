import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '../components/Button';
import Typography from '../components/Typography';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import backgroundImage from '../../assets/Phone-message_AI.jpeg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton, Paper } from '@mui/material';


export default function ProductHero() {
  const theme = useTheme();

  return (
  <Box sx={{display: 'flex', justifyContent: "center"
  }}>

    <Paper sx = {{  color: 'common.white',
      bgcolor: 'grey',
      my: 10,
      mx: 5,
      width: .8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.up('sm')]: {
        height: '80vh',
        minHeight: 500,
        maxHeight: 1300,
      },}}>


      <Typography color="inherit" align="center" variant="h2" marked="center">
        Recieve Messages Now
      </Typography>

      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}>
        Choose from our collection of numbers from all around the globe
      </Typography>

      <Button
        color="secondary"
        variant="contained"
        size="large"
        component={RouterLink}
        to="/signup"
        sx={{ minWidth: 200 }}>
        Register
      </Button>

    </Paper>

  </Box>
  );
}
