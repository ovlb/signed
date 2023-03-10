<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { signatures } from '../data/signed';
	import MailWindow from '../components/MailWindow.svelte';
	import ControlSection from '../components/ControlSection.svelte';
	import { updateURLState } from '../utils/update-state';

	const LS_FAVS = 'sigFavs';

	let name = '';
	let activeSignature = '';
	let shownPunctuation: string;
	let favs: Set<string> = new Set();
	let seenSignatures: Set<number> = new Set();
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
		let newIndex = Math.floor(Math.random() * length);

		// increase likelihood to circle through possible signatures
		if (seenSignatures.has(newIndex)) {
			newIndex = Math.floor(Math.random() * length);
		}

		// force new to be different from current state, should be a no-op in most cases
		while (newIndex === activeIndex) {
			newIndex = Math.floor(Math.random() * length);
		}

		seenSignatures.add(newIndex);

		activeSignature = signatures[newIndex];
		activeIndex = newIndex;

		// if user seen everything we might as well start again
		if (seenSignatures.size === length) {
			seenSignatures.clear();
		}

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

	function applyFav(event: CustomEvent) {
		const { item } = event.detail;
		const newIndex = signatures.findIndex((sig) => sig === item);

		activeSignature = item;
		activeIndex = newIndex;

		updateURLState('signature', newIndex);
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
		{#if favs.size}
			{#await import('../components/FavList.svelte') then component}
				<svelte:component
					this={component.default}
					{favs}
					on:removeFav={removeFav}
					on:applyFav={applyFav}
				/>
			{/await}
		{/if}
	{/if}
</main>

<footer>
	<small
		>Another project from <a href="https://www.todayintabs.com/" rel="noopener,nofollow"
			>Today in Tabs</a
		>??? Discord. Subscribe for fun.<br />
		<a href="https://github.com/ovlb/signed" rel="noopener,nofollow">Source Code</a>
	</small>
</footer>

<style>
	main,
	header,
	footer {
		max-width: var(--content-max-width);
	}
	main,
	footer {
		margin-top: 2rem;
		line-height: 1.5;
	}
</style>
