<script lang="ts">
	const buttons = [{ colour: 'red' }, { colour: 'yellow' }, { colour: 'green' }];
</script>

<header>
	<div class="button-container">
		{#each buttons as button}
			<div class="ui-button" style="--clr: {button.colour}" />
		{/each}
	</div>
</header>

<style>
	header {
		background-color: rgb(236, 231, 231);
		border-bottom: 1px solid #000;
		padding: 0.75rem 0.5rem;
	}

	.button-container {
		display: inline-grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.25rem;
	}

	.ui-button {
		--btn-size: 0.75rem;

		background-color: var(--clr, black);
		border-radius: 50%;
		height: var(--btn-size);
		width: var(--btn-size);
	}
</style>
