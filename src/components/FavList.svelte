<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let favs: Set<string>;
	const dispatch = createEventDispatcher();

	function dispatchRemove(item: string) {
		dispatch('removeFav', { item });
	}
</script>

<h2>Favourites</h2>

{#if favs.size}
	<ul class="fav-list" role="list">
		{#each Array.from(favs) as fav (fav)}
			<li>
				{fav}
				<button class="btn-remove" aria-label="Remove {fav}" on:click={() => dispatchRemove(fav)}
					>x</button
				>
			</li>
		{/each}
	</ul>
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

	.btn-remove {
		appearance: none;
		background-color: darkred;
		border: 1px solid red;
		border-radius: 0.25rem;
		font-size: smaller;
		color: white;
		transform: translateY(-50%);
	}
</style>
