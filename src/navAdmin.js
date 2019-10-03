export default {
    items: [
      // admin
      {
        name: 'Dashboard',
        url: '/',
        icon: 'fa fa-home'
      },
      {
        name: 'Account',
        url: '/',
        icon: 'fa fa-user',
        children: [
          {
            name: 'Account',
            url: '/account-index',
            icon: 'icon-account'
          },
          {
            name: 'Account Management',
            url: '/account-management',
            icon: 'icon-puzzle'
          }
        ]
      },
      {
        name: 'Role',
        url: '/',
        icon: 'fa fa-pie-chart',
        children: [
          {
            name: 'Role',
            url: '/role-index',
            icon: 'icon-account'
          },
          {
            name: 'Role Management',
            url: '/role-management',
            icon: 'icon-puzzle'
          }
        ]
      },
      {
        name: 'Store',
        url: '/',
        icon: 'fa fa-archive',
        children: [
          {
            name: 'Brand',
            url: '/brand',
            icon: 'icon-account'
          },
          {
            name: 'Store',
            url: '/store-index',
            icon: 'icon-puzzle'
          },
          {
            name: 'Store Management',
            url: '/store-management',
            icon: 'icon-puzzle'
          },
          {
            name: 'Location',
            url: '/location',
            icon: 'icon-puzzle'
          }
        ]
      },
    ]
  }
  