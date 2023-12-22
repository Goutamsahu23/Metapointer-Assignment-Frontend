import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';



export default function Dashboard() {
  const [userAmount, setUserAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);



  useEffect(() => {
    // Fetch user amount and transactions from the backend
    const fetchUserData = async () => {
        const token = localStorage.getItem('authToken');

            if (!token) {
                console.error('Token not found.');
                return;
              }
        try {

            const response = await axios.get('https://metapointer-backend.onrender.com/api/v1/dashboard', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
        
            setUserAmount(response.data.amount);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }

      try {
        const response = await axios.get('https://metapointer-backend.onrender.com/api/v1/transactions', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchUserData();
  }, [transactions]); 


  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box position="absolute " backgroundColor="blue" width="96rem">
          <Toolbar sx={{ pr: '24px' }}>
            <Typography component="h1" variant="h6" color="inherit" noWrap>
              Dashboard
            </Typography>
          </Toolbar>
        </Box>

        <Box
          component="main"
          sx={{
            backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Display user amount */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                  <Typography variant="h6">Available Amount</Typography>
                  <Typography variant="h4">${userAmount}</Typography>
                  <Grid item xs={12}>
                <Link  to="/sendMoney">
                <Button variant="outlined">Send Money
                  <OpenInNewIcon />
                  </Button>
                  
                </Link>
              </Grid>
                </Paper>
              </Grid>
              
              {/* Display transaction details */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6">Recent Transactions</Typography>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>From</TableCell>
                        <TableCell>TO</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell >Cashback Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.from}</TableCell>
                          <TableCell>{transaction.to}</TableCell>
                          <TableCell>{transaction.amount}</TableCell>
                          <TableCell >{transaction.cashback}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>

             
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
