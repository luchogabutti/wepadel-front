import { Typography } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import { Link } from 'react-router-dom';
import './styles.scss';

const categories = [
  {
    id: 1,
    title: 'PALETAS',
    icon: CategoryIcon,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-yjy1JExQez21J_WpMqzYJ_MqJnptKKJ7JwaDS-Hxx5BcvPe-trnVrePYEUzaK3-etXdp6KtaimRsadDKCdkne2n8MQnJ-HGdXB_LR8jYvw-Za5hQ1QLetJcJuHzPX-vEXTjx0KHOVSdy8TgDdY0IW_Wwbj8upAwd8pVP1lekSd5oTlSatKTd4TIQ_wyyYdYHDZCnPIpyKeBfNrWJqTij_FSJ5rqL9a0TW0VL_yi-QoyeULWi14HjgBXaEVXDcKqZgmHQC79JT1gB',
    path: '/catalogo',
  },
  {
    id: 2,
    title: 'ACCESORIOS',
    icon: FitnessCenterIcon,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFE3tklQN7U-ivmNkLhFz9ZwFlnN0dY4DhqfZ8KIG_w7N6zb2pzaM_5ITEeuv-5niLJ7BVpgZfJ73F3CCswxbxkYD8hRTfEzlfKYVgwKuSx61kVIgacCFbRCMwZPhiXNWrxSaRgCqiFPiytqi56R_PiBA8LnlO-fM0aSsz3yHPtCVmnhdiF6KkZq0i7c5YFaaFMDO9OpctDI8OKOrRQqC9e7Z5oGrnY8UWGJzm4TMFrwZGQYMn49R5JbXPNJ9hoyZdKsfwPSOL1OPM',
    path: '#catalogo/accesiorios',
  },
  {
    id: 3,
    title: 'PELOTAS',
    icon: SportsTennisIcon,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcIwhbeLBb9-7Z1Y9OKmPRAwl4iNRjMpe6II3UUNm2_Co3oMFwt_z0l9Dr5PQ5Z0VVEqdW2QfZz1VDppNCuPTejusMSVmakC3DAHKG22UI6BJbPJqxxVFpuhyJA7pajmnU9oqukmMbJ9GmdJFRt_3bpYc6iuYbl-r83DIWTgRQmbvV6AdAJn-lULhJb7vI2IEurv1yFmfSihJCMqlQozTo-BWuBs8GEg9PIsTn9VEsufbeUxsQxLcM_vnfbD2P8H0VvPSFoJdX-LZ5',
    path: '#catalogo/pelotas',
  },
];

export const CategoriesSection = () => {
  return (
    <section className="categories-section">
      <Typography variant="h4" className="section-title">
        Explora por Categoría
      </Typography>

      <div className="categories-grid">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          const isExternal = cat.path.startsWith('#');
          
          const CardContent = (
            <>
              <img
                src={cat.img}
                alt={cat.title}
                className="cat-image"
              />
              <div className="cat-overlay" />
              <div className="cat-content">
                <IconComponent className="cat-icon" />
                <Typography variant="h5" className="cat-title">
                  {cat.title}
                </Typography>
                <Typography
                  className="cat-text"
                  variant="button"
                >
                  DESCUBRIR
                </Typography>
              </div>
            </>
          );

          if (isExternal) {
            return (
              <a
                key={cat.id}
                href={cat.path}
                className="category-card"
              >
                {CardContent}
              </a>
            );
          }

          return (
            <Link
              key={cat.id}
              to={cat.path}
              className="category-card"
            >
              {CardContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
};
