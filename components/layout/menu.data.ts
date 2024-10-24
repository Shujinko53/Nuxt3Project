export interface IMenuItem {
	name: string,
	url: string,
	icon: string,
}

export const MENU_DATA: IMenuItem[] = [
	{
		name: 'Home',
		icon: 'dashboard',
		url: '/',
	},
	{
		name: 'Products',
		icon: 'goods',
		url: '/products',
	},
	{
		name: 'Payments',
		icon: 'payment',
		url: '/payments',
	},
	{
		name: 'Orders',
		icon: 'order',
		url: '/orders',
	},
	{
		name: 'Customers',
		icon: 'customers',
		url: '/customers',
	},
	{
		name: 'Feedback',
		icon: 'feedback',
		url: '/feedback',
	},
	{
		name: 'Settings',
		icon: 'settings',
		url: '/settings',
	},
	{
		name: 'Help center',
		icon: 'help',
		url: '/help',
	},
]