<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { punctuation } from '../data/form-data';
	import type { Punctuation } from '../data/form-data';

	const dispatch = createEventDispatcher();

	export let active: string = punctuation[0].sign;

	function confirmReset() {
		if (window.confirm('Do you really want to remove all favourites?')) {
			dispatchBtn('reset');
		}
	}

	function dispatchBtn(type: 'fav' | 'reset' | 'del') {
		dispatch('btnClick', {
			type
		});
	}
</script>

<div class="control-section">
	<fieldset>
		<legend>Choose punctuation</legend>
		{#each punctuation as p, i (p.sign)}
			<label for="{p.value}_{i}">
				<input
					type="radio"
					name="punctuation"
					id="{p.value}_{i}"
					bind:group={active}
					value={p.sign}
				/>
				{p.value}
			</label>
		{/each}
	</fieldset>
	<fieldset>
		<legend>Signatures</legend>
		<button on:click={() => dispatchBtn('fav')}>Save to favourites</button>
		<button on:click={confirmReset}>Reset favourites</button>
		<!-- <button on:click={() => dispatchBtn('del')}>Remove from pool</button> -->
	</fieldset>
</div>
