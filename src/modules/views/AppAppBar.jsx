// import * as React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Toolbar from '../components/Toolbar';
// import { useAuth } from '../../context';
// import Button from '../components/Button';
// import MuiAppBar from '@mui/material/AppBar';

// const Buttonstyle = {
//   fontSize: 16,
//   color: 'common.white',
//   ml: 3,
// };

// function AppBarControls() {
//   const { userData, handleLogout } = useAuth()

//   if (!userData) {
//       return (
//       <>

//       <Button
//           color="inherit"
//           variant="h6"
//           underline="none"
//           component={RouterLink}
//           to="/signin"
//           sx={Buttonstyle}>
//           {'Sign In'}
//       </Button>
//       <Button
//           variant="h6"
//           underline="none"
//           component={RouterLink}
//           to="/signup"
//           sx={{ ...Buttonstyle, color: 'common.white'}}>
//               {'Sign Up'}
//       </Button>
//       </>
//           );
//   } else {
//     return(
//     <>

//       <Button
//       variant="h6"
//       underline="none"
//       onClick= {handleLogout}
//       sx={{ ...Buttonstyle, color: 'secondary.main' }}>
//           {'Logout'}
//   </Button>
//   </>
//     )
//   }
// }

// export default function AppAppBar() {
//   return (
//     <>
//       <MuiAppBar elevation={4} position="fixed">
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
          
//           <Link
//             variant="h6"
//             underline="none"
//             color="inherit"
//             component = {RouterLink}
//             to="/"
//             sx={{ fontSize: 24 }}
//           >
//             {'Num2Verify'}
//           </Link>

//           <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
//             <AppBarControls />
//           </Box>
          
//         </Toolbar>
//       </MuiAppBar>
//       <Toolbar />
//     </>
//   );
// }


import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Toolbar from '../components/Toolbar';
import { useAuth } from '../../context';
import Button from '../components/Button';
import MuiAppBar from '@mui/material/AppBar';
import NumbersList from '../../pages/Numberlist';

const Buttonstyle = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppBarControls() {
  const { userData, handleLogout } = useAuth()

  if (!userData) {
      return (
      <>
      <Button
          color="inherit"
          variant="h6"
          underline="none"
          component={RouterLink}
          to="/signin"
          sx={Buttonstyle}>
          {'Sign In'}
      </Button>
      <Button
          variant="h6"
          underline="none"
          component={RouterLink}
          to="/signup"
          sx={{ ...Buttonstyle, color: 'common.white'}}>
              {'Sign Up'}
      </Button>
      <Button
          color="inherit"
          variant="h6"
          underline="none"
          component={RouterLink}
          to="/numberlist"
          sx={Buttonstyle}>
          {'Number-List'}
      </Button>
      </>
          );
  } else {
    return(
    <>
      <Button
      variant="h6"
      underline="none"
      onClick= {handleLogout}
      sx={{ ...Buttonstyle, color: 'secondary.main' }}>
          {'Logout'}
  </Button>

  <Button
          color="inherit"
          variant="h6"
          underline="none"
          component={RouterLink}
          to="/numberlist"
          sx={Buttonstyle}>
          {'Number-List'}
      </Button>
  </>
    )
  }
}

export default function AppAppBar() {
  return (
    <>
      <MuiAppBar elevation={4} position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            component = {RouterLink}
            to="/"
            sx={{ fontSize: 24 }}
          >
            {'Num2Verify'}
          </Link>

          {/* <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <NumbersList/>
          </Box> */}
         

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <AppBarControls />
            
          </Box>
          
        </Toolbar>
      </MuiAppBar>
      <Toolbar />
    </>
  );
}
