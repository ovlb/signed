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
		border-radius: 0.25rem;
		border: 1px solid #000;
		max-width: 45rem;
		overflow: hidden;
	}

	.mail-content {
		padding: 0.75rem 0.5rem;
	}
</style>
