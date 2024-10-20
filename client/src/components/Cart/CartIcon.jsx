import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppContext } from '../../App';
import { useAppContext } from '../../services/utilities';
import api from '../../api';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    backgroundColor: 'green',
  },
}));

export default function CartIcon() {
  const { user, setCartOpen, cartItemsCount, setCartItemsCount } = useAppContext();

  React.useEffect(() => {
    const fetchCartItemsCount = async () => {
      try {
        const response = await api.get('carts/');
        setCartItemsCount(response.data.length);
      } catch (error) {
        console.error('Error fetching cart item count:', error);
      }
    };

    fetchCartItemsCount();
  }, [user.id]);

  return (
    <IconButton onClick={() => setCartOpen(true)} aria-label="cart">
      <StyledBadge badgeContent={cartItemsCount} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
};