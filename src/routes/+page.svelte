<script>
	import IconButtonFilled from '$lib/ui/IconButtonFilled.svelte';
	import GroupedButton from '$lib/ui/GroupedButton.svelte';
	import IconButtonOutlined from '$lib/ui/IconButtonOutlined.svelte';
	import IconButtonTonal from '$lib/ui/IconButtonTonal.svelte';
	import ButtonTonal from '$lib/ui/ButtonTonal.svelte';
	import Switch from '$lib/ui/Switch.svelte';
	import Filter from '$lib/ui/Filter.svelte';
	import TextFieldOutlined from '$lib/ui/TextFieldOutlined.svelte';

	import SvgResetSettings from '$lib/ui/SvgResetSettings.svelte';
	import SvgRemove from '$lib/ui/SvgRemove.svelte';
	import SvgAdd from '$lib/ui/SvgAdd.svelte';
	import SvgContentCopy from '$lib/ui/SvgContentCopy.svelte';
	import SvgRefresh from '$lib/ui/SvgRefresh.svelte';

	import {
		charSetAll,
		getDefaultValues,
		generateChars,
		generatePassword,
		charSetStd,
		charSetExt,
		minLength,
		isDefaultValues
	} from '$lib/honkipass.js';

	let param = $state(getDefaultValues());
	let chars = $derived(generateChars(param));
	let password = $derived(generatePassword(param));
	const messageGenerated = 'パスワードを生成しました';
	let message = $state(messageGenerated);
	let error = $state('');

	$effect(() => {
		message = messageGenerated;
		error = password ? '' : '設定を変更してやり直してください';
	});
</script>

<div class="flex justify-center">
	<div class="font-mono">
		{#each charSetAll.split('') as char, index}
			{#if index > 0 && index % 32 === 0}
				<br />
			{/if}{#if password.indexOf(char) >= 0}
				<span
					class="bg-lightPrimaryContainer
            text-lightOnPrimaryContainer sm:px-0.5
            dark:bg-darkPrimaryContainer dark:text-darkOnPrimaryContainer">{char}</span
				>
			{:else if chars.indexOf(char) >= 0}
				<span class="sm:px-0.5">{char}</span>
			{:else}
				<span class="opacity-30 sm:px-0.5">{char}</span>
			{/if}
		{/each}
	</div>
</div>
<div class="flex flex-row gap-2 sm:gap-8">
	<div class="grow">
		<TextFieldOutlined
			id="password"
			value={password}
			label="パスワード"
			readonly
			monospace
			{message}
			{error}
		/>
	</div>
	<span class="flex gap-4 pt-2 sm:gap-8">
		<IconButtonTonal
			id="refresh"
			icon={SvgRefresh}
			onClick={() => {
				param = { ...param };
			}}
		/>
		<IconButtonFilled
			id="copy"
			icon={SvgContentCopy}
			onClick={() => {
				navigator.clipboard.writeText(password);
				message = 'コピーしました';
			}}
			disabled={!!error}
		/>
	</span>
</div>

<div class="flex flex-row gap-4 sm:gap-8">
	<IconButtonOutlined
		id="reset"
		icon={SvgResetSettings}
		onClick={() => {
			param = getDefaultValues();
		}}
		disabled={isDefaultValues(param)}
	/>
	<div
		class="mt-2 w-20 text-right
      text-lightOnBackground dark:text-darkOnBackground"
	>
		{param.length} 文字
	</div>
	<IconButtonTonal
		id="lengthDn"
		icon={SvgRemove}
		onClick={() => {
			if (param.length > minLength) {
				param.length--;
			}
		}}
	/>
	<IconButtonTonal
		id="lengthUp"
		icon={SvgAdd}
		onClick={() => {
			param.length++;
		}}
	/>
	<ButtonTonal
		id="lengthUp4"
		label="+4"
		onClick={() => {
			param.length += 4;
		}}
	/>
</div>
<div class="flex flex-row justify-center gap-2 sm:gap-8">
	<GroupedButton
		id="charSets"
		items={[
			{
				label: `標準${charSetStd.length}字`,
				value: 's',
				selected: param.charSet === 's'
			},
			{
				label: `拡張${charSetExt.length}字`,
				value: 'e',
				selected: param.charSet === 'e'
			},
			{
				label: '詳細設定',
				value: 'm',
				selected: param.charSet === 'm'
			}
		]}
		bind:value={param.charSet}
	/>
</div>
<div class="flex flex-row gap-2 sm:gap-4">
	<Switch id="useAllType" bind:checked={param.useAllTypes} />
	<span class="mt-1">すべての文字種を使用</span>
</div>
<div class="flex flex-row gap-2 sm:gap-4">
	<Switch id="disallowRepeatUse" bind:checked={param.uniqueChars} />
	<span class="mt-1">同じ文字を使用しない</span>
</div>
<div class="flex flex-row justify-between gap-2 sm:gap-4">
	<Filter
		id="useUpperCase"
		bind:checked={param.useUpperCase}
		label="ABC"
		disabled={param.charSet !== 'm'}
	/>
	<Filter
		id="useLowerCase"
		bind:checked={param.useLowerCase}
		label="abc"
		disabled={param.charSet !== 'm'}
	/>
	<Filter
		id="useNumerics"
		bind:checked={param.useNumerics}
		label="123"
		disabled={param.charSet !== 'm'}
	/>
	<Filter
		id="useSymbol"
		bind:checked={param.useSymbols}
		label="@#$"
		disabled={param.charSet !== 'm'}
	/>
</div>
<div class="flex flex-row gap-2 sm:gap-4">
	<span class="pt-3">
		<Filter
			id="disallowExclusives"
			bind:checked={param.disallowExcluded}
			label="除外"
			disabled={param.charSet !== 'm'}
		/>
	</span>
	<span class="grow">
		<TextFieldOutlined
			id="TextFieldOutlined1"
			label="除外対象"
			bind:value={param.excluded}
			message=""
			disabled={param.charSet !== 'm' || !param.disallowExcluded}
			monospace
		/>
	</span>
</div>
