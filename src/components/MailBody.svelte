<script lang="ts">
	const numberOfRows = Array(Math.floor(Math.random() * 7 + 3));

	function getRowWidth() {
		return Math.floor(Math.random() * 85 + 10);
	}
</script>

<div class="salutation" />
{#each numberOfRows as _, i}
	<div class="placeholder" style="--ph-width: {getRowWidth()}%" />
{/each}

<style>
	.salutation,
	.placeholder {
		background-color: #555;
		background-image: linear-gradient(to left, transparent, #777, transparent);
		border-radius: 0.125rem;
		height: 1rem;
		width: var(--ph-width, 75%);
	}

	.salutation {
		width: 33%;
	}

	* + * {
		margin-top: 0.5rem;
	}
</style>
