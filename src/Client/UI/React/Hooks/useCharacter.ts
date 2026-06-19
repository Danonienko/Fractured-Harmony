import { useEventListener } from "@rbxts/pretty-react-hooks";
import { useState } from "@rbxts/react";
import type Character from "Client/Classes/Character";
import { CharacterController } from "Client/Controllers/CharacterController";

export default function useCharacter(): Character | undefined {
	const [character, setCharacter] = useState<Character | undefined>(undefined);

	useEventListener(CharacterController.CharacterCreated, (char) => setCharacter(char));
	useEventListener(CharacterController.CharacterDestroying, () => setCharacter(undefined));

	return character;
}
