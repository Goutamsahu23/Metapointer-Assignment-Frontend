// SendMoney.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import toast from 'react-hot-toast';


const SendMoney = () => {
    const [formData, setFormData] = useState({
        phoneNum: '',
        amount: '',
    });

    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const token = localStorage.getItem('authToken');

            const response = await axios.post(
                'https://metapointer-backend.onrender.com/api/v1/sendMoney',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })
            setResponse(response.data);
            const { message, cashback } = response.data
            toast.success(message);
            toast.success(`cashback:: ${cashback}`);
        } catch (error) {
            console.error('Error sending money:', error);
            setResponse({ success: false, message: 'An error occurred.' });
        }
    };


    return (
        <Container component="main" maxWidth="xs">
            <Typography variant="h5" align="center" gutterBottom>
                Send Money
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phoneNum"
                            value={formData.phoneNum}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Amount"
                            name="amount"
                            type="number"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Send Money
                </Button>
            </form>
            {response && (
                <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                    {response.success ? 'Money sent successfully.' : 'Failed to send money. ' + response.message}
                </Typography>
            )}
        </Container>
    );
};

export default SendMoney;
