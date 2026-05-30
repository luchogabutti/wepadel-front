export const INITIAL_CART_ITEMS = [
  {
    id: 1,
    name: 'Padel Carbon Pro X',
    description: 'Technical Series • Carbon 12K',
    unitPrice: 249,
    quantity: 1,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAswP-KbPCzWPEyQ0_2DM3CnnAnXhyVd0BNOBLtSdldnaJEHKaVTFjNqDwRSYa0JRqFg31YCwpfH3clLT2wK7GKSfY_9UwdhJJtu0rxXjq0BcTAWDUQR6XiD8cdjoc75UFB7B1rjdtbf0K3PVCBPQnP6cAcjpEbVuiazTGwf0_TvO3YeW2xwmRP1tiHGvrITRfRzceln6EGArzNn-a6ELXXWYv_ad7jpK3HgDg7ScRSc3UrTlJcQcm5ELkYPIzFN6O14Lm4flKrguiI',
  },
  {
    id: 2,
    name: 'Balls Elite Pack (x3)',
    description: 'High Durability • Official Weight',
    unitPrice: 12.5,
    quantity: 2,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCFzGVwaBt-6a8uYDYCMO3dsUh-4z_-BB3h3o51XIT7kDXfmlSDC7Ibz3-2g72OUCJYa48HN9E2VUYFpIBP4kIqAuulzrmEIB_7dZeaKL8tl-kIfN-He80fe9KLOS1uNUITbQuRrwUnAGXtesaaOpKAw64Ri_JbgeH2CtYP2PZ3_PrDKIe12Fa2m3hcAD1tU0TtQXWdxiCDdIM6CZYgJQRIAddBjek2Zpsq3gEgWaEcMaY2n12-6TVYVgSpZZ2eme7JQ2QjEkmhFFSl',
  },
];

export const CHECKOUT_ITEMS = [
  {
    id: 1,
    name: 'Pala Carbon Elite Pro 2024',
    detail: 'Garantía oficial incluida',
    quantity: 1,
    unitPrice: 320000,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAswP-KbPCzWPEyQ0_2DM3CnnAnXhyVd0BNOBLtSdldnaJEHKaVTFjNqDwRSYa0JRqFg31YCwpfH3clLT2wK7GKSfY_9UwdhJJtu0rxXjq0BcTAWDUQR6XiD8cdjoc75UFB7B1rjdtbf0K3PVCBPQnP6cAcjpEbVuiazTGwf0_TvO3YeW2xwmRP1tiHGvrITRfRzceln6EGArzNn-a6ELXXWYv_ad7jpK3HgDg7ScRSc3UrTlJcQcm5ELkYPIzFN6O14Lm4flKrguiI',
  },
  {
    id: 2,
    name: 'Tubo de Pelotas Pro-Tour (x3)',
    detail: 'Presurizadas',
    quantity: 2,
    unitPrice: 8500,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCFzGVwaBt-6a8uYDYCMO3dsUh-4z_-BB3h3o51XIT7kDXfmlSDC7Ibz3-2g72OUCJYa48HN9E2VUYFpIBP4kIqAuulzrmEIB_7dZeaKL8tl-kIfN-He80fe9KLOS1uNUITbQuRrwUnAGXtesaaOpKAw64Ri_JbgeH2CtYP2PZ3_PrDKIe12Fa2m3hcAD1tU0TtQXWdxiCDdIM6CZYgJQRIAddBjek2Zpsq3gEgWaEcMaY2n12-6TVYVgSpZZ2eme7JQ2QjEkmhFFSl',
  },
];

export const AVAILABLE_POINTS = 500;

export const CART_SUMMARY = {
  subtotal: 274,
  total: 274,
};

export const CHECKOUT_SUMMARY = {
  subtotal: 337000,
  pointsDiscount: 500,
  total: 336500,
};

export const formatCartPrice = (amount) => `$${amount.toFixed(2)}`;

export const formatCheckoutPrice = (amount) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

