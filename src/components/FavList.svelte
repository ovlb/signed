<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let favs: Set<string>;
	const dispatch = createEventDispatcher();

	function dispatchApply(item: string) {
		dispatch('applyFav', { item });
	}

	function dispatchRemove(item: string) {
		dispatch('removeFav', { item });
	}
</script>

<h2>Favourites</h2>

{#if favs.size}
	<ul class="fav-list" role="list">
		{#each Array.from(favs).reverse() as fav (fav)}
			<li>
				<button class="btn-fav" on:click={() => dispatchApply(fav)}>{fav}</button>
				<button class="btn-remove" aria-label="Remove {fav}" on:click={() => dispatchRemove(fav)}
					>x</button
				>
			</li>
		{/each}
	</ul>
	<p><small>Click on a fav to apply it.</small></p>
{:else}
	<p>Nothing saved. Yet,</p>
{/if}

<style>
	.fav-list {
		display: flex;
		flex-flow: row wrap;
		gap: 1rem;
		list-style: none;
		padding: 0;
	}

	.btn-fav {
		appearance: none;
		border: none;
		background-color: transparent;
	}

	.btn-fav:active {
		font-weight: bold;
	}

	.btn-remove {
		appearance: none;
		background-color: darkred;
		border: 1px solid red;
		border-radius: 0.25rem;
		font-size: 0.6rem;
		color: white;
		height: 1rem;
		line-height: 1;
		transform: translateY(-50%);
		width: 1rem;
	}
</style>
