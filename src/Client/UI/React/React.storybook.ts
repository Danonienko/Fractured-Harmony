import { Storybook } from "@rbxts/ui-labs";

export = {
	name: "React Stories",
	storyRoots: [(script.Parent as Instance & { readonly Stories: Folder }).Stories]
} satisfies Storybook;
