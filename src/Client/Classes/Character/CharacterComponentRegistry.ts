import StaminaComponent from "./StaminaComponent";
import StaminaRegeneratorComponent from "./StaminaRegeneratorComponent";

const CharacterComponentRegistry = [
	["StaminaComponent", StaminaComponent],
	["StaminaRegeneratorComponent", StaminaRegeneratorComponent]
] as const;

export default CharacterComponentRegistry;
