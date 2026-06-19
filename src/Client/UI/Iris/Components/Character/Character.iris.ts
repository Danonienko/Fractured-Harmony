import Iris from "@rbxts/iris";
import { CharacterController } from "Client/Controllers/CharacterController";
import HumanoidIris from "./Humanoid.iris";

export default function CharacterIris(): void {
	const character = CharacterController.GetCharacter();

	if (!character) {
		Iris.Text(["Character is not initialized"]);
		return;
	}

	HumanoidIris(character.Humanoid);
}
