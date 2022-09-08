import Head from 'next/head';
import Image from 'next/image';

import styles from '@/pages/index.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>SA Jenkins</title>
				<link rel="icon" href="/public/favicon.ico" />
			</Head>

			<main>
				<h2 className={styles.title}>It worked on my machine...</h2>

				<span>
					<Image
						className={styles.image}
						src="/hooray.gif"
						alt="Hooray"
						width={500}
						height={400}
					/>
				</span>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Image
							src="/safaricom.png"
							alt="Vercel Logo"
							width={72}
							height={16}
						/>
					</span>
				</a>
			</footer>
		</div>
	);
}
