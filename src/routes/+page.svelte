<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { signatures } from '../data/signed';
	import MailWindow from '../components/MailWindow.svelte';
	import ControlSection from '../components/ControlSection.svelte';
	import FavList from '../components/FavList.svelte';
	import { updateURLState } from '../utils/update-state';

	const LS_FAVS = 'sigFavs';

	let name = '';
	let activeSignature = '';
	let shownPunctuation: string;
	let favs: Set<string> = new Set();
	// let excluded: string[] = [];

	$: activeIndex = -1;
	$: name && updateURLState('name', name);

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

		const currentFavs = JSON.parse(localStorage.getItem(LS_FAVS) ?? '[]');

		currentFavs.forEach((fav: string) => favs.add(fav));
	});

	function updateFavStorage() {
		localStorage.setItem(LS_FAVS, JSON.stringify(Array.from(favs)));
	}

	function setActiveSignature() {
		const newIndex = Math.floor(Math.random() * length);

		activeSignature = signatures[newIndex];
		activeIndex = newIndex;

		updateURLState('signature', activeIndex);
	}

	function handleClick(event: CustomEvent) {
		const { type } = event.detail;

		if (type === 'fav') {
			favs = favs.add(activeSignature);

			updateFavStorage();
		}

		if (type === 'reset') {
			favs = new Set();

			updateFavStorage();
		}
	}

	function removeFav(event: CustomEvent) {
		favs.delete(event.detail.item);

		favs = favs;

		updateFavStorage();
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
				{activeSignature}{shownPunctuation}<br />
				{name}
			</p>
		</MailWindow>
		<ControlSection bind:active={shownPunctuation} on:btnClick={handleClick} />
		<FavList {favs} on:removeFav={removeFav} />
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
	header,
	footer {
		max-width: var(--content-max-width);
	}
	main,
	footer {
		margin-top: 3rem;
		line-height: 1.5;
	}
</style>
