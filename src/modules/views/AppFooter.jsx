import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '../components/Typography';

function Copyright() {
  return (
    <Box sx={{color: 'common.white'}}>
      {'© '}
      <Link color="inherit" component={RouterLink} to="/">
        Num2Verify
      </Link>
      {` ${new Date().getFullYear()}. All rights reserved.`}
    </Box>
  );
}

export default function AppFooter() {
  return (
    <Box 
      component="footer" 
      sx={{
        pt: 5, 
        bgcolor: 'secondary.light', 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center', 
        textAlign: 'center',
        gap: 20
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Copyright />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography sx={{color: 'common.white'}} variant="h6" marked="center" gutterBottom>
          Legal
        </Typography>

        <Box component="ul" sx={{color: 'common.white', mx: 10, listStyle: 'none', p: 0 }}>
          <Box component="li" sx={{ py: 0.5 }}>
            <Link component={RouterLink} to="/terms">Terms</Link>
          </Box>
          <Box component="li" sx={{color: 'common.white', py: 0.5 }}>
            <Link component={RouterLink} to="/privacy">Privacy</Link>
          </Box>
        </Box>
      </Box>

    </Box>
  );
}
