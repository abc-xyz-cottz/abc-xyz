export default {
  items: [
    {
      name: 'Dashboard',
      url: '/',
      icon: 'fa fa-feed'
    },
    {
      name: 'Guest',
      url: '/',
      icon: 'fa fa-cutlery',
      children: [
        {
          name: 'Guest Management',
          url: '/guest-management',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Promotion',
      url: '/',
      icon: 'fa fa-product-hunt',
      children: [
        {
          name: 'Promotion',
          url: '/promotion-index',
          icon: 'icon-puzzle'
        },
        {
          name: 'Promotion Management',
          url: '/promotion-management',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Management',
      url: '/',
      icon: 'fa fa-cogs',
      children: [
        {
          name: 'Membership',
          url: '/membership-management',
          icon: 'icon-puzzle'
        },
        {
          name: 'Level',
          url: '/level-management',
          icon: 'icon-puzzle'
        },
        {
          name: 'Payment',
          url: '/payment-management',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      divider: true
    }
  ]
}
