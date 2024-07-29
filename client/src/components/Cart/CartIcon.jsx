import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppContext } from '../../App';
import api from '../../api';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function CartIcon() {
  const { setCartOpen, user } = React.useContext(AppContext);
  const [cartItemCount, setCartItemCount] = React.useState(0);

  React.useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        const response = await api.get('carts/', { params: { user: user.id } });
        setCartItemCount(response.data.length);
      } catch (error) {
        console.error('Error fetching cart item count:', error);
      }
    };

    fetchCartItemCount();
  }, [user.id]);

  return (
    <IconButton onClick={() => setCartOpen(true)} aria-label="cart">
      <StyledBadge badgeContent={cartItemCount} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
};