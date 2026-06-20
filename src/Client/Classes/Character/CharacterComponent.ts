import Disposable from "Shared/Classes/Disposable";
import type Character from ".";

export default abstract class CharacterComponent extends Disposable {
	protected readonly Character: Character;

	public constructor(character: Character) {
		super();

		this.Character = character;
	}
}
