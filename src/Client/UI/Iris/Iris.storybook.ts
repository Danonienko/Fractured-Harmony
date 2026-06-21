import { Storybook } from "@rbxts/ui-labs";

export = {
	name: "Iris Stories",
	storyRoots: [(script.Parent as Instance & { readonly Stories: Folder }).Stories]
} satisfies Storybook;
