<script lang="ts">
	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';

	// Form Data
	const formData = {
		email: '',
		password: '',
	};

	// A custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="{cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{@html $modalStore[0].body ?? '(body missing)'}</article>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}" id="login-form" on:submit|preventDefault={onFormSubmit}>
			<label class="label">
				<span>Email</span>
				<input class="input" type="email" bind:value={formData.email} placeholder="Enter email..." required/>
			</label>
			<label class="label">
				<span>Password</span>
				<input class="input" type="password" bind:value={formData.password} placeholder="Enter password..." required/>
			</label>
		</form>
		<!-- prettier-ignore -->
		<footer class="justify-start modal-footer {parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
            <input class="cursor-pointer btn {parent.buttonPositive}" type="submit" form="login-form" value="Log in">
        </footer>
	</div>
{/if}