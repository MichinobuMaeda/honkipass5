<script>
	import PWABadge from '$lib/PWABadge.svelte';
	import { version } from '$app/environment';
	// import appLogo from '/favicon.svg';
	import '../app.css';
	let { children } = $props();
</script>

<div
	class="flex flex-row justify-center
    bg-lightSurfaceVariant dark:bg-darkSurfaceVariant"
>
	<div
		class="flex w-full max-w-screen-sm flex-col
      bg-lightBackground text-lightOnBackground
      dark:bg-darkBackground dark:text-darkOnBackground"
	>
		<div class="flex min-h-screen flex-col justify-between">
			<header
				class="flex
      bg-lightPrimaryContainer text-lightOnPrimaryContainer
      dark:bg-darkPrimaryContainer dark:text-darkOnPrimaryContainer"
			>
				<h1 class="flex flex-row p-1 text-2xl">
					<img src="/favicon.svg" alt="Honkipass v5 Logo" class="mr-2 h-8 w-8" />
					本気でパスワード v5
				</h1>
			</header>

			<main class="mb-auto flex justify-center">
				<div class="flex flex-col gap-4 px-1 pb-6 pt-4 sm:gap-8 sm:pt-8">
					{@render children()}
				</div>
			</main>
			<footer
				class="flex flex-row gap-1 bg-lightSecondary px-4 py-1
      text-base text-lightOnSecondary
      dark:bg-darkSecondary dark:text-darkOnSecondary"
			>
				© 2024 Michinobu Maeda
				<a
					class="mx-2 text-lightInversePrimary underline
        underline-offset-2 dark:text-darkInversePrimary"
					href="https://github.com/MichinobuMaeda/honkipass5">Source</a
				>
				v{version}
			</footer>
		</div>
	</div>
</div>

<PWABadge />
