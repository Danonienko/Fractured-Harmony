import Disposable from "Shared/Classes/Disposable";

export default class Character extends Disposable {
	public readonly Model: Model;
	public readonly Humanoid: Humanoid;
	public readonly Animator: Animator;

	public constructor(characterModel: Model) {
		super();

		const humanoid = this._getHumanoid(characterModel);
		const animator = this._getAnimator(humanoid);

		this.Model = characterModel;
		this.Humanoid = humanoid;
		this.Animator = animator;
	}

	private _getHumanoid(characterModel: Model): Humanoid {
		const humanoid = characterModel.FindFirstChildOfClass("Humanoid");
		assert(humanoid, "Failed to get humanoid from character model");
		return humanoid;
	}

	private _getAnimator(humanoid: Humanoid): Animator {
		const animator = humanoid.FindFirstChildOfClass("Animator");
		assert(animator, "Failed to get animator from humanoid");
		return animator;
	}
}
