import { currentUser } from '@clerk/nextjs/server';

export default async function Meet() {
	const user = await currentUser();

	return (
		<div>
			<h1>Meet Other Users</h1>
			<p>Welcome, {user?.firstName} !</p>
		</div>
	);
}
