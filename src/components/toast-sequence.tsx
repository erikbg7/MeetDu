'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

type FakeNotification = {
	message: string;
	description?: string;
};

const notifications: Array<FakeNotification> = [
	{
		message: 'Welcome to the app!',
		description: 'Thanks for being here 🎉',
	},
	{
		message: 'David just followed you!',
		description: 'Follow back to gain some karma ⚡',
	},
	{
		message: 'Nuria D. just followed you!',
		description: 'Follow back to gain some karma ⚡',
	},
	{
		message: 'AlejandroDev just followed you!',
		description: 'Follow back to gain some karma ⚡',
	},
	{
		message: 'Bryan B. just followed you!',
		description: 'Follow back to gain some karma ⚡',
	},
	{
		message: 'Patricia just followed you!',
		description: 'Follow back to gain some karma ⚡',
	},
	{
		message: 'Hundreds of developers are waiting for you!',
		description: 'Connect your GitHub account to get started.',
	},
];

export default function ToastSequence() {
	useEffect(() => {
		const timeouts: NodeJS.Timeout[] = [];

		notifications.forEach((notification, index) => {
			const timeout = setTimeout(
				() => {
					toast.info(notification.message, {
						description: notification.description,
						duration: Infinity,
					});
				},
				(index + 1) * 3000,
			);

			timeouts.push(timeout);
		});

		return () => {
			timeouts.forEach(clearTimeout);
		};
	}, []);

	return null;
}
