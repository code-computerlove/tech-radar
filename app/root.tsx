import type {
	LinksFunction,
	LoaderFunction,
	MetaFunction,
} from '@remix-run/node';

import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';

import stylesheetUrl from `~/styles/global.css`;

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesheetUrl }];
};

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'Code Tech Radar',
	viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
		<html lang="en">
		<head>
			<Meta />
			<style dangerouslySetInnerHTML={{ __html: `@font-face {font-display: swap;font-family: 'Poppins';font-style: normal;font-weight: 300;src: local('Poppins'),url('/font/poppins/poppins-v20-latin-300.woff2') format('woff2'),url('/font/poppins/poppins-v20-latin-300.woff') format('woff');}@font-face {font-display: swap;font-family: 'Poppins';font-style: normal;font-weight: 400;src: local('Poppins'),url('/font/poppins/poppins-v20-latin-regular.woff2') format('woff2'),url('/font/poppins/poppins-v20-latin-regular.woff') format('woff');}@font-face {font-display: swap;font-family: 'Poppins';font-style: normal;font-weight: 500;src: local('Poppins'),url('/font/poppins/poppins-v20-latin-500.woff2') format('woff2'),url('/font/poppins/poppins-v20-latin-500.woff') format('woff');}` }}/>
			<Links />
		</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
  );
}
