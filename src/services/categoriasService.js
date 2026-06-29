import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import BackpackIcon from '@mui/icons-material/Backpack';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { apiRequest } from './apiClient';

const CATEGORIA_ICONS = {
  paletas: SportsTennisIcon,
  accesorios: BackpackIcon,
  pelotas: SportsSoccerIcon,
};

export const getCategorias = () => apiRequest('/categorias');

export const mapCategoria = (categoria) => ({
  ...categoria,
  icon: CATEGORIA_ICONS[categoria.id] ?? CategoryOutlinedIcon,
});

export const mapCategorias = (list) => (list ?? []).map(mapCategoria);
