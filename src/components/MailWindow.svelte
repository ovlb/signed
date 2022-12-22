<script lang="ts">
	import MailBody from './MailBody.svelte';
	import MailHeader from './MailHeader.svelte';
</script>

<div class="mail-window">
	<MailHeader />
	<div class="mail-content">
		<MailBody />
		<slot />
	</div>
</div>

<style>
	.mail-window {
		background: silver;
		box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey,
			inset 2px 2px #fff;
		padding: 3px;
		max-width: 45rem;
	}

	.mail-content {
		padding: 0.75rem 0.5rem;
	}
</style>
