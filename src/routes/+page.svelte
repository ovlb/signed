<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { signatures } from '../data/signed';
	import MailWindow from '../components/MailWindow.svelte';

	let name = '';
	let activeSignature = '';

	$: activeIndex = -1;
	// $: () => $page.url.searchParams.set('name', String(name));

	const { length } = signatures;

	onMount(() => {
		const { search } = window.location;

		if (search) {
			const params = new URLSearchParams(search);
			const signature = parseInt(params.get('signature') || '');
			const mountedName = params.get('name');

			if (params.get('signature') && signature <= length) {
				activeSignature = signatures[signature];
			}

			if (mountedName) {
				name = mountedName;
			}
		}
	});

	function setActiveSignature() {
		const newIndex = Math.floor(Math.random() * length);

		activeSignature = signatures[newIndex];
		activeIndex = newIndex;

		window.history.replaceState('', '', `?signature=${newIndex}&name=${name}`);
	}
</script>

<header>
	<h1>Signed,</h1>
	<p>Not sure how to sign off? We got you.</p>
	<label for="name">
		What's your name?
		<input type="text" name="name" id="name" bind:value={name} />
	</label>
	{#if name}
		<div style="margin-top: 1rem;">
			<button on:click={setActiveSignature}>Sign</button>
		</div>
	{/if}
</header>

<main>
	{#if activeSignature && name}
		<MailWindow>
			<p>
				{activeSignature},<br />
				{name}
			</p>
		</MailWindow>
	{/if}
</main>

<footer>
	<small
		>Another project from <a href="https://www.todayintabs.com/">Today in Tabs’</a> Discord. Subscribe
		for fun.</small
	>
</footer>

<style>
	main,
	footer {
		margin-top: 5rem;
	}

	button {
		background-color: hotpink;
		border: none;
		border-radius: 0.25rem;
		padding: 0.5rem 0.75rem;
		color: white;
		font-weight: bold;
		transition: all 0.2s ease-out;
	}

	button:hover,
	button:focus {
		background-color: paleturquoise;
		color: black;
		transform: scale(1.2);
	}
</style>
