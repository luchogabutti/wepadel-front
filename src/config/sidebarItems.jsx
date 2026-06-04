import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

export const profileSidebarItems = [
  { to: '/perfil', label: 'Perfil', icon: <PersonIcon />, end: true },
  { to: '/perfil/ordenes', label: 'Mis órdenes', icon: <ShoppingBagIcon />, end: true },
  { to: '/admin/catalogo', label: 'Panel Admin', icon: <AdminPanelSettingsIcon /> },
];

export const adminSidebarItems = [
  { to: '/admin/perfil', label: 'Perfil', icon: <PersonIcon />, end: true },
  { to: '/admin/pedidos', label: 'Pedidos', icon: <ReceiptLongOutlinedIcon />, end: true },
  { to: '/admin/catalogo', label: 'Catálogo', icon: <CategoryOutlinedIcon /> },
  { to: '/admin/stock', label: 'Stock', icon: <Inventory2OutlinedIcon />, end: true },
  { to: '/admin/descuentos', label: 'Descuentos', icon: <LocalOfferOutlinedIcon />, end: true },
];
