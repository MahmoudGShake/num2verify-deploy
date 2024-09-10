import * as React from 'react';
import { Paper } from '@mui/material';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function AppForm({children, props}) {
  return (
    <Container
      sx={{ display: 'flex',
        justifyContent: 'center'
      }}>
          <Paper
          elevation = {3}
          background="light"
          sx={{py: { xs: 4, md: 8 }, px: { xs: 3, md: 6 }, mt: 7, mb: 12  }}>
          {children}
          </Paper>
    </Container>
  );
}

AppForm.propTypes = {
  children: PropTypes.node,
};

export default AppForm;
