import Iris from "@rbxts/iris";
import { type IrisController } from "Client/Controllers/IrisController";
import CharacterIris from "./Components/Character/Character.iris";

type Props = {
	irisController: IrisController;
};

export default function MainIris({ irisController }: Props): void {
	const isOpened = Iris.State(true);
	const currentComponent = Iris.State<(() => void) | undefined>(undefined);

	Iris.Window(["Fractured Harmony – Debug Panel v1.0"], {
		isOpened
	});
	{
		Iris.MenuBar();
		{
			Iris.Menu(["Home"]);
			{
				const menuItemMain = Iris.MenuItem(["Main"]);
				if (menuItemMain.clicked()) currentComponent.set(undefined);
			}
			Iris.End();

			Iris.Menu(["Components"]);
			{
				const menuItemCharacter = Iris.MenuItem(["Character"]);
				if (menuItemCharacter.clicked()) currentComponent.set(CharacterIris);
			}
			Iris.End();
		}
		Iris.End();

		if (currentComponent.get()) currentComponent.get()!();
		else {
			Iris.Text(["Hello world!"]);

			const buttonDisconnect = Iris.Button(["Disconnect"]);
			if (buttonDisconnect.hovered()) Iris.Tooltip(["Disconnect the debug console"]);
			if (buttonDisconnect.clicked()) irisController.Disconnect();
		}
	}
	Iris.End();

	if (!isOpened.get()) {
		const buttonOpen = Iris.Button(["Open"]);
		if (buttonOpen.clicked()) isOpened.set(true);
	}
}
