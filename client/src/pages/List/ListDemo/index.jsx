import React, { useState, useEffect } from 'react';
import { Box, Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { EmojiTransportation, Storefront, ShoppingCartOutlined, Apartment, MoreHoriz } from '@mui/icons-material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Loading from '../../../components/Loading';
import EditFab from './EditFab';
import { getToken } from '../../../utils';

export default function ListDemo(props) {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const dataFetch = async () => {
      const token = await getToken();
      const response = await (
        await fetch("http://localhost:3001/api/account/expense/1", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "token": token
              },
          }
      )).json();
      setData(response.data.expenses);
    };
    dataFetch();
  }, []);

  const ListItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    height: '80px',
    width: '97%'
  }));

  return (
    <React.Fragment>
      <List sx={{ bgcolor: 'background.paper', width: '90%', height: '85%', ml:'auto', mr:'auto' }}>
      {data ? data.map((value) => {
        const { title, type, date, amount, category } = value;
        const iconAttributes = {
          edge: "start",
          fontSize: 'large',
          color: "primary",
          tabIndex: -1
        }
        // https://segmentfault.com/q/1010000015225190
        const setCategoryIcon = () => {
          switch (category) {
            case 'Grocery':
              return <Storefront {...iconAttributes} />
            case 'Transportation':
              return <EmojiTransportation {...iconAttributes} />
            case 'Shopping':
              return <ShoppingCartOutlined {...iconAttributes} />
            case 'Housing':
              return <Apartment {...iconAttributes} />
            default:
              return <MoreHoriz {...iconAttributes} />
          }
        }
        return (
          <ListItem
              key={value._id}
              // secondaryAction={
              //   <IconButton edge="end" aria-label="delete">
              //     <DeleteIcon />
              //   </IconButton>
              // }
          >
            <ListItemButton role={undefined} dense sx={{height: '100%'}}>
            <ListItemIcon>
                {
                  setCategoryIcon()
                }
            </ListItemIcon>
            {/* <ListItemText id='list-item-title' primary={`${title}`} secondary={`${date}`} /> */}
            <ListItemText id='list-item-title' 
                          primaryTypographyProps={{fontSize: '16px', fontWeight: 700}} primary={`${title}`} 
                          secondaryTypographyProps={{fontSize: '12px'}} secondary={`${date}`} 
            />
            <ListItemText id='list-item-amount' primaryTypographyProps={{fontSize: '24px', fontWeight: 700, color: 'darkred'}} primary={`${amount}`} />
            </ListItemButton>
        </ListItem>
        );
      }) : <Loading />}
      </List>
      <Box id="edit-button-container" sx={{display:'flex', bottom:'5%', width:'90%', ml:'auto', mr:'auto'}}>
        <EditFab />
      </Box>
    </React.Fragment>
  );
}