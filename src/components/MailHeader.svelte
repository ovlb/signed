<script lang="ts">
	const buttons = [{ class: 'minimize' }, { class: 'maximize' }, { class: 'close' }];
</script>

<header>
	<div class="button-container">
		{#each buttons as button}
			<div class="ui-button {button.class}" />
		{/each}
	</div>
</header>

<style>
	header {
		align-items: center;
		background: linear-gradient(90deg, navy, #1084d0);
		display: flex;
		justify-content: space-between;
		padding: 3px 2px 3px 3px;
	}

	.button-container {
		display: inline-grid;
		grid-template-columns: repeat(3, 1fr);
		margin-left: auto;
	}

	.ui-button {
		--btn-size: 0.75rem;

		background-color: silver;

		display: block;
		height: 14px;
		width: 16px;
		padding: 0;
		box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey,
			inset 2px 2px #dfdfdf;
	}

	.ui-button.minimize {
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='6' height='2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23000' d='M0 0h6v2H0z'/%3E%3C/svg%3E");
		background-position: bottom 3px left 4px;
		background-repeat: no-repeat;
	}

	.ui-button.maximize {
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='9' height='9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 0H0v9h9V0zM8 2H1v6h7V2z' fill='%23000'/%3E%3C/svg%3E");
		background-position: top 2px left 3px;
		background-repeat: no-repeat;
	}

	.ui-button.close {
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='8' height='7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 0h2v1h1v1h2V1h1V0h2v1H7v1H6v1H5v1h1v1h1v1h1v1H6V6H5V5H3v1H2v1H0V6h1V5h1V4h1V3H2V2H1V1H0V0z' fill='%23000'/%3E%3C/svg%3E");
		background-position: top 3px left 4px;
		background-repeat: no-repeat;
		margin-left: 2px;
	}
</style>
