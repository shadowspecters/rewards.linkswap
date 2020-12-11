import React, { Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';

import Formular from '@font/Formular.woff';
import Formular_Bold from '@font/Formular-Bold.woff';

// fonts
export const Fonts = createGlobalStyle`
	@font-face {
		font-family: 'Formular';
		font-style: normal;
		font-weight: 400;
		font-display: auto;
		src: url(${Formular}) format('woff');
	}

	@font-face {
		font-family: 'Formular';
		font-style: bold;
		font-weight: 700;
		font-display: auto;
		src: url(${Formular_Bold}) format('woff');
	}


	body,
	input,
	select,
	textarea,
	h1,h2,h3,h4{
		font-family: 'Formular', sans-serif;
		font-weight: 400;
		line-height: 1.4em;
	}
`;

// vars
export const Vars = createGlobalStyle`
	:root {
		// primary
		--color-primary-1: #2A5BDB;
		--color-primary-2: #A841D5;
		--color-primary-3: #D541B8;

		// greys
		--color-light: #FFFFFF;
		--color-grey-25: #F8F8F8;
		--color-grey-50: #F1F1F1;
		--color-grey-100: #e1e1e1;
		--color-grey-200: #c8c8c8;
		--color-grey-300: #acacac;
		--color-grey-400: #919191;
		--color-grey-500: #6e6e6e;
		--color-grey-600: #404040;
		--color-grey-700: #303030;
		--color-grey-800: #292929;
		--color-grey-900: #212121;
		--color-grey-950: #141414;
		--color-dark: #000000;

		// status hex
		--color-status-success: #2ED47A;
		--color-status-concern: #FFB800;
		--color-status-failure: #FF4D00;
		--color-status-neutral: #2A5BDB;

		// status rgb
		--color-status-success-rgb: 46, 212, 122;
		--color-status-concern-rgb: 255, 184, 0;
		--color-status-failure-rgb: #FF4D00;
		--color-status-neutral-rgb: #2A5BDB;

		// fonts
		--font-size-xlarge: 4.8rem;
		--font-size-large: 2.4rem;
		--font-size-medium: 1.8rem;
		--font-size-normal: 1.6rem;
		--font-size-small: 1.4rem;
		--font-size-xsmall: 12px;
	}
`;

// base/reset
export const Base = createGlobalStyle`
	*{
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
		color: inherit;
	}

	html,body {
		padding: 0;
		margin: 0;
		//min-width: 1080px;
		scroll-behavior: smooth;
	}

	html{
		font-size: 10px;
	}

	h1,h2,h3,h4,h5,p{
		margin: 0.7em 0;
	}

	strong{
		font-weight: 600
	}

	a{
		text-decoration: none;
		transition: all 0.15s
	}

	*:focus{
		outline: none;
	}

	svg{
		width: 1em;
		height: 1em;

		&:not([defaultcolor='true']){
			path[fill]{
				fill: currentColor !important;
			}
		}
	}
`;

// layout
export const Layout = createGlobalStyle`
	#root{
		position: relative;
		min-height: 100vh;

		>.header{
			width: 100%;
			z-index: 9999;
			position: relative;

			.inner{
				margin: 0 auto;
			}
		}

		.global-notifications{
			z-index: 9998;
			top: 7rem;
		}

		.field + .amount{
			margin-top: 2.7rem;
		}
	}
`;

// theme
export const Theme = createGlobalStyle`
	body{
		color: var(--color-dark);
		background: white;
		font-size: var(--font-size-normal);
	}

	:root{
		// base
		--theme--app--background: #2B3A4A;
		--theme--app--color: var(--color-light);
		--theme--border-radius: 6px;
		--theme--border-radius--small: 6px;
		--theme--title--font-size: var(--font-size-xlarge);
		--theme--subtitle--font-size: var(--font-size-large);
		--theme--section--title--font-size: var(--font-size-large);
		--theme--section--subtitle--font-size: var(--font-size-medium);
		--theme--spacing: 1.6rem;
		--theme--spacing-tight: 1.2rem;
		--theme--spacing-loose: 2.2rem;

		// header
		--theme--header--link--font-size: var(--font-size-medium);

		// panel
		--theme--panel--background: #414F5D;
		--theme--panel--title--font-size: var(--font-size-large);
		--theme--panel--title--color: var(--color-light);
		--theme--panel--subtitle--font-size: var(--font-size-normal);
		--theme--panel--subtitle--color: var(--color-light);
		--theme--panel--text--font-size: var(--font-size-normal);
		--theme--panel--text--color: #BDCBDA;

		// stat
		--theme--stat--font-size: var(--font-size-normal);

		// button
		--theme--button--font-size: var(--font-size-normal);

		// modal
		--theme--modal--cover--background: rgba(255,255,255,0.1);
		--theme--modal--background: #222B35;
		--theme--modal--color: var(--color-light);
	}

	@keyframes spin {
	    from {transform:rotate(0deg);}
	    to {transform:rotate(360deg);}
	}

	svg[animate^='spin']{
		transform-origin: 50% 50%;
		animation-name: spin;
		animation-duration: 1000ms;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	@keyframes logospin {
	    0% {transform:rotate(0deg)}
	    16% {transform:rotate(0deg)}
	    17% {transform:rotate(60deg)}
	    33% {transform:rotate(60deg)}
	    34% {transform:rotate(120deg)}
	    49% {transform:rotate(120deg)}
	    50% {transform:rotate(180deg)}
	    66% {transform:rotate(180deg)}
	    67% {transform:rotate(240deg)}
	    83% {transform:rotate(240deg)}
	    84% {transform:rotate(300deg)}
	    99% {transform:rotate(300deg)}
	    100% {transform:rotate(360deg)}
	}

	svg[animate^='logospin']{
		transform-origin: 50% 50%;
		animation-name: logospin;
		animation-duration: 5000ms;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}
`;

export default () => (
  <Fragment>
    <Fonts />
    <Vars />
    <Base />
    <Layout />
    <Theme />
  </Fragment>
);
